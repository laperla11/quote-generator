import React from "react";

const Button = props => {
  const { handleClick, style, content } = props;
  return (
    <button onClick={handleClick} style={style}>
      {content}
    </button>
  );
};

export default Button;
