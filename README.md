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

## Lancer le projet avec Docker

Construire l'image Docker

~~~
docker build . -t node-rest-api
~~~

Lancer le conteneur

~~~
docker run -p 49160:3000 -v $PWD/api:/usr/src/app -v /usr/src/app/node_modules pschuhmacher/node-rest-api nodemon ./bin/www
~~~

Se rendre à l'URL [localhost:49160](http://localhost:49160)

## Lancer le projet avec Compose



Démarrer le projet

~~~
docker-compose up -d
~~~

Tester (avec curl)

~~~

~~~

## Arrêter le projet

## Ressources

- [Générateur d’applications Express](https://expressjs.com/fr/starter/generator.html)
- [Image Docker Node](https://hub.docker.com/_/node)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Nodemon](https://www.npmjs.com/package/nodemon), outil de développement d'applications node.js pour redémarrer le process du serveur web automatiquement lorsque les sources changent

