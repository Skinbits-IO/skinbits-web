import { useState } from 'react';
import { Filter } from './filter';
import { Header } from './header';

export const Search = () => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <>
      <Header
        filterActive={openFilter}
        onFilterTap={() => setOpenFilter(!openFilter)}
      />
      {openFilter && <Filter />}
    </>
  );
};
