import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";

import { UserProfileContext } from "../providers/UserProfileProvider";
import { UserProfileProvider } from "../providers/UserProfileProvider"
import { UserProfileList } from "./userprofiles/UserProfileList"
import { UserProfileDetails } from "./userprofiles/UserProfileDetails"

import PostList from "./Posts/PostList";
import UserPostList from "./Posts/UserPostsList";
import PostDetails from "./Posts/PostDetails"
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

        <UserProfileProvider>
          <Route exact path="/userProfiles">
            <UserProfileList />
          </Route>
          <Route exact path="/userProfiles/detail/:userProfileId(\d+)">
                    <UserProfileDetails />
                </Route>
        </UserProfileProvider>
      </Switch>

      <PostProvider>
        <Route path="/posts">
        {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userPosts">
        {isLoggedIn ? <UserPostList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/post/:postId(\d+)">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>
      </PostProvider>
    </main>
  );
};
