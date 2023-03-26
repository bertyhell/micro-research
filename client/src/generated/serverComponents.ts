/**
 * Generated by @openapi-codegen
 *
 * @version 0.0.1
 */
import * as reactQuery from "@tanstack/react-query";
import { useServerContext, ServerContext } from "./serverContext";
import type * as Fetcher from "./serverFetcher";
import { serverFetch } from "./serverFetcher";
import type * as Schemas from "./serverSchemas";

export type AppControllerStatusError = Fetcher.ErrorWrapper<undefined>;

export type AppControllerStatusVariables = ServerContext["fetcherOptions"];

export const fetchAppControllerStatus = (
  variables: AppControllerStatusVariables,
  signal?: AbortSignal
) =>
  serverFetch<undefined, AppControllerStatusError, undefined, {}, {}, {}>({
    url: "/api/status",
    method: "get",
    ...variables,
    signal,
  });

export const useAppControllerStatus = <TData = undefined>(
  variables: AppControllerStatusVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<undefined, AppControllerStatusError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useServerContext(options);
  return reactQuery.useQuery<undefined, AppControllerStatusError, TData>(
    queryKeyFn({
      path: "/api/status",
      operationId: "appControllerStatus",
      variables,
    }),
    ({ signal }) =>
      fetchAppControllerStatus({ ...fetcherOptions, ...variables }, signal),
    {
      ...options,
      ...queryOptions,
    }
  );
};

export type ProjectsControllerCreateError = Fetcher.ErrorWrapper<undefined>;

export type ProjectsControllerCreateVariables = {
  body: Schemas.CreateProjectDto;
} & ServerContext["fetcherOptions"];

/**
 * Create a new project with 2 questions and their answers
 */
export const fetchProjectsControllerCreate = (
  variables: ProjectsControllerCreateVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    Schemas.ProjectDetailResponse,
    ProjectsControllerCreateError,
    Schemas.CreateProjectDto,
    {},
    {},
    {}
  >({ url: "/api/projects", method: "post", ...variables, signal });

/**
 * Create a new project with 2 questions and their answers
 */
export const useProjectsControllerCreate = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.ProjectDetailResponse,
      ProjectsControllerCreateError,
      ProjectsControllerCreateVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useServerContext();
  return reactQuery.useMutation<
    Schemas.ProjectDetailResponse,
    ProjectsControllerCreateError,
    ProjectsControllerCreateVariables
  >(
    (variables: ProjectsControllerCreateVariables) =>
      fetchProjectsControllerCreate({ ...fetcherOptions, ...variables }),
    options
  );
};

export type ProjectsControllerGetByTagPathParams = {
  tag: string;
};

export type ProjectsControllerGetByTagError = Fetcher.ErrorWrapper<undefined>;

export type ProjectsControllerGetByTagResponse =
  Schemas.ProjectRankedResponse[];

export type ProjectsControllerGetByTagVariables = {
  pathParams: ProjectsControllerGetByTagPathParams;
} & ServerContext["fetcherOptions"];

/**
 * Get project by tag count
 */
