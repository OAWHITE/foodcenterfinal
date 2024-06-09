import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/AddRecipes.css';

export default function AddRecipes() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [calories, setCalories] = useState('');
    const [region, setRegion] = useState('');
    const [image, setImage] = useState(null);
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructions', instructions);
        formData.append('calories', calories);
        formData.append('region', region);
        formData.append('image', image);
        formData.append('fat', fat);
        formData.append('carbs', carbs);
        formData.append('protein', protein);
    
        const token = localStorage.getItem('token'); // Get the token from local storage
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
            });
            console.log('Recipe added:', response.data);
        } catch (error) {
            console.error('Error adding recipe:', error);
            if (error.response && error.response.data) {
                alert('Error adding recipe: ' + JSON.stringify(error.response.data));
            } else {
                alert('Error adding recipe. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
                <label className="label">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input" />
            </div>
            <div className="formGroup">
                <label className="label">Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="textarea"></textarea>
            </div>
            <div className="formGroup">
                <label className="label">Instructions:</label>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required className="textarea"></textarea>
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
            <button type="submit" className="button">Add Recipe</button>
        </form>
    );
}
