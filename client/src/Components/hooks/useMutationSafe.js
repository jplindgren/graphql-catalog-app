import { useMutation } from '@apollo/react-hooks';
import { genericErrorHandler, hasAuthError, authErrorHandler } from '../../utils/errorHandler';
import { clearToken } from '../../utils/tokens';
import refreshAccessToken from '../../utils/refreshToken';

const retryOnce = async (func, customErrorHandler) => {
  try {
    return await func();
  } catch (err) {
    clearToken();
    const { networkError, graphQLErrors } = err;
    const errorHandler = customErrorHandler || genericErrorHandler;
    return hasAuthError(graphQLErrors)
      ? authErrorHandler(graphQLErrors)
      : errorHandler(networkError);
  }
};

export const mutateSafe = async (mutation, customErrorHandler) => {
  let response = null;
  try {
    response = await mutation();
  } catch (err) {
    const { networkError, graphQLErrors } = err;

    if (hasAuthError(graphQLErrors)) {
      const refreshed = await refreshAccessToken();
      if (refreshed) return retryOnce(() => mutation());
    }

    return customErrorHandler
      ? customErrorHandler(graphQLErrors, networkError)
      : genericErrorHandler(graphQLErrors, networkError);
  }
  return response;
};

const useMutationSafe = (query, customErrorHandler) => {
  const [mutation] = useMutation(query);
  return [
    async (options) => {
      let response = null;
      try {
        response = await mutation(options);
      } catch (err) {
        const { networkError, graphQLErrors } = err;

        if (hasAuthError(graphQLErrors)) {
          const refreshed = await refreshAccessToken();
          if (refreshed) return retryOnce(() => mutation(options));
        }
        // return customErrorHandler
        //   ? customErrorHandler(graphQLErrors)
        //   : genericErrorHandler(graphQLErrors);

        // if (networkError) {
        //   history.push('/error');
        //   return { redirectOnError: true };
        // }
        //return customErrorHandler ? customErrorHandler(err) : genericErrorHandler(err);
        return customErrorHandler
          ? customErrorHandler(graphQLErrors, networkError)
          : genericErrorHandler(graphQLErrors, networkError);
      }
      return response;
    },
  ];
};

export default useMutationSafe;
