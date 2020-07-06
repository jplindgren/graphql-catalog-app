export const genericErrorHandler = (graphQLErrors, networkError) => {
  return {
    graphQLErrors,
    networkError,
  };
};

// eslint-disable-next-line arrow-body-style
export const hasAuthError = (err) => {
  return err && err.some(({ extensions }) => extensions && extensions.code === 'UNAUTHENTICATED');
};

export const authErrorHandler = (graphQLErrors) => {
  return {
    authError: graphQLErrors.filter(
      ({ extensions }) => extensions && extensions.code === 'UNAUTHENTICATED'
    )[0],
  };
};
