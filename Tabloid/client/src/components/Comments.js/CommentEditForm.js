import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from 'react-router-dom';



const CommentEditForm = () => {
    const selectedCommment = useParams();
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

        })
            .then(() => history.push("/")) //to comment's detail page? 
    };
}

export default CommentEditForm;