import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./Categories/CategoryList";
import CategoryProvider from "../providers/CategoryProvider"
import CategoryForm from "./Categories/CategoryForm"
import EditCategory from "./Categories/EditCategory"
import DeleteCategory from "./Categories/DeleteCategory"
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
      <Route path="/api/category">
        <CategoryProvider >
          <CategoryList />
        </CategoryProvider>
      </Route>
      <Route path="/category/addnew">
        <CategoryProvider >
          <CategoryForm />
        </CategoryProvider>
      </Route>
      <Route path="/category/:categoryId(\d+)">
        <CategoryProvider>
          <EditCategory />
        </CategoryProvider>
      </Route>
      <Route path="/category/delete/:categoryId(\d+)">
        <CategoryProvider>
          <DeleteCategory />
        </CategoryProvider>
      </Route>


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
