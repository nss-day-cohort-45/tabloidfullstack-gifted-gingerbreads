import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import TagList from "./tags/TagList";
import TagForm from "./tags/TagForm";
import TagDelete from "./tags/TagDelete";
import TagEdit from "./tags/TagEdit";
import ManagePostTags from "./postTag/ManagePostTags";
import PostList from "./Posts/PostList";
import UserPostList from "./Posts/UserPostsList";
import PostDetails from "./Posts/PostDetails"
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


      <PostProvider>
        <PostTagProvider>
          <TagProvider>
            <Route exact path="/posttag/manage-tags/:postId(\d+)">
              <ManagePostTags />
            </Route>
          </TagProvider>
        </PostTagProvider>
      </PostProvider>

    </main>
  );
};
