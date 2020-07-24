import React, { Component } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";
import awsAPIconfig from "./demo/AmplifyConfig";
import {PredictionOutput} from "./PredictionOutput";
import ICDCode from "./demo/ICDCode";
import D3JS2 from "./D3JS2";
import "../css/prediction.css";

class Prediction extends Component {

  getSubmissionText = () => {
    return document.getElementById("medicalNotes").value;
  }

  render() {
    return (
      <div>
        <textarea
          name="medicalNotes"
          id="medicalNotes"
          placeholder="Paste your medical notes here"
        />
        <PredictionOutput getSubmissionText={this.getSubmissionText}/>
        </div>
        
    );
  }
}

export { Prediction };
