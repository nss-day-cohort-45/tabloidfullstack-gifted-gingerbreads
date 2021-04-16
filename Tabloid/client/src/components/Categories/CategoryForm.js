import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../providers/CategoryProvider";


export const PostForm = () => {
    const { addCategory, getAllCategories } = useContext(CategoryContext);



    const [category, setCategory] = useState({
        name: "",
    });

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleControlledInputChange = (event) => {
        const freshCategory = { ...category };

        freshCategory[event.target.id] = event.target.value
        setCategory(freshCategory);
    }

    const handleSave = () => {
        addCategory({
            name: category.name,
        })
    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Name:</label>
                    <input
                        type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={category.name} />
                </div>
            </fieldset>

            <div className="savePost btn btn-primary" onClick={(event) => {
                event.preventDefault();
                handleSave()
            }}>Save This Category
            </div>
        </section>
    )
};

export default CategoryForm