import React from 'react';
import { useLocation } from 'react-router-dom';
import TopLeft from '../../Decoration/top-left';
import TopRight from '../../Decoration/top-right';
import MiddleLeft from '../../Decoration/middle-left';
import MiddleRight from '../../Decoration/middle-right';
import BottomLeft from '../../Decoration/bottom-left';
import BottomRight from '../../Decoration/bottom-right';

export default function RecipesList() {
  const location = useLocation();
  const { filteredRecipes } = location.state || { filteredRecipes: [] };

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#4EABBF"/>
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#4EABBF"/>
      <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#4EABBF"/>
      <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#4EABBF"/>
      <BottomLeft className="absolute z-[-1] bottom-[-280%] left-[0%] w-[10%] h-[70%]" fill="#4EABBF"/>
      <BottomRight className="absolute z-[-1] bottom-[-328%] right-[0%] w-[40%] h-[70%]" fill="#4EABBF"/>
      
      <main className="main-content mt-24 mx-14">
        <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full">Filtered Recipes</h2>
        <div className="flex flex-wrap">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div key={index} className="recipe-card m-4 p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer">
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
    </>
  );
}
