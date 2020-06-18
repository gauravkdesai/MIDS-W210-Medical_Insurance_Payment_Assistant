import React from "react";
import PropTypes from "prop-types";
import { noteDictionary } from "./noteDictionary";

class AddNoteForm extends React.Component {

  initialRef = React.createRef();

  chiefComplaintRef = React.createRef();
  
  HPI1Ref = React.createRef();
  
  rosGeneral1Ref = React.createRef();
  rosGeneral2Ref = React.createRef();
  rosGeneral3Ref = React.createRef();
  rosGeneral4Ref = React.createRef();
  rosGeneral5Ref = React.createRef();
  rosGeneral6Ref = React.createRef();
  rosGeneral7Ref = React.createRef();
  rosGeneral8Ref = React.createRef();

  rosRespiratory1Ref = React.createRef();
  rosRespiratory2Ref = React.createRef();
  rosRespiratory3Ref = React.createRef();
  rosRespiratory4Ref = React.createRef();
  rosRespiratory5Ref = React.createRef();
  rosRespiratory6Ref = React.createRef();
  rosRespiratory7Ref = React.createRef();
  rosRespiratory8Ref = React.createRef();
  rosRespiratory9Ref = React.createRef();

  rosCardiovascular1Ref = React.createRef();
  rosCardiovascular2Ref = React.createRef();
  rosCardiovascular3Ref = React.createRef();
  rosCardiovascular4Ref = React.createRef();
  rosCardiovascular5Ref = React.createRef();

  rosMuscularskeletal1Ref = React.createRef();
  rosMuscularskeletal2Ref = React.createRef();
  rosMuscularskeletal3Ref = React.createRef();
  rosMuscularskeletal4Ref = React.createRef();
  rosMuscularskeletal5Ref = React.createRef();
  rosMuscularskeletal6Ref = React.createRef();

  rosGastrointestinal1Ref = React.createRef();
  rosGastrointestinal2Ref = React.createRef();
  rosGastrointestinal3Ref = React.createRef();
  rosGastrointestinal4Ref = React.createRef();
  rosGastrointestinal5Ref = React.createRef();
  rosGastrointestinal6Ref = React.createRef();
  rosGastrointestinal7Ref = React.createRef();
  rosGastrointestinal8Ref = React.createRef();
  rosGastrointestinal9Ref = React.createRef();
  rosGastrointestinal10Ref = React.createRef();
  rosGastrointestinal11Ref = React.createRef();

  rosNeurological1Ref = React.createRef();
  rosNeurological2Ref = React.createRef();
  rosNeurological3Ref = React.createRef();
  rosNeurological4Ref = React.createRef();
  rosNeurological5Ref = React.createRef();
  rosNeurological6Ref = React.createRef();
  rosNeurological7Ref = React.createRef();
  rosNeurological8Ref = React.createRef();
  rosNeurological9Ref = React.createRef();
  rosNeurological10Ref = React.createRef();

  rosEndocrinologic1Ref = React.createRef();
  rosEndocrinologic2Ref = React.createRef();
  rosEndocrinologic3Ref = React.createRef();
  rosEndocrinologic4Ref = React.createRef();

  rosAdditionalRef = React.createRef();

  rosOthersNegativeRef = React.createRef();

  medicalRef = React.createRef();
  familyRef = React.createRef();
  socialRef = React.createRef();

  exam1Ref = React.createRef();

  treatmentNotesRef = React.createRef();
  treatment1Ref = React.createRef();
  treatment2Ref = React.createRef();
  treatment3Ref = React.createRef();
  treatment4Ref = React.createRef();
  treatment5Ref = React.createRef();
  treatment6Ref = React.createRef();

  additionalNotesRef = React.createRef();

  fullNoteRef = React.createRef(); 

  static propTypes = {
    addNote: PropTypes.func
  };

