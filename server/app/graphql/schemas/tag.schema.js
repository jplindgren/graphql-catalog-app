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

    extend type Mutation{
        createTag(name: String!): TagResponse,
        deleteTag(id: Int!):  TagResponse,
    }

    extend type Query{
        getTag(id: Int!): Tag,
        allTags: [Tag!],
    }
`;

export default TagSchema;
