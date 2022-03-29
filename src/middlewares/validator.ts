/* istanbul ignore file */
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ContextRunner } from 'express-validator/src/chain';
import { StatusCodes } from 'http-status-codes';

/**
 * Uniform handling of express validators
 * @param validations
 */
export const Validator = {
  validate: (validations: ContextRunner[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map((validation: ContextRunner) => validation.run(req)));

      const errors = validationResult(req);

      if (errors.isEmpty()) return next();

      res.status(400).json({
        code: StatusCodes.BAD_REQUEST,
        errors: errors.array().map(({ param, msg }) => ({
          param,
          message: msg,
        })),
      });
    };
  },
};
