// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Book {
        _id: ID
        username: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
        authors: [String]
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
        
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(_id: ID!): Book
      }

    type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): Book
    removeBook(bookId: String): User 
    }
`;

// export the typeDefs
module.exports = typeDefs;