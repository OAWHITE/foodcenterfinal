// IngredientDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function IngredientDetails() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    const ingredientId = id || localStorage.getItem('selectedIngredientId');
    if (ingredientId) {
      fetchIngredient(ingredientId);
    }
  }, [id]);

  const fetchIngredient = async (ingredientId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ingredients/${ingredientId}`);
      setIngredient(response.data);
    } catch (error) {
      console.error('Error fetching ingredient:', error);
    }
  };

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{ingredient.name}</h1>
      <img src={ingredient.image} alt={ingredient.name} />
      <p>Type: {ingredient.type}</p>
      <p>Description: {ingredient.description}</p>
      {/* Add other ingredient details as needed */}
    </div>
  );
}
