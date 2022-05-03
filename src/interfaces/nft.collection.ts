export interface NftCollection {
  id: string;
  name: string;
  contractAddresses: string[];
}

export interface NftCollectionDbReq {
  id: string;
  name: string;
  contract_addresses: string[];
}

export interface UpdateCollectionRequest {
  id: string;
  name?: string;
  contractAddress?: string[];
}
