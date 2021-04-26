import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Category.css"

const Category = ({ category }) => {
    return (
        <>
            <Card className="m-4 category-card">
                <CardBody>
                    <p>
                        <strong>{category.name}</strong>
                    </p>
                    <Button className="button" color="primary" size="sm" outline color="secondary">
                        <Link className="editCategory" to={`/category/${category.id}`} style={{ color: `#000` }}>
                            Edit
                            </Link>
                    </Button>
                    <Button className="button" color="primary" size="sm" outline color="secondary">
                        <Link className=" deleteCategory" to={`/category/delete/${category.id}`} style={{ color: `#000` }} >
                            Delete
                            </Link>
                    </Button>
                </CardBody>
            </Card>

        </>

    );
};

export default Category;