import React from "react";
import PropTypes from "prop-types";
import { noteDictionary } from "./noteDictionary";

class AddNoteForm extends React.Component {
  box1Ref = React.createRef();
  box2Ref = React.createRef();
  box3Ref = React.createRef();
  box4Ref = React.createRef();
  box5Ref = React.createRef();
  box6Ref = React.createRef();
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
      system1: this.system1Ref.current.value,
      system2: this.system2Ref.current.value,
      system3: this.system3Ref.current.value,
      system4: this.system4Ref.current.value,
      system5: this.system5Ref.current.value,
      system6: this.system6Ref.current.value,
      boxROS: this.boxROSRef.current.checked,

      // PFSH
      medical: this.medicalRef.current.value,
      family:  this.familyRef.current.value,
      social: this.socialRef.current.value,

      // Exam
      exam1: this.exam1Ref.current.value,

      // Treatment Options
      treatmentNotes: this.treatmentNotesRef.current.value,
      treatment1: this.treatment1Ref.current.value,
      treatment2: this.treatment1Ref.current.value,
      treatment3: this.treatment1Ref.current.value,
      treatment4: this.treatment1Ref.current.value,
      treatment5: this.treatment1Ref.current.value,
      treatment6: this.treatment1Ref.current.value,


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
    // submissionText="poop";
    var httpSubmission = 'http://54.202.117.250:5000/api/icd?text="'+ submissionText +'"&top_k=10';
    // var httpSubmission = 'http://54.202.117.250:5000/test'
    // Get Full Note for Submission to API
    console.log(httpSubmission);
    var codePromise = fetch(httpSubmission, {method: 'GET'}).then( (resp) => resp.json()).then( data => {
      var codes = data;
      console.log(codes)

      codes = Object.keys(codes).map(function(key) {
        return [Number(key), codes[key]];
      });
      console.log(codes)
      this.props.setCodes(codes)
    });
  };

  handleChange = event => {

    // Start with blank note
    var fullNoteText = ""

    // Find Checked Boxes
    var elems = document.querySelectorAll('[type=checkbox]:checked')
    
    // New Note is updated with checked values from note
    elems.forEach( item => fullNoteText += noteDictionary[item.name]) 
    
    // Add in Additional Text
    fullNoteText += this.additionalNotesRef.current.value;

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
        <input name="system1" ref={this.system1Ref} placeholder="System 1" onChange={this.handleChange}/>
        <input name="system2" ref={this.system2Ref} placeholder="System 2" onChange={this.handleChange}/>
        <input name="system3" ref={this.system3Ref} placeholder="System 3" onChange={this.handleChange}/>
        <input name="system4" ref={this.system4Ref} placeholder="System 4" onChange={this.handleChange}/>
        <input name="system5" ref={this.system5Ref} placeholder="System 5" onChange={this.handleChange}/>
        <input name="system6" ref={this.system6Ref} placeholder="system 6" onChange={this.handleChange}/>
        {/* Checkbox top offset is wrong */}
        <input name="boxROS" ref={this.boxROSRef} type="checkbox" placeholder="False" onChange={this.handleChange}/>All Others Negative 

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
