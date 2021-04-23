import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { CommentProvider } from "../providers/CommentProvider";
import CommentList from "./Comments.js/CommentList";
import CommentCreateForm from "./Comments.js/CommentCreateForm";
import CommentDeletionConfirmation from "./Comments.js/CommentDeletionConfirmation";

import TagList from "./tags/TagList";
import TagForm from "./tags/TagForm";
import TagDelete from "./tags/TagDelete";
import TagEdit from "./tags/TagEdit";
import CategoryList from "./Categories/CategoryList";
import CategoryProvider, { CategoryContext } from "../providers/CategoryProvider"
import CategoryForm from "./Categories/CategoryForm"
import EditCategory from "./Categories/EditCategory"
import DeleteCategory from "./Categories/DeleteCategory"
import ManagePostTags from "./postTag/ManagePostTags";
import PostList from "./Posts/PostList";
import UserPostList from "./Posts/UserPostsList";
import PostDetails from "./Posts/PostDetails"
import AddPostForm from "./Posts/AddPost"
import { PostProvider } from "../providers/PostProvider";
import { PostTagProvider } from "../providers/PostTagProvider";
import { TagProvider } from "../providers/TagProvider";

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
        <PostProvider>
          <CategoryProvider>
            <DeleteCategory />
          </CategoryProvider>
        </PostProvider>
      </Route>



      <PostProvider>
        <CategoryProvider>
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


        <Route exact path="/Posts">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

          <Route exact path="/UserPosts">
            <UserPostList />
          </Route>

          <Route exact path="/Post/:postId(\d+)">
            <PostDetails />
          </Route>

          <Route exact path="/Posts/NewPost">
            <AddPostForm />
          </Route>
        </CategoryProvider>
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
