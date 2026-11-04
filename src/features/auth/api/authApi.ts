import { baseApi } from "@/shared/api/baseApi";
import { setAccessToken } from "@/shared/lib/auth";

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../model/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        setAccessToken(data.access_token);
      },

      invalidatesTags: ["User"],
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/signUp",
        method: "POST",
        body,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        setAccessToken(data.access_token);
      },

      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } finally {
          setAccessToken(null);
          dispatch(baseApi.util.resetApiState());
        }
      },

      invalidatesTags: ["User"],
    }),

    requestReset: builder.mutation<
      unknown,
      {
        email: string;
      }
    >({
      query: ({ email }) => ({
        url: "/auth/send-reset-password",
        method: "GET",
        params: {
          email,
        },
      }),
    }),

    resetPassword: builder.mutation<
      unknown,
      {
        token: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRequestResetMutation,
  useResetPasswordMutation,
} = authApi;
