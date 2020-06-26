const MutationSchema = `
    type Error{
        path: String!,
        message: String
    }

    type Mutation{
        createTag(name: String!): TagResponse,
        deleteTag(id: Int!):  TagResponse,
        createItem(name: String!, description: String, link: String!, preview: String, rating: Int, favorite: Boolean, tags: [Int!]): ItemResponse
    }
`;

export default MutationSchema;
