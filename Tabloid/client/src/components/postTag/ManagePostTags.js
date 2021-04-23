import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { PostTagContext } from "../../providers/PostTagProvider.js";
import { TagContext } from "../../providers/TagProvider.js";
import AddTagToPost from "../postTag/AddTagToPost.js"
import DeleteTagForPost from "../postTag/DeleteTagForPost.js"

const ManagePostTags = () => {
    const { postTags, getAllPostTagsForPost } = useContext(PostTagContext);
    const { tags, getAllTags } = useContext(TagContext);
    const { postId } = useParams();

    useEffect(() => {
        getAllTags()
        getAllPostTagsForPost(postId)
    }, []);

    // 1. All tags associated with post - with a remove button
    // 2. All tags in general - with an add button / will produce duplicates 

    return (
        <Container>
            <div className="row justify-content-center">
                <div className="container">
                    <div className="cards-column">
                        <h2>Add tag to post</h2>
                        <Row>
                            <Col>
                                <h3>Add tag thing</h3>
                                {tags.map((tag) => (
                                    <AddTagToPost key={tag.id} tag={tag} />
                                ))}
                            </Col>
                            <Col>
                                <h3> Delete tag thing</h3>
                                {postTags.map((postTag) => (
                                    <DeleteTagForPost key={postTag.id} postTag={postTag} />
                                ))}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div >
        </Container>
    );

};

export default ManagePostTags;