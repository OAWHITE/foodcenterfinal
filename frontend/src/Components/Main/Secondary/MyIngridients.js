import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../Styles/MyIngridients.css';

export default function MyIngridients({ query, type, onGenerate }) {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    filterIngredients();
  }, [query, type, ingredients]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const filterIngredients = () => {
    let filtered = ingredients;

    if (query) {
      filtered = filtered.filter(ingredient =>
        ingredient.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter(ingredient => ingredient.type === type);
    }

    setFilteredIngredients(filtered);
  };

  const handleSelectIngredient = (id) => {
    setSelectedIngredients(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(ingredientId => ingredientId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, 2, 3);
      if (currentPage > 5) {
        pageNumbers.push('...');
      }
      if (currentPage > 4 && currentPage < totalPages - 3) {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
      if (currentPage < totalPages - 3) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(number)}
        disabled={number === '...' || number === currentPage}
        className={`mx-2 px-3 py-1 rounded ${number === currentPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-black hover:bg-gray-400'}`}
      >
        {number}
      </button>
    ));
  };

  return (
    <>
    <div className="ingredients-container">
      {currentItems.map(ingredient => (
        <div key={ingredient.id} className="ingredient-card">
          <input
            type="checkbox"
            checked={selectedIngredients.includes(ingredient.id)}
            onChange={() => handleSelectIngredient(ingredient.id)}
          />
          <img src={ingredient.image} alt={ingredient.name} className="ingredient-image h-[80%]" />
          <h3>{ingredient.name}</h3>
        </div>
      ))}
      <div className="d-block justify-center mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
      <button type="button" className="d-block justify-center mx-auto py-3 mt-12 w-[15%] text-xl font-medium text-black bg-green-500 rounded-2xl max-md:px-5 max-md:mt-10" aria-label="Generate" onClick={() => onGenerate(selectedIngredients)}>
        Generate Recipes
      </button>
      </>
  );
}
