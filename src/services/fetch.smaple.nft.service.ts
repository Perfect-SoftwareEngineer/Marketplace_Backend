import * as CollectionService from './collection.service';
import axios from 'axios';
import * as fs from 'fs';
import { components } from 'moralis/types/generated/web3Api';
import * as MetadataService from './metadata.service';
import { Logger } from '../helpers/Logger';
import { FetchAndSaveNftRequest } from '../interfaces/fetch.and.save.nfts';

const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;


export function formulateMetadata(nft: components["schemas"]["nft"], chain: string) {
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

const playAndKollectRequest: FetchAndSaveNftRequest = {
  collectionName: 'CyberKongz: Play & Kollect',
  collectionId: 'playandkollect',
  contracts: [
    {
      address: '0x7cbccc4a1576d7a05eb6f6286206596bcbee14ac',
      chain: 'polygon',
    },
    {
      address: '0x543dc6cA8381E8A1Dd425bD7a686d5D7295F950e',
      chain: 'polygon',
    },
    {
      address: '0x0e28A33728B61A8abe11Ac9adc0AF17c0d3d7603',
      chain: 'polygon',
    },
  ]
};

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

// for testing
fetchAndSaveNftByContract(playAndKollectRequest)
