import * as React from "react";
// import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ThemeContext from "../Context/ThemeContext";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import { green, grey, lime, pink, red } from "@mui/material/colors";
import Card from "./Card";
import { mockStockQuote } from "../Constants/mock";
import { Link } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import UserIdContext from "../Context/UserIdContext";
import axios from "axios";
import { useEffect } from "react";
import { fetchQuote } from "../api/stockApi";
import StockContext from "../Context/StockContext";
import {mockWishlist} from "../Constants/mock"

// axios.defaults.timeout = 5000;

// made a list for the mapping of the required fields from the quote of a stock

const quoteList = {
  "01. symbol": "symbol",
  "05. price": "50000",
  "10. change percent": "",
};

//array of the column field

const columns = [
  { id: "01. symbol", label: "Symbol", minWidth: 275, align: "left" },
  { id: "05. price", label: "Price", minWidth: 175, align: "left" },
  {
    id: "10. change percent",
    label: "Trend",
    minWidth: 250,
    align: "center",
  },

  {
    id: "remove",
    label: "",
    minWidth: 150,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

//API Host
const host = "http://localhost/5555";

const Wishlist2 = () => {
  let rows = [];

  // Bringing in the required context and declaring states
  const [userWishlist, setUserWishlist] = React.useState(mockWishlist);
  const { darkMode } = React.useContext(ThemeContext);
  const { userId } = React.useContext(UserIdContext);
  const { setStockSymbol } = React.useContext(StockContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [wishlistLen, setWishlistLen] = React.useState(true);

  // Remove Wishlist element event handler

  // const handleRemoveClick = async (e) => {
  //   const symbol = e.target.value;
  //   const quote = await fetchQuote(symbol);
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`${host}/api/remove/${userId}`, quote);
  //     const result = response.data;
  //     console.log(result);
  //     setUserWishlist(result.wishlist);
  //     // updateRowData();
  //     //  const response = await fetch(`${host}/api/remove/${userId}`,)
  //   } catch (error) {
  //     console.log("Wasn't able to get the wishlist");
  //     throw new Error("Wasn't able to get the wishlist");
  //   }
  // };

  // function to update the row data when called

 
    // clearing the already stored data in the rows of the wishlist
 
   
      for (var i = 0; i < mockWishlist.length; i++) {
       
        let x = {};
        Object.keys(quoteList).map((item) => {
          x[item] = mockWishlist[i][item];
        });
        rows.push(x);
      }
    

      const handleRemoveClick = ()=>{

      }

  // event handler for the open in new tab button

  const handleOpenInNew = async (e) => {
    const symbol = e.target.value;
    // setStockSymbol(symbol);
  };

  // using use effect to update the data when the site is first logged in by the user or the user changes

  // useEffect(() => {
  //   const initialData = async () => {
  //     try {
  //       // fetching the user
  //       const response = await axios.post(`${host}/api/user/${userId}`);
  //       const user = response.data;
  //       console.log(user);
  //       setUserWishlist(user.wishlist);
  //       console.log(`The user wishlist is: ${user.wishlist}`);
  //       console.log(`The user wishlist is: ${userWishlist}`);
  //       if (userWishlist.length > 0) {
  //         setWishlistLen(true);
  //       }
  //       updateRowData();
  //     } catch (error) {
  //       console.error("Error fetching initial data:", error);
  //       throw new Error("Wasn't able to get the wishlist intitally");
  //     }
  //   };

  //   initialData();
  // }, [userId]);

  // change page and rows per page event handlers

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //declaring the themes of the material ui components

  const darkTheme = createTheme({
    typography: {
      fontFamily: "Quicksand, sans-serif",
    },
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    typography: {
      fontFamily: "Quicksand, sans-serif",
    },
    palette: {
      mode: "light",
    },
  });

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-7 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-3  row-span-1 flex flex-col justify-start items-center ">
        <h1 className="text-5xl xl:px-32">Your Wishlist</h1>
      </div>

      <div className="col-span-3 row-span-7">
        <Card>
          {/* When the wishlist of the user is not empty  */}
          {wishlistLen && (
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead
                      sx={
                        darkMode
                          ? {
                              "& .MuiTableCell-head": {
                                backgroundColor: "#6D67D4",
                                color: grey[50],
                                fontSize: "18px",
                                fontWeight: "bold",
                              },
                            }
                          : {
                              "& .MuiTableCell-head": {
                                backgroundColor: "#6208EB",
                                color: grey[50],
                              },
                            }
                      }
                    >
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                const removeCol = column.id === "remove";
                                const trendCol =
                                  column.id === "10. change percent";

                                if (removeCol) {
                                  return (
                                    <TableCell>
                                      <div className=" flex justify-around items-center">
                                        <button
                                          onClick={handleRemoveClick}
                                          value={row["01. symbol"]}
                                        >
                                          {" "}
                                          <RemoveCircleIcon
                                            hover
                                            sx={{
                                              color: pink[300],
                                              ":hover": { color: pink[500] },
                                            }}
                                          />
                                        </button>
                                        <button
                                          onClick={handleOpenInNew}
                                          value={row["01. symbol"]}
                                        >
                                          <OpenInNewIcon />
                                        </button>
                                      </div>
                                    </TableCell>
                                  );
                                } else {
                                  if (trendCol) {
                                    return (
                                      <TableCell
                                        sx={
                                          value[0] === "-"
                                            ? { color: red.A400 }
                                            : { color: green.A400 }
                                        }
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  } else {
                                  }
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                }
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </ThemeProvider>
          )}
          {/* When the wishlist of the user is empty  */}
          {!wishlistLen && (
            <div className="w-full h-full flex justify-center items-center font-quicksand">
              <h2>
                Your Wishlist is currently empty. Add some stocks to view your
                wishlist
              </h2>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Wishlist2;
