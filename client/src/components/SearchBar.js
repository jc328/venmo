import React, { useState, useEffect }from 'react';
// import SearchBar from "material-ui-search-bar";
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
              autoComplete={true}
              getOptionLabel={(option) => option.first_name}
              renderInput={(params) => <TextField {...params} size="small" placeholder="Search People" className="searchbar_textfield" variant="outlined"
              />}
            />
            </ThemeProvider>
        </>
    );
}
export default Search;