  createNote = event => {
    // 1.  stop the form from submitting
    event.preventDefault();
    const note = {

      // Initial or Followup
      initial: this.initialRef.current.checked,

      // Chief Complaint
      chiefComplaint: this.chiefComplaintRef.current.value,

      // HPI
      HPI1: this.HPI1Ref.current.value,

      // ROS
      rosGeneral1: this.rosGeneral1Ref.current.checked,
      rosGeneral2: this.rosGeneral2Ref.current.checked,
      rosGeneral3: this.rosGeneral3Ref.current.checked,
      rosGeneral4: this.rosGeneral4Ref.current.checked,
      rosGeneral5: this.rosGeneral5Ref.current.checked,
      rosGeneral6: this.rosGeneral6Ref.current.checked,
      rosGeneral7: this.rosGeneral7Ref.current.checked,
      rosGeneral8: this.rosGeneral8Ref.current.checked,

      rosRespiratory1: this.rosRespiratory1Ref.current.checked,
      rosRespiratory2: this.rosRespiratory2Ref.current.checked,
      rosRespiratory3: this.rosRespiratory3Ref.current.checked,
      rosRespiratory4: this.rosRespiratory4Ref.current.checked,
      rosRespiratory5: this.rosRespiratory5Ref.current.checked,
      rosRespiratory6: this.rosRespiratory6Ref.current.checked,
      rosRespiratory7: this.rosRespiratory7Ref.current.checked,
      rosRespiratory8: this.rosRespiratory8Ref.current.checked,
      rosRespiratory9: this.rosRespiratory9Ref.current.checked,

      rosCardiovascular1: this.rosCardiovascular1Ref.current.checked,
      rosCardiovascular2: this.rosCardiovascular2Ref.current.checked,
      rosCardiovascular3: this.rosCardiovascular3Ref.current.checked,
      rosCardiovascular4: this.rosCardiovascular4Ref.current.checked,
      rosCardiovascular5: this.rosCardiovascular5Ref.current.checked,

      rosMuscularskeletal1: this.rosMuscularskeletal1Ref.current.checked,
      rosMuscularskeletal2: this.rosMuscularskeletal2Ref.current.checked,
      rosMuscularskeletal3: this.rosMuscularskeletal3Ref.current.checked,
      rosMuscularskeletal4: this.rosMuscularskeletal4Ref.current.checked,
      rosMuscularskeletal5: this.rosMuscularskeletal5Ref.current.checked,
      rosMuscularskeletal6: this.rosMuscularskeletal6Ref.current.checked,

      rosGastrointestinal1: this.rosGastrointestinal1Ref.current.checked,
      rosGastrointestinal2: this.rosGastrointestinal2Ref.current.checked,
      rosGastrointestinal3: this.rosGastrointestinal3Ref.current.checked,
      rosGastrointestinal4: this.rosGastrointestinal4Ref.current.checked,
      rosGastrointestinal5: this.rosGastrointestinal5Ref.current.checked,
      rosGastrointestinal6: this.rosGastrointestinal6Ref.current.checked,
      rosGastrointestinal7: this.rosGastrointestinal7Ref.current.checked,
      rosGastrointestinal8: this.rosGastrointestinal8Ref.current.checked,
      rosGastrointestinal9: this.rosGastrointestinal9Ref.current.checked,
      rosGastrointestinal10: this.rosGastrointestinal10Ref.current.checked,
      rosGastrointestinal11: this.rosGastrointestinal11Ref.current.checked,

      rosNeurological1: this.rosNeurological1Ref.current.checked,
      rosNeurological2: this.rosNeurological2Ref.current.checked,
      rosNeurological3: this.rosNeurological3Ref.current.checked,
      rosNeurological4: this.rosNeurological4Ref.current.checked,
      rosNeurological5: this.rosNeurological5Ref.current.checked,
      rosNeurological6: this.rosNeurological6Ref.current.checked,
      rosNeurological7: this.rosNeurological7Ref.current.checked,
      rosNeurological8: this.rosNeurological8Ref.current.checked,
      rosNeurological9: this.rosNeurological9Ref.current.checked,
      rosNeurological10: this.rosNeurological10Ref.current.checked,

      rosEndocrinologic1: this.rosEndocrinologic1Ref.current.checked,
      rosEndocrinologic2: this.rosEndocrinologic2Ref.current.checked,
      rosEndocrinologic3: this.rosEndocrinologic3Ref.current.checked,
      rosEndocrinologic4: this.rosEndocrinologic4Ref.current.checked,

      rosOthersNegative: this.rosOthersNegativeRef.current.checked,
      rosAdditional: this.rosAdditionalRef.current.value,

      // PFSH
      medical: this.medicalRef.current.value,
      family:  this.familyRef.current.value,
      social: this.socialRef.current.value,

      // Exam
      exam1: this.exam1Ref.current.value,

      // Treatment Options
      treatmentNotes: this.treatmentNotesRef.current.value,
      treatment1: this.treatment1Ref.current.value,
      treatment2: this.treatment2Ref.current.value,
      treatment3: this.treatment3Ref.current.value,
      treatment4: this.treatment4Ref.current.value,
      treatment5: this.treatment5Ref.current.value,
      treatment6: this.treatment6Ref.current.value,

      additionalNotes: this.additionalNotesRef.current.value,
      fullNote: this.fullNoteRef.current.value,
      patient: this.props.currentPatient
    };

    this.props.addNote(note);
    // refresh the form
    event.currentTarget.reset();
  };

