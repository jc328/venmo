import React, { useState, useEffect }from 'react';
import { baseUrl } from '../config';
import { Search } from 'semantic-ui-react';

function SearchSem() {
  const test = [
    {
        title: "Hello",
        // ... whatever other fields
    },
    {
      title: 'John',
      description: 'lastname'
    }
]

  const [data, setData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }

    async function test() {
    const reponse = await fetch(`${baseUrl}/`, requestOptions)
    const newData = await reponse.json()
    setData(newData.users)
    console.log(newData.users)
    }
    test()

  },[]);
    return (
        <>
        <Search data={test} />
        </>
    );
}

export default SearchSem;
