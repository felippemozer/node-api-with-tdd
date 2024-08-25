import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: "postgres"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./knex/migrations",
      extension: "ts"
    }
};

export default config;