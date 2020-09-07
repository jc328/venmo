import React, { useState, useEffect }from 'react';
import { useSelector } from 'react-redux';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { baseUrl } from '../config';
import '../styles/searchbar.css';
import TransactionSearch from './TransactionSearch.js'

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
  const userId = useSelector((state) => state.authentication.user.id);
  const balance = useSelector((state)=> state.authentication.user.balance);
  const [newBalance, setNewBalance] = useState(balance)
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(false)

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
    }
    test()
  },[]);

  function handleSubmit(e) {
    e.preventDefault();
    setForm(true)
  }
    return (
        <>
            <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
            <Autocomplete
              className="searchbar"
              options={data}
              filterOptions={filterOptions}
              clearOnBlur={true}
              clearOnEscape={true}
              autoSelect={true}
              onChange={(e, value) => {setSearch(value)}}
              noOptionsText="No Person Found"
              getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
              renderInput={(params) => <TextField {...params} size="small" placeholder="Search People" className="searchbar_textfield" variant="outlined" style={{centerText: 'center'}}
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
            </form>
            <TransactionSearch
              form={form}
              setForm={setForm}
              userId={userId}
              friendId={search.id}
              balance={newBalance}
              newBalance={newBalance => setNewBalance(newBalance)}
              />
            </ThemeProvider>
        </>
    );
}
export default Search;
