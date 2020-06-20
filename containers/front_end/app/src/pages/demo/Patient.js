import React from "react";
import PropTypes from "prop-types";

class Patient extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      dob: PropTypes.string
    }),
    selectPatient: PropTypes.func,
    index: PropTypes.string
  };
  render() {
    const { name, dob } = this.props.details;
    return (
      <li className="menu-patient">
        <h4 className="patient-name">
          Name: {name} DOB: {dob}
          <button
            onClick={() => this.props.selectPatient(this.props.index)}
          >
            {"Select Patient"}
          </button>        
        </h4>
      </li>
    );
  }
}

export default Patient;
