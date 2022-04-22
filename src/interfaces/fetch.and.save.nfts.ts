
export interface FetchAndSaveNftRequest {
  collectionName: string;
  collectionId: string;
  contracts: FetchNftContract[];
}

interface FetchNftContract {
  address: string;
  chain: string;
}
