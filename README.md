# Marketplace-Backend

## Setup

To install dependencies, run:

```npm install```

Create a file named `.env` in the root folder, you can copy the content of file `sample.env` 

```cp sample.env .env```

### Database setup:
You can change the DB_URL environment variable to your choice, set to local PostgreSQL server by deault.

### To run Knex migration up

```npm run migrate```

### To rollback Knex migration

```npm run unmigrate```

### To start dev server that listens to changes
```npm run dev:watch```

### To run test
```npm test```

### To start dev server
```npm run dev```

Refer to `package.json` file for more npm run commands possible.
