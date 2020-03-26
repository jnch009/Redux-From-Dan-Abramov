import React from "react";

// Presentational Component
// children is simply what is inside the component
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;
