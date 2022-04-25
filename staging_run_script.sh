# env_var_prefix will be used to set env variables
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
  env_var_prefix="${env_var_prefix} ${env_var_name}=\$${env_var_name}"
done < "$input"
echo "$env_var_prefix"

#echo "NODE ENV is"
#echo $NODE_ENV
#npm install
#pm2 stop marketplace_app
#npm run migrate
"$env_var_prefix" pm2 start ./dist/src/bin/www/index.js --name marketplace_app
