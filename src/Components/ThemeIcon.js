import React, { useContext } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThemeContext from '../Context/ThemeContext';

const ThemeIcon = () => {
  // Use ThemeContext to access dark mode state and setter function
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // Button to toggle dark mode, with conditional styling
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg ${
        darkMode ? 'shadow-gray-800' : null
      } transition duration-300 hover:scale-105`}
      onClick={toggleDarkMode}
    >
      {/* Dark mode icon with conditional styling */}
      <DarkModeIcon
        className={`h-8 w-8 cursor-pointer stroke-1 ${
          darkMode ? 'fill-yellow-400 stroke-yellow-400' : 'fill-none stroke-neutral-400'
        }`}
      />
    </button>
  );
};

export default ThemeIcon;
