import React, { Component } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";
import awsAPIconfig from "./demo/AmplifyConfig";
import ICDCode from "./demo/ICDCode";
import D3JS2 from "./D3JS2";
import "../css/prediction.css";

Amplify.configure(awsAPIconfig);

API.configure();
class PredictionOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sortAndFilterData(data){
    data = data.replace(/\'/g,"\"");
    data = JSON.parse(data);
    const probLowerLimit = 0.3;
    console.log('After parsing to JSON',typeof(data))

    var newData = {}
    for(var key of Object.keys(data)){
      console.log('key='+key,' value='+data[key]);

      if(key == "name" && data[key] == "Root"){
        newData[key] = data[key]
        newData["value"] = data["value"]
        newData["children"] = data["children"]
      }
    }
    console.log('Tyope of newData='+typeof(newData))
    return newData;
  }

  getCodes(event) {
    var submissionText = this.props.getSubmissionText();
    console.log("Text to be submitted to model:" + submissionText);

    const apiName = "MBVAModelAPIProxy";
    const path = "/api/icd";
    const myInit = {
      // OPTIONAL
      headers: { "Content-Type": "application/json" }, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // OPTIONAL
        text: submissionText
      },
    };

    API.get(apiName, path, myInit)
      .then((data) => {
        console.log("Codes returned by model via Amplify:" + data);
        console.log('datatype='+typeof(data))
        data = this.sortAndFilterData(data);
        console.log('datatype after sortAndFilterData='+typeof(data))
        var codesHierarchyData = data;
        this.setState({ codesHierarchyData: codesHierarchyData });
        this.setState({ codes: codesHierarchyData });
        console.log(this.state.codes);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }



  render() {
    return (
      <div>

        <div id="container">
          <button className="submit-button" onClick={this.getCodes.bind(this)}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Go</span>
          </button>
        </div>

        {/* <h2>ICD Codes</h2> */}
        <div className="container">
          {/* <div className="table">
            <div className="table-header">
              <div className="header__item text">ICD-9 Code</div>
              <div className="header__item text">Title</div>
              <div className="header__item number">Prediction Probability</div>
            </div>
            <div className="table-content">
              {console.log("Before rendering", this.state.codes)}

              {this.state.codes ? (
                this.state.codes
                  .sort((a, b) => (a[1].PROB > b[1].PROB ? -1 : 1))
                  .map((item) => (
                    <ICDCode
                      key={item[0].toString()}
                      index={item[0].toString()}
                      details={item[1]}
                    />
                  ))
              ) : (
                <br />
              )}
            </div>
          </div> */}
        </div>
        {this.state.codesHierarchyData ? 
          <D3JS2
            codesHierarchyData={this.state.codesHierarchyData}
          />
          : (
            <br />
          )}
      </div>
    );
  }
}

export { PredictionOutput };
