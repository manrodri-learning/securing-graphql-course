const { gql } = require("apollo-server");

module.exports = gql`
  input SessionInput {
    title: String!
    description: String
    format: String
    level: String
  }

  type Speaker {
    id: ID!
    bio: String
    name: String
    featured: Boolean
    sessions: [Session]
  }

  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String
      @deprecated(
        reason: "Too many sessions do not fit into a single track, we will be migrating to a tags based system in the future..."
      )
    level: String
    speakers: [Speaker]
    favorite: Boolean
  }

  type Query {
    sessions(
      id: ID
      title: String
      description: String
      startsAt: String
      endsAt: String
      room: String
      day: String
      format: String
      track: String
      level: String
      favorite: Boolean
    ): [Session]
    sessionById(id: ID): Session
    speakers: [Speaker]
    speakerById(id: ID): Speaker
    users: [User]
    userById(id: ID): User
  }

  type User {
    id: String!
    email: String!
  }

  input Credentials {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    createSession(session: SessionInput): Session
    toggleFavoriteSession(id: ID): Session
    signUp(credentials: Credentials!): AuthPayload
    signIn(credentials: Credentials!): AuthPayload
  }
`;
