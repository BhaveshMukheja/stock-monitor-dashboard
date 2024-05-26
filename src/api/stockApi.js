// This file contains the api requests to the Alpha Vantage to fetch the stockDetails, Quote, and Historical data

// Base URL for the Alpha Vantage API
const basePath = 'https://www.alphavantage.co/query?'

// Function to fetch detailed stock information
export const fetchStockDetails = async(query) => {
    // Constructing the URL for the API request
    const url = `${basePath}function=OVERVIEW&symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    
    // Making the API request
    const response = await fetch(url);

    // Checking if the response is not OK (status code not in the range 200-299)
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message); // Throwing an error if the response is not OK
    }

    // Parsing the response as JSON and returning it
    return await response.json();
}

// Function to fetch the latest stock quote
export const fetchQuote = async(stockSymbol) => {
    // Constructing the URL for the API request
    const url = `${basePath}function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY}`
    
    // Making the API request
    const response = await fetch(url);

    // Checking if the response is not OK (status code not in the range 200-299)
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message); // Throwing an error if the response is not OK
    }

    // Parsing the response as JSON and returning it
    return await response.json();
}

// Function to fetch historical stock data
export const fetchHistorialData = async(stockSymbol, interval, month) => {
    // Constructing the URL for the API request
    const url = `${basePath}function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&month=${month}&interval=${interval}min&apikey=${process.env.REACT_APP_API_KEY}`
    
    // Making the API request
    const response = await fetch(url);

    // Checking if the response is not OK (status code not in the range 200-299)
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message); // Throwing an error if the response is not OK
    }

    // Parsing the response as JSON and returning it
    return await response.json();
}
