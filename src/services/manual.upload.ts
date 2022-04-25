import { FetchAndSaveNftRequest } from '../interfaces/fetch.and.save.nfts';

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
// fetchAndSaveNftByContract(playAndKollectRequest)


export const updateSample = [
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '88e280de44609c5f2b5badb6a6b61088',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/pitchfork.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '00265ba61500ea67944c176c94767002',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/pitchfork.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: 'a119812f348484943bdf1fdc104533a8',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/battle_axe.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '28b4df3bf7b3550458a64ec293d5ef67',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/battle_axe.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: 'bf6df769340749a099cc89457d1e6c27',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/cactus_on_a_stick.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '01f7a9cce890a418d9ee94aa29f0ec6d',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/cactus_on_a_stick.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '8bd38fe8d5b777990a91007186e82bd2',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/kris.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '9fc2c07f37ca7eae4a1e18d477f76236',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/old_sword.gltf',
  },
  {
    contractAddress: '0x0e28a33728b61a8abe11ac9adc0af17c0d3d7603',
    tokenHash: '6ab0921a1cf277243a275ad74886a062',
    meta3dUrl: 'https://luna-marketplace.s3.us-east-2.amazonaws.com/old_sword.gltf',
  },
];


// for testing
// updateTokens3dUrl(updateSample);
