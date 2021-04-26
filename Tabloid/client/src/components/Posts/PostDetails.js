import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button, Row } from "reactstrap";
import { ManagePostTags } from "../postTag/ManagePostTags.js";
import "./Posts.css"

const PostDetails = () => {
  const { posts, getPostById } = useContext(PostContext);

  let { postId } = useParams()
  const history = useHistory();

  const [post, setPost] = useState({})



  useEffect(() => {
    getPostById(postId)
      .then((res) => {
        setPost(res)
      })
  }, []);
  console.log(post)

  const ManagePostTags = () => {
    history.push(`/posttag/manage-tags/${postId}`)
  }

  return (
    <>
      <div className="post-details-container">
        <div key={post.id}>
          <h1 className="posts-title">
            {post.title}
          </h1>
          <p className="post-details">Published on {post.publishDateTime}</p>
          <p className="post-details">Published by {post.postAuthor?.displayName}</p>
          <img src={post.imageLocation} alt="No image available"></img>
          <p>{post.content}</p>
        </div>
        <div className="post-details-buttons">
          <Button onClick={ManagePostTags}>Manage Tags</Button>
          <Button onClick={() => {
            history.push(`/comments/${postId}`)
          }}>View Comments</Button>
          <Button onClick={() => {
            history.push(`/comment/${postId}/create`)
          }}>Add A Comment</Button>
        </div>
      </div>

    </>
  );
};
export default PostDetails;