export namespace Err {
  export const NoMatchFound = {
    err: { noMatchFound: true },
  };

  export type NoMatchFound = typeof NoMatchFound;

  export const InvalidQuery = {
    err: { invalidQuery: true },
  };

  export type InvalidQuery = typeof InvalidQuery;
}