export const fetchProjectsControllerGetByTag = (
  variables: ProjectsControllerGetByTagVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    ProjectsControllerGetByTagResponse,
    ProjectsControllerGetByTagError,
    undefined,
    {},
    {},
    ProjectsControllerGetByTagPathParams
  >({ url: "/api/projects/tags/{tag}", method: "get", ...variables, signal });

/**
 * Get project by tag count
 */
export const useProjectsControllerGetByTag = <
  TData = ProjectsControllerGetByTagResponse
>(
  variables: ProjectsControllerGetByTagVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      ProjectsControllerGetByTagResponse,
      ProjectsControllerGetByTagError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useServerContext(options);
  return reactQuery.useQuery<
    ProjectsControllerGetByTagResponse,
    ProjectsControllerGetByTagError,
    TData
  >(
    queryKeyFn({
      path: "/api/projects/tags/{tag}",
      operationId: "projectsControllerGetByTag",
      variables,
    }),
    ({ signal }) =>
      fetchProjectsControllerGetByTag(
        { ...fetcherOptions, ...variables },
        signal
      ),
    {
      ...options,
      ...queryOptions,
    }
  );
};

export type ProjectsControllerIncrementTagCountPathParams = {
  projectId: string;
  tagId: string;
};

export type ProjectsControllerIncrementTagCountError =
  Fetcher.ErrorWrapper<undefined>;

export type ProjectsControllerIncrementTagCountResponse =
  Schemas.ProjectRankedResponse[];

export type ProjectsControllerIncrementTagCountVariables = {
  pathParams: ProjectsControllerIncrementTagCountPathParams;
} & ServerContext["fetcherOptions"];

/**
 * Increment tag count by 1 for project
 */
export const fetchProjectsControllerIncrementTagCount = (
  variables: ProjectsControllerIncrementTagCountVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    ProjectsControllerIncrementTagCountResponse,
    ProjectsControllerIncrementTagCountError,
    undefined,
    {},
    {},
    ProjectsControllerIncrementTagCountPathParams
  >({
    url: "/api/projects/{projectId}/tags/{tagId}",
    method: "patch",
    ...variables,
    signal,
  });

/**
 * Increment tag count by 1 for project
 */
export const useProjectsControllerIncrementTagCount = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      ProjectsControllerIncrementTagCountResponse,
      ProjectsControllerIncrementTagCountError,
      ProjectsControllerIncrementTagCountVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useServerContext();
  return reactQuery.useMutation<
    ProjectsControllerIncrementTagCountResponse,
    ProjectsControllerIncrementTagCountError,
    ProjectsControllerIncrementTagCountVariables
  >(
    (variables: ProjectsControllerIncrementTagCountVariables) =>
      fetchProjectsControllerIncrementTagCount({
        ...fetcherOptions,
        ...variables,
      }),
    options
  );
};

export type ProjectsControllerGetByAnswerCountError =
  Fetcher.ErrorWrapper<undefined>;

export type ProjectsControllerGetByAnswerCountResponse =
  Schemas.ProjectRankedResponse[];

export type ProjectsControllerGetByAnswerCountVariables =
  ServerContext["fetcherOptions"];

/**
 * Get project by tag count
 */
export const fetchProjectsControllerGetByAnswerCount = (
  variables: ProjectsControllerGetByAnswerCountVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    ProjectsControllerGetByAnswerCountResponse,
    ProjectsControllerGetByAnswerCountError,
    undefined,
    {},
    {},
    {}
  >({ url: "/api/projects/answers", method: "get", ...variables, signal });

/**
 * Get project by tag count
 */
export const useProjectsControllerGetByAnswerCount = <
  TData = ProjectsControllerGetByAnswerCountResponse
>(
  variables: ProjectsControllerGetByAnswerCountVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      ProjectsControllerGetByAnswerCountResponse,
      ProjectsControllerGetByAnswerCountError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useServerContext(options);
  return reactQuery.useQuery<
    ProjectsControllerGetByAnswerCountResponse,
    ProjectsControllerGetByAnswerCountError,
    TData
  >(
    queryKeyFn({
      path: "/api/projects/answers",
      operationId: "projectsControllerGetByAnswerCount",
      variables,
    }),
    ({ signal }) =>
      fetchProjectsControllerGetByAnswerCount(
        { ...fetcherOptions, ...variables },
        signal
      ),
    {
      ...options,
      ...queryOptions,
    }
  );
};

export type ProjectsControllerFindOnePathParams = {
  id: string;
};

export type ProjectsControllerFindOneError = Fetcher.ErrorWrapper<undefined>;

export type ProjectsControllerFindOneVariables = {
  pathParams: ProjectsControllerFindOnePathParams;
} & ServerContext["fetcherOptions"];

/**
 * Get one project by id
 */
export const fetchProjectsControllerFindOne = (
  variables: ProjectsControllerFindOneVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    Schemas.ProjectDetailResponse,
    ProjectsControllerFindOneError,
    undefined,
    {},
    {},
    ProjectsControllerFindOnePathParams
  >({ url: "/api/projects/{id}", method: "get", ...variables, signal });

/**
 * Get one project by id
 */
export const useProjectsControllerFindOne = <
  TData = Schemas.ProjectDetailResponse
>(
  variables: ProjectsControllerFindOneVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      Schemas.ProjectDetailResponse,
      ProjectsControllerFindOneError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useServerContext(options);
  return reactQuery.useQuery<
    Schemas.ProjectDetailResponse,
    ProjectsControllerFindOneError,
    TData
  >(
    queryKeyFn({
      path: "/api/projects/{id}",
      operationId: "projectsControllerFindOne",
      variables,
    }),
    ({ signal }) =>
      fetchProjectsControllerFindOne(
        { ...fetcherOptions, ...variables },
        signal
      ),
    {
      ...options,
      ...queryOptions,
    }
  );
};

export type AnswerControllerFindUnansweredQueryParams = {
  answeredIds: string[];
};

export type AnswerControllerFindUnansweredError =
  Fetcher.ErrorWrapper<undefined>;

export type AnswerControllerFindUnansweredVariables = {
  queryParams: AnswerControllerFindUnansweredQueryParams;
} & ServerContext["fetcherOptions"];

/**
 * Get unanswered questions
 */
export const fetchAnswerControllerFindUnanswered = (
  variables: AnswerControllerFindUnansweredVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    Schemas.ProjectDto,
    AnswerControllerFindUnansweredError,
    undefined,
    {},
    AnswerControllerFindUnansweredQueryParams,
    {}
  >({ url: "/api/answer", method: "get", ...variables, signal });

/**
 * Get unanswered questions
 */
export const useAnswerControllerFindUnanswered = <TData = Schemas.ProjectDto>(
  variables: AnswerControllerFindUnansweredVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      Schemas.ProjectDto,
      AnswerControllerFindUnansweredError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useServerContext(options);
  return reactQuery.useQuery<
    Schemas.ProjectDto,
    AnswerControllerFindUnansweredError,
    TData
  >(
    queryKeyFn({
      path: "/api/answer",
      operationId: "answerControllerFindUnanswered",
      variables,
    }),
    ({ signal }) =>
      fetchAnswerControllerFindUnanswered(
        { ...fetcherOptions, ...variables },
        signal
      ),
    {
      ...options,
      ...queryOptions,
    }
  );
};

export type AnswerControllerSubmitAnswerToProjectQueryParams = {
  projectId: string;
  firstAnswerId: string;
  secondAnswerId: string;
};

export type AnswerControllerSubmitAnswerToProjectError =
  Fetcher.ErrorWrapper<undefined>;

export type AnswerControllerSubmitAnswerToProjectVariables = {
  queryParams: AnswerControllerSubmitAnswerToProjectQueryParams;
} & ServerContext["fetcherOptions"];

/**
 * Enter a response for a project
 */
export const fetchAnswerControllerSubmitAnswerToProject = (
  variables: AnswerControllerSubmitAnswerToProjectVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    Schemas.AnswerProjectDto,
    AnswerControllerSubmitAnswerToProjectError,
    undefined,
    {},
    AnswerControllerSubmitAnswerToProjectQueryParams,
    {}
  >({ url: "/api/answer", method: "post", ...variables, signal });

/**
 * Enter a response for a project
 */
export const useAnswerControllerSubmitAnswerToProject = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.AnswerProjectDto,
      AnswerControllerSubmitAnswerToProjectError,
      AnswerControllerSubmitAnswerToProjectVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useServerContext();
  return reactQuery.useMutation<
    Schemas.AnswerProjectDto,
    AnswerControllerSubmitAnswerToProjectError,
    AnswerControllerSubmitAnswerToProjectVariables
  >(
    (variables: AnswerControllerSubmitAnswerToProjectVariables) =>
      fetchAnswerControllerSubmitAnswerToProject({
        ...fetcherOptions,
        ...variables,
      }),
    options
  );
};

export type TagsControllerFindAllError = Fetcher.ErrorWrapper<undefined>;

export type TagsControllerFindAllResponse = Schemas.TagResponse[];

export type TagsControllerFindAllVariables = ServerContext["fetcherOptions"];

/**
 * Get all tags
 */
export const fetchTagsControllerFindAll = (
  variables: TagsControllerFindAllVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    TagsControllerFindAllResponse,
    TagsControllerFindAllError,
    undefined,
    {},
    {},
    {}
  >({ url: "/api/tags", method: "get", ...variables, signal });

/**
 * Get all tags
 */
export const useTagsControllerFindAll = <TData = TagsControllerFindAllResponse>(
  variables: TagsControllerFindAllVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      TagsControllerFindAllResponse,
      TagsControllerFindAllError,
      TData
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useServerContext(options);
  return reactQuery.useQuery<
    TagsControllerFindAllResponse,
    TagsControllerFindAllError,
    TData
  >(
    queryKeyFn({
      path: "/api/tags",
      operationId: "tagsControllerFindAll",
      variables,
    }),
    ({ signal }) =>
      fetchTagsControllerFindAll({ ...fetcherOptions, ...variables }, signal),
    {
      ...options,
      ...queryOptions,
    }
  );
};

export type SeedControllerCreateError = Fetcher.ErrorWrapper<undefined>;

export type SeedControllerCreateVariables = {
  body?: Schemas.CreateSeedDto;
} & ServerContext["fetcherOptions"];

export const fetchSeedControllerCreate = (
  variables: SeedControllerCreateVariables,
  signal?: AbortSignal
) =>
  serverFetch<
    undefined,
    SeedControllerCreateError,
    Schemas.CreateSeedDto,
    {},
    {},
    {}
  >({ url: "/api/seed", method: "post", ...variables, signal });

export const useSeedControllerCreate = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      undefined,
      SeedControllerCreateError,
      SeedControllerCreateVariables
    >,
    "mutationFn"
  >
) => {
  const { fetcherOptions } = useServerContext();
  return reactQuery.useMutation<
    undefined,
    SeedControllerCreateError,
    SeedControllerCreateVariables
  >(
    (variables: SeedControllerCreateVariables) =>
      fetchSeedControllerCreate({ ...fetcherOptions, ...variables }),
    options
  );
};

export type QueryOperation =
  | {
      path: "/api/status";
      operationId: "appControllerStatus";
      variables: AppControllerStatusVariables;
    }
  | {
      path: "/api/projects/tags/{tag}";
      operationId: "projectsControllerGetByTag";
      variables: ProjectsControllerGetByTagVariables;
    }
  | {
      path: "/api/projects/answers";
      operationId: "projectsControllerGetByAnswerCount";
      variables: ProjectsControllerGetByAnswerCountVariables;
    }
  | {
      path: "/api/projects/{id}";
      operationId: "projectsControllerFindOne";
      variables: ProjectsControllerFindOneVariables;
    }
  | {
      path: "/api/answer";
      operationId: "answerControllerFindUnanswered";
      variables: AnswerControllerFindUnansweredVariables;
    }
  | {
      path: "/api/tags";
      operationId: "tagsControllerFindAll";
      variables: TagsControllerFindAllVariables;
    };
