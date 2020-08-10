import React, { Component } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";
import awsAPIconfig from "./demo/AmplifyConfig";
import CollapsibleTable from "./CollapsibleTable";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";
import { Button } from "reactstrap";
import "../css/prediction.css";

Amplify.configure(awsAPIconfig);

API.configure();

const override = css`
  display: block;
  margin: 0 auto;
  border-color: rgb(246, 248, 244);
`;

const labelDescrtiion = require("../assets/chapter_description.json");
const labelToicd10Mapping = require("../assets/chapter_icd9to10.json");
const labelDisplayName = require("../assets/chapter_icd9_displayname.json");
const diseaseICDMapping = require("../assets/disease_icd_mapping.json");
const top50DiseasesMap = require("../assets/top50diseases.json");
const top50DiseasesArray = top50DiseasesMap["top50"];

// Start with an initial value of 20 seconds
const TIME_LIMIT = 20;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

let timerInterval = null;

class PredictionOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      threshold: 0.4,
      rawData: "",
      hasTextToSubmit: true,
    };
  }

  convertProbability(prob) {
    return Math.round(100 * prob) / 100;
  }

  sortAndFilterData(threshold, data) {
    data = data.replace(/'/g, '"');
    data = data.replace(/\\n/g, "");
    data = JSON.parse(data);
    const probLowerLimit = threshold;
    console.log("After parsing to JSON", typeof data);

    // Adverse
    var adverseData;
    data["children"].forEach((row) => {
      if (row["name"] === "Adverse") {
        var childArray = [];
        row["children"].forEach((childRow) => {
          console.log("childRow=", childRow);
          if (
            (childRow["value"] > probLowerLimit) &
            top50DiseasesArray.includes(childRow["name"])
          ) {
            var childMap = {
              name: childRow["name"],
              value: this.convertProbability(childRow["value"]),
            };
            childArray.push(childMap);
          }
        });
        if (childArray.length > 0) {
          childArray.sort((a, b) => b["value"] - a["value"]);
          console.log(childArray);
          adverseData = {
            name: row["name"],
            value: row["value"],
            children: childArray,
          };
          console.log("adverseData=", adverseData);
        }
      }
    });

    // Chapters
    var chaptersDataArray = [];
    data["children"].forEach((row) => {
      if (row["name"] === "Chapter") {
        row["children"].forEach((chapterRow) => {
          var chapterName = chapterRow["name"];
          var chapterProb = this.convertProbability(chapterRow["value"]);
          var childArray = [];
          // console.log('chapterName=',chapterName,"chapterProb=",chapterProb);
          if (chapterProb > probLowerLimit) {
            chapterRow["children"].forEach((childRow) => {
              //console.log('childRow=',childRow);
              if (
                (childRow["value"] > probLowerLimit) &
                top50DiseasesArray.includes(childRow["name"])
              ) {
                var childMap = {
                  name: childRow["name"],
                  value: this.convertProbability(childRow["value"]),
                };
                childArray.push(childMap);
              }
            });

            if (childArray.length > 0) {
              childArray.sort((a, b) => b["value"] - a["value"]);
            }
            // console.log(childArray)
            var chapterData = {
              name: chapterName,
              value: chapterProb,
              children: childArray,
            };
            // console.log('chapterData=',chapterData);
            chaptersDataArray.push(chapterData);
          }
        });
      }
    });

    // console.log("chaptersDataArray=",chaptersDataArray);
    var rootChildren = Array.from(chaptersDataArray);
    // Commented below code temporarily as adverse models always giving chanpter probability=1
    // if(adverseData != null){
    //   rootChildren.unshift(adverseData);
    // }

    rootChildren.sort((a, b) => b["value"] - a["value"]);
    console.log("rootChildren=", rootChildren);

    var newData = {};
    newData["name"] = "Root";
    newData["value"] = 1;
    newData["children"] = rootChildren;

    console.log("Tyope of newData=" + typeof newData);
    console.log("newData", newData);
    return newData;
  }

  getCodes(event) {
    var submissionText = this.props.getSubmissionText();
    console.log("Text to be submitted to model:" + submissionText);
    if (submissionText) {
      this.setState({ loading: true });
      this.startTimer();
      this.showWheel(true);
      console.log(
        "After setting loading to true what we see loading=",
        this.state.loading
      );

      const apiName = "MBVAModelAPIProxy";
      const path = "/api/icd";
      const myInit = {
        // OPTIONAL
        headers: { "Content-Type": "application/json" }, // OPTIONAL
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {
          // OPTIONAL
          text: submissionText,
        },
      };

      API.get(apiName, path, myInit)
        .then((data) => {
          // var data = "{'name': 'Root', 'value': 1, 'children': [{'name': 'Adverse', 'value': 1, 'children': [{'name': 'Constipation', 'value': 0.287591}, {'name': 'Diarrhea', 'value': 0.25806963}, {'name': 'Edema', 'value': 0.34691057}, {'name': 'Hypercholesterolemia ', 'value': 0.52963334}, {'name': 'Hyperglycemia', 'value': 0.49600193}]}, {'name': 'Chapter', 'value': 1, 'children': [{'name': '001_139', 'value': 0.22341141, 'children': [{'name': 'Bacterial Infection', 'value': 0.5654362}, {'name': 'Fungal Infection', 'value': 0.49407786}, {'name': 'Hepatitis C', 'value': 0.4456188}, {'name': 'Int inf clstrdium dfcile', 'value': 0.3131447}]}, {'name': '140_239', 'value': 0.16323537, 'children': [{'name': 'Hepatocellular Carcinoma (HCC)', 'value': 0.5737658}, {'name': 'Metastatic Cancer', 'value': 0.44167373}, {'name': 'Secondary malig neo bone', 'value': 0.4467983}]}, {'name': '240_279', 'value': 0.08187112, 'children': [{'name': 'Diabetes (Type 2)', 'value': 0.37730289}, {'name': 'Fluid Electrolyte Disorders', 'value': 0.5660033}, {'name': 'Hypothyroidism', 'value': 0.4755676}, {'name': 'Obesity', 'value': 0.3789595}]}, {'name': '280_289', 'value': 0.15349397, 'children': [{'name': 'Anemia', 'value': 0.46914294}, {'name': 'Blood Loss Anemia', 'value': 0.5027811}, {'name': 'Deficiency Anemias', 'value': 0.38994476}]}, {'name': '290_319', 'value': 0.055300385, 'children': [{'name': 'Anxiety state NOS', 'value': 0.49479464}, {'name': 'Depression', 'value': 0.46966136}, {'name': 'Psychoses', 'value': 0.28801355}, {'name': 'Tobacco use disorder', 'value': 0.5521925}]}, {'name': '320_389', 'value': 0.11151704, 'children': [{'name': 'Iritis or other eye disorder', 'value': 0.5917782}, {'name': 'Neuropathy in diabetes', 'value': 0.3576555}, {'name': 'Paralysis', 'value': 0.40908444}, {'name': 'Sleep apnea', 'value': 0.37287974}]}, {'name': '390_459', 'value': 0.10151261, 'children': [{'name': 'Atherosclerosis', 'value': 0.28453374}, {'name': 'Cardiac arrhythmia', 'value': 0.408912}, {'name': 'Heart failure', 'value': 0.3989057}, {'name': 'Hypertension', 'value': 0.49484473}, {'name': 'Ischaemic heart disease', 'value': 0.35956877}, {'name': 'Valvular Disease', 'value': 0.34225672}]}, {'name': '460_519', 'value': 0.10076073, 'children': [{'name': 'Chronic Pulmonary Disease', 'value': 0.40041173}, {'name': 'Food/vomit pneumonitis', 'value': 0.27860075}, {'name': 'Pleural effusion NOS', 'value': 0.4090165}, {'name': 'Pneumonia', 'value': 0.5056628}, {'name': 'Sleep apnea', 'value': 0.4262634}]}, {'name': '520_579', 'value': 0.18295336, 'children': [{'name': 'Acute liver failure', 'value': 0.45979}, {'name': 'Esophageal reflux', 'value': 0.4916235}, {'name': 'Gastrointest hemorr NOS', 'value': 0.4358611}, {'name': 'Liver cirrhosis', 'value': 0.45858395}, {'name': 'Paralysis', 'value': 0.3910061}]}, {'name': '580_629', 'value': 0.076520324, 'children': [{'name': 'Chronic Renal Failure', 'value': 0.43500406}, {'name': 'Renal disease/ Renal insufficiency', 'value': 0.68025076}, {'name': 'Urinary tract infection, site not specified', 'value': 0.31392032}]}, {'name': '630_679__740_759__760_779', 'value': 0.6359866, 'children': [{'name': 'Neonat jaund preterm del', 'value': 0.49740562}, {'name': 'Preterm NEC 2000-2499g', 'value': 0.45388618}, {'name': 'Primary apnea of newborn', 'value': 0.43786353}, {'name': 'Respiratory distress syn', 'value': 0.46073264}]}, {'name': '680_709', 'value': 0.086012095, 'children': []}, {'name': '710_739', 'value': 0.066577494, 'children': [{'name': 'Osteoarthritis', 'value': 0.55361843}, {'name': 'Osteoporosis', 'value': 0.5276966}]}, {'name': '780_799', 'value': 0.1477133, 'children': [{'name': 'Bacteremia', 'value': 0.42234737}, {'name': 'Cardiogenic shock', 'value': 0.49780366}, {'name': 'Convulsions NEC', 'value': 0.4084737}, {'name': 'Hypoxemia', 'value': 0.35818142}, {'name': 'Jaundice', 'value': 0.41012484}]}, {'name': '800_999', 'value': 0.19209555, 'children': [{'name': 'Fracture of face bones ', 'value': 0.48684958}, {'name': 'Fracture of rib(s) sternum larynx and trachea ', 'value': 0.38197985}, {'name': 'Fracture of vertebral column without mention of spinal cord injury ', 'value': 0.48189226}, {'name': 'Hematoma complic proc', 'value': 0.5005198}]}, {'name': 'E_V', 'value': 0.5146279, 'children': [{'name': 'History of tobacco use', 'value': 0.36532667}, {'name': 'Long-term use anticoagul', 'value': 0.35418665}, {'name': 'Long-term use of insulin', 'value': 0.36140054}, {'name': 'NB obsrv suspct infect', 'value': 0.5100363}, {'name': 'Need prphyl vc vrl hepat', 'value': 0.5445493}, {'name': 'Single lb in-hosp w cs', 'value': 0.48313236}, {'name': 'Single lb in-hosp w/o cs', 'value': 0.4885398}]}]}]}"

          console.log("Codes returned by model via Amplify:" + data);
          console.log("datatype=" + typeof data);
          this.setState({ rawData: data });
          this.processRawData(this.state.threshold, data);

          this.setState({ loading: false });
          this.showWheel(false);
          console.log(
            "After setting loading to false what we see loading=",
            this.state.loading
          );
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false });
          this.showWheel(false);
          console.log(
            "After setting loading to false what we see loading=",
            this.state.loading
          );
        });
    }
  }

  processRawData(threshold, rawData) {
    var data = this.sortAndFilterData(threshold, rawData);
    console.log("datatype after sortAndFilterData=" + typeof data);
    var codesHierarchyData = data;
    this.setState({ codesHierarchyData: codesHierarchyData });
    this.setState({ codes: codesHierarchyData });
    console.log(this.state.codes);
  }

  setThreshold(newThreshold) {
    console.log("New threshold=", newThreshold);
    this.setState({ threshold: newThreshold });
    console.log("rawData=", this.state.rawData);
    this.processRawData(newThreshold, this.state.rawData);
  }

  formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    // const minutes = Math.floor(time / 60);
    
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    // return `${minutes}:${seconds}`;
    return `${seconds}`;
  }

  

  startTimer() {
    timePassed = 0;
    timerInterval = setInterval(() => {
      
      // The amount of time passed increments by one
      timePassed = timePassed += 1;
      if(timePassed >= TIME_LIMIT){
        timeLeft = 0;
      }
      else{
        timeLeft = TIME_LIMIT - timePassed;
      }
      
      // The time left label is updated
      document.getElementById("base-timer-label").innerHTML = this.formatTimeLeft(timeLeft);
    }, 1000);
  }

  showWheel(show) {
      var div = document.getElementById("base-timer");
      if (show) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
        if(timerInterval){
          clearInterval(timerInterval);
        }
        document.getElementById("base-timer-label").innerHTML = this.formatTimeLeft(TIME_LIMIT);
      }
  }

  render() {
    console.log("loading=", this.state.loading);
    console.log("labelDescrtiion=", labelDescrtiion);
    console.log("labelToicd10Mapping=", labelToicd10Mapping);
    return (
      <div>
        <br />
        <div id="container" className="text-center">
          <Button
            disabled={!this.state.hasTextToSubmit}
            color="success"
            onClick={this.getCodes.bind(this)}
            size="lg"
            block
            className="submitButton"
          >
            <div className="submitButtonText">Get Codes</div>
          </Button>
        </div>
        {<br />}
        <div class="waitingArea">
          <div className="sweet-loading">
            <RingLoader
              css={override}
              size={50}
              color={"green"}
              loading={this.state.loading}
            />
          </div>
          <div class="base-timer" id="base-timer">
              <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                </g>
              </svg>
              <span id="base-timer-label" class="base-timer__label">
              {this.formatTimeLeft(timeLeft)}
              </span>
          </div>
        
        </div>

        {<br />}
        {this.state.codesHierarchyData ? (
          <div>
            <h1>ICD Code Prediction</h1>
            <CollapsibleTable
              codesHierarchyData={this.state.codesHierarchyData}
              labelDescrtiion={labelDescrtiion}
              labelToicd10Mapping={labelToicd10Mapping}
              labelDisplayName={labelDisplayName}
              diseaseICDMapping={diseaseICDMapping}
              threshold={this.state.threshold}
              predictionOutputThis={this}
            />
            <br />
            <br />
          </div>
        ) : (
          <br />
        )}
      </div>
    );
  }
}

export { PredictionOutput };
