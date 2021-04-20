import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider.js";

const TagForm = () => {
    const { addTag } = useContext(TagContext);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const [tag, setTag] = useState({
        name: ""
    })

    const handleControlledInputChange = (e) => {
        const newTag = { ...tag };

        newTag[e.target.id] = e.target.value;
        setTag(newTag);
    };

    const handleSaveTag = () => {
        setIsLoading(true)
        addTag(tag)
            .then(() => {
                setTag({
                    name: ""
                })
            })
        history.push("/tags")
    };


    return (
        <div className="form-group row mx-auto">
            <label htmlFor="tagName" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10 col-auto">
                <input onChange={handleControlledInputChange} type="text" className="form-control" id="name" placeholder="Tag Name" />
            </div>
            <button onClick={handleSaveTag} type="submit" className="btn btn-primary">Submit</button>
        </div>
    )
};

export default TagForm;