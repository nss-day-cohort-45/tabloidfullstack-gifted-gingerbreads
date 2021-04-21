import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider.js";
import Tag from "./Tag";

const TagList = () => {
    const { tags, getAllTags } = useContext(TagContext);
    const history = useHistory();

    useEffect(() => {
        getAllTags();
    }, []);

    const createTagPage = () => {
        history.push("/tag/create")
    };

    return (

        <div className="container">
            <button onClick={createTagPage} type="submit" className="btn btn-primary">Add A Tag</button>
            <div className="row justify-content-center">
                <div className="cards-column">
                    {tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagList;