import { createUsingContract } from '../common';
import { requiresAuth } from '../permissions';

const TagResolver = {
  Query: {
    getTag: requiresAuth.createResolver((_, { id }, { models }) =>
      models.Tag.findOne({
        where: { id },
        include: models.Item,
      })
    ),
    allTags: requiresAuth.createResolver((parent, args, { models }) => models.Tag.findAll()),
  },
  Mutation: {
    createTag: requiresAuth.createResolver(async (_, args, { models, user }) =>
      createUsingContract(() => models.Tag.create({ ...args, ownerId: user.id }))
    ),
    deleteTag: requiresAuth.createResolver(async (_, { id }, { models }) => {
      models.Tag.destroy({ where: { id } });
      return { ok: true };
    }),
  },
};

export default TagResolver;
