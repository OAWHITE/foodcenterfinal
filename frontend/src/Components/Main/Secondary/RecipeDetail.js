import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../../../Styles/RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = `http://127.0.0.1:8000/api/recipes/${id}`;

      try {
        const response = await axios.get(url);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe. Please try again later.");
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - {ingredient.quantity}</li>
        )) : <p>Ingredients not available</p>}
      </ul>
    </div>
  );
}
