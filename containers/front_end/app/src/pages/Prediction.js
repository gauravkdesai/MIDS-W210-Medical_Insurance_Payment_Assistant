import React, { Component } from "react";
import { PredictionOutput } from "./PredictionOutput";
import "../css/prediction.css";

class Prediction extends Component {
  getSubmissionText = () => {
    return document.getElementById("medicalNotes").value;
  };

  render() {
    return (
      <div>
        <textarea
          name="medicalNotes"
          id="medicalNotes"
          placeholder="Paste your medical notes here"
        />
        <PredictionOutput getSubmissionText={this.getSubmissionText} />
      </div>
    );
  }
}

export { Prediction };
