import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PostTagContext } from "../../providers/PostTagProvider.js";
import { TagContext } from "../../providers/TagProvider.js";
import { PostContext } from "../../providers/PostProvider";
import { Button, Form } from "reactstrap";
import TagsForPost from "../postTag/TagsForPost.js";

const ManagePostTags = () => {
    const { postTags, getAllPostTagsForPost } = useContext(PostTagContext);
    const { posts, getPostById, getPosts } = useContext(PostContext);
    const { tags, getAllTags } = useContext(TagContext);
    const [postTag, setPostTag] = useState([]);
    const [post, setPost] = useState({});
    const { postId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPosts()
        getPostById(postId)
    }, []);

    //Get post by id method - and use params - then get the title
    // const what = getPostById(postId);
    // console.log(what, "hello???");
    // console.log(post, "posts???");


    // const blank = posts.map((post) => post.title);
    // console.log(blank, "post title")
    console.log(post.title, "post title")
    // const matchingPost = posts.find((post) => post.Id === postId);
    // console.log(matchingPost, "matching post");

    return (
        <div className="row justify-content-center">
            <div className="container">
                <div className="cards-column">
                    {postTags.map((tag) => (
                        <TagsForPost key={tag.id} tag={tag} />
                    ))}

                    {/* {posts.map((p) => (
                        <strong>
                            {p.title}
                        </strong>
                    ))} */}
                </div>
            </div>
        </div >
    );

};

export default ManagePostTags;