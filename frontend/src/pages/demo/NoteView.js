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
    currentPatient: PropTypes.string,
  };

  state = {
    uid: null,
    owner: null,
  };

  render() {
    return (
      <div className="inventory">
        <h2>
          Medical Notes
          {this.props.currentPatient ? (
            <span>
              {" "}
              for {this.props.patients[this.props.currentPatient].name}
            </span>
          ) : (
            this.props.currentPatient
          )}
        </h2>
        <AddNoteForm
          currentPatient={this.props.currentPatient}
          setCodes={this.props.setCodes}
          setEMCodes={this.props.setEMCodes}
        />

        {this.props.codes ? (
          <div>
            <br />
            <br />
            {console.log(this.props.codes)}

            <h2>EM Code</h2>
            <EMCode details={this.props.emcode} />
            <h2>ICD Codes</h2>
            <div className="container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item text">ICD-9 Code</div>
                  <div className="header__item text">Title</div>
                  <div className="header__item number">
                    Prediction Probability
                  </div>
                </div>
                <div class="table-content">
                  {this.props.codes
                    .sort((a, b) => (a[1].PROB > b[1].PROB ? -1 : 1))
                    .map((item) => (
                      <ICDCode
                        key={item[0].toString()}
                        index={item[0].toString()}
                        details={item[1]}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          this.props.codes
        )}
      </div>
    );
  }
}

export default NoteView;
