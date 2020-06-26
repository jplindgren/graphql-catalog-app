import dotenv from 'dotenv';

dotenv.config();
const config = {
  db: {
    database: process.env.DB_DATABASE || 'catalog',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  app: {
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
};

export default config;
