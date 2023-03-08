import React, { useState, useEffect } from "react";
import SideBox from "./SideBox";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Menu } from "../resource/menu.svg";
import { ReactComponent as Close } from "../resource/close.svg";
import { ReactComponent as Trash } from "../resource/trash.svg";
// import FileViewer from "react-file-viewer";
import withAuth from '../withAuth';
import "../App.css";
import {Col, Container} from 'react-bootstrap'
import pic from "../resource/report.jpeg";
import toast from "react-hot-toast";
import { collection, doc, setDoc, onSnapshot, addDoc } from "firebase/firestore";
import db from "../firebase";
import jwtDecode from "jwt-decode";
import axios from "axios";

const NewReport = () => {
  const navigate = useNavigate();
  const patientsRef = collection(db, "patients");
  const [policeData, setPoliceData] = useState([])

  const [isActive, setIsActive] = useState(false);

  const userRef =  collection(db, 'user')

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const [DToken, setDToken] = useState({})

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setPoliceData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsubscribe();
  }, []);


  const [state, setState] = useState({
    Sex: "Male",
    Relation: "Son of",
    Dying_declaration: "Dying Declaration Not required",
    Police_Info: "Police Information Given",
    Consciousness: "Conscious",
    Type_of_Medico_legal_case: "Accident",
    status: "Intimated",
    Severity: "Normal",
    date: new Date().getTime(),
    viewed: false,
    active: 'active'
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const decodedToken = jwtDecode(token).user
    setDToken(decodedToken)
    setState({
      ...state,
      'Hospital ID': decodedToken['id'],
      "Police station limit": decodedToken['police nearby'],
    })
    console.log('hello'+decodedToken['police nearby'])
  },[])


  const [ARPhoto, setARPhoto] = useState(null);
  const [ARPhotoType, setARPhotoType] = useState(null);

  const [bruises, setBruises] = useState(null);
  const [bruisesType, setBruisesType] = useState(null);

  const [IPPhoto, setIPPhoto] = useState(null);
  const [IPPhotoType, setIPPhotoType] = useState(null);

  let updateInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  let updateDocument = (val, doc, type) => {
    setState({
      ...state,
      [val + "doc"]: doc,
      [val + "type"]: type,
    });
  };

  const allowed_AR_IP_files = [
    "image/jpeg",
    "image/png",
    // "application/pdf",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleBruisesFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && allowed_AR_IP_files.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          updateDocument("Bruises", e.target.result, selectedFile.type);
          setBruises(e.target.result);
          // setBruisesName(selectedFile.name);
          setBruisesType(selectedFile.type);
          // console.log(e.target.result);
        };
      } else {
        toast.error("Not a valid format: Please select only PNG or JPEG image");
        setBruises(null);
      }
    } else {
      console.log("please select a pdf");
    }
  };

  const handleIPFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && allowed_AR_IP_files.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          updateDocument("IP", e.target.result, selectedFile.type);
          setIPPhoto(e.target.result);
          // setIPPhotoName(selectedFile.name);
          setIPPhotoType(selectedFile.type);
          // console.log(e.target.result);
        };
      } else {
        toast.error("Not a valid format: Please select only PNG or JPEG image");
        setIPPhoto(null);
      }
    } else {
      console.log("please select a image");
    }
  };

  const handleARFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && allowed_AR_IP_files.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          updateDocument("AR", e.target.result, selectedFile.type);
          setARPhoto(e.target.result);
          // setARPhotoName(selectedFile.name);
          setARPhotoType(selectedFile.type);
          // console.log(e.target.result);
        };
      } else {
        toast.error("Not a valid format: Please select only PNG or JPEG image");
        setARPhoto(null);
      }
    } else {
      console.log("please select a image");
    }
  };

  const detailsSubmit = async (e) => {
    e.preventDefault()
    try {
      // const data = Object.entries(state).reduce((acc, [key, value]) => {
      //   acc[key] = value;
      //   return acc;
      // }, {});
      if (bruises==null || ARPhoto==null || IPPhoto==null ) {
        toast.error('Fill all the required file')
        return
      }
      console.log('clicked')

      if (state.Severity == 'Critical') {
        axios.post('http://localhost:5000/send-sms',{patName: state['Patient Name'], Severity: state['Severity'], hospName: DToken['Hospital name']}).then(res => toast.success('Alerted SP via SMS')).catch(err => (console.log(err), toast.error('Error occured when sending SMS to SP')))
      }
      console.log('clicked2')

      // await setDoc(doc(patientsRef), state);
      navigate("/hospital");
      await addDoc(patientsRef, state)
      // const newDocRef = collection(db, 'patients').doc()
      // await newDocRef.set(state)
      // if(medCase == "Emergency") {
    toast.success("Alerted control room");
    toast.success('Alerted the nearest police station')
    // } else {
    // toast.success('Alerted the nearest police station')
    // }
      console.log('clicked3')

    console.log('clicked4')
    } catch (err) {
      console.log(err)
      toast.error("An error occured, if this error presist try again later");
    }

    
  };

  return (
    <div className="view-report">
      {!isActive ? (
        <div
          className="menu-bar"
          onClick={handleClick}
          style={{ position: "fixed", top: "48px", right: "10px" }}
        >
          <Menu />
        </div>
      ) : (
        <div
          className="menu-bar"
          onClick={handleClick}
          style={{ position: "fixed", top: "48px", right: "10px" }}
        >
          <Close />
        </div>
      )}
      <SideBox isActive={isActive} setIsActive={setIsActive} />
      <div className="view-main-comp">
        <div
          className="mt-4 mb-2"
          style={{
            color: "blue",
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "sans-serif",
            letterSpacing: "1px",
          }}
        >
          SIMS VADAPALANI
        </div>
        <hr />
        <form onSubmit={e => detailsSubmit(e)} className="view-report-main">
          <div className="view-heading">
            <div className="heading">Patient Details</div>
            <div
              class="grid-container"
              style={{ width: "100%", padding: "20px" }}
            >
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2 "
                >
                  Patient Name *
                </div>
                <input
                  className="input-box2"
                  type="text"
                  required
                  placeholder="Patient Name"
                  name="Patient Name"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Phone Number *
                </div>
                <input
                  className="input-box2"
                  type="number"
                  required
                  placeholder="Phone Number"
                  name="Phone number"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Age
                </div>
                <input
                  className="input-box2"
                  type="number"
                  placeholder="Age"
                  name="Age"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Gender
                </div>
                <select
                  onChange={updateInput}
                  name="Sex"
                  className="input-box2"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Relation
                </div>
                <select
                  onChange={updateInput}
                  name="Relation"
                  className="input-box2"
                >
                  <option value="Son">Son of</option>
                  <option value="Daughter">Daughter of</option>
                  <option value="Wife">Wife of</option>
                  <option value="Husband">Husband of</option>
                  <option value="Husband">Mother of</option>
                  <option value="Husband">Father of</option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Relation Name
                </div>
                <input
                  className="input-box2"
                  type="text"
                  placeholder="Relation Name"
                  name="Relation Name"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Occupation
                </div>
                <input
                  className="input-box2"
                  type="text"
                  placeholder="Occupation"
                  name="Occupation"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Address
                </div>
                <input
                  className="input-box2"
                  type="text"
                  placeholder="Address"
                  name="Address"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Identification Mark 1
                </div>
                <input
                  className="input-box2"
                  type="text"
                  placeholder="Identification Mark 1"
                  name="Identification Mark 1"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Identification Mark 2
                </div>
                <input
                  className="input-box2"
                  type="text"
                  placeholder="Identification Mark 2"
                  name="Identification Mark 2"
                  autoComplete="off"
                  onChange={updateInput}
                />
              </div>
              {bruises == null ? <div class="grid-item">
                 <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Bruises File *
                </div>
                <label for="file-input1" class="custom-file-upload">
                  Upload Brusises Photo
                </label>
                <input required onChange={handleBruisesFile} id="file-input1" type="file"/>
              </div>:null}
                </div>
                <div className="d-flex align-items-end">
                <img className="image-container" src={bruises} />
              {bruises != null ? <div class="grid-item">
                <button style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }} className="mt-4" onClick={() => (setBruises(null), setBruisesType(null))}><Trash /></button>
              </div>:null}
                </div>

            {/* {bruisesType !== null &&
              (bruisesType == "application/pdf" ? (
                <FileViewer
                  fileType={"pdf"}
                  filePath={bruises}
                />
              ) : bruisesType ==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <FileViewer
                  fileType="docx"
                  filePath={bruises}
                />
              ) : (
                <img className="image-container" src={bruises} />
              ))} */}
          </div>
          <div className="view-heading">
            <div className="heading">Accident Report</div>
            <div
              class="grid-container"
              style={{ width: "100%", padding: "20px" }}
            >
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  AR Number *
                </div>
                <input
                  className="input-box2"
                  placeholder="AR No."
                  name="AR No."
                  type="number"
                  required
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Hospital Number *
                </div>
                <input
                  className="input-box2"
                  placeholder="Hospital No."
                  name="Hospital No."
                  type="number"
                  required
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Dying Declaration
                </div>
                <select
                  className="input-box2"
                  aria-label="Default select example"
                  name="Dying_declaration"
                  onChange={updateInput}
                >
                  <option value="Dying Declaration Not required">
                    Dying Declaration Not required
                  </option>
                  <option value="Dying Declaration Required">
                    Dying Declaration Required
                  </option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Police Intimation
                </div>
                <select
                  className="input-box2"
                  aria-label="Default select example"
                  name="Police_Info"
                  onChange={updateInput}
                >
                  <option value="Police Information Given">
                    Police Information Given
                  </option>
                  <option value="Police Information Not given">
                    Police Information Not given
                  </option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Type of Medic legal case
                </div>
                <select
                  className="input-box2"
                  aria-label="Default select example"
                  name="Type_of_Medico_legal_case"
                  onChange={updateInput}
                >
                  <option value="Accident">Accident</option>
                  <option value="Poison">Poison</option>
                  <option value="Assault">Assault</option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Consious State
                </div>
                <select
                  className="input-box2"
                  aria-label="Default select example"
                  name="Consciousness"
                  onChange={updateInput}
                >
                  <option value="Conscious">Conscious</option>
                  <option value="Unconscious">Unconscious</option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Alleged cause of injury
                </div>
                <input
                  className="input-box2"
                  placeholder="Alleged cause of injury"
                  name="Alleged cause of injury"
                  type="text"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Admission Date
                </div>
                <input
                  className="input-box2"
                  placeholder="Admission Date"
                  name="Admission Date"
                  type="date"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Admission Time
                </div>
                <input
                  className="input-box2"
                  placeholder="Admission Time"
                  name="Admission Time"
                  type="time"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Description of injuries and Treatment
                </div>
                <input
                  className="input-box2"
                  placeholder="Description of injuries and Treatment"
                  as="textarea"
                  rows="3"
                  name="Description of injuries and Treatment"
                  onChange={updateInput}
                />
              </div>
              {ARPhoto == null ? <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  AR File *
                </div>
                <label for="file-input2" class="custom-file-upload">
                  Upload AR Photo
                </label>
                <input required onChange={handleARFile} id="file-input2" type="file"/>
              </div>:null}
                </div>
                <div className="d-flex align-items-end">
                <img className="image-container" src={ARPhoto} />
              {ARPhoto != null ? <div class="grid-item">
                <button style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }} className="mt-4" onClick={() => (setARPhoto(null), setARPhotoType(null))}><Trash /></button>
              </div>:null}
                </div>

            {/* {ARPhotoType !== null &&
              (ARPhotoType == "application/pdf" ? (
                <FileViewer
                  fileType={"pdf"}
                  filePath={ARPhoto}
                />
              ) : ARPhotoType ==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <FileViewer
                  fileType="docx"
                  filePath={ARPhoto}
                />
              ) : (
                <img className="image-container" src={ARPhoto} />
              ))} */}
          </div>
          <div className="view-heading">
            <div className="heading">Intimation to Police</div>
            <div
              class="grid-container"
              style={{ width: "100%", padding: "20px" }}
            >
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  IP Number *
                </div>
                <input
                  className="input-box2"
                  placeholder="IP No."
                  name="IP No."
                  required
                  type="number"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Issue Number *
                </div>
                <input
                  className="input-box2"
                  placeholder="Issue No."
                  name="Issue No."
                  type="number"
                  required
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Place of Accident
                </div>
                <input
                  className="input-box2"
                  placeholder="Place of Accident"
                  name="Place of Accident"
                  type="text"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Police station limit
                </div>
                <select
                  className="input-box2"
                  aria-label="Default select example"
                  name="Police station limit"
                  onChange={updateInput}
                >
                  {policeData.length > 0 && policeData.filter(d => d.id == DToken['police nearby']).map(data => {  
                    return <option value={data.id}>{data['Police station name']}</option>
                  })}
                  {policeData.length > 0 && policeData.filter(d => d.type=='police').filter(d => d.id != DToken['police nearby']).map(data => {  
                    return <option value={data.id}>{data['Police station name']}</option>
                  })}
                </select>
              </div>

              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Admitted Doctor Name
                </div>
                <input
                  className="input-box2"
                  placeholder="Admitted Doctor Name"
                  name="Admitted by Doctor Name"
                  type="text"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Severity
                </div>
                <select
                  className="input-box2"
                  aria-label="Default select example"
                  name="Severity"
                  onChange={updateInput}
                >
                  <option value="Normal">Normal</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Critical">Critical</option>
                  <option value="Dead">Dead</option>
                </select>
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  Date of Accident
                </div>
                <input
                  className="input-box2"
                  placeholder="Date of Accident"
                  name="Date of Accident"
                  type="date"
                  onChange={updateInput}
                />
              </div>
              <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  time of Accident
                </div>
                <input
                  className="input-box2"
                  placeholder="Time of Accident"
                  name="Time of Accident"
                  type="time"
                  onChange={updateInput}
                />
              </div>
              {IPPhoto == null ? <div class="grid-item">
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mb-2"
                >
                  IP File *
                </div>
                <label for="file-input3" class="custom-file-upload">
                  Upload IP Photo
                </label>
                <input required onChange={handleIPFile} id='file-input3' type="file"/>
              </div>:null}
</div>

           <div className="d-flex align-items-end">
           <img className="image-container" src={IPPhoto} />
              {IPPhoto != null ? <div class="grid-item">
                <button style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }} className="mt-4" onClick={() => (setIPPhoto(null), setIPPhotoType(null))}><Trash /></button>
              </div>:null}
           </div>
            {/* {IPPhotoType !== null &&
              (IPPhotoType == "application/pdf" ? (
                <FileViewer
                  fileType={"pdf"}
                  filePath={IPPhoto}
                  />
                  ) : IPPhotoType ==
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                    <FileViewer
                  fileType="docx"
                  filePath={IPPhoto}
                  />
                  ) : (
                    <img className="image-container" src={IPPhoto} />
                  ))} */}
          </div>
          
          <button style={{
                border: "none",
                outline: "none",
                backgroundColor: "#6868ED",
                padding: "10px 20px",
                width: "200px",
                color: "white",
                float:'right',
                textTransform: "uppercase",
              }}
              className="mt-5 mb-3 mb-2"
              type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}


export default withAuth(['hospital'])(NewReport)