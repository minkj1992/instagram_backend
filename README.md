# instagram_backend

> instagram_backend ver 2

## Features for `User`

- [x] register
- [x] login
- [x] see profile
- [ ] edit profile
  - [ ] change Avatar (Image Upload)
- [ ] follow/unfollow user

## Project Set up

```
npm i apollo-server graphql
npm i nodemon --save-dev

# https://babeljs.io/setup#installation
npm install --save-dev @babel/core
npm install @babel/preset-env --save-dev
npm i @babel/node --save-dev

npm i @prisma/cli -D
npx prisma init
npx prisma migrate dev --preview-feature
npx prisma generate
npx prisma studio # check model with prisma studio web

npm i graphql-tools
npm i dotenv
npm i bcryptjs
npm i jsonwebtoken

npx gts init
```

## Db(postgress) Set up

1. [postgress SQL v.13](https://postgresapp.com/downloads.html)

```
$ psql

# CREATE DATABASE instagram;
```

## reference

- [random password generator](https://randomkeygen.com/)
