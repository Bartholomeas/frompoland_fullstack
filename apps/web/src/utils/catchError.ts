export const catchError = <T>(promise: Promise<T>): Promise<[T, undefined] | [undefined, Error]> => promise.then(data => [data, undefined] as [T, undefined]).catch(err => [undefined, err]);
