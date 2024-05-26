import * as React from 'react';  
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  
import dayjs from 'dayjs';



export default function Calendar({ setDateValue }) {
  return (
    // Providing the date adapter to the DatePicker component
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        {/* Configuring the DatePicker component */}
        <DatePicker
          label={'Select the month and year'}  // Label for the DatePicker
          views={['month', 'year']}  // Setting the views to month and year only
          disableFuture  // Disabling future dates
          defaultValue={dayjs()}  // Setting the default value to the current date
          onChange={(newValue) => setDateValue(newValue)}  // Handling the date change event
          inputFormat={"YYYY-MM"}  // Setting the input format for the date
          sx={{ width: "10px" }}  // Applying custom styles
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
