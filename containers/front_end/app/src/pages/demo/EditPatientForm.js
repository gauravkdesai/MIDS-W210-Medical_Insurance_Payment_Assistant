import React from "react";
import PropTypes from "prop-types";

class EditPatientForm extends React.Component {
  static propTypes = {
    patient: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
      dob: PropTypes.string
    }),
    index: PropTypes.string,
    updatePatient: PropTypes.func
  };
  handleChange = event => {
    const updatedPatient = {
      ...this.props.patient,
      [event.currentTarget.name]:
        event.currentTarget.name === 'price'
          ? parseFloat(event.currentTarget.value)
          : event.currentTarget.value
    };
    this.props.updatePatient(this.props.index, updatedPatient);
  };
  render() {
    return (
      <div className="patient-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.patient.name}
        />
        <input
          type="text"
          name="dob"
          onChange={this.handleChange}
          value={this.props.patient.dob}
        />
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.patient.desc}
        />
        <button onClick={() => this.props.deletePatient(this.props.index)}>
          Remove Patient
        </button>
      </div>
    );
  }
}

export default EditPatientForm;
