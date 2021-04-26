import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Form, Button, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import "./Category.css"


export const EditCategory = () => {
    const { editCategory, getCategoryById } = useContext(CategoryContext);

    const { categoryId } = useParams();

    const [category, setCategory] = useState({});



    useEffect(() => {
        getCategoryById(categoryId)
            .then((res) => {
                setCategory(res)
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
        <div>
            <Form className="category-form">
                <Row>
                    <h1>Edit Category</h1>
                </Row>
                <Row>
                    <fieldset>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={category.name} value={category.name} />
                        </div>
                    </fieldset>
                </Row>
                <Row className="category-form--button-row">
                    <Button className="button" onClick={handleSave}>
                        <Link className="saveCategory" to={"/api/category"} style={{ color: `#FFF` }}>
                            Save Category
                        </Link>
                    </Button>
                    <Button className="button" className="cancel">
                        <Link to={"/api/category"} style={{ color: `#FFF` }}>Cancel</Link>
                    </Button>
                </Row>
            </Form>
        </div>
    )

};

export default EditCategory;
