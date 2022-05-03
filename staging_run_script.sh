# env_var_prefix will be used to set env variables
env_var_prefix=""
env_var_name=""
function get_env_name () {
  IFS='='
  read -a strarr <<< "$1"
  env_var_name=${strarr[0]}
}
# Read environment variables from the sample.env file
input="sample.env"
while IFS= read -r line
do
  get_env_name "$line"
  env_var_prefix="${env_var_prefix} -${env_var_name}=\$${env_var_name}"
done < "$input"
echo "$env_var_prefix"

#echo "NODE ENV is"
#echo $NODE_ENV
#npm install
#pm2 stop marketplace_app
#npm run migrate
pm2 start ./src/bin/www/index.js --name marketplace_app -- "$env_var_prefix" --update-env
# The above will produce a command like:
# pm2 start ./src/bin/www/index.js --name marketplace_app --update-env -- -NODE_ENV=$NODE_ENV -PORT=$PORT -DB_URL=$DB_URL -MORALIS_SERVER_URL=$MORALIS_SERVER_URL -MORALIS_APP_ID=$MORALIS_APP_ID
# Basically adding the environment variable from the system to the pm2 instance.
