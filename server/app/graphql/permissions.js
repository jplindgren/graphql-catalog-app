import { AuthenticationError } from 'apollo-server-express';

const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};
export const requiresAuth = createResolver((parent, args, { user }) => {
  if (!user || !user.id) throw new AuthenticationError('Not Authenticated');
});

export const requiresAdmin = requiresAuth.createResolver((parent, args, { user }) => {
  if (!user || !user.isAdmin) throw new Error('Not Admin');
});
