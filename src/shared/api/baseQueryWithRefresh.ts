import {
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { API_BASE_URL } from "../config/env";
import { getAccessToken, setAccessToken } from "../lib/auth";
import type { RefreshResponse } from "./types";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const authUrls = new Set([
  "/auth/signUp",
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
]);

type ExtraOptions = Parameters<typeof rawBaseQuery>[2];

let refreshPromise: Promise<boolean> | null = null;

function refreshAccessToken(
  api: BaseQueryApi,
  extraOptions: ExtraOptions
): Promise<boolean> {
  refreshPromise ??= (async () => {
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh", method: "GET" },
      api,
      extraOptions
    );

    if (refreshResult.error) {
      setAccessToken(null);
      return false;
    }

    setAccessToken((refreshResult.data as RefreshResponse).access_token);
    return true;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;
  const isAuthUrl = authUrls.has(url);

  // Токена в памяти нет (перезагрузка страницы) — сначала refresh
  if (!isAuthUrl && !getAccessToken()) {
    const refreshed = await refreshAccessToken(api, extraOptions);

    if (!refreshed) {
      return { error: { status: 401, data: null } };
    }
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  // Токен был, но протух
  if (result.error?.status === 401 && !isAuthUrl) {
    if (await refreshAccessToken(api, extraOptions)) {
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
