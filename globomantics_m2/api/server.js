require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const SessionDataSource = require("./datasources/sessions");
const SpeakerDataSource = require("./datasources/speakers");
const UserDataSource = require("./datasources/users");

const typeDefs = require("./schema.js");
const resolvers = require("./resolvers/index");
const auth = require("./utils/auth");

const dataSources = () => ({
  sessionDataSource: new SessionDataSource(),
  speakerDataSource: new SpeakerDataSource(),
  userDataSource: new UserDataSource(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    let user = null;

    if (req.headers.authorization) {
      const payload = auth.verifyToken(req.headers.authorization);
      console.log("payload", payload);
      user = payload;
    }
    return { user };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
});
