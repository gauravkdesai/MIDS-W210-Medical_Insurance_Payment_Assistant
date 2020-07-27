import React, { Component } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";
import awsAPIconfig from "./demo/AmplifyConfig";
import ICDCode from "./demo/ICDCode";
import D3JS2 from "./D3JS2";
import CollapsibleTable from "./CollapsibleTable";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";
import { Button } from 'reactstrap';
import "../css/prediction.css";

Amplify.configure(awsAPIconfig);

API.configure();

const override = css`
  display: block;
  margin: 0 auto;
  border-color: rgb(246, 248, 244);;
`;

class PredictionOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
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


    var rootChildren = Array.from(chaptersDataArray);
    rootChildren.unshift(adverseData);

    var newData = {}
    newData["name"] = "Root";
    newData["value"] = 1;
    newData["children"] = rootChildren;


    console.log('Tyope of newData='+typeof(newData));
    console.log("newData",newData);
    return newData;
  }

  getCodes(event) {
    this.setState({ loading: true });
    console.log("After setting loading to true what we see loading=",this.state.loading);
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
        this.setState({ loading: false });
        console.log("After setting loading to false what we see loading=",this.state.loading);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
        console.log("After setting loading to false what we see loading=",this.state.loading);
      });
      
  }



  render() {
    console.log("loading=",this.state.loading);
    return (
      <div>
        

        
        <div id="container" className="text-center">
        <Button outline color="success" onClick={this.getCodes.bind(this)} size="lg">Get Codes</Button>
        </div>
        {<br/>}
        <div className="sweet-loading">
          <RingLoader
            css={override}
            size={50}
            color={"green"}
            loading={this.state.loading}
          />
        </div>
        {<br/>}
        {this.state.codesHierarchyData ? 
        <div>
          <h1>Chapter Prediction</h1>
          <CollapsibleTable codesHierarchyData={this.state.codesHierarchyData}/>
        </div>
          
          : (
            <br />
          )}
          
          
     
          
      </div>
    );
  }
}

export { PredictionOutput };
