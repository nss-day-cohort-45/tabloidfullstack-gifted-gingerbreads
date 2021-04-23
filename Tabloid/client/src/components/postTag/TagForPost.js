import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { PostTagContext } from "../../providers/PostTagProvider.js";

const TagForPost = ({ tag }) => {
    const { addPostTag, deletePostTag, getAllPostTagsForPost } = useContext(PostTagContext);
    const { postId } = useParams();
    const [postTag] = useState({});
    const history = useHistory();

    useEffect(() => {
        getAllPostTagsForPost(postId)
    }, []);

    const handleAddPostTag = () => {
        const postTagObj = {
            postId,
            tagId: tag.id
        }
        addPostTag(postTagObj)
        history.push("/posts")
    };

    // You need to delete the post tags 
    // in order to delete the tags

    const handleDeletePostTag = () => {
        deletePostTag(postTag.id)
            .then(() => {
                history.push("/posts")
            })
    };

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{tag.name}</strong>
                </p>
                <Button onClick={handleAddPostTag}>Add</Button>
                <Button onClick={handleDeletePostTag}>Remove</Button>
            </CardBody>
        </Card >
    );
};

export default TagForPost;