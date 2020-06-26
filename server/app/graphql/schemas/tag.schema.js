const TagSchema = `
    type Tag{
        id: Int!,
        name: String!,
        items: [Item!]
    }

    type TagResponse{
        ok: Boolean!,
        tag: Tag,
        errors: [Error!]
    }
`;

export default TagSchema;
