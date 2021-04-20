import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { CommentProvider } from "../providers/CommentProvider";
import CommentList from "./Comments.js/CommentList";
import CommentForm from "./Comments.js/CommentForm";
import CommentDeletionConfirmation from "./Comments.js/CommentDeletionConfirmation";

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
      </Switch>

      <CommentProvider>
        <Route path="/comments/:postId(\d+)" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:postId(\d+)/create" exact>
          {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/edit/:commentId(\d+)" exact>
          {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:commentId(\d+)" exact>
          {isLoggedIn ? <CommentDeletionConfirmation /> : <Redirect to="/login" />}
        </Route>
      </CommentProvider>

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
