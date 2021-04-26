import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { ManagePostTags } from "../postTag/ManagePostTags.js";
import { PostTagContext } from "../../providers/PostTagProvider";
import { TagContext } from "../../providers/TagProvider";

const PostDetails = () => {
  const { posts, getPostDetails } = useContext(PostContext);
  const { postTags, getAllPostTagsForPost } = useContext(PostTagContext);
  const { getAllTags } = useContext(TagContext);

  let { postId } = useParams()
  const history = useHistory();

  console.log(posts[0]?.imageLocation)

  useEffect(() => {
    getPostDetails(postId)
    getAllPostTagsForPost(postId)
    getAllTags()
  }, []);

  console.log(postTags, "post array")

  const ManagePostTags = () => {
    history.push(`/posttag/manage-tags/${postId}`)
  }

  return (
    <>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Button onClick={ManagePostTags}>Manage Tags</Button>
            <strong>
              {post.title}
            </strong>
            <img src={post.imageLocation} alt="No image available"></img>
            <p>{post.content}</p>
            <p>Published on {post.publishDateTime}</p>
            <p>Published by {post.postAuthor.displayName}</p>
            <p>Tags: {postTags.map((postTag) => {
              return `#${postTag.tag.name}, `
            })}</p>

          </div>
        ))}
      </div>
      <button onClick={() => {
        history.push(`/comments/${postId}`)
      }}>View Comments</button>
      <button onClick={() => {
        history.push(`/comment/${postId}/create`)
      }}>Add A Comment</button>

    </>
  );
};
export default PostDetails;