export const catchError = async <T>(promise: Promise<T>): Promise<{ data: T | undefined; error: Error | undefined }> => {
  let data: T | undefined = undefined;
  let error: Error | undefined = undefined;

  try {
    data = await promise;
  } catch (err) {
    if (err instanceof Error) error = err;
    else error = new Error('An unknown error occurred');
  }

  return { data, error };
};
