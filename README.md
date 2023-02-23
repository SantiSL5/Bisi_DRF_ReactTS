
# DjangoRestFramework_ReactTS

# Bisi

Made by [`Santiago Soler Llin`](https://github.com/SantiSL5)  and  [`Salva Roig Bataller`](https://github.com/SalRB)

## Prerequisites

* [npm](https://www.npmjs.com/)
* [docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/)

## Starting up the app

1. Clone the repo.

2. Create the following .env file on the corresponding folders of the repo with this variables:

    1  /.env
      * UID=1000
      * GID=1000
      * MYSQL_DATABASE
      * MYSQL_USER
      * MYSQL_PASSWORD
      * MYSQL_ROOT_PASSWORD

    2  /backend/bisi/.env
      * DJANGO_SECRET
      * MYSQL_DATABASE
      * MYSQL_USER
      * MYSQL_PASSWORD
      * MYSQL_HOST
      * MYSQL_PORT

3. Create secret.ts file on /frontend/src folder with this content:

    const secrets = {
        DJANGO_APP_URL : "http://localhost:8000/api",
    }

    export default secrets;
  
4. Go to repo main folder and do 'docker-compose up'

      Following this steps, app is running on [localhost:3000](http://localhost:3000).

## Features

This application have the following modules.

Module | Description
:--- | :---
Home | Main page of the application where you can see a list of the stations with its slots. In this page you can rent bikes and provide slot incidences.
Admin | A dashboard page where there are the CRUDs of the application only accesible by an admin user.
Profile | A profile page where you can add funds and view your user information.
Login | It allows you to register and login in the application.

## Technologies

### Deploy

The technology used for deploy is [docker](https://www.docker.com/)

  * Docker
  * docker-compose
  * Env files configuration

### Frontend

The technology used for the client is [React](https://es.reactjs.org/) in its 18.2.0 version. 
    
  * Provider-Core structure
  * Consumers-Queries-Api structure
  * Routes
  * Components
      * Reusable Components
  * Authentication
      * Guards
      * JWT Token
  * Hooks
  * Pages
  * Toastr
  * State
  * React Hook Forms
  * React Data Table
  * Validation

### Backend

The technology used for the server is [Django Rest Framework](https://www.django-rest-framework.org/) in its 3.14.0 version.

  * Admin panel
  * Models
  * Serializers
  * Views
  * Routing
  * Signals
  * Slug
  * UUID
  * Is Admin Permission
  * TimestampedModel
  * Relationships

### Database

Server uses a [MySQL](https://www.mysql.com/) database in its 8.0 version.
