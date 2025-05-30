import {
  MutationCache,
  MutationOptions,
  QueryCache,
  QueryClient,
  QueryKey,
  QueryOptions,
} from '@tanstack/react-query';

import { notifyError } from './notifications';

export function withError(fallbackMessage?: string) {
  return {
    onError(error: unknown) {
      notifyError(error as Error, fallbackMessage);
    },
  };
}

export function withGlobalError(fallbackMessage?: string) {
  return {
    meta: {
      error: { message: fallbackMessage },
    },
  };
}

type OptionalReadonly<T> = T | Readonly<T>;

export function withInvalidate(
  queryClient: QueryClient,
  queryKeysToInvalidate: OptionalReadonly<string[]>[],
) {
  return {
    onSuccess() {
      return Promise.all(
        queryKeysToInvalidate.map((keys) =>
          queryClient.invalidateQueries(keys),
        ),
      );
    },
  };
}

export function mutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(...options: MutationOptions<TData, TError, TVariables, TContext>[]) {
  return mergeOptions(options);
}

export function queryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(...options: QueryOptions<TQueryFnData, TError, TData, TQueryKey>[]) {
  return mergeOptions(options);
}

function mergeOptions<T>(options: T[]) {
  return options.reduce(
    (acc, option) => ({
      ...acc,
      ...option,
    }),
    {} as T,
  );
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20 * 1000,
        // retry: false,
      },
    },
    mutationCache: new MutationCache({
      onError: (error, _variable, _context, mutation) => {
        handleError(error, mutation.meta?.error);
      },
    }),
    queryCache: new QueryCache({
      onError: (error, query) => {
        handleError(error, query.meta?.error);
      },
    }),
  });
}

function handleError(error: unknown, errorMeta?: unknown) {
  if (errorMeta && typeof errorMeta === 'object') {
    const { message } = errorMeta as {
      message?: string;
    };

    notifyError(error as Error, message);
  }
}

export const queryClient = createQueryClient();
