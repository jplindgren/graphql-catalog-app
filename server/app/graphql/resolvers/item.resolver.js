import doesPathExist from '../../utils/object';
import { createUsingContract, getOrderbyClause, getFilterBy } from '../common';
import { requiresAuth } from '../permissions';

const ItemResolver = {
  Query: {
    getItem: requiresAuth.createResolver((_, { id }, { models }) =>
      models.Item.findOne({ where: { id } })
    ),
    allItems: requiresAuth.createResolver(
      (
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
        const options = {
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
        };
        console.log(options);
        return models.Item.findAll(options);
      }
    ),
    featuredItems: requiresAuth.createResolver((parent, args, { models }) =>
      models.Item.findAll({
        order: [['rating', 'DESC']],
        limit: 6,
      })
    ),
    favorites: requiresAuth.createResolver((parent, args, { models }) =>
      models.Item.findAll({
        where: { favorite: true },
        include: 'tags',
      })
    ),
  },
  Mutation: {
    createItem: requiresAuth.createResolver(
      async (parent, { tags = [], ...args }, { models, user }) => {
        return createUsingContract(async () => {
          const item = await models.Item.create({ ...args, ownerId: user.id });
          await item.addTags(tags);
          return item;
        });
      }
    ),
  },
};

export default ItemResolver;
