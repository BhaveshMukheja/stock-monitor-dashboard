import * as React from 'react';  
import { useState, useContext, useEffect } from 'react';   
import Card from './Card';  
import ChartFilter from './ChartFilter'; 
import Dropdown from "./Dropdown";  
import Calender from "./Calender";  
import dayjs from 'dayjs';  
import { LineChart } from '@mui/x-charts/LineChart';  
import { LinePlot, MarkPlot, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';  
import { interval, infoTypeColorList } from '../Constants/config';  
import ThemeContext from '../Context/ThemeContext';  
import StockContext from '../Context/StockContext'; 
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';  
import { fetchHistorialData } from '../api/stockApi'; 
import UserIdContext from '../Context/UserIdContext';
import { mockHistoricalData } from '../Constants/mock';

const Chart = () => {
  // Accessing darkMode state from ThemeContext
  const { darkMode } = useContext(ThemeContext);
  // Accessing stockSymbol state from StockContext
  const { stockSymbol } = useContext(StockContext);
 // Accessing userId state from StockContext
  const {userId} = useContext(UserIdContext)

  // Creating dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  // Creating light theme configuration
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  // Data arrays for chart labels and values
  let uData = [];
  let xLabels = [];

  // State for filtering information type (e.g., close price)
  const [infoTypeFilter, setInfoTypeFilter] = useState("4. close");

  // State for filtering interval (e.g., 5 minutes)
  const [intervalFilter, setIntervalFilter] = useState("60");
  // State for storing fetched data
  const [data, setData] = useState(mockHistoricalData["Time Series (60min)"]);

  // State for storing the selected date value
  const [dateValue, setDateValue] = useState(dayjs());

 
        
          console.log("I am here updating the chart data ");
          xLabels = [];
          uData = [];
          // Updating chart data with fetched values
          Object.keys(data).map((item) => {
            xLabels.push(item);
            uData.push(data[item][infoTypeFilter]);
          });
        
     

  // Effect hook to fetch and update chart data whenever dependencies change
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("I am here fetching the historical data ");

  //     try {
  //       // Formatting the date to 'YYYY-MM'
  //       const formattedDate = dateValue.format('YYYY-MM');
  //       // Fetching historical data
  //       const result = await fetchHistorialData(stockSymbol, intervalFilter, formattedDate);
  //       setData(result[`Time Series (${intervalFilter}min)`]);
  //     } catch (error) {
  //       console.log(error);
  //       setData('{}');
  //     }
  //   };

  //   const updateChartData = async () => {
  //     try {
  //       console.log("I am here updating the chart data ");
  //       xLabels = [];
  //       uData = [];
  //       // Updating chart data with fetched values
  //       Object.keys(data).map((item) => {
  //         xLabels.push(item);
  //         uData.push(data[item][infoTypeFilter]);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  //   updateChartData();
  // }, [stockSymbol, intervalFilter, dateValue, userId]);

  return (
    <Card>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <div className="w-full flex flex-row absolute top-1 left-0 justify-between items-center z-40 gap-x-2">
          <Dropdown infoTypeFilter={infoTypeFilter} setInfoTypeFilter={setInfoTypeFilter} />
          <Calender setDateValue={setDateValue} />
          <ul className='flex top-2 right-2 z-40'>
            {Object.keys(interval).map((item) => {
              return (
                <li key={item}>
                  <ChartFilter
                    text={item}
                    active={intervalFilter === item}
                    onClick={() => {
                      setIntervalFilter(item);
                      // setData(mockHistoricalData[`Time Series (${intervalFilter}min)`])
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <LineChart
          className='absolute'
          colors={[infoTypeColorList[infoTypeFilter]]}
          series={[{ data: uData, showMark: false }]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              stroke: `${infoTypeColorList[infoTypeFilter]}`,
              strokeWidth: 2,
            },
            [`& .${markElementClasses.root}`]: {
              stroke: `${infoTypeColorList[infoTypeFilter]}`,
              scale: '0.6',
              fill: '#fff',
              strokeWidth: 2,
            },
          }}
          disableAxisListener
        />
        <LinePlot />
        <MarkPlot />
      </ThemeProvider>
    </Card>
  );
}

export default Chart;
