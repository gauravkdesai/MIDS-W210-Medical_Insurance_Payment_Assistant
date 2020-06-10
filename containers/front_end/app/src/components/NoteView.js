import React from "react";
import PropTypes from "prop-types";
import AddNoteForm from "./AddNoteForm";
import ICDCode from "./ICDCode";

class NoteView extends React.Component {
  static propTypes = {
    notes: PropTypes.object,
    codes: PropTypes.array,
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
        <h2>Note View</h2>
        
        {this.props.currentPatient 
        ? 
            <>
                <h3>{this.props.patients[this.props.currentPatient].name}</h3>
            </>
        : this.props.currentPatient
        }
        <AddNoteForm currentPatient={this.props.currentPatient} setCodes={this.props.setCodes} />
        
        <ul className="patients">
        {console.log(this.props.codes)}
            {this.props.codes
            ?
              <>
              {/* <h1>{this.props.codes.toString()}</h1> */}
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
