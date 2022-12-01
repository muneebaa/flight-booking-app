import React from 'react';
import './style.css';

function Search({ handleSearch }) {
  let arr = ['city', 'country'];
  //   const handleSearch = (event) => {
  //     let value = event.target.value.toLowerCase();
  //     let result = [];
  //     console.log(data);
  //     result = data.filter((i) => {
  //       return (
  //         // i.country.toLowerCase().search(value) != -1 ||
  //         // i.city.toLowerCase().search(value) != -1
  //         arr.map((j) => i.j[i].toLowerCase().search(value) != -1)
  //         // i.company.toLowerCase().search(value) != -1 ||
  //         // i.origin.toLowerCase().search(value) != -1 ||
  //         // i.destination.toLowerCase().search(value) != -1 ||
  //       );
  //     });
  //     setFilteredData(result);
  //   };

  return (
    <div>
      <input
        className='search-input'
        type='text'
        placeholder='Search'
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
}

export default Search;
