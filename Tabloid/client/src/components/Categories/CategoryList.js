import React, { useContext, useEffect } from "react";
import { Row, Container, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider"
import Category from "./Category";
import "./Category.css"


const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <Container className="category-container">
            <Row className="category-header-row">
                <Col>
                </Col>
                <Col>
                    <h1>Category Management</h1>
                </Col>
                <Col>
                    <Button className="btn" variant="secondary" size="sm">
                        <Link className="newCategory" to={"/category/addnew"} style={{ color: `#FFF` }}>
                            Add Category
                        </Link>
                    </Button>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <div className="category-card-container">
                    {categories.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </div>
            </Row>
        </Container>
    );
};

export default CategoryList;