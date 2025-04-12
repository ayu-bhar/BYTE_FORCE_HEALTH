import React, { useState } from 'react'
import './styles/SearchBar.css'
const SearchBar = ({onSearch}) => {
  const [inputValue, setValue] = useState('');

  const handleInput = (event)=>{
    setValue(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };


  return (
    <div className='searchContainer'>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search Hospitals'
        onChange={handleInput}
        value={inputValue}
      />
      <input type='submit' value='Search' />
    </form>
  </div>
  )
}

export default SearchBar
