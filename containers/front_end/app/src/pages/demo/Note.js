import React from "react";
import PropTypes from "prop-types";

class Note extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      box1: PropTypes.bool,
      box2: PropTypes.bool,
      box3: PropTypes.bool,
      box4: PropTypes.bool,
      box5: PropTypes.bool,
      box6: PropTypes.bool,
      additionalNotes: PropTypes.string,
      fullNote: PropTypes.string,
      patient: PropTypes.string
    }),
    selectPatient: PropTypes.func,
    index: PropTypes.string
  };
  render() {
    const { box1, box2, box3, box4, box5, box6, additionalNotes, fullNote, patient } = this.props.details;
    return (
      <li className="menu-patient">
        <h4 className="patient-name">
          {name}
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

export default Note;
