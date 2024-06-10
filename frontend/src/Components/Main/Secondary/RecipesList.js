import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopLeft from '../../Decoration/top-left';
import TopRight from '../../Decoration/top-right';
import MiddleLeft from '../../Decoration/middle-left';
import MiddleRight from '../../Decoration/middle-right';
import BottomLeft from '../../Decoration/bottom-left';
import BottomRight from '../../Decoration/bottom-right';
import Guide from '../Secondary/Guide'; // Adjust the path according to your project structure
import Footer from '../Secondary/Footer'; // Adjust the path according to your project structure
import '../../../Styles/Home.css'; // Adjust the path according to your project structure

export default function RecipesList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredRecipes = [] } = location.state || {};
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState(filteredRecipes);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    let newFilteredRecipes = filteredRecipes;

    if (data.meal && data.region) {
      newFilteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(data.meal.toLowerCase()) &&
        recipe.region.toLowerCase().includes(data.region.toLowerCase())
      );
    } else if (data.region) {
      newFilteredRecipes = filteredRecipes.filter(recipe =>
        recipe.region.toLowerCase().includes(data.region.toLowerCase())
      );
    } else if (data.meal) {
      newFilteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(data.meal.toLowerCase())
      );
    }

    setRecipes(newFilteredRecipes);
  };

  const handleRecipeClick = (id, image) => {
    navigate(`/recette/`, { state: { id, image } });
  };

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#4EABBF"/>
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#4EABBF"/>
      <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#4EABBF"/>
      <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#4EABBF"/>
      <BottomLeft className="absolute z-[-1] bottom-[-280%] left-[0%] w-[10%] h-[70%]" fill="#4EABBF"/>
      <BottomRight className="absolute z-[-1] bottom-[-328%] right-[0%] w-[40%] h-[70%]" fill="#4EABBF"/>
      
      <section className="search-section mt-24 mx-14">
        <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium">Meal or Region</label>
            <input
              name="meal"
              className="justify-center p-4 mt-4 rounded-2xl border border-solid border-zinc-200"
              placeholder="Morocco / Tagine"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex justify-center p-2 mt-12 w-full text-xl font-medium text-black bg-amber-500 rounded-2xl max-md:px-5 max-md:mt-10"
            aria-label="Search"
          >
            Search
          </button>
        </form>
      </section>

      <main className="main-content mt-24 mx-14">
        <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full">Filtered Recipes</h2>
        <div className="flex flex-wrap">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div
                key={index}
                className="recipe-card m-4 p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleRecipeClick(recipe.id, recipe.image)}
              >
                <img loading="lazy" src={recipe.image} alt={recipe.title} className="recipe-image w-full h-48 object-cover rounded-lg"/>
                <div className="recipe-title text-xl font-bold mt-4">{recipe.title}</div>
                <div className="recipe-region text-gray-600">{recipe.region}</div>
              </div>
            ))
          ) : (
            <p className="mt-10 text-lg text-gray-600">No recipes found matching your criteria.</p>
          )}
        </div>
      </main>
      
      <Guide />
      <Footer />
    </>
  );
}
