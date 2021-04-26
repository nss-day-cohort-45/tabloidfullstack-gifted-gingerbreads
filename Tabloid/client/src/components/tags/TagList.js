import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Container, Col } from "reactstrap";
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
        <Container>
            <Row>
                <Col>
                    <h1>Tags</h1>
                </Col>
                <Col>
                    <button onClick={createTagPage} type="submit" className="btn btn-primary">Add A Tag</button>
                </Col>
            </Row>
            <Row>
                <div className="tag-container">
                    {tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </div>
            </Row>
        </Container>
    );
};

export default TagList;