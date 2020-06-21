import React from "react";
import PropTypes from "prop-types";
import AddNoteForm from "./AddNoteForm";
import ICDCode from "./ICDCode";
import EMCode from "./EMCode";

class NoteView extends React.Component {
  static propTypes = {
    notes: PropTypes.object,
    codes: PropTypes.array,
    emcode: PropTypes.object,
    patients: PropTypes.object,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func,
    loadSamplePatients: PropTypes.func,
    getICD: PropTypes.func,
    currentPatient: PropTypes.string
  };

  state = {
    uid: null,
    owner: null
  };

  render() {

    return (
      <div className="inventory">
        <h2>Medical Notes 
        
          {this.props.currentPatient 
          ? 
              <span> for {this.props.patients[this.props.currentPatient].name}</span>
              
          : this.props.currentPatient
          }
        </h2>
        <AddNoteForm currentPatient={this.props.currentPatient} setCodes={this.props.setCodes} setEMCodes={this.props.setEMCodes}/>
        
        <ul className="patients">
        {console.log(this.props.codes)}
            {this.props.codes
            ?
              <>
              <h1>EM Code</h1>
              <EMCode
                details = {this.props.emcode}
              />
              <h1>ICD Codes</h1>
              {this.props.codes.map(item => (
                <ICDCode
                  key={item[0].toString()}
                  index={item[0].toString()}
                  details={item[1]}
                />
              ))}
              </>
            : this.props.codes
            }
          </ul>
      </div>
    );
  }
}

export default NoteView;
