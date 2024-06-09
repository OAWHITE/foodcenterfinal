import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import BestMeals from './BestMeals';
import CelebritiesFav from './CelebritiesFav';
import Fitness from './Fitness';
import MyFridge from './MyFridge';
import Navbar from './Secondary/Navbar';
import AddRecipes from '../Add/AddRecipes';
import RecipeDetail from './Secondary/RecipeDetail';
import RecipesList from './Secondary/RecipesList';
import AddCelebrity from '../Add/AddCelebrity';
import CelebrityDetail from './Secondary/CelebrityDetail';
import Recettes from "./Secondary/Recettes";
import Recette from "./Secondary/Recette";
import AboutUs from "./AboutUs";
import AddIngredient from "../Add/AddIngredient";
import IngredientDetails from './Secondary/NewMyIngridients';
import IngredientsSearch from './Secondary/IngredientsSearch';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../Styles/Navbar.css';
import CelebrityDetails from './Secondary/CelebrityDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userDetails'); // Remove user details
    setIsLoggedIn(false);
    setUserRole('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} userRole={userRole} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/best-meals" element={<BestMeals />} />
        <Route path="/celebrities-fav" element={<CelebritiesFav />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/my-fridge" element={<MyFridge />} />
        <Route path="/addrecipes" element={<AddRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Ensure this route points to RecipeDetail */}
        <Route path="/recipeslist" element={<RecipesList />} />
        <Route path="/addcelebrity" element={<AddCelebrity />} />
        <Route path="/about-us" element={<AboutUs />}>About us</Route>
        <Route path="/celebrity/:id" element={<CelebrityDetail />} />
        <Route path="/recettes" element={<Recettes />}>recettes</Route>
        <Route path="/recette" element={<Recette />}>recette</Route>
        <Route path="/addingredient" element={<AddIngredient />}>Add Ingredient</Route>
        <Route path="/CelebrityDetails" element={<CelebrityDetails />}>Celebrity Details</Route>
        <Route path="/ingredients-search" element={<IngredientsSearch />} > ingredients search</Route>

        <Route path="/ingredient/:id" element={<IngredientDetails />} >Ingredient Details </Route>

      </Routes>
    </Router>
  );
}

export default App;
