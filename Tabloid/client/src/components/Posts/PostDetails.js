import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";

const PostDetails = () => {
    const { posts, getPostDetails } = useContext(PostContext);

    let { postId } = useParams()

    useEffect(() => {
        getPostDetails(postId);
    }, []);

    return (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
                <strong>
                  {post.title}
                </strong>
                <img src={post.imageLocation} alt="No image available"></img>
                <p>{post.content}</p>
                <p>Published on {post.publishDateTime}</p>
                <p>Published by {post.postAuthor.displayName}</p>
            </div>
          ))}
        </div>
      );
    };
export default PostDetails;