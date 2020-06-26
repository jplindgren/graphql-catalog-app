const QuerySchema = `
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
`;

export default QuerySchema;
