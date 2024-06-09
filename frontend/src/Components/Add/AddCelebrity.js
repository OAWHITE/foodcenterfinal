import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/AddCelebrity.css';

export default function AddCelebrity() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [celebrityimage, setCelebrityImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleImageChange = (e) => {
        setCelebrityImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('celebrityimage', celebrityimage);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/celebrities', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
            });
            console.log('Celebrity added:', response.data);
        } catch (error) {
            console.error('Error adding celebrity:', error);
            if (error.response && error.response.data) {
                alert('Error adding Celebrity: ' + JSON.stringify(error.response.data));
            } else {
                alert('Error adding Celebrity. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
                <label className="label">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
                {errors.name && <p className="error">{errors.name[0]}</p>}
            </div>
            <div className="formGroup">
                <label className="label">Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="textarea"></textarea>
                {errors.description && <p className="error">{errors.description[0]}</p>}
            </div>
            <div className="formGroup">
                <label className="label">Celebrity Image:</label>
                <input type="file" onChange={handleImageChange} className="inputFile" />
                {errors.celebrityimage && <p className="error">{errors.celebrityimage[0]}</p>}
            </div>
            <button type="submit" className="button">Add Celebrity</button>
        </form>
    );
}
