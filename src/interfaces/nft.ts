import { NftStatus } from './db.enums';

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
