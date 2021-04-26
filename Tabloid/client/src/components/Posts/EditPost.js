import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider"
import { CategoryContext } from "../../providers/CategoryProvider"

export const EditPost = () => {
    const { editPost, getPostById, posts } = useContext(PostContext);
    const { getAllCategories, categories } = useContext(CategoryContext);

    const { postId } = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        getPostById(postId)
            .then((res) => setPost(res))

            .then(getAllCategories)
    }, [])

    console.log(post, "post")


    const handleControlledInputChange = (event) => {
        const freshPost = { ...post };

        freshPost[event.target.id] = event.target.value
        setPost(freshPost);
    }


    const handleSave = () => {
        editPost({
            id: post.id,
            title: post.title,
            content: post.content,
            imageLocation: post.imageLocation,
            publishDateTime: post.publishDateTime,
            isApproved: post.isApproved,
            categoryId: post.categoryId
        })
    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">Edit</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={post.title} value={post.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" id="content" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={post.content} value={post.content} />
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
            <Button color="primary" onClick={handleSave}>
                <Link className="savePost" to={`/Post/GetById/${post.id}`} style={{ color: `#FFF` }}>
                    Save Post
                </Link>
            </Button>
            <Button color="primary">
                <Link to={"/userPosts"} style={{ color: `#FFF` }}>Cancel</Link>
            </Button>

        </section>
    );
}