  getCodes = event => {
    // 1.  stop the form from submitting
    event.preventDefault();

    // Debugging Data
    // var codes = '{"123": {"ICD_CODE": "OTHER", "PROB": "0.653662", "SHORT_TITLE": "No Description", "LONG_TITLE": "No Description"}, "131": {"ICD_CODE": "4019", "PROB": "0.23658513", "SHORT_TITLE": "Hypertension NOS", "LONG_TITLE": "Unspecified essential hypertension"}, "163": {"ICD_CODE": "4280", "PROB": "0.21231478", "SHORT_TITLE": "CHF NOS", "LONG_TITLE": "Congestive heart failure, unspecified"}, "142": {"ICD_CODE": "41401", "PROB": "0.16941674", "SHORT_TITLE": "Crnry athrscl natve vssl", "LONG_TITLE": "Coronary atherosclerosis of native coronary artery"}, "157": {"ICD_CODE": "42731", "PROB": "0.15675905", "SHORT_TITLE": "Atrial fibrillation", "LONG_TITLE": "Atrial fibrillation"}, "222": {"ICD_CODE": "51881", "PROB": "0.13163589", "SHORT_TITLE": "Acute respiratry failure", "LONG_TITLE": "Acute respiratory failure"}, "221": {"ICD_CODE": "5185", "PROB": "0.112723686", "SHORT_TITLE": "No Description", "LONG_TITLE": "No Description"}, "211": {"ICD_CODE": "5070", "PROB": "0.10160673", "SHORT_TITLE": "Food/vomit pneumonitis", "LONG_TITLE": "Pneumonitis due to inhalation of food or vomitus"}, "277": {"ICD_CODE": "5849", "PROB": "0.096198335", "SHORT_TITLE": "Acute kidney failure NOS", "LONG_TITLE": "Acute kidney failure, unspecified"}, "231": {"ICD_CODE": "53081", "PROB": "0.09122082", "SHORT_TITLE": "Esophageal reflux", "LONG_TITLE": "Esophageal reflux"}}';
    // codes = JSON.parse(codes);
      
    // codes = Object.keys(codes).map(function(key) {
    //   return [Number(key), codes[key]];
    // });
    // console.log(codes);
    // this.props.setCodes(codes);

    console.log(this.fullNoteRef.current.value);
    var submissionText = this.fullNoteRef.current.value;
    var httpSubmission = 'http://54.202.117.250:5000/api/icd?text="'+ submissionText +'"&top_k=10';
    // var httpSubmission = 'http://54.202.117.250:5000/test'
    // Get Full Note for Submission to API
    console.log(httpSubmission);
    // var codePromise = fetch(httpSubmission, {method: 'GET'}).then( (resp) => resp.json()).then( data => {
    //   var codes = data;
    //   console.log(codes)

    //   codes = Object.keys(codes).map(function(key) {
    //     return [Number(key), codes[key]];
    //   });
    //   console.log(codes)
    //   this.props.setCodes(codes)
    // });
  };

