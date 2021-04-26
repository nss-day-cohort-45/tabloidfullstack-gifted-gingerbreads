import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { PostTagContext } from "../../providers/PostTagProvider.js";

const AddTagToPost = ({ tag }) => {
    const { addPostTag } = useContext(PostTagContext);
    const { postId } = useParams();
    const history = useHistory();

    const handleAddPostTag = () => {
        const postTagObj = {
            postId,
            tagId: tag.id
        }
        addPostTag(postTagObj)
        history.push(`/post/${postId}`)
    };

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{tag.name}</strong>
                </p>
                <Button onClick={handleAddPostTag}>Add</Button>
            </CardBody>
        </Card >
    );
};

export default AddTagToPost;