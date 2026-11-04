import { baseApi } from "@/shared/api/baseApi";
import { normalizeDictionaryResponse } from "@/shared/lib/normalizeDictionary";
import type { Specialization } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<Specialization[], void>({
      query: () => "/specializations",
      transformResponse: normalizeDictionaryResponse,
    }),
  }),
});

export const { useGetSpecializationsQuery } = specializationApi;
