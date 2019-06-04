import React from "react";

const Filter = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
