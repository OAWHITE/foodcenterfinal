import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../../Styles/Form.css";
import Background from "../Decoration/Background";
import TopLeft from "../Decoration/top-left";
import TopRight from "../Decoration/top-right";
import BottomLeft from "../Decoration/bottom-left";
import BottomRight from "../Decoration/bottom-right";

export default function Login({ setIsLoggedIn, setUserRole, setUserDetails }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.token) {
        setErrorMessage('');
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', response.data.token);
        setRedirect(true);

        const { height, weight, role } = response.data.user;
        localStorage.setItem('userRole', role);
        localStorage.setItem('userDetails', JSON.stringify({ height, weight }));
        setUserRole(role);
        setUserDetails({ height, weight });
        
        navigate('/home');
      } else {
        setErrorMessage('Incorrect credentials. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage('Error logging in: ' + JSON.stringify(error.response.data));
      } else {
        setErrorMessage('Error logging in. Please try again.');
      }
    }
  };

  if (redirect) {
    navigate('/home');
  }

  return (
    <>
      <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[25%] h-[30%]" fill="#00BFFF" />
      <TopRight className="absolute z-[-1] top-[0] right-[0] w-[25%] h-[30%]" fill="#00BFFF" />
      <Background />
      <BottomLeft className="absolute z-[-1] bottom-[0%] left-[0%] w-[10%] h-[40%]" fill="#00BFFF" />
      <BottomRight className="absolute z-[-1] bottom-[0%] right-[0%] w-[20%] h-[20%]" fill="#00BFFF" />
      <main className="main-container">
        <section className="content-section">
          <div className="content-wrapper">
            <div className="text-content">
              <h1 className="title">Great to have you back!</h1>
              <p className="description">You can sign in to Food center with your existing account.</p>
            </div>
          </div>
        </section>
      </main>
      <div>
        <form className="login-form bg-white bg-opacity-75" onSubmit={handleSubmit}>
          <label className="login-form-label"> E-mail </label>
          <input
            type="email"
            name="email"
            className="login-form-input"
            placeholder="foodcenter@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
          <label className="login-form-label"> Password </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="login-form-input"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 
              <i className="fas fa-eye-slash show-pass"></i> :
              <i className="fas fa-eye show-pass"></i>}
          </button> 
          <label className="login-form-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={handleRememberChange}
            /> Remember Me
          </label>
          <button type="submit" className="submit-button" > Log in </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="login-form-signup">
            <span>New here?</span>
            <Link className="login-signup-link" to="/signup">Create a new account</Link>
          </div>
        </form>
      </div>
    </>
  );
}
