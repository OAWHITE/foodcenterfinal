import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/AddCoach.css';  // Ensure you create and reference the correct CSS file path

const AddCoach = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const newCoach = {
            name,
            email,
            phone,
            specialization,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/coaches', newCoach, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) {
                setSuccess('Coach added successfully!');
                setName('');
                setEmail('');
                setPhone('');
                setSpecialization('');
            }
        } catch (error) {
            setError('Failed to add coach. Please try again.');
        }
    };

    return (
        <div className="add-coach">
            <h1>Add New Coach</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
                </div>
                <div className="form-group">
                    <label className="label">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
                </div>
                <div className="form-group">
                    <label className="label">Phone:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="input" />
                </div>
                <div className="form-group">
                    <label className="label">Specialization:</label>
                    <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required className="input" />
                </div>
                <button type="submit" className="button">Add Coach</button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </form>
        </div>
    );
};

export default AddCoach;
