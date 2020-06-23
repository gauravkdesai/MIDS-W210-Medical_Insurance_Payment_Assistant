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
    const { ICD_CODE, PROB, SHORT_TITLE, LONG_TITLE } = this.props.details;
    return (
      <div class="table-row">	
        <div class="table-data text">{ICD_CODE}</div>
        <div class="table-data text">{SHORT_TITLE}</div>
        <div class="table-data number">{PROB}</div>
      </div>
    );
  }
}

export default ICDCode;
