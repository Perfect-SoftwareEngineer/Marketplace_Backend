export interface NftCollection {
  id: string;
  name: string;
  contractAddress: string;
}

export interface UpdateCollectionRequest {
  id: string;
  name?: string;
  contractAddress?: string;
}
