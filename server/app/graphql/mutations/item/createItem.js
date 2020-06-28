import { createUsingContract } from '../../common';

export default (_, { tags = [], ...args }, { models }) =>
  createUsingContract(async () => {
    const item = await models.Item.create(args);
    await item.addTags(tags);
    return item;
  });
