import React, { useContext, useState } from "react";
import Card from "./Card";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { green, pink } from "@mui/material/colors";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { mockStockQuote } from "../Constants/mock";
import UserIdContext from "../Context/UserIdContext";
import axios from "axios";
import { fetchQuote } from "../api/stockApi";
import Wishlist2 from "./Wishlist2";

const host = "http://localhost/5555"; // API host URL

const Overview = ({ symbol, price, change, changePercent, currency }) => {
  const { userId, setUserId } = useContext(UserIdContext); // Accessing userId and setUserId from context
  const [userWishlist, setUserWishlist] = useState([]); // State for user's wishlist

  // Event handler for removing a symbol from the wishlist
  const handleRemoveClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${host}/api/remove/${userId}`,
        fetchQuote(symbol)
      ); // Sending HTTP request to remove the symbol from the wishlist
      const result = response.data;
      setUserWishlist(result.wishlist); // Updating the user's wishlist with the updated data
    } catch (error) {
      console.log("Wasn't able to get the wishlist");
      throw new Error("Wasn't able to get the wishlist");
    }
  };

  // Event handler for adding a symbol to the wishlist
  const handleAddClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${host}/api/add/${userId}`,
        fetchQuote(symbol)
      ); // Sending HTTP request to add the symbol to the wishlist
      const result = response.data;
      setUserWishlist(result.wishlist); // Updating the user's wishlist with the updated data
    } catch (error) {
      console.log("Wasn't able to get the wishlist");
      throw new Error("Wasn't able to get the wishlist");
    }
  };

  // Function to check if a symbol is present in the user's wishlist
  const isPresent = async (symbol) => {
    try {
      for (let index = 0; index < userWishlist.length; index++) {
        if (symbol == userWishlist[index]) {
          return true; // Return true if symbol is present in the wishlist
        } else {
          return false; // Return false if symbol is not present in the wishlist
        }
      }
    } catch (error) {
      console.log("Error in traversing through the userWishlist in Overview");
    }
  };

  return (
    <Card>
      {" "}
      {/* Card component */}
      <span className="absolute left-4 top-2 text-neutral-400 text-lg xl:text-xl 2xl:text-xl">
        {symbol} {/* Displaying the symbol */}
      </span>
      <div className="w-full h-full flex items-center justify-around p-5">
        {" "}
        {/* Flex container for price and change */}
        <span className="text-2xl xl:text-xl 2xl:text-4xl flex items-center">
          {" "}
          {/* Price */}${price} {/* Displaying the price */}
          <span className="text-lg xl:text-xl  text-neutal-400 m-2">
            {currency} {/* Displaying the currency */}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl  ${
            change > 0 ? "text-green-400" : "text-red-500"
          }`}
        >
          {" "}
          {/* Change in price */}
          {change} <span>({changePercent}%)</span>{" "}
          {/* Displaying the change and percentage */}
        </span>
      </div>
      <span className="absolute right-2 bottom-2">

        {/* Appltying logic to show the buttons for the addition and removal of the stock into the user wishlist */}
        
        {!isPresent(symbol) && (
          <button onClick={handleRemoveClick} value={symbol}>
            {" "}
            <RemoveCircleIcon
              hover
              sx={{ color: pink[300], ":hover": { color: pink[500] } }}
            />
          </button>
        )}
        {isPresent(symbol) && (
          <button onClick={handleAddClick} value={symbol}>
            <AddCircleIcon
              hover
              sx={{ color: green[300], ":hover": { color: green[500] } }}
            />
          </button>
        )}
      </span>
    </Card>
  );
};

export default Overview;
