import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/ListIngredients.css';

const ListIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/ingredients', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIngredients(response.data);
            } catch (error) {
                setError('Failed to load ingredients.');
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-ingredient/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ingredient?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
            } catch (error) {
                setError('Failed to delete ingredient.');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="ingredients-list">
            <h1>List of Ingredients</h1>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id} className="ingredients-list-item">
                        {ingredient.image && <img src={ingredient.image} alt={ingredient.name} />}
                        <div className="ingredients-details">
                            <h2>{ingredient.name}</h2>
                            <p>Type: {ingredient.type}</p>
                            <button onClick={() => handleEdit(ingredient.id)}>Edit</button>
                            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListIngredients;
