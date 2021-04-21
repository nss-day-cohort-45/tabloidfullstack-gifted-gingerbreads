import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { ManagePostTags } from "../postTag/ManagePostTags.js";

const PostDetails = () => {
  const { posts, getPostDetails } = useContext(PostContext);
  const history = useHistory();

  let { postId } = useParams()

  console.log(posts[0]?.imageLocation)

  useEffect(() => {
    getPostDetails(postId);
  }, []);

  const ManagePostTags = () => {
    history.push(`/posttag/manage-tags/${postId}`)
  }

  return (
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
        </div>
      ))}
    </div>
  );
};
export default PostDetails;