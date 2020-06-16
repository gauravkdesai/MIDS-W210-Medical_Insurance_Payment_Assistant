import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import NoteView from "./NoteView";
import samplePatients from "../sample-patients";
import Patient from "./Patient";
import base from "../base";


const firebaseID = "12345"

class App extends React.Component {
  state = {
    patients: {},
    currentPatient: "",
    order: {},
    codes: [],
    emcode: {},
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {

    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(firebaseID);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${firebaseID}/patients`, {
      context: this,
      state: "patients"
    });

    this.ref = base.syncState(`${firebaseID}/codes`, {
      context: this,
      state: "codes"
    });

  }

  componentDidUpdate() {
    localStorage.setItem(
      firebaseID,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addPatient = patient => {
    // 1. Take a copy of the existing state
    const patients = { ...this.state.patients };
    // 2. Add our new fish to that fishes variable
    patients[`patient${Date.now()}`] = patient;
    // 3. Set the new fishes object to state
    this.setState({ patients });
  };

  setEMCodes = emcode => {
    this.setState({ emcode });
  };

  setCodes = codes => {
    this.setState({ codes });
  };

  updatePatient = (key, updatedPatient) => {
    // 1. Take a copy of the current state
    const patients = { ...this.state.patients };
    // 2. Update that state
    patients[key] = updatedPatient;
    // 3. Set that to state
    this.setState({ patients });
  };

  updateNote = (key, updatedNote) => {
    // 1. Take a copy of the current state
    const notes = { ...this.state.notes };
    // 2. Update that state
    notes[key] = updatedNote;
    // 3. Set that to state
    this.setState({ notes });
  };

  deletePatient = key => {
    // 1. take a copy of state
    const patients = { ...this.state.patients };
    // 2. update the state
    patients[key] = null;
    // 3.  update state
    this.setState({ patients });

    if (this.state.currentPatient === key) {
      const currentPatient = "";
      this.setState({ currentPatient});
    }
      
  };

  loadSamplePatients = () => {
    this.setState({ patients: samplePatients });
  };

  selectPatient = key => {
    const currentPatient = key;
    this.setState({ currentPatient });
  };

  render() {
    return (
      <div className="luna-emhr">
        <div className="menu">
          <Header tagline="EMHR" />
          <ul className="patients">
            {Object.keys(this.state.patients).map(key => (
              <Patient
                key={key}
                index={key}
                details={this.state.patients[key]}
                addToOrder={this.addToOrder}
                selectPatient={this.selectPatient}
              />
            ))}
          </ul>
          <button onClick={this.loadSamplePatients}>
          Load Sample Patients
          </button>
        </div>

        <NoteView
          setCodes={this.setCodes}
          setEMCodes={this.setEMCodes}
          patients={this.state.patients}
          codes={this.state.codes}
          emcode={this.state.emcode}
          storeId={this.props.match.params.storeId}
          currentPatient={this.state.currentPatient}
        />

      </div>
    );
  }
}

export default App;
