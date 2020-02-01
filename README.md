# Simple REST API

This application is made to help newbie that wants to start developing _Web API_ using `MERN Stack` as their primary technology.

## Installation

Assuming you've cloned this repo. This is the steps how you install it in you local machine.

First, you have to install `node packages` this can be done by executing this code in your terminal.

```sh
$ cd SimpleREST
$ npm install
```

Then, you have to create a `.env` file inside the top level directory. _This is a good best practice to store all your sensitive data inside an environment variable_

```sh
$ touch .env
```

and inside the file enter this following codes.

```bash
PORT=5000
MongoURI=mongodb://localhost/simpleREST
```

If you haven't installed **MongoDB** yet, follow this [instructions](https://docs.mongodb.com/manual/installation/).

Lastly, on the terminal run the server by executing this command.

```sh
$ npm run dev
```
