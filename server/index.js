import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import models from './app/models';
import ItemResolver from './app/graphql/resolvers/item.resolver';
import TagResolver from './app/graphql/resolvers/tag.resolver';
import typeDefs from './app/graphql/schemas';
import config from './config/config';

const { sequelize } = models;
const app = express();
//app.use(cors('*'));
app.use(cors({ origin: config.app.corsOrigin }));

const server = new ApolloServer({
  typeDefs,
  resolvers: [ItemResolver, TagResolver],
  context: { models },
});
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));

sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  console.log(`Database & tables created!`);
  // eslint-disable-next-line no-console
  app.listen(config.app.port, () => console.log('server listening to port %d', config.app.port));
});
