import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap"


const UserPostList = () => {
  const { posts, getUserPosts } = useContext(PostContext);

  useEffect(() => {
    getUserPosts(JSON.parse(sessionStorage.userProfile).id)
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <strong>
              {post.title}
            </strong>
          </Link>
          <p>{post.postCategory.name}</p>
          <p>Written by: {post.postAuthor.fullName}</p>
          <Button class="edit_button" color="primary">
            <Link to={`/post/edit/${post.id}`} style={{ color: `#FFF` }}>
              Edit This Post
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UserPostList;