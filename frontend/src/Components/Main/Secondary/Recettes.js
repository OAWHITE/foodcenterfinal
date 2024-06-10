import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import TopLeft from '../../Decoration/top-left';
import TopRight from '../../Decoration/top-right';
import MiddleLeft from '../../Decoration/middle-left';
import MiddleRight from '../../Decoration/middle-right';
import BottomLeft from '../../Decoration/bottom-left';
import BottomRight from '../../Decoration/bottom-right';

export default function Recettes() {
    const location = useLocation();
    const { recipes, person, image } = location.state;
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Add this state
    const [query, setQuery] = useState('');

    const handleSectionClick = async (id, image) => {
        setSelectedId(id);
        setSelectedImage(image); // Set the selected image
        const responseRecipe = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=4905c962a9844760a60cf260e9b977a8`);
        const responseCalories = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=4905c962a9844760a60cf260e9b977a8`);
        const Recipe = await responseRecipe.json();
        const Calories = await responseCalories.json();
        navigate('/recette', { state: { recipe: Recipe, calories: Calories, image } }); // Include image in navigate state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4905c962a9844760a60cf260e9b977a8&query=${query}`);
        const data = await response.json();
        navigate('/recettes', { state: { recipes: data } });
        };

        return (
            <>
            <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#4EABBF"/>
            <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#4EABBF"/>
            <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#4EABBF"/>
            <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#4EABBF"/>
            <BottomLeft className="absolute z-[-1] bottom-[-280%] left-[0%] w-[10%] h-[70%]" fill="#4EABBF"/>
            <BottomRight className="absolute z-[-1] bottom-[-328%] right-[0%] w-[40%] h-[70%]" fill="#4EABBF"/>
            <section className="search-section">
            <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-5" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                <label className="text-lg font-medium"> Meal or Region </label>
                <input className="justify-center p-4 mt-4 rounded-2xl border border-solid border-zinc-200" placeholder="Morocco / Tagine" onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <div className="flex flex-col w-full">
                <label className="text-lg font-medium">Person</label>
                <select className="justify-center p-4 mt-4 rounded-2xl border border-solid border-zinc-200">
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                </select>
                </div>
                <button type="submit" className="flex justify-center p-2 mt-12 w-full text-xl font-medium text-black bg-amber-500 rounded-2xl max-md:px-5 max-md:mt-10" aria-label="Search" > Search </button>
            </form>
            </section>
            <div className='mt-24 mx-14'>
                <h1 className='text-3xl'>Recipes :</h1>
                {recipes.results.map((recipe, index) => (
                    <section
                        key={index}
                        className="px-16 py-10 mt-12 border border-black border-solid bg-stone-100 rounded-[51px] shadow-[0px_4px_35px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
                        onClick={() => handleSectionClick(recipe.id, recipe.image)} // Pass image to handleSectionClick
                    >
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <figure className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                                <img
                                    loading="lazy"
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="grow w-full aspect-[1.82] max-md:mt-10 max-md:max-w-full rounded-3xl"
                                />
                            </figure>
                            <article className="flex flex-col ml-5 w-[72%] max-md:ml-0 max-md:w-full">
                                <header className="flex flex-col mt-4 max-md:mt-10 max-md:max-w-full">
                                    <h2 className="text-3xl text-stone-700">{recipe.title}</h2>
                                </header>
                            </article>
                        </div>
                    </section>
                ))}
            </div>    
        </>
    );
}