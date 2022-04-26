echo "NODE ENV is"
echo $NODE_ENV
npm install
pm2 stop marketplace_app
npm run migrate
NODE_ENV=$NODE_ENV; PORT=$PORT; DB_URL=$DB_URL; MORALIS_SERVER_URL=$MORALIS_SERVER_URL; MORALIS_APP_ID=$MORALIS_APP_ID; pm2 start ./src/bin/www/index.js --name marketplace_app
