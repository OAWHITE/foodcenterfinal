import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/AddIngredient.css'; // Updated path to CSS file

export default function AddIngredient() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [calories, setCalories] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [avgRating, setAvgRating] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('image', image);
        formData.append('calories', calories);
        formData.append('fat', fat);
        formData.append('carbs', carbs);
        formData.append('protein', protein);
        formData.append('avg_rating', avgRating);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ingredients', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Ingredient added:', response.data);
        } catch (error) {
            console.error('Error adding ingredient:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
                <label className="label">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
            </div>
            <div className="formGroup">
                <label className="label">Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)} required className="input">
                    <option value="">Select Type</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Milk Products">Milk Products</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="formGroup">
                <label className="label">Image:</label>
                <input type="file" onChange={handleImageChange} className="inputFile" />
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
           
            <button type="submit" className="button">Add Ingredient</button>
        </form>
    );
}
