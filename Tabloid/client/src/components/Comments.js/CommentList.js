import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';


const CommentList = () => {
    const history = useHistory();
    const { postId } = useParams();
    const { comments, getAllCommentsByPostId } = useContext(CommentContext);
    /* 
        Above: Object destructoring, is in {} because is pulling out specific properties 
        from CommentContext in CommentProvider. If go look at bottom of CommentProvider
         will see the value ={{}} section. Those {} correspond to the {} above
    */

    useEffect(() => {
        getAllCommentsByPostId(postId)
    }, []);

    return (
        <>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <div>Subject: {comment.subject}</div>
                        <div>Content: {comment.content}</div>
                        <div>User: {comment.userProfile.displayName}</div>
                        <div>Date Created: {comment.createDateTime}</div>
                        <button onClick={() => {
                            history.push(`/comment/edit/${comment.id}`)
                        }}>Edit
                        </button>
                        <button onClick={() => {
                            history.push(`/comment/${comment.id}`)
                        }}>Delete
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => {
                history.push("/posts")
            }}>Back to Posts
            </button>
        </>
    );
};

export default CommentList;