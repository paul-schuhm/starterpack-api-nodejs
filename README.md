# Starter pack: *RESTful* web API avec node.js et Express

Un *starter pack* dockerisé d'une application web node.js pour développer une web API RESTful. L'API vient avec un service de base de données relationnelles (MySQL) et un client graphique (Adminer).

## Prérequis

- installer [node.js](https://nodejs.org/en)
- installer [Docker](https://www.docker.com/get-started/) et [Compose](https://docs.docker.com/compose/)
- clôner le dépôt et se placer à la racine du projet

>N'oubliez pas de supprimer le dossier `.git` si vous désirez créer votre propre dépôt à partir des sources

~~~
rm -R .git
git init
~~~

## Lancer le projet avec Compose

Dupliquer le fichier `.env.dist`

~~~
cp .env.dist .env
~~~

> Vous pouvez modifier les variables d'environnement si vous le souhaitez (des valeurs par défaut sont fournies)

Générer le fichier `swagger_output.json` (voir [la section dédiée à Swagger](#swagger))

~~~
pushd api
npm run swagger-autogen
popd api
~~~

Démarrer le projet

~~~
docker-compose up -d
~~~

Créer le schéma de la base de données test ainsi qu'un jeu de données test

~~~
mysql -uroot -proot -Dmydb -h127.0.0.1 -P5002 < script.sql
~~~

> Pour plus de détails voir [la section dédiée](#base-de-données).

## Tester

### API

Se rendre à l'URL [localhost:5001](http://localhost:5001), ou tester (avec [curl](https://curl.se/))

~~~
# Web humain (HTML)
curl --include localhost:5001
# API (JSON)
curl --include localhost:5001/users
~~~

### Base de données

Avec le client mysql

~~~
mysql -uroot -proot -Dmydb -h127.0.0.1 -P5002
~~~

Pour éxecuter un script SQL en *Batch mode*

~~~
mysql -uroot -proot -Dmydb -h127.0.0.1 -P5002 < script.sql
~~~

>Penser à modifier la valeur du port si vous l'avez changé dans le `.env`

### Client graphique Adminer pour la base de données MySQL

Se rendre à l'url [http://localhost:5003](http://localhost:5003) et se connecter avec les credentials *root* (login *root* et mot de passe *root* par défaut)

## Base de données

L'`host` de la base de données est le nom du service sur le réseau du projet crée par Docker, soit `db`.

### ORM

Pour interagir avec la base de données SQL, nous pouvons utiliser l'ORM [Sequelize](https://sequelize.org)

## Documentation de l'API avec Swagger

Générer automatiquement la documentation de vos routes avec le module Swagger

~~~
cd api
node swagger.js
~~~

ou

~~~
cd api
npm run swagger-autogen
~~~

Se rendre à l'URL `/doc` pour accéder à l'UI de Swagger

## Installer et servir de nouvelles dépendances

- Stoper les containers avec Compose
- A la racine de l'application, *installer* les dépendances désirées via `npm`
- Reconstruire le conteneur `api`
- Relancer les containers avec Compose

~~~
docker-compose down
pushd api
#Installer les dépendances
npm install --save votre-dependance
popd
#Reconstruire le conteneur
docker-compose build api
docker-compose up -d
~~~

## Arrêter le projet

~~~
docker-compose down
~~~

## Ressources

### Docker

- [Image Docker Node](https://hub.docker.com/_/node)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Nodemon](https://www.npmjs.com/package/nodemon), outil de développement d'applications node.js pour redémarrer le process du serveur web automatiquement lorsque les sources changent

### Express

- [Générateur d’applications Express](https://expressjs.com/fr/starter/generator.html), générer un projet pour démarrer
- [Routage](https://expressjs.com/fr/guide/routing.html), la documentation sur le routage d'Express
- [Pug](https://pugjs.org/api/getting-started.html), moteur de templates javascript installé par défaut avec Express

### Swagger

- [Swagger UI](https://github.com/swagger-api/swagger-ui), documenter une web API RESTful (même si elle devrait être *par définition* auto-documentée et *auto-descriptive*)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express), module node.js pour générer la documentation de l'API avec Express
- [Swagger auto-gen](https://www.npmjs.com/package/swagger-autogen), module de génération *automatique* de la documentation de l'API dans une application node.js/Express. Voir notamment la documentation pour documenter automatiquement les endpoints (résumé, description, paramètres)
- [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification), un standard de description d'une web API comptabile avec REST

### SGBDR

- [MySQL Docker Image, quick reference](https://hub.docker.com/_/mysql/)
- [mysql js](https://www.npmjs.com/package/mysql), le driver node.js pour les SGBDR MySQL
- [mysql js, escaping output !](https://www.npmjs.com/package/mysql#escaping-query-values)
- [Sequelize, Getting Started](https://sequelize.org/docs/v6/getting-started/), Sequelize, un ORM pour node.js