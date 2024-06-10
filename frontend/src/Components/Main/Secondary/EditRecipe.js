import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../Styles/EditRecipe.css';

const EditRecipe = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [calories, setCalories] = useState('');
    const [region, setRegion] = useState('');
    const [image, setImage] = useState(null);
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const recipe = response.data;
                setTitle(recipe.title);
                setDescription(recipe.description);
                setInstructions(recipe.instructions);
                setCalories(recipe.calories);
                setRegion(recipe.region);
                setFat(recipe.fat);
                setCarbs(recipe.carbs);
                setProtein(recipe.protein);
                setLoading(false);
            } catch (error) {
                setError('Failed to load recipe.');
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedRecipe = {
            title,
            description,
            instructions,
            calories,
            region,
            fat,
            carbs,
            protein
        };
    
        if (image) {
            updatedRecipe.image = image;
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/recipes/${id}`, updatedRecipe, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status === 200) {
                console.log('Update successful:', response.data);
                navigate('/admin-recipeslist');
            } else {
                console.log('Unexpected response:', response);
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
                console.log('Validation errors:', error.response.data.errors);
            } else {
                setError('Failed to update recipe.');
                console.log('Error:', error);
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
        <div className="edit-recipe">
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label className="label">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input" />
                    {validationErrors.title && <div className="error">{validationErrors.title[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="textarea"></textarea>
                    {validationErrors.description && <div className="error">{validationErrors.description[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Instructions:</label>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required className="textarea"></textarea>
                    {validationErrors.instructions && <div className="error">{validationErrors.instructions[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Calories:</label>
                    <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="input" />
                </div>
                <div className="formGroup">
                    <label className="label">Region:</label>
                    <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className="input" />
                </div>
                <div className="formGroup">
                    <label className="label">Image:</label>
                    <input type="file" onChange={handleImageChange} className="inputFile" />
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
                <button type="submit" className="button">Update Recipe</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default EditRecipe;
