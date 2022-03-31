type errorData = string | object;

export interface ErrorObject extends Error {
  code?: string;
  data?: errorData;
}

export class TokenExistsError extends Error {
  constructor() {
    super("Cannot delete collection from db, still has tokens in the db");
  }
}
