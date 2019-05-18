import React from "react";

const Quote = props => {
  return (
    <div style={divStyle}>
      <p>"{props.quote.quote}"</p>
      <h3>by {props.quote.author}</h3>
    </div>
  );
};

const divStyle = {
  border: "2px solid black",
  borderRadius: "5px",
  padding: "0 10px",
  marginBottom: "10px"
};

export default Quote;
