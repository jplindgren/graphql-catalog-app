import { createUsingContract } from '../common';

const TagResolver = {
  Query: {
    getTag: (_, { id }, { models }) =>
      models.Tag.findOne({
        where: { id },
        include: models.Item,
      }),
    allTags: (parent, args, { models }) => models.Tag.findAll(),
  },
  Mutation: {
    createTag: async (_, args, { models }) => createUsingContract(() => models.Tag.create(args)),
    deleteTag: async (_, { id }, { models }) => {
      models.Tag.destroy({ where: { id } });
      return { ok: true };
    },
  },
};

export default TagResolver;
