import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/AdminRecipesList.css';

const AdminRecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/recipes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRecipes(response.data);
            } catch (error) {
                setError('Failed to load recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:8000/api/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRecipes(recipes.filter(recipe => recipe.id !== id));
            } catch (error) {
                setError('Failed to delete recipe.');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="admin-recipes-list">
            <h1>Admin Recipes List</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id} className="recipe-item">
                        <img src={recipe.image} alt={recipe.title} />
                        <div className="recipe-details">
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminRecipesList;
