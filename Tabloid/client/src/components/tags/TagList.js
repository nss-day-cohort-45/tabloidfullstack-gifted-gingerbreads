import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider.js";
import Tag from "./Tag";

const TagList = () => {
    const { tags, getAllTags } = useContext(TagContext);

    useEffect(() => {
        getAllTags();
    }, []);

    return (

        <div className="container">
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