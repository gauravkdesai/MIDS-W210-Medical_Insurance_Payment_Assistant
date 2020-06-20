import React from "react";
import PropTypes from "prop-types";

const Header = props => (
  <header className="top">
    <h3 className="tagline">
      <span>{"Note Writing Virtual Assistant"}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
};

export default Header;
