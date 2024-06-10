// Navbar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../Styles/Navbar.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { FaCog, FaPlus, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';

const LanguageSelector = () => (
    <div className="language-select">
        <div className="language">En</div>
        <i className="fa fa-caret-down"></i>
    </div>
);

export default function Navbar({ isLoggedIn, handleLogout, userRole }) {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='Nav-bar mt-5'>
            <h1 className='Logo'>Food Center</h1>
            <nav className='Nav-items'>
                <NavLink to="/Home" className="Nav-item" activeClassName="active">Home</NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink to="/Best-Meals" className="Nav-item" activeClassName="active">Best Meals</NavLink>
                        <NavLink to="/Celebrities-Fav" className="Nav-item" activeClassName="active">Celebrities Fav</NavLink>
                        <NavLink to="/Fitness" className="Nav-item" activeClassName="active">Fitness</NavLink>
                        <NavLink to="/My-Fridge" className="Nav-item" activeClassName="active">My Fridge</NavLink>
                        <NavLink to="/About-Us" className="Nav-item" activeClassName="active">About Us</NavLink>
                        <CDropdown alignment="end" className='ml-56' isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <CDropdownToggle className='d-flex bg-white'>
                                <FaUser className='d-flex'/>
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem className='d-flex'>
                                    <FaSignOutAlt className='mt-1 mr-1'/>
                                    <button onClick={handleLogoutClick} style={{ backgroundColor: "transparent" }}> Déconnexion </button>
                                </CDropdownItem>
                                <CDropdownItem href='/Configuration' className='d-flex'>
                                    <FaCog className='mt-1 mr-1'/>
                                    Configuration
                                </CDropdownItem>
                                {userRole === 'Admin' && (
                                    <>
                                        <CDropdownItem href='/AddRecipes' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            Add Recipes
                                        </CDropdownItem>
                                        <CDropdownItem href='/AddCelebrity' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            Add Celebrity
                                        </CDropdownItem>
                                        <CDropdownItem href='/AddIngredient' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            Add Ingredient
                                        </CDropdownItem>
                                        <CDropdownItem href='/addrecipeingredient' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            ingedient Recipes
                                        </CDropdownItem>
                                        <CDropdownItem href='/admin-recipeslist' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            manage Recipes
                                        </CDropdownItem>
                                        <CDropdownItem href='/list-celebrities' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            manage Celebrities
                                        </CDropdownItem>
                                        <CDropdownItem href='/list-ingredients' className='d-flex'>
                                            <FaPlus className='mt-1 mr-1'/>
                                            manage Ingredients
                                        </CDropdownItem>
                                    </>
                                )}
                            </CDropdownMenu>
                        </CDropdown>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="Nav-item" activeClassName="active">Login</NavLink>
                        <NavLink to="/signup" className="Nav-item" activeClassName="active">Signup</NavLink>
                    </>
                )}
                {/* <LanguageSelector /> */}
            </nav>
        </div>
    );
}
