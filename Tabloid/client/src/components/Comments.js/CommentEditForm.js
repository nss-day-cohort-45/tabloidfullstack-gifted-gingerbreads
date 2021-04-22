import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';



const CommentEditForm = () => {
    const { commentId } = useParams(); //this  HAS TO MATCH this part ":commentId(\d+)" in ApplicationViews
    const history = useHistory();
    const { getCommentById, editComment } = useContext(CommentContext);

    const [comment, setComment] = useState({
        subject: "",
        content: ""
    });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    };

    const handleClickSaveComment = () => {
        editComment({
            id: commentId,
            postId: comment.postId,
            subject: comment.subject,
            content: comment.content
        })
            .then(() => history.push(`/comments/${comment.postId}`))
    };

    useEffect(() => {
        getCommentById(commentId)
            .then((commentObject) => {
                setComment(commentObject)
            })
    }, []);



    return (
        <div className="CommentForm">
            <h2 className="CommentForm__title">Edit Comment</h2>
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
}

export default CommentEditForm;