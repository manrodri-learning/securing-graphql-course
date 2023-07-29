import React from "react";
import {
  ApolloProvider as Provider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export function ApolloProvider({ children }) {
  const authContext = useContext(AuthContext);
  const token = authContext.authInfo.token;

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "/graphql",
      headers: token ? { authorization: token } : undefined,
    }),
  });

  return <Provider client={client}>{children}</Provider>;
}
