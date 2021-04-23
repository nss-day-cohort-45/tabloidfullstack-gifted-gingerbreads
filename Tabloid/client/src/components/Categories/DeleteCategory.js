import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider"
import { Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";

const DeleteCategory = () => {
    const { deleteCategory, getCategoryById } = useContext(CategoryContext);
    const { getPostsByCategoryId, posts } = useContext(PostContext);

    const { categoryId } = useParams();
    const [category, setCategory] = useState({})


    const history = useHistory();

    useEffect(() => {
        getCategoryById(categoryId)
            .then(getPostsByCategoryId(categoryId))
            .then(setCategory)
    }, [])

    console.log(category)

    const handleDelete = () => {
        console.log(posts)
        if (posts.length === 0) {
            deleteCategory(categoryId)
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
            <Button color="danger" className="delete" onClick={handleDelete}>Delete</Button>
            <Button color="danger" className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeleteCategory;