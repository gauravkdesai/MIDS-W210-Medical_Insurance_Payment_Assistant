import React from "react";
import PropTypes from "prop-types";

class ICDCode extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      ICD_CODE: PropTypes.string,
      PROB: PropTypes.string,
      SHORT_TITLE: PropTypes.string,
      LONG_TITLE: PropTypes.string
    }),
    index: PropTypes.string
  };
  render() {
    const { ICD_CODE, PROB, LONG_TITLE } = this.props.details;
    return (
      <li className="menu-code">
        <h6 className="code-name">
          Code: {ICD_CODE} Prob: {PROB} Description: {LONG_TITLE}
        </h6>
      </li>
    );
  }
}

export default ICDCode;
