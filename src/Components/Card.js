import React, { useContext } from 'react'; 
import ThemeContext from '../Context/ThemeContext'; 



const Card = ({ children }) => {
  // Accessing the darkMode state from ThemeContext
  const { darkMode } = useContext(ThemeContext);

  return (
    // Applying conditional classes based on the darkMode state
    <div className={`w-full h-full rounded-md relative p-8 border-1 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-100"}`}>
      {children}  {/* Rendering any child components or elements passed to Card */}
    </div>
  );
}

export default Card;  
