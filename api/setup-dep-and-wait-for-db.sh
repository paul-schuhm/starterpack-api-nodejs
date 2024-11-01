#!/bin/sh

host="db"
# Teste jusqu'à ce que MySQL soit prêt
until mysqladmin ping -h "$host" --silent; do
    echo "Please wait for MySQL to be ready to accept queries..."
    sleep 2
done

npm run swagger-autogen

# # Lancer l'application node une fois que MySQL est prêt à traiter des requêtes
./node_modules/nodemon/bin/nodemon.js ./bin/www
