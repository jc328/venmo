import React, { useState, useEffect }from 'react';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { baseUrl } from '../config';
import '../styles/searchbar.css';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    text: {
      primary: 'rgb(0,0,0)'
    }
  }
})

const filterOptions = createFilterOptions({
  limit: 4
});


function Search() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }

    async function test() {
    const response = await fetch(`${baseUrl}/allusers`, requestOptions)
    const newData = await response.json()
    setData(newData.users)
    console.log(newData.users)
    }
    test()

  },[]);
    return (
        <>
            <ThemeProvider theme={theme}>
            <Autocomplete
              className="searchbar"
              options={data}
              filterOptions={filterOptions}
              autoComplete={true}
              getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
              renderInput={(params) => <TextField {...params} size="small" placeholder="Search People" className="searchbar_textfield" variant="outlined" style={{centeerText: 'center'}}
              />}
              renderOption={option => {
                return (
                  <>
                    <img src={option.picUrl} alt="Logo" style={{width:40, borderRadius: 10, marginRight: 10}}/>
                    <div>{option.first_name + ' ' + option.last_name}</div>
                  </>
                )
              }}
            />
            </ThemeProvider>
        </>
    );
}
export default Search;
