import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
import { PostTagContext } from "../../providers/PostTagProvider.js";

const TagsForPost = ({ tag }) => {
    const { addPostTag, deletePostTag, getAllPostTagsForPost } = useContext(PostTagContext);
    const { postId } = useParams();
    const [postTag, setPostTag] = useState({})
    const { getAllTags } = useContext(TagContext);
    const history = useHistory();

    useEffect(() => {
        getAllTags()
        getAllPostTagsForPost(postId)
    }, []);

    const handleAddPostTag = () => {
        addPostTag(postTag)
        history.push("/posts")
    };

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

export default TagsForPost;