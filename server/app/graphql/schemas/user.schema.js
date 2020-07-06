const UserSchema = `
    type User{
        id: Int!,
        name: String,
        email: String!,
    }

    type UserResponse{
        ok: Boolean!,
        user: User,
        errors: [Error!]
    }

    type LoginResponse{
        ok: Boolean!,
        token: String,
        refreshToken: String,
        errors: [Error!]
    }

    extend type Mutation{
        registerUser(email: String!, password: String!, name: String): UserResponse,
        login(email: String!, password: String!): LoginResponse!,
    }

    extend type Query{
        getUser(id: Int!): User,
    }
`;

export default UserSchema;
