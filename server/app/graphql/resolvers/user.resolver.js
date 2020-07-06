import { createUsingContract } from '../common';
import { tryLogin } from '../../auth/auth';

const UserResolver = {
  Query: {
    getUser: (_, { id }, { models }) =>
      models.User.findOne({
        where: { id },
      }),
  },
  Mutation: {
    registerUser: async (_, args, { models }) =>
      createUsingContract(() => models.User.create(args)),
    login: async (_, { email, password }, { models, SECRET, REFRESH_SECRET }) =>
      tryLogin(email, password, models, SECRET, REFRESH_SECRET),
  },
};

export default UserResolver;
