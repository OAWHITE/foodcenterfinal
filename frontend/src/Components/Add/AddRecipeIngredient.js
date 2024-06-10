import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddRecipeIngredient() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await axios.get("http://127.0.0.1:8000/api/recipes");
        const ingredientResponse = await axios.get("http://127.0.0.1:8000/api/ingredients");
        setRecipes(recipeResponse.data);
        setIngredients(ingredientResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      recipe_id: selectedRecipe,
      ingredient_id: selectedIngredient,
      quantity: quantity,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/recipe-ingredients", data);
      setMessage("Recipe Ingredient added successfully!");
    } catch (error) {
      console.error("Error adding recipe ingredient:", error);
      setMessage("Failed to add Recipe Ingredient.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Add Recipe Ingredient</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Recipe</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
            required
          >
            <option value="">Select a recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ingredient</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            required
          >
            <option value="">Select an ingredient</option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Recipe Ingredient
          </button>
        </div>
      </form>
    </div>
  );
}
