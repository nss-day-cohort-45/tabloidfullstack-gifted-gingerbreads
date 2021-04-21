import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider"
import { Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";

const DeleteCategory = () => {
    const { deleteCategory, getCategoryById } = useContext(CategoryContext);
    const { getPosts } = useContext(PostContext);

    const { categoryId } = useParams();

    const history = useHistory();

    const [category, setCategory] = useState({})

    useEffect(() => {
        getCategoryById(categoryId)
            .then((response) => {
                setCategory(response)
            })
    }, [])

    const handleDelete = () => {
        const CatIdArray = getPosts.map(p => {
            return p.categoryId
        })

        for (const cat of CatIdArray) {
            if (cat === categoryId) {
                window.alert("This Category is being used By a post.  Cannot delete.")
            }
            else {
                deleteCategory(category)
                    .then(history.pushState("/api/category"))
            }
        }
    }
    const handleCancel = () => {
        history.push("/api/category")
    }

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {category.did}?</div>
            <Button className="delete" onClick={handleDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeleteCategory;