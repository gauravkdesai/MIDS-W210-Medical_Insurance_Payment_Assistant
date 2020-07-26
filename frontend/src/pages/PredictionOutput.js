import React, { Component } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";
import awsAPIconfig from "./demo/AmplifyConfig";
import ICDCode from "./demo/ICDCode";
import D3JS2 from "./D3JS2";
import CollapsibleTable from "./CollapsibleTable";
import "../css/prediction.css";

Amplify.configure(awsAPIconfig);

API.configure();
class PredictionOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  convertProbability(prob){
    return Math.round(100 * prob) /  100;
  }
  sortAndFilterData(data){
    data = data.replace(/\'/g,"\"");
    data = JSON.parse(data);
    const probLowerLimit = 0.3;
    console.log('After parsing to JSON',typeof(data));

    // Adverse
    var adverseData;
    data["children"].forEach(row => {
      if(row["name"] == "Adverse"){
        var childArray = []
        row["children"].forEach(childRow =>{
          console.log('childRow=',childRow);
          if(childRow["value"] > probLowerLimit ){
            
            var childMap = {"name":childRow["name"], "value":this.convertProbability(childRow["value"])};
            childArray.push(childMap)
          }
        });
        childArray.sort((a,b)=>b["value"]-a["value"])
        console.log(childArray)
        adverseData = {"name":row["name"], "value":row["value"], "children":childArray}
      }
    });    
    console.log('adverseData=',adverseData);

    // Chapters    
    var chaptersDataArray=[];
    data["children"].forEach(row => {
      if(row["name"] == "Chapter"){
        row["children"].forEach(chapterRow =>{
          var chapterName = chapterRow["name"];
          var chapterProb = this.convertProbability(chapterRow["value"]);
          var childArray = []
          // console.log('chapterName=',chapterName,"chapterProb=",chapterProb);
          if(chapterProb > probLowerLimit){
            chapterRow["children"].forEach(childRow =>{
              //console.log('childRow=',childRow);
              if(childRow["value"] > probLowerLimit ){
                var childMap = {"name":childRow["name"], "value":this.convertProbability(childRow["value"])};
                childArray.push(childMap)
              }
            });
          }
          if(childArray.length >0){
            childArray.sort((a,b)=>b["value"]-a["value"])
            // console.log(childArray)
            var chapterData = {"name":chapterName, "value":chapterProb, "children":childArray}
            // console.log('chapterData=',chapterData);
            chaptersDataArray.push(chapterData);
          }
        });
      }
    });    
    chaptersDataArray.sort((a,b) => b["value"]-a["value"])
    console.log('chaptersDataArray=',chaptersDataArray);


    var chapterRoot = {}
    chapterRoot["name"] = "Chapter";
    chapterRoot["value"] = 1;
    chapterRoot["children"] = chaptersDataArray;

    var rootChildren = []
    rootChildren.push(adverseData)
    rootChildren.push(chapterRoot)

    var newData = {}
    newData["name"] = "Root";
    newData["value"] = 1;
    newData["children"] = rootChildren;


    console.log('Tyope of newData='+typeof(newData));
    console.log("newData",newData);
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
        {this.state.codesHierarchyData ? 
          <CollapsibleTable codesHierarchyData={this.state.codesHierarchyData}/>
          
          : (
            <br />
          )}
          
          
     
          
      </div>
    );
  }
}

export { PredictionOutput };
