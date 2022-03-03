import React from "react";
import "../CSS/Search.css";

function SearchInput({ onChange, value }) {
  return (
    <div className="box">
      <i className="fa fa-search" aria-hidden="true"></i>
      <input
        value={value}
        onChange={onChange}
        type="text"
        name=""
        placeholder="Search Team..."
      />
    </div>
  );
}

export default SearchInput;
