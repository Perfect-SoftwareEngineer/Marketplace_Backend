import { Response } from 'express';
import { Logger } from './Logger';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom.error';

function respond(res: Response, data: any, httpCode: number): void {
  const response = {
    error: data.error,
    code: httpCode,
    data: data.response,
    message: data.message,
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Method', '*');

  res.writeHead(httpCode);
  res.end(JSON.stringify(response));
}

export function success(res: Response, response: any, status = 200): void {
  const data = response;
  data.error = false;
  respond(res, data, status);
}

export function failure(res: Response, response: any, httpCode = 503): void {
  const data = response;
  data.error = true;
  respond(res, data, httpCode);
}

export function handleError(res: Response, err: any) {
  Logger.Error(err);
  let code = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error Occurred';
  if(err instanceof CustomError) {
    code = err.code;
    message = err.message;
  }
  // Postgres error code for non-null constraint violation
  if(err.code === '23502') {
    code = StatusCodes.BAD_REQUEST;
    message = 'Some fields are missing';
  }

  return failure(res, {
    message,
  }, code);
}
