const User = require("../models/User");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id);
        return userData;
      }
      throw new Error("Not Logged In");
    },
  },
  Mutation: {
    login: async (parent, args, context) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw new Error("Could Not Find User");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new Error("Could Not Find User");
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args, context) => {
      const user = await User.create(args);

      if (!user) {
        throw new Error("Could Not Find User");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new Error("you are not logged in");
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new Error("you are not logged in");
    },
  },
};


module.exports = resolvers