import { Response as ExpressResponse, Request } from 'express';
import * as Response from '../helpers/response.manager';
import { Logger } from '../helpers/Logger';
import * as collectionService from '../services/collection.service';
import { StatusCodes } from 'http-status-codes';

/**
 * Save new collection
 *
 * @param req
 * @param res
 */
export async function handleAddCollection(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { id, name, contract_address: contractAddress } = req.body;
    await collectionService.addCollectionInfo({id, name, contractAddress });

    return Response.success(res, {
      message: 'Successful',
      response: {
        collection_id: id,
      }
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleGetAllCollections(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const response = await collectionService.getAllCollectionInfo();

    return Response.success(res, {
      message: 'Successful',
      response
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleGetCollection(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { collectionId } = req.params;
    const response = await collectionService.getCollectionInfo(collectionId);

    return Response.success(res, {
      message: 'Successful',
      response
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleUpdateCollectionInfo(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { collectionId } = req.params;
    const { name, contract_address } = req.body;

    await collectionService.updateCollectionInfo({ id: collectionId, name, contractAddress: contract_address });

    return Response.success(res, {
      message: 'Successful',
      response: {
        collection_id: collectionId,
      }
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleDeleteCollectionIfo(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId } = req.params;
    const response = await collectionService.deleteCollectionInfo(collectionId);

    return Response.success(res, {
      message: 'Successful',
      response: { deleted: response }
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}
