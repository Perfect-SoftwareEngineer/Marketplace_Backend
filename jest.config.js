module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
};

process.env = Object.assign(process.env, {
    DB_URL: 'postgresql://localhost',
    NODE_ENV: 'testing'
});
