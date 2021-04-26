import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
import "./Tag.css"

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
        <Card className="m-4 tag-card">
            <CardBody>
                <p>
                    <strong>{tag.name}</strong>
                </p>
                <Button onClick={GoToEditTag} className="button" size="sm" outline color="secondary">Edit</Button>
                <Button onClick={GoToDeleteTag} className="button" size="sm" outline color="secondary">Delete</Button>
            </CardBody>
        </Card >
    );
};

export default Tag;