import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

const Category = ({ category }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{category.title}</strong>
                </p>
            </CardBody>
        </Card>
    );
};

export default Category;