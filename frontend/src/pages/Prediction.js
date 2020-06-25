import React,{Component} from 'react'
import PropTypes from "prop-types";
import "../css/prediction.css";
import ICDCode from "./demo/ICDCode";
import API from '@aws-amplify/api';
import Amplify from 'aws-amplify';
import awsAPIconfig from './demo/AmplifyConfig';

Amplify.configure(awsAPIconfig);

API.configure();

class Prediction extends Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  
  getCodes(event){

    var submissionText = document.getElementById("medicalNotes").value;
    console.log('Text to be submitted to model:' + submissionText);
  
    const apiName = 'MBVAModelAPIProxy';
    const path = '/test/api/icd'; 
    const myInit = { // OPTIONAL
        headers: {'Content-Type': 'application/json'}, // OPTIONAL
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {  // OPTIONAL
            'text': submissionText,
            'top_k': 10
        },
    };
  
    API
      .get(apiName, path, myInit)
      .then( data => 
        {
          var codes = data;
          console.log("Codes returned by model via Amplify:"+codes)
  
          var codesInArray = Object.keys(codes).map(function(key) {
            return [Number(key), codes[key]];
          });
          console.log("Amplify codesInArray:"+codesInArray)
          this.setState({codes:codesInArray});
          console.log(this.state.codes);
      })
      .catch(error => {
        console.log(error );
    });
    
  };


render(){
  return(
  <div>

    <textarea
    name="medicalNotes" 
    id="medicalNotes"
    placeholder="Paste your medical notes here"   
    />
    <div id="container">
        <button className="submit-button" onClick={this.getCodes.bind(this)}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Get ICD Codes</span>
        </button>
      </div>

      <h2>ICD Codes</h2>
      <div className="container">
      <div className="table">
        <div className="table-header">
          <div className="header__item text">ICD-9 Code</div>
          <div className="header__item text">Title</div>
          <div className="header__item number">Prediction Probability</div>
        </div>
      <div class="table-content">	
      {console.log('Before rendering',this.state.codes)}
      
      {this.state.codes?
      this.state.codes
      .sort((a, b) => a[1].PROB > b[1].PROB ? -1 : 1)
      .map(item => (

        <ICDCode
          key={item[0].toString()}
          index={item[0].toString()}
          details={item[1]}
        />
      ))
      :<br/>
    }
      </div>
      </div>
      </div>
      
  </div>
);
}
}

export  {Prediction};