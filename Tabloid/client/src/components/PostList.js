import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";

const PostList = () => {
    const { posts, getPosts } = useContext(PostContext);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>
              <strong>{post.title}</strong>
              <p>{post.postCategory.name}</p>
              <p>Written by: {post.postAuthor.fullName}</p>
            </p>
          </div>
        ))}
      </div>
    );
};

export default PostList;