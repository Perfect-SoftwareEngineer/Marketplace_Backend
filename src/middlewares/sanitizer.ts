import { NextFunction, Request, Response } from 'express';
import { Metadata } from '../interfaces/nft';

class MetaClass implements Metadata {
  attributes: any;
  description: string;
  name: string;
  animation_url: string;
  background_color: string;
  external_url: string;
  image: string;
  image_data: string;
  youtube_url: string;
  owner_address: string;
  nft_type: string;
  token_format: string;
  chain: string;

  constructor(attributes: any, description: string, name: string, animation_url: string, background_color:
    string, external_url: string, image: string, image_data: string, youtube_url: string, owner_address: string,
              nft_type: string, token_format: string, chain: string) {
    this.attributes = attributes;
    this.description = description;
    this.name = name;
    this.animation_url = animation_url;
    this.background_color = background_color;
    this.external_url = external_url;
    this.image = image;
    this.image_data = image_data;
    this.youtube_url = youtube_url;
    this.owner_address = owner_address;
    this.nft_type = nft_type;
    this.token_format = token_format;
    this.chain = chain;
  }
}
export async function sanitizeAddMetadataBody(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  // Using this to filter out fields that are not in our table schema
  const metadataKeys = Object.keys(new MetaClass());
  for(const key of Object.keys(req.body)) {
    if(!metadataKeys.includes(key)) {
      delete req.body[key];
    }
  }
  next();
}
