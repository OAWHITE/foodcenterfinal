import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipesList() {
  const location = useLocation();
  const { filteredRecipes } = location.state;

  return (
    <main className="main-content">
      <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full">Filtered Recipes</h2>
      <div className="flex flex-wrap">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card m-4 p-4 border border-gray-200 rounded-lg shadow-md">
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
  );
}
