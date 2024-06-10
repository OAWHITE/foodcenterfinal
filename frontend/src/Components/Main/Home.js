import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import Guide from "./Secondary/Guide";
import Footer from "./Secondary/Footer";
import "../../Styles/Home.css";
import { useNavigate } from "react-router";
import TopLeft from "../Decoration/top-left";
import TopRight from "../Decoration/top-right";
import MiddleLeft from "../Decoration/middle-left";
import MiddleRight from "../Decoration/middle-right";
import BottomLeft from "../Decoration/bottom-left";
import BottomRight from "../Decoration/bottom-right";
import { ring } from 'ldrs'

ring.register()

const features = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0cc5496449d5ae7e8c2f833ad43bfb76fa88d157493b2155c0202e0b01edcd96?apiKey=f433cc271dd0471da0d67c71e9af784c&", title: "High Quality Meals" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/11806a3458bc540c73350d1df4e254127db03ed03795679fd5b45a99566b2922?apiKey=f433cc271dd0471da0d67c71e9af784c&", title: "Free Recipes" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/87d0ff723367af3103e4fb6c860db6f39c631203717ada5e9bb5a50e83253428?apiKey=f433cc271dd0471da0d67c71e9af784c&", title: "Global meals" },
];

const FeatureItem = ({ icon, title }) => (
  <div className="feature-item">
    <img src={icon} alt={title} className="feature-icon" />
    <div className="feature-title">{title}</div>
  </div>
);

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State for favorite recipes
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const url = 'http://127.0.0.1:8000/api/recipes';

      try {
        const response = await axios.get(url);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/favorites');
        setFavoriteRecipes(response.data);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        setError("Failed to load favorite recipes. Please try again later.");
      }
    };

    fetchRecipes();
    fetchFavoriteRecipes(); // Fetch favorite recipes
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    let filteredRecipes = recipes;

    if (data.meal && data.region) {
      filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(data.meal.toLowerCase()) &&
        recipe.region.toLowerCase().includes(data.region.toLowerCase())
      );
    } else if (data.region) {
      filteredRecipes = recipes.filter(recipe =>
        recipe.region.toLowerCase().includes(data.region.toLowerCase())
      );
    } else if (data.meal) {
      filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(data.meal.toLowerCase())
      );
    }

    navigate('/recipeslist', { state: { filteredRecipes } });
  };

  const handleRecipeClick = (id) => {
    navigate(`/recette/`, { state: { id } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black"></l-ring>
      </div>
    );
  }

  const best = [...recipes].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#4EABBF" />
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#4EABBF" />
      <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#4EABBF" />
      <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#4EABBF" />
      <BottomLeft className="absolute z-[-1] bottom-[-280%] left-[0%] w-[10%] h-[70%]" fill="#4EABBF" />
      <BottomRight className="absolute z-[-1] bottom-[-325%] right-[0%] w-[40%] h-[70%]" fill="#4EABBF" />
      <main className="main-content mt-24">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">
                <span className="black">Make</span>{" "}
                <span className="blue">your</span>{" "}
                <span className="black">meal</span>{" "}
                <span className="orange">Make</span>{" "}
                <span className="black">your</span>{" "}
                <span className="blue">way</span>
              </h2>
              <p className="hero-subtitle">Global Culinary Discovery Hub</p>
              <div className="hero-actions">
                <div className="flex gap-2.5 mt-16 text-lg text-neutral-800 max-md:flex-wrap max-md:mt-10">
                  <button className="justify-center p-2 bg-orange-400 rounded-[32px] max-md:px-5" tabIndex="0" > Order Now </button>
                  <div className="flex gap-4 py-1.5 pr-4 pl-12 my-auto rounded-2xl max-md:px-5">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/af73c6a6891733b68e2b1b959c4da13d3715ef296120732ecd905c88ee24901b?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&" alt="" className="shrink-0 w-12 aspect-square" />
                    <div className="my-auto"> Watch Video </div>
                  </div>
                </div>
              </div>
              <div className="hero-features">
                {features.map((feature, index) => (
                  <FeatureItem key={index} icon={feature.icon} title={feature.title} />
                ))}
              </div>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f9e227ea1b9c90b059089c8f42b3b2afd22e57678b932915a67064b0f15f1a2?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&" alt="" className="hero-image" />
          </div>
        </div>
        <section className="search-section">
          <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <label className="text-lg font-medium"> Region </label>
              <input name="region" className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200" placeholder="Morocco" />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg font-medium"> Meal </label>
              <input name="meal" className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200" placeholder="Tagine" />
            </div>
            <button type="submit" className="flex justify-center p-3 mt-11 w-50 h-[30%] text-xl font-medium text-black bg-amber-500 rounded-2xl max-md:px-5 max-md:mt-10" aria-label="Search" > Search </button>
          </form>
        </section>
      
        <div className="flex flex-col pt-11 pb-5">
          <section className="flex flex-col w-full max-md:max-w-full">
              {error ? <p>Error: {error}</p> : null}
            <h2 className="mt-20 pl-10 text-3xl max-md:mt-10 max-md:max-w-full"> Recipes :</h2>
            <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
              <Carousel responsive={responsive}>
                {recipes.length > 0 ? recipes.map((recipe, index) => (
                  <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap" onClick={() => handleRecipeClick(recipe.id)}>
                    <img loading="lazy" src={recipe.image} alt={recipe.title} className="w-full aspect-[1.47] p-5" />
                    <div className="self-start ml-12 max-md:ml-2.5">{recipe.title}</div>
                  </div>
                )) : <p>No recipes available</p>}
              </Carousel>
            </div>
              <h2 className="mt-20 pl-10 text-3xl max-md:mt-10 max-md:max-w-full text-black">Suggests :</h2>
              <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                <Carousel responsive={responsive}>
                  {recipes.length > 0 ? recipes.map((recipe, index) => (
                    <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap" onClick={() => handleRecipeClick(recipe.id)}>
                      <img loading="lazy" src={recipe.image} alt={recipe.title} className="w-full aspect-[1.47] p-5" />
                      <div className="self-start ml-12 max-md:ml-2.5">{recipe.title}</div>
                    </div>
                  )) : <p>No recipes available</p>}
                </Carousel>
              </div>
              <h2 className="mt-20 pl-10 text-3xl max-md:mt-10 max-md:max-w-full text-black">Best meals:</h2>
              <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                <Carousel responsive={responsive}>
                  {best.length > 0 ? best.map((recipe, index) => (
                    <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap" onClick={() => handleRecipeClick(recipe.id)}>
                      <img loading="lazy" src={recipe.image} alt={recipe.title} className="w-full aspect-[1.47] p-5" />
                      <div className="self-start ml-12 max-md:ml-2.5">{recipe.title}</div>
                    </div>
                  )) : <p>No recipes available</p>}
                </Carousel>
              </div>
              <h2 className="mt-20 pl-10 text-3xl max-md:mt-10 max-md:max-w-full text-black">Favorite Recipes:</h2> {/* New section for favorite recipes */}
              <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                <Carousel responsive={responsive}>
                  {favoriteRecipes.length > 0 ? favoriteRecipes.map((recipe, index) => (
                    <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap" onClick={() => handleRecipeClick(recipe.id)}>
                      <img loading="lazy" src={recipe.image} alt={recipe.title} className="w-full aspect-[1.47] p-5" />
                      <div className="self-start ml-12 max-md:ml-2.5">{recipe.title}</div>
                    </div>
                  )) : <p>No favorite recipes available</p>}
                </Carousel>
              </div>
          </section>
        <Guide />
        <Footer />
        </div>
      </main>
    </>
  );
}
