import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
import { useParams, useHistory } from "react-router-dom"
import Card from "reactstrap/lib/Card";

const TagEdit = () => {
    const { editTag, getTagById } = useContext(TagContext);
    const history = useHistory();

    // Edit, hold onto state of tag in this view
    const [tag, setTag] = useState({
        name: ""
    });

    // Wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    // Returns an object
    const { tagId } = useParams();

    const handleControlledInputChange = (e) => {

    }





    useEffect(() => {
        getTagById(tagId)
            .then((response) => {
                setTag(response)
            })
    }, []);

    console.log("log", tagId, tag)

    const handleEdit = () => {
        editTag(tag.id)
            .then(() => {
                history.push("/tags")
            })
    };

    const BackToTagsPage = () => {
        history.push("/tags");
    };

    return (
        <div>
            <Form>
                <h2>Edit the tag "{tag.name}"</h2>
                <input placeholder={tag.name} ></input>
                <Button onClick={BackToTagsPage}>Go Back</Button>
                <Button onClick={handleEdit}>Save Changes</Button>
            </Form>
        </div>
    );
};

export default TagEdit;