const authUtils = require("../utils/auth");

module.exports = {
  createSession: async (parent, args, { dataSources, user }, info) => {
    if (!user) {
      return null;
    }

    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },
  signUp: async (parent, { credentials }, { dataSources }, info) => {
    const { email, password } = credentials;
    const userCredentials = { email: email.toLowerCase(), password };

    const existingUser = dataSources.userDataSource.getUserByEmail(
      userCredentials.email
    );

    if (existingUser) {
      throw new Error("A user account with that email already exists.");
    }

    const hash = authUtils.hashPassword(userCredentials.password);

    const dbUser = dataSources.userDataSource.createUser({
      email: userCredentials.email,
      hash,
    });

    const token = authUtils.createToken(dbUser);

    return {
      token,
      user: {
        id: dbUser.id,
        email: dbUser.email,
      },
    };
  },
  signIn: async (parent, { credentials }, { dataSources }, info) => {
    const { email, password } = credentials;
    const userCredentials = { email: email.toLowerCase(), password };

    const existingUser = dataSources.userDataSource.getUserByEmail(
      userCredentials.email
    );

    if (!existingUser) {
      throw new Error("Incorrect email address or password.");
    }

    const isValidPassword = authUtils.verifyPassword(
      password,
      existingUser.hash
    );

    if (!isValidPassword) {
      throw new Error("Incorrect email address or password.");
    }

    const token = authUtils.createToken(existingUser);

    return {
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    };
  },
  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },
};
