import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { PostTagContext } from "../../providers/PostTagProvider.js";
import { TagContext } from "../../providers/TagProvider.js";

const DeleteTagForPost = ({ postTag }) => {
    const { deletePostTag } = useContext(PostTagContext);
    const { postId } = useParams();
    const history = useHistory();

    const handleDeletePostTag = () => {
        deletePostTag(postTag.id)
            .then(() => {
                history.push(`/post/${postId}`)
            })
    };

    console.log(postTag, "post tag")

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{postTag.tag.name}</strong>
                </p>
                <Button onClick={handleDeletePostTag}>Remove</Button>
            </CardBody>
        </Card >
    );
};

export default DeleteTagForPost;