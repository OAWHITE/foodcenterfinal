import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../Styles/EditCelebrity.css';

const EditCelebrity = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [celebrityImage, setCelebrityImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCelebrity = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/celebrities/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const celebrity = response.data;
                console.log('Fetched celebrity data:', celebrity);
                setName(celebrity.name);
                setDescription(celebrity.description);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load celebrity:', error);
                setError('Failed to load celebrity.');
                setLoading(false);
            }
        };

        fetchCelebrity();
    }, [id]);

    const handleImageChange = (e) => {
        setCelebrityImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCelebrity = {
            name,
            description,
        };

        if (celebrityImage) {
            updatedCelebrity.celebrityImage = celebrityImage;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/celebrities/${id}`, updatedCelebrity, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                navigate('/celebrities-fav');
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                setError('Failed to update celebrity.');
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
        <div className="edit-celebrity">
            <h1>Edit Celebrity</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label className="label">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
                    {validationErrors.name && <div className="error">{validationErrors.name[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="textarea"></textarea>
                    {validationErrors.description && <div className="error">{validationErrors.description[0]}</div>}
                </div>
                <div className="formGroup">
                    <label className="label">Celebrity Image:</label>
                    <input type="file" onChange={handleImageChange} className="inputFile" />
                </div>
                <button type="submit" className="button">Update Celebrity</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default EditCelebrity;
