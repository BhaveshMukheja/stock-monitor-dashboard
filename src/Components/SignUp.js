import React, { useContext, useState } from 'react';
import stockMarket from '../Images/stockMarket.jpg';
import MonitorHeart from '@mui/icons-material/MonitorHeart';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserIdContext from '../Context/UserIdContext';

// Define the host for API requests
const host = "http://localhost:5555";

const SignUp = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" }); // State for form inputs
  const { setUserId } = useContext(UserIdContext); // Context to manage user ID

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const { name, email, password } = credentials;

    try {
      // Send POST request to sign up API
      const response = await axios.post(`${host}/api/signup`, { name, email, password });
      const json = response.data;

      console.log(json); // Log the response
      setUserId(json.user.id); // Set user ID in context
      console.log(`Welcome Aboard ${name}!!!`);
      navigate("/dashboard"); // Navigate to dashboard

    } catch (error) {
      console.error('Error during sign-up:', error); // Log errors
      console.log("Invalid Credentials");
    }
  };

  // Handler for input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); // Update state with new input values
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row">
        {/* Left section with image */}
        <div className="flex h-screen w-1/2">
          <img src={stockMarket} alt="Stock Market" className="object-cover" />
        </div>
        {/* Right section with sign-up form */}
        <section className="w-1/2 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* Header with logo and title */}
            <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <MonitorHeart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                STOCK MONITOR
              </Typography>
            </p>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* Form title */}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                {/* Sign-up form */}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Firstname Surname"
                      required
                      value={credentials.name}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                      value={credentials.email}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={credentials.password}
                      onChange={onChange}
                      minLength={8}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={credentials.cpassword}
                      onChange={onChange}
                      minLength={8}
                    />
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In here</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;
