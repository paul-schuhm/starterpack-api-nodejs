# wait-for-db.sh
#!/bin/sh
set -e

host="$1"
shift
# Teste jusqu'à ce que MySQL soit prêt
until mysqladmin ping -h "$host" --silent; do
    echo "Waiting for MySQL..."
    sleep 2
done

# Lancer l'application node une fois que MySQL est prêt à traiter des requêtes
exec "$@"
