import { Pagination } from './pagination';

export interface Metadata {
  image?: string;
  image_data?: string;
  external_url?: string;
  description: string;
  name: string;
  attributes: any;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  chain: string;
  token_format?: string;
  meta_3d_url?: string;
}

export interface Attribute {
  display_type?: DisplayType;
  trait_type?: string;
  value: string | number;
}

export enum DisplayType {
  DATE = 'date',
  NUMBER = 'number',
  BOOST_PERCENTAGE = 'boost_percentage',
  BOOST_NUMBER = 'boost_number',
}

export interface UpdateMetadataRequest {
  collectionId: string;
  tokenId: string;
  metadata: Metadata;
}

export interface AddMetadataRequest {
  collectionId: string;
  tokenId: string;
  metadata: Metadata;
}

export interface InsertionMetadata extends Metadata {
  collection_id: string;
  token_id: string;
}

export interface FetchTokenFilter {
  collection_id?: string;
  nft_type?: string;
  token_format?: string;
  chain?: string;
  status?: string;
}

export interface FetchTokenRequest {
  fetchFilter: FetchTokenFilter;
  attributes: Attribute[];
  page: number;
  size: number;
}

export interface FetchTokenResponse {
  pagination: Pagination,
  items: NftItem[],
}

export interface AttrQueryForm {
  rawQuery: string;
  values: (string | number)[];
}

export interface NftItem {
  id: string;
  collection_id: string;
  token_id: string;
  chain: string;
  token_format: string;
  image?: string;
  image_data?: string;
  external_url?: string;
  description: string;
  name: string;
  attributes: Attribute[];
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  meta_3d_url?: string;
}
