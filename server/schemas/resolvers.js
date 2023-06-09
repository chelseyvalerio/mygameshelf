const { AuthenticationError } = require('apollo-server-express');
// const { getMaxListeners } = require('process');
const { User, Games } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    /* categories: async () => {
      return await Category.find();
    }, */
    games: async () => {
      return await Games.find(params).populate('games');
    },
    /* product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    }, */
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)

        // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addGame: async (parent, { gameData }, context) => {
      console.log(context);
      if (context.user) {
        console.log(gameData)

        // const gameData = await Games.create(games);

        return await User.findByIdAndUpdate(context.user._id, { $push: { savedGames: gameData } },{new: true});
      }

      throw new AuthenticationError('Not logged in');
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    // check is removeGame is correct?
    removeGame: async (parent, { games }, context) => {
      console.log(context);
      if (context.user) {

        const gameData = await Games.deleteOne(games);

        await Game.findById(context.user._id, { $pop: { games: gamesData._id } });

        return gameData;
      }
      throw new AuthenticationError('Not logged in');
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
