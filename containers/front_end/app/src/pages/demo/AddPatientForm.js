import React from "react";
import PropTypes from "prop-types";

class AddPatientForm extends React.Component {
  nameRef = React.createRef();
  descRef = React.createRef();
  dobRef = React.createRef();

  static propTypes = {
    addPatient: PropTypes.func
  };

  createPatient = event => {
    // 1.  stop the form from submitting
    event.preventDefault();
    const patient = {
      name: this.nameRef.current.value,
      desc: this.descRef.current.value,
      dob: this.dobRef.current.value
    };
    this.props.addPatient(patient);
    // refresh the form
    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="patient-edit" onSubmit={this.createPatient}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="dob"
          ref={this.dobRef}
          type="text"
          placeholder="DOB"
        />
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <button type="submit">+ Add Patient</button>
      </form>
    );
  }
}

export default AddPatientForm;
