import React, { useState } from 'react';
import { Header, WithHeaderMargin } from '@common';
import { Home } from '@pages';

const Homepage = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <WithHeaderMargin>
        <Home searchValue={searchValue} />
      </WithHeaderMargin>
    </>
  );
};

export default Homepage;
