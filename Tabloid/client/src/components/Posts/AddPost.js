import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider"
import { CategoryContext } from "../../providers/CategoryProvider"


export const AddPostForm = () => {

    const { addPost, getPosts } = useContext(PostContext)
    const { getAllCategories, categories } = useContext(CategoryContext)

    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        createDateTime: "",
        publishDateTime: "",
        isApproved: false,
        categoryId: 0
    });

    useEffect(() => {
        getPosts()
            .then(getAllCategories)
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = { ...post };

        newPost[event.target.id] = event.target.value
        setPost(newPost);
    }

    const handleSavePost = () => {
        addPost({
            title: post.title,
            content: post.content,
            imageLocation: post.imageLocation,
            createDateTime: new Date(),
            publishDateTime: post.publishDateTime,
            isApproved: true,
            categoryId: post.categoryId,
        })
        // .then(getPosts);
    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={post.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" id="content" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={post.content} />
                </div>
                <div className="form-group">
                    <label htmlFor="imageLocation">Image Location:</label>
                    <input
                        type="text" id="imageLocation" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image Location" value={post.imageLocation} />
                </div>
                <div className="form-group">
                    <label htmlFor="publishDateTime">Publish Date:</label>
                    <input
                        type="date" id="publishDateTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Publish Date" value={post.publishDateTime} />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">Category: </label>
                    <select name="categoryId" id="categoryId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <Button color="primary" onClick={handleSavePost}>
                <Link className="savePost" to={"/Posts"} style={{ color: `#FFF` }}>
                    Save Post
                </Link>
            </Button>

        </section>
    );
};
export default AddPostForm;