  handleChange = event => {

    // Counts of items for EM Code

    var initialBool = false;
    if (this.initialRef.current.checked) {
      initialBool = true;
    }

    // CC Count
    var ccCount = 0;
    if (this.chiefComplaintRef.current.value) {
      ccCount += 1;
    };

    // HPI Count
    var hpiCount = 0;
    if (this.HPI1Ref.current.value) {
      hpiCount += 1;
    };

    // ROS Count
    var rosCount = 0;

    // Find Checked Boxes
    var elems = document.querySelectorAll('[type=checkbox]:checked')

    elems.forEach( item => {
      if( item.name === "rosOthersNegative") {
        rosCount = 53;
      } else if(item.name.substring(0,3) === "ros") {
        rosCount += 1;
      }
    }); 

    // PFSH Count
    var pfshCount = 0;
    if (this.medicalRef.current.value) {
      pfshCount += 1;
    }
    if (this.socialRef.current.value) {
      pfshCount += 1;
    }
    if (this.familyRef.current.value) {
      pfshCount += 1;
    }

    // Exam Count
    var examCount = 0;
    if (this.exam1Ref.current.value) {
      examCount += 1;
    };

    // Medical Decision Making Count
    var mdmCount = 0;
    var treatments = [this.treatment1Ref, this.treatment2Ref, this.treatment3Ref, this.treatment4Ref, this.treatment5Ref, this.treatment6Ref];
    treatments.forEach( item => {
      if (item.current.value ) {
        mdmCount += 1;
      } 
    });

    // Counts of Codes
    var emCodes = {"initial": initialBool,
                  "cc": ccCount,
                  "hpi": hpiCount,
                  "ros": rosCount,
                  "pfsh": pfshCount,
                  "exam": examCount,
                  "mdm": mdmCount}

    this.props.setEMCodes(emCodes)
    
    // console.log(emCodes)
    console.log(this.state)
    // Start with blank note
    var fullNoteText = ""
   
    // Add in Chief Complain
    fullNoteText += "\n Chief Complaint: ";
    fullNoteText += this.chiefComplaintRef.current.value;

    // Add in HPI:
    fullNoteText += "\n\n History of Present Illness (HPI): ";
    fullNoteText += this.HPI1Ref.current.value;

    // Add in ROS
    fullNoteText += "\n\n Review of Systems: \n";

    // Add text from each relevant checkbox
    elems.forEach( item => {
      if(item.name.substring(0,3) === "ros") {
        fullNoteText += noteDictionary[item.name];
      }
    }); 

    fullNoteText += "\n\n Additional ROS Notes: ";
    fullNoteText += "\n" + this.rosAdditionalRef.current.value;

    // Add in PFSH
    fullNoteText += "\n\n Past Medical Family and Social History (PFSH): ";
    fullNoteText += "\n " + this.medicalRef.current.value;
    fullNoteText += "\n " + this.socialRef.current.value;
    fullNoteText += "\n " + this.familyRef.current.value;

    // Add in Exam
    fullNoteText += "\n\n Examination: ";
    fullNoteText += "\n " + this.exam1Ref.current.value;

    // Add in Treatment Options
    fullNoteText += "\n\n Treatment Options: ";
    fullNoteText += "\n " + this.treatmentNotesRef.current.value;
    fullNoteText += "\n " + this.treatment1Ref.current.value;
    fullNoteText += "\n " + this.treatment2Ref.current.value;
    fullNoteText += "\n " + this.treatment3Ref.current.value;
    fullNoteText += "\n " + this.treatment4Ref.current.value;
    fullNoteText += "\n " + this.treatment5Ref.current.value;
    fullNoteText += "\n " + this.treatment6Ref.current.value;
    
    // Add in Additional Text
    fullNoteText += "\n\n Additional Notes: ";
    fullNoteText += "\n" + this.additionalNotesRef.current.value;

    // console.log(fullNoteText)
    this.fullNoteRef.current.value = fullNoteText;

  };

