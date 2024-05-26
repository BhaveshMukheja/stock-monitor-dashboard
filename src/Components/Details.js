import React, { useContext } from 'react';  
import Card from './Card';  
import { mockCompanyDetials, mockSearchResults } from '../Constants/mock';  
import ThemeContext from '../Context/ThemeContext';  



const Details = () => {
    const { darkMode } = useContext(ThemeContext);  // Accessing darkMode state from ThemeContext
     // Accessing userId state from StockContext


    // Object containing details to display and their corresponding labels
    const detailsList =  {
        Name: "Name",
        Country: "Country",
        Currency: "Currency",
        Exchange: "Exchange",
        Sector: "Sector",
        DividendDate: "Dividend Date",
        MarketCapitalization: "Market Capitalization",
        Industry: "Industry"
    };

    // Function to convert market capitalization from millions to billions
    const convertMilliontoBillion = (number) => {
        return (number / Math.pow(10, 11)).toFixed(2);
    };

    return (
        // Wrapping details in a Card component
        <Card>
            {/* Creating a list of details */}
            <ul className={`w-full h-full flex flex-col justify-between divide-y-1 ${darkMode ? "divide-gray-800" : null}`}>
                {Object.keys(detailsList).map((item )=>{
                    return (
                        // Rendering each detail item with its label and value
                        <li key={item} className='flex-1 flex justify-between items-center'>
                            <span>{detailsList[item]}</span>  {/* Displaying the label */}
                            <span>
                                {item === "MarketCapitalization" ?  // Checking if it's MarketCapitalization
                                    `${convertMilliontoBillion(mockSearchResults[1][item])} B` :  // If true, convert to billions
                                    mockSearchResults[1][item]}  {/* Displaying the value */}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
}

export default Details; 