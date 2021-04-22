import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider"
import { Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";

const DeleteCategory = () => {
    const { deleteCategory, getCategoryById } = useContext(CategoryContext);
    const { getPostsByCategoryId, posts } = useContext(PostContext);

    const { categoryId } = useParams();

    const history = useHistory();

    const [category, setCategory] = useState({})

    useEffect(() => {
        getCategoryById(categoryId)
            .then((response) => {
                setCategory(response)
            })
            .then(getPostsByCategoryId(categoryId))
    }, [])

    console.log(category)

    const handleDelete = () => {
        console.log(posts)
        if (posts.length === 0) {
            deleteCategory(category)
                .then(history.push("/api/category"))
        }
        else {
            window.alert("This Category is being used By a post.  Cannot delete.")
        }
    }
    const handleCancel = () => {
        history.push("/api/category")
    }

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {category.name}?</div>
            <Button className="delete" onClick={handleDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeleteCategory;