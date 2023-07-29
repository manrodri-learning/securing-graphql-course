import React from "react";
import { Home } from "./pages/home/Home";
import { Media } from "./pages/media/Media";
import { OurStory } from "./pages/our-story/OurStory";
import { Robotics } from "./pages/robotics/Robotics";
import { Conference } from "./pages/conference/Conference";
import { Auth } from "./pages/auth/Auth";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ApolloProvider } from "./context/ApolloProvider";
import { AuthProvider } from "./context/AuthProvider";

function AppRouter() {
  return (
    <div id="wrapper">
      <Router>
        <Header />
        <Switch>
          <Route path="/media">
            <Media />
          </Route>
          <Route path="/our-story">
            <OurStory />
          </Route>
          <Route path="/robotics">
            <Robotics />
          </Route>
          <Route path="/conference">
            <Conference />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <AppRouter />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
