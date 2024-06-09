// Navbar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../Styles/Navbar.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
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
                        {userRole === 'Admin' && (
                            <>
                                <NavLink to="/addrecipes" className="Nav-item" activeClassName="active">Add Recipes</NavLink>
                                <NavLink to="/addcelebrity" className="Nav-item" activeClassName="active">Add Celebrity</NavLink>
                                <NavLink to="/addingredient" className="Nav-item" activeClassName="active">Add Ingredient</NavLink>
                            </>
                        )}
                        {/* <button onClick={handleLogoutClick} className="Nav-item">Logout</button> */}
                        <CDropdown className='ml-24' isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <CDropdownToggle>
                                <FaUser />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>
                                    <FaSignOutAlt />
                                    <button onClick={handleLogoutClick} style={{ backgroundColor: "transparent" }}> Déconnexion </button>
                                </CDropdownItem>
                                <CDropdownItem href='Configuration'>Configuration</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="Nav-item" activeClassName="active">Login</NavLink>
                        <NavLink to="/signup" className="Nav-item" activeClassName="active">Signup</NavLink>
                    </>
                )}
                <LanguageSelector />
            </nav>
        </div>
    );
}
