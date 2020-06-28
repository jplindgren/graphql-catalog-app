const RootSchema = `
    type Mutation{
        dummy: String
    }

    type Query{
        dummy: String
    }

    type Error{
        path: String!,
        message: String
    }
`;

export default RootSchema;
