import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import models from './app/models';
import resolvers from './app/graphql/resolvers/index';
import typeDefs from './app/graphql/schemas';
import config from './config/config';
import extractUser from './app/middleware/extractUser';
import authRouter from './app/auth/auth.controller';

const { sequelize } = models;
const app = express();

app.use(cors({ origin: config.app.corsOrigin }));
app.use(extractUser);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ({
    models,
    user: ctx.req.user,
    SECRET: config.app.jwtSecret,
    REFRESH_SECRET: config.app.jwtRefreshSecret,
  }),
});
server.applyMiddleware({ app });

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', bodyParser.json(), authRouter);

sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  console.log(`Database & tables created!`);
  // eslint-disable-next-line no-console
  app.listen(config.app.port, () => console.log('server listening to port %d', config.app.port));
});
