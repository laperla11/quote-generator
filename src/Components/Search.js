import React from "react";

const Search = props => {
  return <input value={props.searchWord} onChange={props.handleChange} />;
};

export default Search;
