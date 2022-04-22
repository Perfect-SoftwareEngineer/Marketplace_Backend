echo "NODE ENV is"
echo $NODE_ENV
npm install
pm2 stop marketplace_app
npm run migrate
pm2 start ./src/bin/www/index.js --name marketplace_app
