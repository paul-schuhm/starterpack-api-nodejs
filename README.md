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

Démarrer le projet

~~~
docker-compose up -d
~~~

## Tester

### API

Se rendre à l'URL [localhost:5001](http://localhost:5001), ou tester (avec [curl](https://curl.se/))

~~~
curl --include localhost:5001
curl --include localhost:5001/users
~~~

### Base de données

Avec le client mysql

~~~
mysql -uroot -proot -Dmydb -h127.0.0.1 -P5002
~~~

>Penser à modifier la valeur du port si vous l'avez changé dans le `.env`

### Client graphique Adminer pour la base de données MySQL

Se rendre à l'url [http://localhost:5003](http://localhost:5003) et se connecter avec les credentials *root* (login *root* et mot de passe *root* par défaut)

## Arrêter le projet

~~~
docker-compose down
~~~

## Ressources

- [Générateur d’applications Express](https://expressjs.com/fr/starter/generator.html)
- [Image Docker Node](https://hub.docker.com/_/node)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Nodemon](https://www.npmjs.com/package/nodemon), outil de développement d'applications node.js pour redémarrer le process du serveur web automatiquement lorsque les sources changent
- [Swagger Editor](https://swagger.io/docs/open-source-tools/swagger-editor/), un éditeur open source pour designer et documenter une web API RESTful (même si elle devrait être *par définition* auto-documentée et *auto-descriptive*)

