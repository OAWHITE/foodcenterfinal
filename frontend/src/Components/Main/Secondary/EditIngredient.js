import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../Styles/EditIngredient.css';

const EditIngredient = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ingredientImage, setIngredientImage] = useState(null);
    const [calories, setCalories] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/ingredients/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const ingredient = response.data;
                setName(ingredient.name);
                setType(ingredient.type);
                setCalories(ingredient.calories);
                setFat(ingredient.fat);
                setCarbs(ingredient.carbs);
                setProtein(ingredient.protein);
                setLoading(false);
            } catch (error) {
                setError('Failed to load ingredient.');
                setLoading(false);
            }
        };

        fetchIngredient();
    }, [id]);

    const handleImageChange = (e) => {
        setIngredientImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedIngredient = {
            name,
            type,
            calories,
            fat,
            carbs,
            protein
        };

        if (ingredientImage) {
            updatedIngredient.ingredientImage = ingredientImage;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/ingredients/${id}`, updatedIngredient, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                navigate('/My-Fridge');
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                setError('Failed to update ingredient.');
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
        <div className="edit-ingredient">
            <h1>Edit Ingredient</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label className="label">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
                    {validationErrors.name && <div className="error">{validationErrors.name[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Type:</label>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required className="input" />
                    {validationErrors.type && <div className="error">{validationErrors.type[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Calories:</label>
                    <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="input" />
                </div>
                <div className="formGroup">
                    <label className="label">Fat:</label>
                    <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} className="input" />
                </div>
                <div className="formGroup">
                    <label className="label">Carbs:</label>
                    <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} className="input" />
                </div>
                <div className="formGroup">
                    <label className="label">Protein:</label>
                    <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} className="input" />
                </div>
                <div className="formGroup">
                    <label className="label">Ingredient Image:</label>
                    <input type="file" onChange={handleImageChange} className="inputFile" />
                </div>
                <button type="submit" className="button">Update Ingredient</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default EditIngredient;
