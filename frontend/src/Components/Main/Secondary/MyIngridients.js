import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../Styles/MyIngridients.css';

export default function MyIngridients({ query, type }) {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    filterIngredients();
  }, [query, type, ingredients]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const filterIngredients = () => {
    let filtered = ingredients;

    if (query) {
      filtered = filtered.filter(ingredient =>
        ingredient.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter(ingredient => ingredient.type === type);
    }

    setFilteredIngredients(filtered);
  };

  return (
    <div className="ingredients-container">
      {filteredIngredients.map(ingredient => (
        <div key={ingredient.id} className="ingredient-card">
          <img src={ingredient.image} alt={ingredient.name} className="ingredient-image" />
          <h3>{ingredient.name}</h3>
        </div>
      ))}
    </div>
  );
}
