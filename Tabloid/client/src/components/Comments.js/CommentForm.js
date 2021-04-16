import React, { useContext, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';


const CommentForm = () => {
    const { matchedCommentId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const { addComment, editComment } = useContext(CommentContext)

    const [comment, setComment] = useState({
        postId: 0,
        userProfileId: 0,
        subject: "",
        content: "",
    });

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
        if (matchedCommentId) {
            editComment({

            })
        }
        event.preventDefault()
        addComment(comment)
            .then(() => history.push("/comments"))
    }



    const handleClickSaveComment = () => {
        setIsLoading(true);
        if (matchedCommentId) {
            editComment({
                id: familyHistory.id,
                userId: userId,
                condition: familyHistory.condition,
                relativeId: parseInt(familyHistory.relativeId)
            })
                .then(() => history.push("/FamilyHistory"))
        } else {
            addComment({
                userId: userId,
                condition: familyHistory.condition,
                relativeId: parseInt(familyHistory.relativeId)
            })
                .then(() => history.push("/comments"))
        }
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
                Save
          </button>
        </form>
    )
};

// for save after editing a comment should be redirected to the comment's detail page(?)
// going to need to add a cancel button for edit only -- if the cancel button is clicked need to be redirect to the list page 
export default CommentForm;