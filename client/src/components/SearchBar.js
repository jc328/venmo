import React from 'react';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";


function Search() {
    return (
        <>
          <ThemeProvider theme={theme}>
            <SearchBar placeholder="Search People" style={{height:25}}/>
          </ThemeProvider>
        </>
    );
}
export default Search;
