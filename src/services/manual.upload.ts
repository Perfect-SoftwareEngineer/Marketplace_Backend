import { FetchAndSaveNftRequest } from '../interfaces/fetch.and.save.nfts';
// import { fetchAndSaveNftByContract, updateTokens3dUrl } from './fetch.nft.metadata.service';

export const playAndKollectRequest: FetchAndSaveNftRequest = {
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


// for testing
// fetchAndSaveNftByContract(playAndKollectRequest);


export const updateSample = [
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '3',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/pitchfork.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '1',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/pitchfork.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '14',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/battle_axe.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '8',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/battle_axe.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '5',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/cactus_on_a_stick.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '13',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/cactus_on_a_stick.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '12',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/kris.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '4',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/old_sword.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenId: '2',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/old_sword.gltf',
  },
];


// for testing
// updateTokens3dUrl(updateSample);
