import React, { useState } from "react";
import Footer from "./Secondary/Footer";
import { useNavigate } from "react-router";
import MyIngridients from "./Secondary/MyIngridients";
import TopLeft from "../Decoration/top-left";
import TopRight from "../Decoration/top-right";
import MiddleLeft from "../Decoration/middle-left";
import MiddleRight from "../Decoration/middle-right";
import BottomLeft from "../Decoration/bottom-left";
import BottomRight from "../Decoration/bottom-right";
import axios from 'axios';

export default function MyFridge() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleGenerateRecipes = async (selectedIngredients) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recipes/by-ingredients', {
        ingredients: selectedIngredients
      });
      navigate('/recipeslist', { state: { filteredRecipes: response.data } });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#5CCB93"/>
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#5CCB93"/>
      {/* <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#5CCB93"/>
      <MiddleRight className="absolute z-[-1] bottom-[-30%] right-[0%] w-[10%] h-[40%]" fill="#5CCB93"/> */}
      <BottomLeft className="absolute z-[-1] bottom-[-50%] left-[0%] w-[10%] h-[70%]" fill="#5CCB93"/>
      <BottomRight className="absolute z-[-1] bottom-[-65%] right-[0%] w-[40%] h-[70%]" fill="#5CCB93"/>
      <section className="search-section">
        <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium">Ingredient</label>
            <input
              className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200"
              placeholder="Morocco / Tagine"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium">Type</label>
            <select
              className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Type</option>
              <option value="Meat">Meat</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Milk Products">Milk Products</option>
              <option value="Other">Other</option>
            </select>
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
      <MyIngridients query={query} type={type} onGenerate={handleGenerateRecipes} />
      <Footer />
    </>
  );
}
