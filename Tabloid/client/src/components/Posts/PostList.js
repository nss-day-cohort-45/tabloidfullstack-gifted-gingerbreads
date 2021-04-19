import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

const PostList = () => {
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
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
        </div>
      ))}
    </div>
  );
};

export default PostList;