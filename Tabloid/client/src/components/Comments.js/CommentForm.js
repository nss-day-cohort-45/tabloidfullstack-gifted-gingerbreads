import React, { useContext, useState, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';


const CommentForm = () => {
    const { commentId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const { addComment, editComment, getCommentById } = useContext(CommentContext)

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




    const handleClickSaveComment = () => {
        setIsLoading(true);
        if (commentId) {
            editComment({
                id: commentId,
                postId: parseInt(comment.postId),
                userProfileId: parseInt(comment.userProfileId),
                subject: comment.subject,
                content: comment.content
            })
                .then(() => history.push("/comments"))
        } else {
            addComment({
                postId: parseInt(comment.postId),
                userProfileId: comment.userProfileId,
                subject: comment.subject,
                content: comment.content
            })
                .then(() => history.push("/comments"))
        }
    };

    useEffect(() => {
        if (commentId) {
            getCommentById(commentId)
                .then(comment => {
                    setComment(comment)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])




    //need ternary statement for "New Comment" on form 
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