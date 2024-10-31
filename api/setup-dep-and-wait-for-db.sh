#!/bin/sh

host="db"
# Teste jusqu'à ce que MySQL soit prêt
until mysqladmin ping -h "$host" --silent; do
    echo "Waiting for MySQL..."
    sleep 2
done

npm i
npm run swagger-autogen

# Lancer l'application node une fois que MySQL est prêt à traiter des requêtes
node --watch ./bin/www
