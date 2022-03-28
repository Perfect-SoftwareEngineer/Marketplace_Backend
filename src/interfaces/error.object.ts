type errorData = string | object;

export interface ErrorObject extends Error {
  code?: string;
  data?: errorData;
}
