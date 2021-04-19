import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
// import TagDelete from "./TagDelete.js";

const Tag = ({ tag }) => {
    const { tags, getAllTags } = useContext(TagContext);
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
                {/* <TagDelete key={tag.id} tag={tag} /> */}
                <Button onClick={GoToDeleteTag}>Delete</Button>
                <Button onClick={GoToEditTag}>Edit</Button>
            </CardBody>
        </Card >
    );
};

export default Tag;