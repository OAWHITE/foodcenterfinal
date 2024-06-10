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
import AdminRecipesList from './Secondary/AdminRecipesList';
import AddCelebrity from '../Add/AddCelebrity';
import CelebrityDetail from './Secondary/CelebrityDetail';
import Recettes from "./Secondary/Recettes";
import Recette from "./Secondary/Recette";
import AboutUs from "./AboutUs";
import AddIngredient from "../Add/AddIngredient";
import IngredientDetails from './Secondary/IngredientDetails';
import IngredientsSearch from './Secondary/IngredientsSearch';
import EditRecipe from './Secondary/EditRecipe';

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
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/recipeslist" element={<RecipesList />} />
                <Route path="/admin-recipeslist" element={<AdminRecipesList />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} />
                <Route path="/addcelebrity" element={<AddCelebrity />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/celebrity/:id" element={<CelebrityDetail />} />
                <Route path="/recettes" element={<Recettes />} />
                <Route path="/recette" element={<Recette />} />
                <Route path="/addingredient" element={<AddIngredient />} />
                <Route path="/CelebrityDetails" element={<CelebrityDetails />} />
                <Route path="/ingredients-search" element={<IngredientsSearch />} />
                <Route path="/ingredient/:id" element={<IngredientDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
