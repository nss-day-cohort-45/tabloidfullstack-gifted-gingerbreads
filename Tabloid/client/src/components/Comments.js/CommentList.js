import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory } from 'react-router-dom';


const CommentList = () => {
    const history = useHistory();
    const { comments, getAllCommentsByPostId } = useContext(CommentContext);
    /* 
        Above: Object destructoring, is in {} because is pulling out specific properties 
        from CommentContext in CommentProvider. If go look at bottom of CommentProvider
         will see the value ={{}} section. Those {} correspond to the {} above
    */


    useEffect(() => {
        getAllCommentsByPostId();
    }, []);

    return (
        //need title of post at top of page
        //may need to change the format of date time to MM/DD/YYYY
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
                    </div>
                ))}
            </div>
        </>
        //need a link back to the post 
    );
};

export default CommentList;