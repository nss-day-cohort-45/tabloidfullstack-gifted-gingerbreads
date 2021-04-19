import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { TagContext } from "../../providers/TagProvider.js";
import { useParams, useHistory } from "react-router-dom"
import Card from "reactstrap/lib/Card";

const TagEdit = () => {
    const { editTag, getTagById } = useContext(TagContext);
    const history = useHistory();

    useEffect(() => {
        if (tagId) {
            getTagById(tagId)
                .then((tag) => {
                    setTag(tag)
                    setIsLoading(false)
                })
        }
        else {
            setIsLoading(false);
        }
    }, []);

    // Edit, hold onto state of tag in this view
    const [tag, setTag] = useState({
        name: ""
    });

    // Wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    // Returns an object
    const { tagId } = useParams();


    // When the input field changes, update state
    // Causes a re-render and updates the DOM
    const handleControlledInputChange = (e) => {
        // When you change a state object or array,
        // Always create a copy to make changes, and then set the state.

        const newTag = { ...tag } // tag is an object with properties

        // Set the property to the new value
        newTag[e.target.name] = e.target.value

        // Update the state with the new user's input
        setTag(newTag)
    }


    const handleEdit = () => {
        if (tagId) {
            editTag({
                id: tag.id,
                name: tag.name
            })
                .then(() => history.push(`/tag/edit/${tag.id}`))
        };
    };

    const BackToTagsPage = () => {
        history.push("/tags");
    };

    return (
        <div>
            <Form>
                <h2>Edit the tag "{tag.name}"</h2>
                <input placeholder={tag.name} id="name"></input>
                <Button onClick={handleEdit}>Save Changes</Button>
                <Button onClick={BackToTagsPage}>Go Back</Button>
            </Form>
        </div>
    );
};

export default TagEdit;