import { createUsingContract } from '../common';

const TagResolver = {
  Query: {
    getTag: (parent, { id }, { models }) =>
      models.Tag.findOne({
        where: { id },
        include: models.Item,
      }),
    allTags: (parent, args, { models }) => models.Tag.findAll(),
  },
  Mutation: {
    createTag: async (parent, args, { models }) =>
      createUsingContract(() => models.Tag.create(args)),
    deleteTag: async (parent, { id }, { models }) => {
      models.Tag.destroy({ where: { id } });
      return { ok: true };
    },
  },
};

export default TagResolver;
