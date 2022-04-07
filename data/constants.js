module.exports.dbTables = {
    nftCollections: 'nft_collections',
    nftItems: 'nft_items',
    nftListings: 'nft_listings',
    users: 'users',
    admins: 'admins'
};

module.exports.testMetadata = {
    'description': 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
    'external_url': 'https://openseacreatures.io/3',
    'image': 'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
    'name': 'Dave Starbelly',
    'background_color': 'abc',
    'nft_type': 'AVATAR',
    'token_format': 'ERC721',
    'chain': 'ethereum',
    'attributes': JSON.stringify([
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
    ])
};
