import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';

const CommentDeletionConfirmation = () => {
    const history = useHistory();
    const { commentId } = useParams();
    const { getCommentById, deleteComment } = useContext(CommentContext);

    const [comment, setComment] = useState({});

    useEffect(() => {
        getCommentById(commentId)
            .then((resp) => setComment(resp))
    }, []);


    const handleRelease = () => {
        deleteComment(comment.id)
            .then(() => {
                history.push(`/comments/${comment.postId}`)
            })
    }

    return (
        <>
            <h1> Delete </h1>
            <h3>Are you sure you wish to delete this comment?</h3>
            <div>Subject: {comment.subject}</div>
            <div>Content: {comment.content}</div>
            <button onClick={handleRelease}>Delete</button>
            <button onClick={() => {
                history.push(`/comments/${comment.postId}`)
            }}>Cancel</button>
        </>
    );
};


export default CommentDeletionConfirmation;