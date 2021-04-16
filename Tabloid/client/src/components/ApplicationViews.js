import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./PostList";
import UserPostList from "./UserPostsList";
import { PostProvider } from "../providers/PostProvider";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>

      <PostProvider>
        <Route path="/posts">
          <PostList />
        </Route>

        <Route path="/userPosts">
          <UserPostList />
        </Route>
      </PostProvider>
    </main>
  );
};
