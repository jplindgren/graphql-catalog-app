const asJson = (value) => JSON.stringify(value);

const getField = (field, op, value) => ({ field, op, value: asJson(value) });

const getFilterByTagInput = (tags) => (tags.length > 0 ? getField('id', 'in', tags) : null);

const getFilterByInput = (term) => (!term ? null : getField('name', 'like', `%${term}%`));

export default (searchTerm, tags = []) => ({
  queryItemsInput: {
    filterBy: getFilterByInput(searchTerm),
    filterByTag: getFilterByTagInput(tags),
    limit: 200,
  },
});
