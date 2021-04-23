import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    return (
        <>
            <Card className="m-4">
                <CardBody>
                    <p>
                        <strong>{category.name}</strong>
                        <Button className="btn" color="primary" size="sm">
                            <Link className="editCategory" to={`/category/${category.id}`} style={{ color: `#FFF` }}>
                                Edit Category
                </Link>
                        </Button>
                        <Button className="delete_button" color="primary" size="sm">
                            <Link className=" deleteCategory" to={`/category/delete/${category.id}`} style={{ color: `#FFF` }} >
                                Delete Category
                            </Link>
                        </Button>
                    </p>

                </CardBody>
            </Card>

        </>

    );
};

export default Category;