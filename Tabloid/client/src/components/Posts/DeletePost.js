import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

const DeletePost = ({ post_title }) => {
    const { deletePost, getPostDetails, posts } = useContext(PostContext);

    const { postId } = useParams();

    const history = useHistory();

    useEffect(() => {
        getPostDetails(postId)
    }, [])

    const handlePostDelete = () => {
        deletePost(postId)
            .then(history.push("/Posts"))
    }

    const handleCancel = () => {
        history.push("/Posts")
    }

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {posts[0]?.title}?</div>
            <Button className="delete" onClick={handlePostDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeletePost