import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";

export const EditCategory = () => {
    const { editCategory, getCategoryById } = useContext(CategoryContext);

    const { categoryId } = useParams();

    const [category, setCategory] = useState({});



    useEffect(() => {
        getCategoryById(categoryId)
            .then((response) => {
                setCategory(response)
            })
    }, [])

    const handleControlledInputChange = (event) => {
        const freshCategory = { ...category };

        freshCategory[event.target.id] = event.target.value
        setCategory(freshCategory);
    }

    const handleSave = () => {
        editCategory({
            name: category.name,
            id: categoryId,
        })
    };
    return (
        <section className="post_form">
            <h2 className="post_form_header">Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={category.name} value={category.name} />
                </div>
            </fieldset>
            <Button onClick={handleSave}>
                <Link className="saveCategory" to={"/api/category"}>
                    Save Category
                </Link>
            </Button>
            <Button className="cancel">
                <Link to={"/api/category"}>Cancel</Link>
            </Button>

        </section>
    )

};

export default EditCategory;
