import { baseApi } from "@/shared/api/baseApi";
import type { Profile, UpdateProfileRequest } from "../model/types";
import { toProfile } from "./mappers";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({ url: "/auth/profile", method: "GET" }),
      transformResponse: toProfile,
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation<unknown, UpdateProfileRequest>({
      query: ({ id, ...body }) => ({
        url: `/profiles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
