import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting after login
import TopLeft from "../../Decoration/top-left";
import TopRight from "../../Decoration/top-right";
import MiddleLeft from "../../Decoration/middle-left";
import MiddleRight from "../../Decoration/middle-right";
import BottomLeft from "../../Decoration/bottom-left";
import BottomRight from "../../Decoration/bottom-right";
import Footer from './Footer';

export default function Recette() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Add user state
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = location.state || {};

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError("Recipe ID is missing.");
        return;
      }

      const recipeUrl = `http://127.0.0.1:8000/api/recipes/${id}`;
      const ingredientsUrl = `http://127.0.0.1:8000/api/recipes/${id}/ingredients`;

      try {
        const recipeResponse = await axios.get(recipeUrl);
        setRecipe(recipeResponse.data);

        const ingredientsResponse = await axios.get(ingredientsUrl);
        setIngredients(ingredientsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load the recipe or ingredients. Please try again later.");
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('http://127.0.0.1:8000/api/user');
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchRecipe();
    fetchUser(); // Fetch the logged-in user
  }, [id]);

  const handleFavorite = async () => {
    if (!user) {
      navigate('/login'); // Redirect to login if the user is not logged in
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/recipes/favorite', {
        recipe_id: recipe.id
      });
      alert('Recipe added to favorites!');
    } catch (error) {
      console.error("Error favoriting recipe:", error);
      alert('Failed to favorite the recipe. Please try again later.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!recipe) {
    return <div className="loading-message">Loading...</div>;
  }

  console.log("Recipe data:", recipe); // Log the recipe data to check the image URL
  console.log("Ingredients data:", ingredients); // Log the ingredients data

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#00BFFF" />
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#00BFFF" />
      <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#00BFFF" />
      <MiddleRight className="absolute z-[-1] bottom-[-60%] right-[0%] w-[10%] h-[40%]" fill="#00BFFF" />
      <BottomLeft className="absolute z-[-1] bottom-[-120%] left-[0%] w-[10%] h-[70%]" fill="#00BFFF" />
      <BottomRight className="absolute z-[-1] bottom-[-165%] right-[0%] w-[40%] h-[70%]" fill="#00BFFF" />
      <div className="mx-auto p-5">
        <main className="box-border flex relative flex-col shrink-0 mt-5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <section className="flex flex-col max-md:ml-0 max-md:w-full">
              <div>
                {recipe.image ? (
                  <img className="rounded-3xl mb-10 shadow" src={recipe.image} alt={recipe.title} />
                ) : (
                  <p>Image not available</p>
                )}
              </div>
              <h2 className="ml-5 mt-2.5 text-2xl text-neutral-800 max-md:mt-10 ">Nutrition: </h2>
              <div className="flex flex-col text-2xl pl-10 pr-40 py-9 w-full whitespace-nowrap shadow-2xl backdrop-blur bg-white bg-opacity-80 rounded-[52px] max-md:px-5 max-md:mt-10 mb-10">
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Calories: {recipe.calories}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Carbs: {recipe.carbs}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Fat: {recipe.fat}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Protein: {recipe.protein}</p>
              </div>
            </section>
            <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
              <h1 className="text-4xl font-bold text-gray-800">{recipe.title}</h1>
              <p className="mt-11 font-medium text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                {recipe.description}
              </p>
              <h3 className="mt-8 mb-4 text-2xl text-neutral-800 max-md:mt-10 font-bold">Ingredients:</h3>
              <ul className="font-medium text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full list-disc pl-8">
                {ingredients.length > 0 ? ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                )) : <p>Ingredients not available</p>}
              </ul>
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Instructions:</h3>
                {recipe.instructions ? (
                  <ol className="list-decimal pl-8 font-medium text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                    {recipe.instructions.split(',').map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-xl text-gray-700">Instructions not available</p>
                )}
              </div>
              <button onClick={handleFavorite} className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Add to Favorites
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer className="p-3"/>
    </>
  );
}
