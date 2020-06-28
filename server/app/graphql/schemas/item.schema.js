const ItemSchema = `
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

    type ItemResponse{
        ok: Boolean!,
        Item: Item,
        errors: [Error!]
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

    extend type Mutation{
        createItem(name: String!, description: String, link: String!, preview: String, rating: Int, favorite: Boolean, tags: [Int!]): ItemResponse
    }

    extend type Query{
        getItem(id: Int!): Item,
        allItems(queryItemsInput: QueryItemsInput): [Item!]
        featuredItems: [Item!]
        favorites: [Item!]
    }
`;

export default ItemSchema;
