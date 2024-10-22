'use client';

import { useState } from 'react';

import { catchError } from "@/utils/catchError";

interface UseFetchProps<T> {
  queryFn: Promise<T>;
}

export const useFetch = <T,>({ queryFn: promise }: UseFetchProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (newPromise: Promise<T>) => {
    try {
      setIsLoading(true);
      const { data, error } = await catchError(newPromise);
      setData(data ?? null);
      setError(error ?? null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
