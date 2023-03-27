# Starter pack: *RESTful* web API avec node.js et Express

Un starter pack dockerisé d'une application web node.js pour développer une web API RESTful

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

Dupliquer le fichier `.env.dist` et renseigner éventuellement les variables d'environnement qui vous conviennent (des valeurs par défaut sont fournies)

~~~
cp .env.dist .env
~~~

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
mysql -u
~~~

### Client graphique Adminer pour la base de données MySQL


## Arrêter le projet

~~~
docker-compose down
~~~

## Ressources

- [Générateur d’applications Express](https://expressjs.com/fr/starter/generator.html)
- [Image Docker Node](https://hub.docker.com/_/node)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Nodemon](https://www.npmjs.com/package/nodemon), outil de développement d'applications node.js pour redémarrer le process du serveur web automatiquement lorsque les sources changent

