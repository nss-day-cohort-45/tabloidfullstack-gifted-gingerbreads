import React, { useContext, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory } from 'react-router-dom';

const CommentForm = () => {
    const { addComment } = useContext(CommentContext)

    const [comment, setComment] = useState({
        postId: 0,
        userProfileId: 0,
        subject: "",
        content: "",
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newComment[event.target.id] = selectedVal
        setComment(newComment)
    }

    const handleClickSaveComment = (event) => {
        event.preventDefault()
        addComment(comment)
            .then(() => history.push("/")) //needs to be redirected to the Comment List page for this post
    }

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
                Save
          </button>
        </form>
    )
};

export default CommentForm;