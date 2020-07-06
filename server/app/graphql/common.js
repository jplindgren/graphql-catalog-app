export const formatErrors = (e, models) => {
  //How check if it is a sequelize validation error
  //if (e instanceof models.sequelize.ValidationError) {
  if (e.errors) {
    return e.errors.map((x) => ({
      path: x.path,
      message: x.message,
    }));
  }
  return [{ path: 'unknown', message: 'something went wrong' }];
};

export const createUsingContract = async (createFunc) => {
  try {
    const result = await createFunc();
    return {
      ok: true,
      Item: result,
    };
  } catch (err) {
    return {
      ok: false,
      errors: formatErrors(err),
    };
  }
};

export const getOrderbyClause = (order) => {
  if (!order) return [];
  const orderByClause = order.map((x) => {
    return [x.field, !x.desc ? 'ASC' : 'DESC'];
  });
  return orderByClause;
};

export const getFilterBy = (filter, models) => {
  if (!filter) return null;
  if (!filter.op) return { [filter.field]: filter.value };

  const op = models.Sequelize.Op[filter.op];
  const value = JSON.parse(filter.value);
  return { [filter.field]: { [op]: value } };
};
