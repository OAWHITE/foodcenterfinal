import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopLeft from '../../Decoration/top-left';
import TopRight from '../../Decoration/top-right';
import MiddleLeft from '../../Decoration/middle-left';
import MiddleRight from '../../Decoration/middle-right';
import BottomLeft from '../../Decoration/bottom-left';
import BottomRight from '../../Decoration/bottom-right';
import Guide from '../Secondary/Guide';
import Footer from '../Secondary/Footer';
import '../../../Styles/Home.css';

export default function RecipesList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredRecipes = [] } = location.state || {};
  const initialTitle = location.state?.title || '';
  const initialRegion = location.state?.region || '';
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState(filteredRecipes);
  const [title, setTitle] = useState(initialTitle);
  const [region, setRegion] = useState(initialRegion);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const scrollToTop = () => {
    const duration = 200;
    const startingY = window.pageYOffset;
    const diff = startingY;
    let start;
  
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startingY - diff * percent);
  
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  };

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

  const handleSectionClick = (id) => {
    navigate(`/recette/`, { state: { id } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#4EABBF"/>
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#4EABBF"/>
      <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#4EABBF"/>
      <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#4EABBF"/>
      <BottomLeft className="absolute z-[-1] bottom-[-230%] left-[0%] w-[10%] h-[70%]" fill="#4EABBF"/>
      <BottomRight className="absolute z-[-1] bottom-[-260%] right-[0%] w-[40%] h-[70%]" fill="#4EABBF"/>
      
      <section className="search-section">
        <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-3" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium"> Meal </label>
            <input
              name="meal"
              className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200"
              placeholder="Tagine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium"> Region </label>
            <input
              name="region"
              className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200"
              placeholder="Morocco"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <button type="submit" className="flex justify-center p-3 mt-11 w-50 h-[30%] text-xl font-medium text-black bg-amber-500 rounded-2xl max-md:px-5 max-md:mt-10" aria-label="Search"> Search </button>
        </form>
      </section>

      <main className="main-content mt-24 mx-14">
        <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full">Filtered Recipes</h2>
        <div className="flex flex-wrap">
          {currentItems.length > 0 ? (
            currentItems.map((recipe, index) => (
            <section
            key={index}
            className="px-8 py-4 mt-10 w-full border border-black border-solid bg-stone-100 rounded-[51px] shadow-[0px_4px_35px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
            onClick={() => handleSectionClick(recipe.id, recipe.image)}
          >
            <div className="flex gap-3 max-md:flex-col max-md:gap-0">
              <figure className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src={recipe.image}
                  alt={recipe.title}
                  className="grow w-[95%] aspect-[1.82] max-md:mt-10 max-md:max-w-full rounded-3xl border"
                />
              </figure>
              <article className="flex flex-col w-[72%] max-md:ml-0 max-md:w-full">
                <header className="flex flex-col max-md:mt-10 max-md:max-w-full">
                  <h2 className="text-3xl text-stone-700">{recipe.title}</h2>
                </header>
                <p className='mt-5'>{recipe.description}</p>
              </article>
            </div>
          </section>
          ))
          ) : (
            <p className="mt-10 text-lg text-gray-600">No recipes found matching your criteria.</p>
          )}
          
        </div>
      </main>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white  hover:bg-blue-600'}`}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white  hover:bg-blue-600'}`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-black bg-gray-200 hover:bg-gray-400'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white  hover:bg-blue-600'}`}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white  hover:bg-blue-600'}`}
        >
          Last
        </button>
      </div>
      <Guide />
      <Footer />
    </>
  );
}
