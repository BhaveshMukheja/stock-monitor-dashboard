import Card from "./Card";  
import Header from "./Header"; 
import React, { useContext, useEffect, useState } from 'react'; 
import Details from "./Details";  
import Overview from "./Overview";  
import Chart from "./Chart";  
import { mockCompanyDetials, mockHistoricalData , mockStockQuote, mockSearchResults} from "../Constants/mock";  
import ThemeContext from "../Context/ThemeContext";  
import StockContext from "../Context/StockContext";  
import UserIdContext from "../Context/UserIdContext";
import { fetchHistorialData, fetchQuote, fetchStockDetails } from "../api/stockApi";  
import Navbar from "./Navbar"; 
import Wishlist2 from "./Wishlist2";  

const Dashboard = () => {
  // Accessing darkMode state from ThemeContext
  const { darkMode } = useContext(ThemeContext);
  // Accessing stockSymbol state from StockContext
  const { stockSymbol } = useContext(StockContext);
   // Accessing userId state from StockContext
   const {userId} = useContext(UserIdContext)

  // State variables for stock details and quote
  // const [stockDetails, setStockDetails] = useState({});
  // const [quote, setQuote] = useState({});

  // useEffect hook to fetch stock details and quote when stock symbol changes
  // useEffect(() => {
  //   // Function to fetch stock details
  //   const updateStockDetails = async () => {
  //     try {
  //       console.log("Fetching stock details in Dashboard");
  //       const result = await fetchStockDetails(stockSymbol);
  //       setStockDetails(result);
  //     } catch (error) {
  //       setStockDetails({});
  //       console.log(error);
  //     }
  //   }

  //   // Function to fetch stock quote
  //   const updateStockQuote = async () => {
  //     try {
  //       console.log("Fetching stock quote in Dashboard");
  //       const result = await fetchQuote(stockSymbol);
  //       setQuote(result);
  //     } catch (error) {
  //       setQuote({});
  //       console.log(error);
  //     }
  //   }

  //   updateStockDetails();
  //   updateStockQuote();
  // }, [stockSymbol, userId]);

  return (
    <>
      {/* Navbar component */}
      <Navbar/>

      {/* Dashboard layout */}
      <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 pt-2 pb-24 font-quicksand ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}>
        {/* Header section */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex flex-col justify-start items-center">
          {/* Header component */}
          <Header name={mockSearchResults[1]["Name"]}/>
        </div>

        {/* Chart section */}
        <div className="md:col-span-2 row-span-4">
          {/* Chart component */}
          <Chart />
        </div>

        {/* Overview section */}
        <div>
          {/* Overview component */}
          <Overview symbol={mockStockQuote[1]["01. symbol"]} price={mockStockQuote[1]["05. price"]} change={mockStockQuote[1]["09. change"]} changePercent={mockStockQuote[1]["10. changePercent"]} currency={mockSearchResults[1]["Currency"]}/>
        </div>

        {/* Details section */}
        <div className="row-span-3 xl:row-span-3">
          {/* Details component */}
          <Details />
        </div>
      </div>

      {/* Wishlist component */}
      <Wishlist2 />
    </>
  );
}

export default Dashboard;
