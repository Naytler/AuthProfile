import { baseApi } from "@/shared/api/baseApi";
import type { UpdateUserRequest } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<unknown, UpdateUserRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
