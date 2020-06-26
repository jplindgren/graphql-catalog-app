export default `
    type Item{
        id: Int!,
        name: String!,
        description: String,
        link: String!,
        preview: String,
        rating: Int,
        favorite: Boolean,
        tags: [Tag!]
    }

    type Tag{
        id: Int!,
        name: String!,
        items: [Item!]
    }

    type Error{
        path: String!,
        message: String
    }

    type Query{
        getTag(id: Int!): Tag,
        allTags: [Tag!],
        getItem(id: Int!): Item,
        allItems(queryItemsInput: QueryItemsInput): [Item!]
        featuredItems: [Item!]
        favorites: [Item!]
    }


    input QueryItemsInput {
        filterBy: FilterBy,
        filterByTag: FilterBy,
        orderBy: [OrderBy!],
        offset: Int = 0,
        limit: Int = 200
    }

    input FilterBy{
        field: String!,
        op: String,
        value: String!
    }

    input OrderBy {
        field: String!,
        desc: Boolean
    }

    type TagResponse{
        ok: Boolean!,
        tag: Tag,
        errors: [Error!]
    }

    type ItemResponse{
        ok: Boolean!,
        Item: Item,
        errors: [Error!]
    }

    type Mutation{
        createTag(name: String!): TagResponse,
        deleteTag(id: Int!):  TagResponse,
        createItem(name: String!, description: String, link: String!, preview: String, rating: Int, favorite: Boolean, tags: [Int!]): ItemResponse
    }
`;
