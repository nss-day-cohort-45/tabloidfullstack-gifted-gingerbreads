import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
import { useParams, useHistory } from "react-router-dom"

const TagDelete = () => {
    const { deleteTag, getTagById } = useContext(TagContext);
    const [tag, setTag] = useState({})
    const { tagId } = useParams(); //returns an object
    const history = useHistory();

    useEffect(() => {
        getTagById(tagId)
            .then((response) => {
                setTag(response)
            })
    }, []);

    console.log("log", tagId, tag)

    const handleDelete = () => {
        deleteTag(tag.id)
            .then(() => {
                history.push("/tags")
            })
    };

    const BackToTagsPage = () => {
        history.push("/tags");
    };

    return (
        <div>
            <h2>Are you sure you want to delete the "{tag.name}" tag?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={BackToTagsPage}>No</Button>
        </div>
    );
};

export default TagDelete;