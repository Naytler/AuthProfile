import { baseApi } from "@/shared/api/baseApi";
import { normalizeDictionaryResponse } from "@/shared/lib/normalizeDictionary";
import type { Skill } from "../model/types";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<Skill[], void>({
      query: () => "/skills",
      transformResponse: normalizeDictionaryResponse,
    }),
  }),
});

export const { useGetSkillsQuery } = skillApi;
