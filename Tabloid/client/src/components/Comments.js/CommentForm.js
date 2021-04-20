import React, { useContext, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';


const CommentForm = () => {
    const history = useHistory();
    const { addComment } = useContext(CommentContext)
    const userProfileId = JSON.parse(sessionStorage.userProfile).id
    const { postId } = useParams();

    const [comment, setComment] = useState({
        postId,
        userProfileId,
        subject: "",
        content: "",
    });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    }




    const handleClickSaveComment = () => {
        addComment({
            postId: postId,
            userProfileId: userProfileId,
            subject: comment.subject,
            content: comment.content
        })
            .then(() => history.push(`/comments/${postId}`))
    };


    return (
        <form className="CommentForm">
            <h2 className="CommentForm__title">New Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" onChange={handleControlledInputChange}
                        required autoFocus
                        className="form-control"
                        placeholder="Subject"
                        value={comment.subject} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" onChange={handleControlledInputChange}
                        required autoFocus
                        className="form-control"
                        placeholder="Content"
                        value={comment.content} />
                </div>
            </fieldset>


            <button className="btn btn-primary"
                onClick={handleClickSaveComment}>
                Save</button>
            <button onClick={() => {
                history.push(`/comments/${comment.postId}`)
            }}>Cancel</button>
        </form>
    )
};

export default CommentForm;