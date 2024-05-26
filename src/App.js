import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import Wishlist2 from "./Components/Wishlist2";
import { useState } from "react";
import ThemeContext from "./Context/ThemeContext";
import StockContext from "./Context/StockContext";
import UserIdContext from "./Context/UserIdContext";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // State to manage the theme mode (dark/light)
  const [darkMode, setDarkMode] = useState(true);
  
  // State to manage the stock symbol being monitored
  const [stockSymbol, setStockSymbol] = useState("IBM");
  
  // State to manage the user ID
  const [userId, setUserId] = useState("");

  return (
    // Providing theme context to the entire application
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {/* Providing stock context to the entire application */}
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        {/* Providing user ID context to the entire application */}
        <UserIdContext.Provider value={{ userId, setUserId }}>
          {/* Setting up the router for navigation */}
          <Router>
            <Routes>
              {/* Route for the Dashboard component */}
              <Route path="/" exact element={<Dashboard />} />
              {/* Route for the SignIn component */}
              {/* <Route path="/" exact element={<SignIn />} /> */}
              {/* Route for the SignUp component */}
              {/* <Route path="/signUp" exact element={<SignUp />} /> */}
            </Routes>
          </Router>
        </UserIdContext.Provider>
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
