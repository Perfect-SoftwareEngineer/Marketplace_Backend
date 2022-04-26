export interface FetchAndSaveNftRequest {
  collectionName: string;
  collectionId: string;
  contracts: FetchNftContract[];
}

interface FetchNftContract {
  address: string;
  chain: string;
}

interface FetchNftContract {
  address: string;
  chain: string;
}

export interface Update3dNftItem {
  contractAddress: string;
  tokenId: string;
  meta3dUrl: string;
}
