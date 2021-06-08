# Development Challenge for Node.js

Challenge based on [Improve-in
](https://github.com/improvein/dev-challenge/tree/master/backend-nodejs ) directives.

## Requirements

Steps before initialization


- Clone repository
```bash
git clone https://github.com/AgustinTafura/challengeNodeJS.git
```

- Install dependencies
```bash
npm install
```

- Set environment variables (.env file)

- Install Sequelize [CLI](https://www.npmjs.com/package/sequelize-cli)
```bash
npm install --save-dev sequelize-cli
```

- Create DB (MySQL)

```bash
# set DB config (config/config.json )

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Run

```bash
npm start
# or npm run dev 
# see package.json for all scripts 
```

