import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { PostTagContext } from "../../providers/PostTagProvider.js";

const TagForPost = ({ tag }) => {
    const { addPostTag, deletePostTag, getPostTagById } = useContext(PostTagContext);
    const { postId } = useParams();
    const [postTag, setPostTag] = useState({});
    const history = useHistory();

    // How do we get the post tag id? 
    // Why can't we get it from the post tag obj?

    console.log(postTag, "tag")

    useEffect(() => {
        // .then((res) => {
        //     setPostTag(res)
        // })
    }, []);

    const handleAddPostTag = () => {
        // Works here because you are making a 
        // new object for the database - will assign an id to it
        const postTagObj = {
            postId,
            tagId: tag.id
        }
        addPostTag(postTagObj)
        history.push(`/post/${postId}`)
    };

    const handleDeletePostTag = () => {
        // You need to get a post tag object here
        // and get the id from it 
        // How do we get an object?
        // if Tag's id is equal to PostTag's TagId = delete it
        const postTagObj = {
            postId,
            tagId: tag.id
        }
        if (tag.id === postTagObj.TagId)
            deletePostTag(tag.id)
                .then(() => {
                    history.push(`/post/${postId}`)
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