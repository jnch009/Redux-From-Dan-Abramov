import React from "react";
import { NavLink } from "react-router-dom";

const FilterLink = ({ filter, children }) => (
  <NavLink
    exact
    to={filter === "all" ? "" : filter}
    activeStyle={{
      textDecoration: "none",
      color: "black",
      cursor: "default"
    }}
  >
    {children}
  </NavLink>
);

export default FilterLink;
