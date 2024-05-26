import React, { useContext } from 'react';  
import ThemeContext from '../Context/ThemeContext';  
import StockContext from '../Context/StockContext';  


const SearchResults = ({ results }) => {  //prop from the Search Component
  const { darkMode } = useContext(ThemeContext);  // Accessing darkMode state from ThemeContext
  const { setStockSymbol } = useContext(StockContext);  // Accessing setStockSymbol function from StockContext

  return (
    <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar-dark" : "bg-white border-neutral-200 custom-scrollbar"}`}>  {/* Container for search results */}
      {results.map((item) => {
        return (
          <li
            onClick={() => setStockSymbol(item.Symbol)}  // Correctly setting the onClick handler
            key={item.Symbol}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"} transition duration-300`}
          >
            <span>{item.Symbol}</span>  {/* Displaying the stock symbol */}
            <span>{item.Name}</span>  {/* Displaying the stock name */}
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults; 