  render() {
    return (
      <form className="note-edit" onSubmit={this.getCodes}>
        Initial Intake:
        <input name="initial" ref={this.initialRef} type="checkbox" placeholder="False" onChange={this.handleChange}/>
        {/* Spacer */}
        <input rows="0"/> 

        Chief Complaint: 
        <textarea rows="2" name="chiefComplaint" ref={this.chiefComplaintRef} placeholder="Chief Complaint" onChange={this.handleChange}/>
        
        History of Present Illness:
        <textarea rows="10" name="HPI1" ref={this.HPI1Ref} placeholder="HPI" onChange={this.handleChange}/>
        
        Review of Systems:
        {/* Spacer */}
        <input rows="0"/> 

        General: 
        {/* Spacer */}
        <input rows="0"/> 
        
        <input name="rosGeneral1" ref={this.rosGeneral1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Lack of energy
        <input name="rosGeneral2" ref={this.rosGeneral2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Unexplained weight gain/loss
        <input name="rosGeneral3" ref={this.rosGeneral3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Loss of appetite
        <input name="rosGeneral4" ref={this.rosGeneral4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Fever
        <input name="rosGeneral5" ref={this.rosGeneral5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Night sweats
        <input name="rosGeneral6" ref={this.rosGeneral6Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Pain in jaw when eating
        <input name="rosGeneral7" ref={this.rosGeneral7Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Scalp tenderness
        <input name="rosGeneral8" ref={this.rosGeneral8Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Prior Cancer

        {/* Spacer */}
        <input rows="0"/> 
        Respiratory:
        {/* Spacer */}
        <input rows="0"/> 

        <input name="rosRespiratory1" ref={this.rosRespiratory1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Shortness of breath
        <input name="rosRespiratory2" ref={this.rosRespiratory2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Prolonged cough
        <input name="rosRespiratory3" ref={this.rosRespiratory3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Wheezing
        <input name="rosRespiratory4" ref={this.rosRespiratory4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Sputum production
        <input name="rosRespiratory5" ref={this.rosRespiratory5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Prior tuberculosis
        <input name="rosRespiratory6" ref={this.rosRespiratory6Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Pleurisy
        <input name="rosRespiratory7" ref={this.rosRespiratory7Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Oxygen use
        <input name="rosRespiratory8" ref={this.rosRespiratory8Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Coughing up blood
        <input name="rosRespiratory9" ref={this.rosRespiratory9Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Abnormal chest x-ray
        
        {/* Spacer */}
        <input rows="0"/> 
        Cardiovascular:
        {/* Spacer */}
        <input rows="0"/> 
        
        <input name="rosCardiovascular1" ref={this.rosCardiovascular1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Irregular heartbeat
        <input name="rosCardiovascular2" ref={this.rosCardiovascular2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Racing heart
        <input name="rosCardiovascular3" ref={this.rosCardiovascular3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Chest pains
        <input name="rosCardiovascular4" ref={this.rosCardiovascular4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Swelling of feet or legs
        <input name="rosCardiovascular5" ref={this.rosCardiovascular5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Pain in legs when walking
        
        {/* Spacer */}
        <input rows="0"/> 
        Muscularskeletal:
        {/* Spacer */}
        <input rows="0"/>         
        
        <input name="rosMuscularskeletal1" ref={this.rosMuscularskeletal1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Joint pain
        <input name="rosMuscularskeletal2" ref={this.rosMuscularskeletal2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Aching muscles
        <input name="rosMuscularskeletal3" ref={this.rosMuscularskeletal3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Shoulder pain
        <input name="rosMuscularskeletal4" ref={this.rosMuscularskeletal4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Swelling of joints
        <input name="rosMuscularskeletal5" ref={this.rosMuscularskeletal5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Joint deformities
        <input name="rosMuscularskeletal6" ref={this.rosMuscularskeletal6Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Back pain
        
        {/* Spacer */}
        <input rows="0"/> 
        Gastrointestinal:
        {/* Spacer */}
        <input rows="0"/> 

        <input name="rosGastrointestinal1" ref={this.rosGastrointestinal1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Heartburn
        <input name="rosGastrointestinal2" ref={this.rosGastrointestinal2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Constipation
        <input name="rosGastrointestinal3" ref={this.rosGastrointestinal3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Intolerance to certain foods
        <input name="rosGastrointestinal4" ref={this.rosGastrointestinal4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Diarrhea
        <input name="rosGastrointestinal5" ref={this.rosGastrointestinal5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Abdominal pains
        <input name="rosGastrointestinal6" ref={this.rosGastrointestinal6Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Difficulty swallowing
        <input name="rosGastrointestinal7" ref={this.rosGastrointestinal7Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Nausea
        <input name="rosGastrointestinal8" ref={this.rosGastrointestinal8Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Vomiting
        <input name="rosGastrointestinal9" ref={this.rosGastrointestinal9Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Blood in stools
        <input name="rosGastrointestinal10" ref={this.rosGastrointestinal10Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Incontinence
        <input name="rosGastrointestinal11" ref={this.rosGastrointestinal11Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Unexplained change in bowel habits
        
        {/* Spacer */}
        <input rows="0"/> 
        Neurological:
        {/* Spacer */}
        <input rows="0"/> 

        <input name="rosNeurological1" ref={this.rosNeurological1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Frequent headaches
        <input name="rosNeurological2" ref={this.rosNeurological2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Double vision
        <input name="rosNeurological3" ref={this.rosNeurological3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Weakness
        <input name="rosNeurological4" ref={this.rosNeurological4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Change in sensation
        <input name="rosNeurological5" ref={this.rosNeurological5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Problems with walking/balance
        <input name="rosNeurological6" ref={this.rosNeurological6Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Dizziness
        <input name="rosNeurological7" ref={this.rosNeurological7Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Tremor
        <input name="rosNeurological8" ref={this.rosNeurological8Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Loss of consciousness
        <input name="rosNeurological9" ref={this.rosNeurological9Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Uncontrolled motions
        <input name="rosNeurological10" ref={this.rosNeurological10Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Episodes of visual loss
        
        {/* Spacer */}
        <input rows="0"/> 
        Endocrinologic:
        {/* Spacer */}
        <input rows="0"/> 

        <input name="rosEndocrinologic1" ref={this.rosEndocrinologic1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Intolerance to heat/cold
        <input name="rosEndocrinologic2" ref={this.rosEndocrinologic2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Menstraul irregularities
        <input name="rosEndocrinologic3" ref={this.rosEndocrinologic3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Frequent hunger/urination/thirst
        <input name="rosEndocrinologic4" ref={this.rosEndocrinologic4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>Changes in sex drive
        
        {/* Spacer */}
        <input rows="0"/> 
        Additional ROS:

        <textarea rows="3" name="rosAdditional" ref={this.rosAdditionalRef} placeholder="Additional ROS" onChange={this.handleChange}/>
        {/* Checkbox top offset is wrong */}
        <input name="rosOthersNegative" ref={this.rosOthersNegativeRef} type="checkbox" placeholder="False" onChange={this.handleChange}/>All Others Negative 

        {/* Spacer */}
        <input rows="0"/> 

        Past Medical Family and Social History (PFSH):
        <textarea name="medical" rows="10" ref={this.medicalRef} placeholder="Medical History" onChange={this.handleChange}/>
        <textarea name="family" rows="10" ref={this.familyRef} placeholder="Family History" onChange={this.handleChange}/>
        <textarea name="social" rows="10" ref={this.socialRef} placeholder="Social History" onChange={this.handleChange}/>

        Examination:
        <textarea name="exam1" rows="20" ref={this.exam1Ref} placeholder="Examination" onChange={this.handleChange}/>

        Treatment Options:
        <textarea name="treatmentNotes" rows="3" ref={this.treatmentNotesRef} placeholder="Treatment Notes" onChange={this.handleChange}/>
        <input name="treatment1" ref={this.treatment1Ref} placeholder="Treatment 1" onChange={this.handleChange}/>
        <input name="treatment2" ref={this.treatment2Ref} placeholder="Treatment 2" onChange={this.handleChange}/>
        <input name="treatment3" ref={this.treatment3Ref} placeholder="Treatment 3" onChange={this.handleChange}/>
        <input name="treatment4" ref={this.treatment4Ref} placeholder="Treatment 4" onChange={this.handleChange}/>
        <input name="treatment5" ref={this.treatment5Ref} placeholder="Treatment 5" onChange={this.handleChange}/>
        <input name="treatment6" ref={this.treatment6Ref} placeholder="Treatment 6" onChange={this.handleChange}/>

        Additional Notes:
        <textarea name="additionalNotes" rows="20" ref={this.additionalNotesRef} placeholder="Additional Notes" onChange={this.handleChange}/>

        Full Note:
        <textarea name="fullNote" rows="100" ref={this.fullNoteRef}/>

        <button type="submit">Get ICD Codes</button>
      </form>
    );
  }
}

export default AddNoteForm;
