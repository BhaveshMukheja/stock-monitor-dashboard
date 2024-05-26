import * as React from 'react'; 
import InputLabel from '@mui/material/InputLabel';  
import MenuItem from '@mui/material/MenuItem';  
import FormControl from '@mui/material/FormControl';  
import Select from '@mui/material/Select';  
import { infoType } from '../Constants/config';  
import { typography } from '@mui/system';  

export default function Dropdown({infoTypeFilter, setInfoTypeFilter}) {
  // Event handler for dropdown value change
  const handleChange = (event) => {
    setInfoTypeFilter(event.target.value);
  };

  return (
    // Form control for dropdown with custom styling
    <FormControl sx={{ m: 1, minWidth: 120}} size="small">
      <InputLabel id="demo-select-small-label">Info</InputLabel>  {/* Label for dropdown */}
      <Select
        labelId="demo-select-small-label"  
        id="demo-select-small" 
        value={infoTypeFilter}  
        label={infoTypeFilter}  
        onChange={handleChange}  
      >
        {/* Mapping through infoType constant to create dropdown options */}
        {Object.keys(infoType).map((item)=>{
            return(
                <MenuItem key={item} value={item}>{item}</MenuItem> 
            );
        })}
      </Select>
    </FormControl>
  );
}
