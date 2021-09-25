import React from "react";

function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <div className="row-search">
      <img src="/icons/search2.svg" alt="" />
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default ColumnFilter;
