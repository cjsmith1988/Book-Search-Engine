const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                  .select('-__v -password')
                  .populate('savedBooks')
            
                return userData;
            }
            
            throw new AuthenticationError('Not logged in');
        },
        // get all books by username
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
          return Book.find(params);
        },
        // get a book by id
        book: async (parent, { _id }) => {
            return Book.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
              .select('-__v -password')
              .populate('savedBooks');
        },
        // get a user by username
        user: async (parent, { username }) => {
        return User.findOne({ username })
            .select('-__v -password')
            .populate('savedBooks');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        }
        
        
    }
};
  
module.exports = resolvers;