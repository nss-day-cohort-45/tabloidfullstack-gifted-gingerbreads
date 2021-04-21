import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";

import { UserProfileContext } from "../providers/UserProfileProvider";
import { UserProfileProvider } from "../providers/UserProfileProvider"
import { UserProfileList } from "./userprofiles/UserProfileList"
import { UserProfileDetails } from "./userprofiles/UserProfileDetails"

import { CommentProvider } from "../providers/CommentProvider";
import CommentList from "./Comments.js/CommentList";
import CommentCreateForm from "./Comments.js/CommentCreateForm";
import CommentDeletionConfirmation from "./Comments.js/CommentDeletionConfirmation";

import TagList from "./tags/TagList";
import TagForm from "./tags/TagForm";
import TagDelete from "./tags/TagDelete";
import TagEdit from "./tags/TagEdit";
import ManagePostTags from "./postTag/ManagePostTags";
import { PostTagProvider } from "../providers/PostTagProvider";
import { TagProvider } from "../providers/TagProvider";

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

        {/*Tags*/}
        <Route path="/tags" exact>
          <TagProvider>
            <TagList />
          </TagProvider>
        </Route>

        <Route path="/tag/create" exact>
          <TagProvider>
            <TagForm />
          </TagProvider>
        </Route>

        <Route path="/tag/delete/:tagId(\d+)" exact>
          <TagProvider>
            <TagDelete />
          </TagProvider>
        </Route>

        <Route path="/tag/edit/:tagId(\d+)" exact>
          <TagProvider>
            <TagEdit />
          </TagProvider>
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
          <Route exact path="/userProfiles/detail/getById/:userProfileId(\d+)">
              <UserProfileDetails />
          </Route>
        </UserProfileProvider>
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
        <CommentProvider>
          <Route path="/comments/:postId(\d+)">
            {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
          </Route>

          <Route path="/comment/:postId(\d+)/create" exact>
            {isLoggedIn ? <CommentCreateForm /> : <Redirect to="/login" />}
          </Route>


          <Route path="/comment/:commentId(\d+)" exact>
            {isLoggedIn ? <CommentDeletionConfirmation /> : <Redirect to="/login" />}
          </Route>
        </CommentProvider>


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


      <PostProvider>
        <PostTagProvider>
          <TagProvider>
            <Route exact path="/posttag/manage-tags/:postId(\d+)">
              <ManagePostTags />
            </Route>
          </TagProvider>
        </PostTagProvider>
      </PostProvider>

    </main >

  );
};
