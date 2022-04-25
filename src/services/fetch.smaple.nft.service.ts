import * as CollectionService from './collection.service';
import axios from 'axios';
import { components } from 'moralis/types/generated/web3Api';
import * as MetadataService from './metadata.service';
import { Logger } from '../helpers/Logger';
import { FetchAndSaveNftRequest, Update3dNftItem } from '../interfaces/fetch.and.save.nfts';
import { KnexHelper } from '../helpers/knex.helper';

const Moralis = require('moralis/node');

/* Moralis init code */
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;


export function formulateMetadata(nft: components['schemas']['nft'], chain: string) {
  if (!nft.metadata) {
    return;
  }
  const metadata = JSON.parse(nft.metadata);
  return {
    ...metadata,
    attributes: JSON.stringify(metadata.attributes || '[]'),
    token_format: nft.contract_type,
    amount: nft.amount,
    contract_address: nft.token_address,
    // @ts-ignore
    token_hash: nft.token_hash,
    token_id: nft.token_id,
    token_uri: nft.token_uri,
    chain,
    nft_type: 'GAME_ITEM',
  };
}

export async function fetchAndSaveNftByContract(request: FetchAndSaveNftRequest) {
  const { collectionId, collectionName, contracts } = request;
  const nfts = [];
  try {
    // Save collection
    await CollectionService.addCollectionInfo({
      id: collectionId,
      name: collectionName,
      contractAddresses: contracts.map(x => x.address),
    });
  } catch (error: any) {
    Logger.Error(error);
    if (error.code !== 400) {
      return;
    }
  }

  await Moralis.start({ serverUrl, appId });

  for (const { address, chain } of contracts) {
    const options = { chain, address };
    const polygonNFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    const validItems = polygonNFTs.result.filter((x: any) => x.block_number_minted);
    for (let i = 0; i < validItems.length; i++) {
      const item = validItems[i];
      try {
        if (!item.metadata && item.token_uri) {
          item.metadata = JSON.stringify((await axios.get(item.token_uri)).data);
        }
        if (item.metadata && item.metadata.includes('"name"')) {
          nfts.push(formulateMetadata(item, chain));
        }
      } catch (err: any) {
        console.log(err.error);
      }
    }
    console.log(validItems.length);
  }
  console.log(nfts.length);
  await MetadataService.batchAddItems({ collectionId, metadataList: nfts });
}


export async function updateTokens3dUrl(metaItems: Update3dNftItem[]) {
  const result = await KnexHelper.updateTokens3dUrl(metaItems);
  console.log(result);
}
