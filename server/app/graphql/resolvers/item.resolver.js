import doesPathExist from '../../utils/object';
import { createUsingContract, getOrderbyClause, getFilterBy } from '../common';

const ItemResolver = {
  Query: {
    getItem: (parent, { id }, { models }) => models.Item.findOne({ where: { id } }),
    allItems: (
      parent,
      {
        queryItemsInput: {
          orderyBy = undefined,
          filterBy = undefined,
          filterByTag = undefined,
          limit,
          offset,
        } = {},
      },
      { models },
      _info
    ) => {
      const expand = doesPathExist(_info.fieldNodes, ['allItems', 'tags']);
      return models.Item.findAll({
        order: getOrderbyClause(orderyBy),
        where: getFilterBy(filterBy, models),
        include:
          expand || filterByTag
            ? [
                {
                  association: 'tags',
                  where: getFilterBy(filterByTag, models),
                },
              ]
            : null,
        offset,
        limit,
      });
    },
    featuredItems: (parent, args, { models }) =>
      models.Item.findAll({
        order: [['rating', 'DESC']],
        limit: 6,
      }),
    favorites: (parent, args, { models }) =>
      models.Item.findAll({
        where: { favorite: true },
        include: 'tags',
      }),
  },
  Mutation: {
    createItem: async (parent, { tags = [], ...args }, { models }) =>
      createUsingContract(async () => {
        const item = await models.Item.create(args);
        await item.addTags(tags);
        return item;
      }),
  },
};

export default ItemResolver;
