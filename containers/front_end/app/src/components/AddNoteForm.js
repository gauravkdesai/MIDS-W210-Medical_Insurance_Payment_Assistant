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
      box1: this.box1Ref.current.checked,
      box2: this.box2Ref.current.checked,
      box3: this.box3Ref.current.checked,
      box4: this.box4Ref.current.checked,
      box5: this.box5Ref.current.checked,
      box6: this.box6Ref.current.checked,
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
        Feature 1 <input name="box1" ref={this.box1Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>
        Feature 2 <input name="box2" ref={this.box2Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>
        Feature 3 <input name="box3" ref={this.box3Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>
        Feature 4 <input name="box4" ref={this.box4Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>
        Feature 5 <input name="box5" ref={this.box5Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>
        Feature 6 <input name="box6" ref={this.box6Ref} type="checkbox" placeholder="False" onChange={this.handleChange}/>

        <textarea name="additionalNotes" ref={this.additionalNotesRef} placeholder="Additional Notes" onChange={this.handleChange}/>

        <textarea name="fullNote" ref={this.fullNoteRef}/>
        
        <button type="submit">Get ICD Codes</button>
      </form>



    );
  }
}

export default AddNoteForm;
