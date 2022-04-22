export const createRequestBody = {
  'description': 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
  'external_url': 'https://openseacreatures.io/3',
  'image': 'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
  'name': 'Dave Starbelly',
  'background_color': 'abc',
  'chain': 'ethereum',
  'contract_address': 'contractAddress0',
  'attributes': [
    {
      'trait_type': 'Base',
      'value': 'Starfish'
    },
    {
      'trait_type': 'Eyes',
      'value': 'Big'
    },
    {
      'trait_type': 'Mouth',
      'value': 'Surprised'
    },
    {
      'trait_type': 'Level',
      'value': 5
    },
    {
      'trait_type': 'Stamina',
      'value': 1.4
    },
    {
      'trait_type': 'Personality',
      'value': 'Sad'
    },
    {
      'display_type': 'boost_number',
      'trait_type': 'Aqua Power',
      'value': 40
    },
    {
      'display_type': 'boost_percentage',
      'trait_type': 'Stamina Increase',
      'value': 10
    },
    {
      'display_type': 'number',
      'trait_type': 'Generation',
      'value': 2
    }
  ]
};

export const badCreateRequestBody = {
  'description': 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
  'external_url': 'https://openseacreatures.io/3',
  'image': 'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
  'name': 'Dave Starbelly',
  'background_color': 'abc',
};

export const updateRequestBody = {
  'description': '1 Friendly OpenSea Creature that enjoys long swims in the ocean.',
  'external_url': 'https://openseacreatures.io/11',
  'image': 'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
  'name': 'Oluwaleke',
  'background_color': '#FFF'
};

export const getAllNftItems = [{
  "collection_id": "luna_game_3d",
  "nft_type": "AVATAR",
  "token_format": "ERC721",
  "chain": "ethereum",
  'contract_address': 'contractAddress0',
  "token_id": "001",
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  "image_data": null,
  "external_url": "https://openseacreatures.io/3",
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
  "owner_address": null,
  "name": "Dave Starbelly",
  "attributes": [
    {
      "value": "Starfish",
      "trait_type": "Base"
    },
    {
      "value": "Big",
      "trait_type": "Eyes"
    },
    {
      "value": "Surprised",
      "trait_type": "Mouth"
    },
    {
      "value": 5,
      "trait_type": "Level"
    },
    {
      "value": 1.4,
      "trait_type": "Stamina"
    },
    {
      "value": "Sad",
      "trait_type": "Personality"
    },
    {
      "value": 40,
      "trait_type": "Aqua Power",
      "display_type": "boost_number"
    },
    {
      "value": 10,
      "trait_type": "Stamina Increase",
      "display_type": "boost_percentage"
    },
    {
      "value": 2,
      "trait_type": "Generation",
      "display_type": "number"
    }
  ],
  "background_color": "abc",
  "animation_url": null,
  "youtube_url": null,
  "status": "UNLISTED"
},
  {
    "collection_id": "luna_game_3d",
    "nft_type": "AVATAR",
    "token_format": "ERC721",
    "chain": "ethereum",
    'contract_address': 'contractAddress0',
    "token_id": "003",
    "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    "image_data": null,
    "external_url": "https://openseacreatures.io/5",
    "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
    "owner_address": null,
    "name": "Cat2 Starbelly",
    "attributes": [
      {
        "value": "Starfish",
        "trait_type": "Base"
      },
      {
        "value": "Big",
        "trait_type": "Eyes"
      },
      {
        "value": "Cool",
        "trait_type": "Mouth"
      },
      {
        "value": 8,
        "trait_type": "Level"
      },
      {
        "value": 1.7,
        "trait_type": "Stamina"
      },
      {
        "value": "HAppy",
        "trait_type": "Personality"
      },
      {
        "value": 45,
        "trait_type": "Aqua Power",
        "display_type": "boost_number"
      },
      {
        "value": 8,
        "trait_type": "Stamina Increase",
        "display_type": "boost_percentage"
      },
      {
        "value": 3,
        "trait_type": "Generation",
        "display_type": "number"
      }
    ],
    "background_color": "abc",
    "animation_url": null,
    "youtube_url": null,
    "status": "UNLISTED"
  }
];

export const itemPagination = {
  "page": 1,
  "size": 2,
  "last_page": 1,
  "total_count": 2
};
