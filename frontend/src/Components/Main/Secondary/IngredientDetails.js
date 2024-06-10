import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopLeft from '../../Decoration/top-left';
import TopRight from '../../Decoration/top-right';
import MiddleLeft from '../../Decoration/middle-left';
import MiddleRight from '../../Decoration/middle-right';
import BottomLeft from '../../Decoration/bottom-left';
import BottomRight from '../../Decoration/bottom-right';
import Footer from './Footer';

export default function IngredientDetails() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [error, setError] = useState(null);

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
      setError('Failed to load the ingredient. Please try again later.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!ingredient) {
    return <div className="loading-message">Loading...</div>;
  }

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
                <img className="rounded-3xl mb-10 shadow" src={ingredient.image} alt={ingredient.name} />
              </div>
              <h2 className="ml-5 mt-2.5 text-2xl text-neutral-800 max-md:mt-10 ">Ingredient Details: </h2>
              <div className="flex flex-col text-2xl pl-10 pr-40 py-9 w-full whitespace-nowrap shadow-2xl backdrop-blur bg-white bg-opacity-80 rounded-[52px] max-md:px-5 max-md:mt-10 mb-10">
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Name: {ingredient.name}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Type: {ingredient.type}</p>
                </div>
            </section>
              <h2 className="d-block ml-5 mt-2.5 text-2xl text-neutral-800 max-md:mt-10 ">Nutrition: </h2>
              <div className="flex flex-col text-2xl pl-10 pr-40 py-9 w-full whitespace-nowrap shadow-2xl backdrop-blur bg-white bg-opacity-80 rounded-[52px] max-md:px-5 max-md:mt-10 mb-10">
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Calories: {ingredient.calories}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Carbs: {ingredient.carbs}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Fat: {ingredient.fat}</p>
                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Protein: {ingredient.protein}</p>
              </div>
          </div>
        </main>
      </div>
      <Footer className="p-3"/>
    </>
  );
}
