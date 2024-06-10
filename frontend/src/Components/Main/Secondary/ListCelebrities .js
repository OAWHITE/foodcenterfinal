import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/ListCelebrities.css';

const ListCelebrities = () => {
    const [celebrities, setCelebrities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCelebrities = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/celebrities', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCelebrities(response.data);
            } catch (error) {
                setError('Failed to load celebrities.');
            } finally {
                setLoading(false);
            }
        };

        fetchCelebrities();
    }, []);

    const handleEdit = (id) => {
        navigate(`/EditCelebrity/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this celebrity?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:8000/api/celebrities/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCelebrities(celebrities.filter(celebrity => celebrity.id !== id));
            } catch (error) {
                setError('Failed to delete celebrity.');
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
        <div className="list-celebrities">
            <h1>List of Celebrities</h1>
            <ul>
                {celebrities.map(celebrity => (
                    <li key={celebrity.id} className="celebrity-item">
                        <img src={celebrity.celebrityimage} alt={celebrity.name} />
                        <div className="celebrity-details">
                            <h2>{celebrity.name}</h2>
                            <p>{celebrity.description}</p>
                            <button onClick={() => handleEdit(celebrity.id)}>Edit</button>
                            <button onClick={() => handleDelete(celebrity.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCelebrities;
