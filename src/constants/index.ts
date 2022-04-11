export const APP_NAME = 'Luna Marketplace Backend';
export const dbTables = {
  nftCollections: 'nft_collections',
  nftItems: 'nft_items',
  nftListings: 'nft_listings',
  users: 'users',
  admins: 'admins'
};
export const ADMIN_ADDRESSES: string[] = []; // Fill up with permitted admin wallet addresses
export const JWT_PUBLIC_KEY = <string> process.env.JWT_PUBLIC_KEY;
export const nftTypes = ['AVATAR', 'ACCESSORY', 'GAME_ITEM'];
export const tokenFormats = ['ERC721', 'ERC1155'];
export const nftStatus = ['LISTED', 'UNLISTED'];
