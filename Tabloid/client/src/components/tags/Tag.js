import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";

const Tag = ({ tag }) => {
    const { getAllTags } = useContext(TagContext);
    const history = useHistory();

    useEffect(() => {
        getAllTags();
    }, []);

    const GoToDeleteTag = () => {
        history.push(`/tag/delete/${tag.id}`);
    }

    const GoToEditTag = () => {
        history.push(`/tag/edit/${tag.id}`);
    }

    return (
        <Card className="m-4">
            <p className="text-left px-2">Tag Name: {tag.name}</p>
            <CardBody>
                <p>
                    <strong>{tag.name}</strong>
                </p>
                <Button onClick={GoToEditTag}>Edit</Button>
                <Button onClick={GoToDeleteTag}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default Tag;