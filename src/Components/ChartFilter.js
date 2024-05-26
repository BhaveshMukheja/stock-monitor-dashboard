import { buttonGroupClasses } from '@mui/material';
import React from 'react';
import { tailwindChartColorConfig } from '../Constants/config';

const ChartFilter = ({ text, active, onClick }) => {
  return (
    // Button element with dynamic classes based on the 'active' prop
    <button 
      onClick={onClick}  // Event handler for button click
      className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer 
      ${active ? "bg-indigo-600 border-indigo-700 text-gray-100" : "bg-indigo-400 text-white"} 
      transition duration-200 hover:bg-indigo-600 hover:text-gray-100 hover:border-indigo-700`}
    >
      {text}m  {/* Displaying the text prop followed by 'm' */}
    </button>
  );
}

export default ChartFilter;
