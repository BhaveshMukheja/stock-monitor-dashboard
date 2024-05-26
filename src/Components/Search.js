import React, { useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CrossIcon from '@mui/icons-material/CancelSharp';
import { yellow } from '@mui/material/colors';
import SearchResults from './SeacrhResults'
import ThemeContext from '../Context/ThemeContext';
import { fetchStockDetails } from '../api/stockApi';
import StockContext from '../Context/StockContext';
import { mockSearchResults } from '../Constants/mock';

const Search = () => {
    const { darkMode } = useContext(ThemeContext); // Accessing darkMode state from ThemeContext
    const { setStockSymbol } = useContext(StockContext); // Accessing setStockSymbol function from StockContext
    const [input, setInput] = useState(""); // State for the search input
    const [bestMatches, setBestMatches] = useState(mockSearchResults); // State for the search results

    // Function to clear the search input and results
    const clear = () => {
        setInput("");
        // setBestMatches([]);
    };

    // Function to update the search results based on the input
    // const updateBestMatches = async () => {
    //     try {
    //         if (input) {
    //             const sym = input.toUpperCase();
    //             setStockSymbol(sym);
    //             const stockDetails = await fetchStockDetails(sym); // Fetch stock details based on the input
    //             setBestMatches([stockDetails]); // Update bestMatches with the fetched stock details
    //         }
    //     } catch (error) {
    //         setBestMatches([]);
    //         console.log(error);
    //     }
    // };

    return (
        <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
            <input
                type="text"
                value={input}
                className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`}
                placeholder='Search stock...'
                onChange={(event) => setInput(event.target.value)} // Update input state on change
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        // updateBestMatches(); // Update bestMatches on Enter key press
                    }
                }}
            />
            {input && (
                <button className='m-1' onClick={clear}>
                    <CrossIcon className='h-4 w-4' />
                </button>
            )}
            <button  className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400'>
                <SearchIcon sx={{ color: yellow[50] }} />
            </button>
            {input && bestMatches.length > 0 && (
                <SearchResults results={bestMatches} /> // Display search results if input is not empty and there are results
            )}
        </div>
    );
}

export default Search;
