export function getStringQueryParam(
  queryParam: string | string[] | undefined
): string | undefined {
  if (queryParam === undefined) {
    return undefined;
  }
  if (Array.isArray(queryParam)) {
    return queryParam.length > 0 ? queryParam[0] : undefined;
  }
  if (typeof queryParam === "string") {
    return queryParam;
  }
  return undefined;
}
