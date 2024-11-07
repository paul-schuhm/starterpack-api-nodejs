# Starter pack: *RESTful* web API avec Node.js, Express.js, MySQL et Adminer

Un *starter pack* dockerisé d'une application web node.js pour développer une web API RESTful. L'API vient avec un service de base de données relationnelles (MySQL) et un client graphique (Adminer).

- [Starter pack: *RESTful* web API avec Node.js, Express.js, MySQL et Adminer](#starter-pack-restful-web-api-avec-nodejs-expressjs-mysql-et-adminer)
  - [Prérequis](#prérequis)
  - [Lancer le projet](#lancer-le-projet)
  - [Arrêter le projet](#arrêter-le-projet)
  - [Tester](#tester)
  - [La base de données MySQL](#la-base-de-données-mysql)
  - [Accéder à la base de données](#accéder-à-la-base-de-données)
    - [avec Adminer](#avec-adminer)
    - [avec le client mysql depuis votre machine hôte](#avec-le-client-mysql-depuis-votre-machine-hôte)
    - [depuis un autre conteneur](#depuis-un-autre-conteneur)
  - [Génération de la documentation OpenAPI avec swagger](#génération-de-la-documentation-openapi-avec-swagger)
  - [Installer de nouvelles dépendances, inspecter les dépendances](#installer-de-nouvelles-dépendances-inspecter-les-dépendances)
  - [Conseils pour le développement](#conseils-pour-le-développement)
  - [Modules Node.js installés](#modules-nodejs-installés)
  - [Ressources](#ressources)
    - [Docker](#docker)
    - [Express](#express)
    - [Spécification OpenAPI et suite d'outils Swagger](#spécification-openapi-et-suite-doutils-swagger)
    - [SGBDR et ORM](#sgbdr-et-orm)
    - [Adminer](#adminer)


## Prérequis

- Installer [Docker](https://www.docker.com/get-started/);
- [Cloner le dépôt](https://github.com/paul-schuhm/starterpack-api-nodejs) et se placer à la racine du projet;

>N'oubliez pas de supprimer le dossier `.git` si vous désirez créer votre propre dépôt à partir des sources

~~~bash
rm -R .git
git init
~~~

## Lancer le projet

1. **Dupliquer** le fichier `.env.dist` :

~~~bash
cp .env.dist .env
~~~

> Vous pouvez modifier les variables d'environnement si vous le souhaitez (des valeurs par défaut sont fournies)

2. **Démarrer le projet** :

~~~bash
docker compose watch
~~~

> Les sources JavaScript sont *watchées*, l'application Node redémarre à chaque édition des sources.

## Arrêter le projet

~~~bash
docker compose down
~~~

## Tester

Se rendre à l'URL [localhost:5001](http://localhost:5001), ou avec [curl](https://curl.se/) :

~~~bash
curl -i localhost:5001
~~~

Vous devriez voir une page HTML qui affiche des données issues de la base de données MySQL.

> Attendez quelques secondes que le serveur MySQL soit prêt à accepter des requêtes.

## La base de données MySQL

>Penser à modifier la valeur du port si vous l'avez changé dans le `.env`

La base de données vient avec deux utilisateurs :

- `root` (administrateur), mot de passe : `root`
- `user` (utilisateur lambda), mot de passe : `password`


## Accéder à la base de données

### avec Adminer

Le projet vient avec [Adminer](https://www.adminer.org/), un gestionnaire de base de données avec interface graphique, simple et puissant.

Se rendre sur l'URL [http://localhost:5003](http://localhost:5003) (par défaut) et se connecter avec les credentials root ou user.

### avec le client mysql depuis votre machine hôte

~~~bash
mysql -uroot -proot -Dmydb -h127.0.0.1 -P5002
~~~

>*Machine hôte* : la machine sur laquelle s’exécute les conteneurs Docker, *votre* machine

Puis, dans le repl MySQL (session ouverte avec la commande précédente)

~~~SQL
-- Lister les utilisateurs MySQL
SELECT user FROM mysql.user;
-- Lister les users dans la base de départ
SELECT * FROM User;
~~~

> **Préférer utiliser l'adresse IP `127.0.0.1` plutôt que son alias `localhost`** afin éviter des potentiels conflits de configuration avec le fichier [socket](https://www.jetbrains.com/help/datagrip/how-to-connect-to-mysql-with-unix-sockets.html) du serveur MySQL potentiellement installé sur votre machine hôte.

### depuis un autre conteneur

Le nom de l'hôte est `db`, le nom du service sur le réseau Docker.


<!-- 
Depuis un script PHP sur la machine hote : 

- new PDO('mysql:host=localhost:5002;dbname=mydb', $user, $pass); OK
- new PDO('mysql:host=127.0.0.1:5002;dbname=mydb', $user, $pass); OK
- new PDO('mysql:host=127.0.0.1;dbname=mydb;port=5002', $user, $pass); OK
- new PDO('mysql:host=localhost;dbname=mydb;port=5002', $user, $pass); ERREUR ! Ici le port est ignoré et la connexion se fait par le socket de l'installation de mysql sur ma machine hote. Donc, le script PHP ne requête pas le serveur MySQL sur le conteneur mais celui sur ma machine hote. Cela se voit si on arrete le service MySQL sur la machine hote (systemctl stop/restart mysql)
~~~php
//Exemple en PHP
<?php
$user='root';
$pass='root';
$dbh = new PDO('mysql:host=127.0.0.1;port=5002;dbname=mydb', $user, $pass);
$ps = $dbh->query('SELECT * FROM User;');
$users = $ps->fetchAll();
var_dump($users);
~~~

Différence entre utiliser 127.0.0.1 et localhost :

Lorsque vous utilisez l'hôte "localhost", PDO essaie de se connecter à MySQL en utilisant un socket local plutôt que par TCP/IP. Le chemin du socket varie en fonction de la configuration de MySQL et de votre système.

Lorsque vous utilisez "127.0.0.1" comme hôte, PDO se connecte à MySQL en utilisant TCP/IP sur le port par défaut (généralement 3306) au lieu d'utiliser un socket local, sauf si le port est spécifié dans le DSN. Cela peut contourner les problèmes liés à la résolution du nom de socket local.

En conclusion : préférer utiliser 127.0.0.1 plutot que localhost pout s'épargner des conflits de configuration et être sûr de requêter le serveur MySQL conteneurisé.
 -->

## Génération de la documentation OpenAPI avec swagger

(Re)générer la documentation interactive de votre API avec le module [swagger-autogen](https://www.npmjs.com/package/swagger-autogen) (déjà installé):

~~~bash
docker exec -it demo-rest-api-api npm run swagger-autogen
~~~

Se rendre à l'URL `/doc` pour accéder à Swagger UI et à la documentation interactive de votre API.

## Installer de nouvelles dépendances, inspecter les dépendances

Vous pouvez installer de nouvelles dépendances au besoin. À la racine de l'application, installer les dépendances désirées *via* `npm`:

~~~bash
docker exec -it demo-rest-api-api npm install <le nom du paquet>
~~~

ou directement sur la machine hôte (changements seront repercutés par le watch des sources):

~~~bash
npm install <le nom du paquet>
~~~

Lister les dépendances du projet Node:

~~~bash
docker exec -it demo-rest-api-api npm list
~~~

## Conseils pour le développement

- **Débuger** : Inspecter les *logs* du conteneur Docker (`docker logs -f demo-rest-api-api`, ou via Docker Desktop ou via l'[extension officielle Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)) qui contiennent tout ce qui est écrit sur la sortie standard (avec `console.log()`). Les sources de l'application Node.js sont *watchées*, donc à chaque modification d'un fichier source l'application redémarre pour les prendre en compte automatiquement ;
- Ouvrez une connexion MySQL pendant votre développement pour tester vos requêtes *avant* de les intégrer dans votre code;
- Utiliser cURL pour tester rapidement vos requêtes HTTP. 
- Ouvrez deux terminaux: l'un avec cURL et l'autre avec les logs de l'API pour débuger facilement votre système;
- Installer le module `dotenv` pour placer le DSN (informations de connexion à la base) en dehors du code;
- Pour tester des enchaînements de requêtes, écrivez un script SQL pour remettre la base dans un état initial et contenant les requêtes à tester, un script pour effectuer les requêtes HTTP avec cURL, et exécuter le tout en **une commande** (en vous servant de l'opérateur du shell `&&`).

## Modules Node.js installés

- [express](https://expressjs.com/) ;
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), une implémentation javascript du standard JSON Web Token, voir [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519) ;
- [cors](https://www.npmjs.com/package/cors), un module middleware pour gérer la politique CORS (*Cross Origin Resource Sharing*);
- [mysql2](https://www.npmjs.com/package/mysql2), un client MySQL pour Node.js qui [utilise l'API des promesses](https://www.npmjs.com/package/mysql2#using-promise-wrapper) (contrairement à son prédécesseur [mysql](https://www.npmjs.com/package/mysql));


## Ressources

### Docker

- [Image Docker Node](https://hub.docker.com/_/node)
- [Image Docker MySQL](https://hub.docker.com/_/mysql)
- [Image Docker Adminer](https://hub.docker.com/_/adminer/)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)

### Express

- [Générateur d’applications Express](https://expressjs.com/fr/starter/generator.html), générer un projet pour démarrer
- [Routage](https://expressjs.com/fr/guide/routing.html), la documentation sur le routage d'Express
- [Pug](https://pugjs.org/api/getting-started.html), moteur de templates javascript installé par défaut avec Express
- [API JSON Web Token Authentication (JWT) sur Express.js](https://etienner.github.io/api-json-web-token-authentication-jwt-sur-express-js/), un bon tutoriel pour mettre en place des routes protégées par Json Web Token

### Spécification OpenAPI et suite d'outils Swagger

- [Swagger UI](https://swagger.io/tools/swagger-ui/), servir une documentation web interactive de l'API à partir de [sa description OpenAPi](https://spec.openapis.org/oas/v3.1.0#openapi-specification) (même si elle devrait être *par définition* auto-documentée et *auto-descriptive*, c'est toujours appréciable)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express), module Node.js pour intégrer Swagger UI à un projet Node.js;
- [Swagger auto-gen](https://www.npmjs.com/package/swagger-autogen), module de génération *automatique* de la description OpenAPI de l'API à partir des métadonnées placées dans les sources d'une application Node.js/Express;
- [Swagger auto-gen: décrire des paramètres de formulaire POST](https://www.npmjs.com/package/swagger-autogen#parameters)
- [The OpenAPI Specification Explained](https://learn.openapis.org/specification/), **le guide**
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0#openapi-specification), **la référence complète**, pour décrire votre API au format YAML ou JSON; 
- [Documentation de swagger auto-gen](https://swagger-autogen.github.io/docs/getting-started/), documentation sur les tags à inclure dans les sources pour générer l'OpenAPI Description fil. Attention à [bien utiliser la version OpenAPI 3.x](https://swagger-autogen.github.io/docs/openapi-3/)


### SGBDR et ORM

- [MySQL Docker Image, quick reference](https://hub.docker.com/_/mysql/)
- [mysql2](https://www.npmjs.com/package/mysql2), le driver node.js pour le SGBDR MySQL qui implémente l'API des promesses (contrairement à [mysql](https://www.npmjs.com/package/mysql))
- [Sequelize, Getting Started](https://sequelize.org/docs/v6/getting-started/), Sequelize, un ORM pour Node.js

### Adminer

- [Adminer](https://www.adminer.org/)


<!-- 
Healhtcheck: ne redémarre pas le conteneur si unhealthy (valeur différente de 0). Sert juste à mettre la valeur d'un label. Ce label est utilisé par Swarm par exemple. Mais avec depends_on on peut ajouter un test de santé du conteneur dont ont dépend. https://docs.docker.com/reference/compose-file/services/#depends_on, https://docs.docker.com/reference/compose-file/services/#long-syntax-1
 -->
