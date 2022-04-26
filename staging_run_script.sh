# env_var_prefix will be used to set env variables
# The goal is to pass the environment variables to pm2 using the sample.env variables and
# doing some string manipulation to make them equals already set environment variables
# THe pm2 start command now becomes like:
# NODE_ENV=$NODE_ENV; PORT=$PORT; DB_URL=$DB_URL; pm2 start ./dist/src/bin/www/index.js --name marketplace_app
env_var_prefix=""
env_var_name=""
function get_env_name () {
  IFS='='
  read -a strarr <<< "$1"
  env_var_name=${strarr[0]}
}

input="sample.env"
while IFS= read -r line
do
  get_env_name "$line"
  env_var_prefix="${env_var_prefix} ${env_var_name}=\$${env_var_name};"
done < "$input"

#echo "NODE ENV is"
#echo $NODE_ENV
#npm install
pm2 stop marketplace_app
#npm run migrate
printf "$env_var_prefix"

 pm2 start ./src/bin/www/index.js --name marketplace_app
