import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Row, Container, Col } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
import { useParams, useHistory } from "react-router-dom"
import Card from "reactstrap/lib/Card";

const TagEdit = () => {
    const { editTag, getTagById, getAllTags } = useContext(TagContext);

    // Returns an object
    const { tagId } = useParams();
    const history = useHistory();

    // Edit, hold onto state of tag in this view
    const [tag, setTag] = useState({
        name: ""
    });

    // When the input field changes, update state
    // Causes a re-render and updates the DOM
    const handleControlledInputChange = (e) => {
        // When you change a state object or array,
        // Always create a copy to make changes, and then set the state.
        const newTag = { ...tag }; // tag is an object with properties

        // Set the property to the new value
        newTag[e.target.id] = e.target.value;

        // Update the state with the new user's input
        setTag(newTag);
    };

    useEffect(() => {
        getTagById(tagId)
            .then((response) => {
                setTag(response)
            })
    }, []);

    const handleEdit = () => {
        console.log("Save edit")
        editTag({
            id: tagId,
            name: tag.name
        })
            .then(() => history.push("/tags"))
    };

    const BackToTagsPage = () => {
        history.push("/tags");
    };

    return (
        <div>
            <Form className="tag-form">
                <Row>
                    <h1>Edit the tag "{tag.name}"?</h1>
                </Row>
                <Row>
                    <input onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={tag.name} id="name"></input>
                </Row>
                <Row className="tag-form--button-row">
                    <Button onClick={handleEdit} className="button">Save Changes</Button>
                    <Button onClick={BackToTagsPage} className="button">Go Back</Button>
                </Row>
            </Form>
        </div>
    );
};

export default TagEdit;