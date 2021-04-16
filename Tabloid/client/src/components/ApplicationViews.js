import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { CommentProvider } from "../providers/CommentProvider";
import CommentList from "./Comments.js/CommentList";
import CommentForm from "./Comments.js/CommentForm";


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

        <CommentProvider>
          <Route path="/comments" exact>
            <CommentList />
          </Route>

          <Route path="/comment/create" exact>
            <CommentForm />
          </Route>

          <Route path="/comment/edit/:commentId(\d+)" exact>
            <CommentForm />
          </Route>
        </CommentProvider>

      </Switch>
    </main>
  );
};
