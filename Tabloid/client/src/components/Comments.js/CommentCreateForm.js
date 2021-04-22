import React, { useContext, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';


const CommentCreateForm = () => {
    const history = useHistory();
    const { addComment } = useContext(CommentContext)
    const { postId } = useParams(); //this  HAS TO MATCH this part ":postId(\d+)" in ApplicationViews

    const [comment, setComment] = useState({
        postId,
        subject: "",
        content: "",
    });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment } // make a copy of state
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    }




    const handleClickSaveComment = () => {
        addComment({
            postId: postId,
            subject: comment.subject,
            content: comment.content
        })
            .then(() => history.push(`/comments/${comment.postId}`))
    };


    return (
        <div className="CommentForm">
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
        </div>
    )
};

export default CommentCreateForm;