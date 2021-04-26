import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Container, Col, Button } from "reactstrap";
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
        <Container className="tag-container">
            <Row className="tag-header-row">
                <Col>
                </Col>
                <Col>
                    <h1>Tags</h1>
                </Col>
                <Col>
                    <Button onClick={createTagPage} type="submit" className="btn btn-primary tag-add" color="secondary">Add A Tag</Button>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <div className="tag-card-container">
                    {tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </div>
            </Row>
        </Container>
    );
};

export default TagList;