# OpenBkB - public version

## Installing project

```
The only thing you need is to have Docker installed.
```

## Start application
Don't forget you need to have Docker running.

```
$ docker-compose up --build
```

## Run application
Application runs automatically after its start. 
Some bots are defined in `server.js`.
To run it successfully you need to define username and password to your ABRA Flexi in `abra` folder in `function.js`.
You also need to rewrite your correct domain name in `accounting.js` and `pairing.js` in `abra` folder.
