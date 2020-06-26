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
`;

export default ItemSchema;
