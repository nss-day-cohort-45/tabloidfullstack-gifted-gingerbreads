import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";


const UserPostList = () => {
    const { posts, getUserPosts } = useContext(PostContext);

    useEffect(() => {
        getUserPosts(JSON.parse(sessionStorage.userProfile).id)
    }, []);

    return (
        <div>
        {posts.map((post) => (
          <div key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.postCategory.name}</p>
              <p>Written by: {post.postAuthor.fullName}</p>
          </div>
        ))}
      </div>
    );
};

export default UserPostList;