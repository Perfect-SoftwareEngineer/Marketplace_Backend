import { Response as ExpressResponse, Request } from 'express';
import * as Response from '../helpers/response.manager';
import { Logger } from '../helpers/Logger';
import * as metadataService from '../services';
import { StatusCodes } from 'http-status-codes';

/**
 * Save new metadata
 *
 * @param req
 * @param res
 */
export async function handleAddMetadata(req: Request, res: ExpressResponse): Promise<void> {
  // tokenId in the case we want to add metadata for a deleted tokenId
  const { collectionId, tokenId } = req.params;
  try {
    const response = await metadataService.addItem({ collectionId, tokenId: tokenId, metadata: req.body });

    return Response.success(res, {
      message: 'Successful',
      response: {
        tokenId: response,
      }
    }, StatusCodes.OK);
  } catch (err: any) {
    if(err.code === '23503') {
      return Response.failure(res, {
        code: 'COLLECTION_NOT_FOUND',
        message: `Collection with id ${collectionId} not created yet.`,
      }, StatusCodes.NOT_FOUND);
    }
    return Response.handleError(res, err);
  }
}

export async function handleGetAllMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId } = req.params;
    const response = await metadataService.getAllItems(collectionId);

    return Response.success(res, {
      message: 'Successful',
      response
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleGetMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId, tokenId } = req.params;
    const response = await metadataService.getSingleItem({ collectionId, tokenId });

    return Response.success(res, {
      message: 'Successful',
      response
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleUpdateMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId, tokenId } = req.params;
    await metadataService.updateItem({ collectionId, tokenId, metadata: req.body });

    return Response.success(res, {
      message: 'Successful',
      response: {
        tokenId: Number.parseInt(tokenId),
      }
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleDeleteMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId, tokenId } = req.params;
    const response = await metadataService.deleteItem({ collectionId, tokenId });

    return Response.success(res, {
      message: 'Successful',
      response: { deleted: response }
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}
