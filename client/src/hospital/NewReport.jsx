import React, { useState } from "react";
import Layout from "../component/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import '../App.css'
export default function NewReport() {
  const location = useLocation();
  const navigate = useNavigate();

  // var medCase = location.state.medCase;
  // var emrgCase = location.state.emrgCase;

  // var headingText = medCase + " " + emrgCase;

  const [state, setState] = useState({
    Sex: "Male",
    Relation: "Son of",
    Dying_declaration: "Dying Declaration Not required",
    Police_Info: "Police Information Given",
    Consciousness: "Conscious",
    Type_of_Medico_legal_case: "Accident"
  });

  const [ARPhoto, setARPhoto] = useState() 
  const [ARPhotoType, setARPhotoType] = useState() 
  const [ARPhotoName, setARPhotoName] = useState() 


  const [bruises, setBruises] = useState() 
  const [bruisesType, setBruisesType] = useState() 
  const [bruisesName, setBruisesName] = useState() 
  
  const [IPPhoto, setIPPhoto] = useState() 
  const [IPPhotoType, setIPPhotoType] = useState() 
  const [IPPhotoName, setIPPhotoName] = useState() 
  

  let updateInput = (e) => {
    setState({
      ...state,
        [e.target.name]: e.target.value,
    });
  };

  const allowed_AR_IP_files = ["image/jpeg", "image/png", "application/pdf"];

  const handleBruisesFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && allowed_AR_IP_files.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setBruises(e.target.result);
          setBruisesName(selectedFile.name);
          setBruisesType(selectedFile.type);
          console.log(e.target.result)
        };
      } else {
        toast.error("Not a valid format: Please select only PDF");
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
          setIPPhoto(e.target.result);
          setIPPhotoName(selectedFile.name);
          setIPPhotoType(selectedFile.type);
          console.log(e.target.result)
        };
      } else {
        toast.error("Not a valid format: Please select only png or jpeg image");
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
          setARPhoto(e.target.result);
          setARPhotoName(selectedFile.name);
          setARPhotoType(selectedFile.type);
          console.log(e.target.result)
        };
      } else {
        toast.error("Not a valid format: Please select only png or jpeg image");
        setARPhoto(null);
      }
    } else {
      console.log("please select a image");
    }
  };

  const detailsSubmit = () => {
    console.log(state)
    console.log(bruises)
    console.log(ARPhoto)
    console.log(IPPhoto)

    // if(medCase == "Emergency") {
      toast.success('Alerted respective control room')
      toast.success('Alerted the nearest police station')
      toast.success('Alerted SP viva SMS')
    // } else {
      // toast.success('Alerted the nearest police station')
    // }

    navigate('/hospital')
  }

  return (
    <>
      <Layout heading="New Report" appBarColor="primary" />
      <div style={{height:"50px"}} />
      <Container className="mt-5">
        <div className="mb-3" style={{ fontSize: "22px" }}>
          Patient Details
        </div>
        <Form.Group>
          <Row>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Patient Name"
                name="Patient Name"
                type="text"
                autoComplete="off"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Age"
                name="Age"
                type="number"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Select
                aria-label="Default select example"
                onChange={updateInput}
                name="Sex"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Occupation"
                name="Occupation"
                type="text"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Select
                aria-label="Default select example"
                onChange={updateInput}
                name="Relation"
              >
                <option value="Son">Son of</option>
                <option value="Daughter">Daughter of</option>
                <option value="Wife">Wife of</option>
                <option value="Husband">Husband of</option>
                <option value="Husband">Mother of</option>
                <option value="Husband">Father of</option>
              </Form.Select>
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Relation Name"
                onChange={updateInput}
                name="Relation Name"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="12">
              <Form.Control
              className="textarea"
                placeholder="Address"
                as="textarea"
                rows="3"
                name="Address"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Identification Mark 1"
                name="Identification Mark 1"
                type="text"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Identification Mark 2"
                name="Identification Mark 2"
                type="text"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              PDF of bruises :
            </Form.Label>
            <Col className="mb-3" sm="10">
              <Form.Control
                name="bruises pdf"
                onChange={handleBruisesFile}
                type="file"
              />
            </Col>
          </Row>
        </Form.Group>

        <div style={{ height: "5px" }}></div>
        <hr />

        <div style={{ height: "15px" }}></div>
        <div className="mb-3" style={{ fontSize: "22px" }}>
          Accident Register Details
        </div>
        <Form.Group>
          <Row>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="AR No."
                name="AR No."
                type="number"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Hospital No."
                name="Hospital No."
                type="number"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Select
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
              </Form.Select>
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Select
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
              </Form.Select>
            </Col>
          </Row>
          <Row>
          <Col className="mb-3" sm="3">
              <Form.Select
                aria-label="Default select example"
                name="Type_of_Medico_legal_case"
                onChange={updateInput}
              >
              <option value="Accident">
                Accident
              </option>
                <option value="Poison">
                  Poison
                </option>
                <option value="Assault">
                  Assault
                </option>
              </Form.Select>
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Select
                aria-label="Default select example"
                name="Consciousness"
                onChange={updateInput}
              >
                <option value="Conscious">Conscious</option>
                <option value="Unconscious">Unconscious</option>
              </Form.Select>
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Alleged cause of injury"
                name="Alleged cause of injury"
                type="text"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              Admission Date :
            </Form.Label>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Admission Date"
                name="Admission Date"
                type="date"
                onChange={updateInput}
              />
            </Col>
            <Form.Label sm="2" column>
              Admission Time :
            </Form.Label>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Admission Time"
                name="Admission Time"
                type="time"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="12">
              <Form.Control
              className="textarea"
                placeholder="Description of injuries and Treatment"
                as="textarea"
                rows="3"
                name="Description of injuries and Treatment"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              Photo of AR Form :
            </Form.Label>
            <Col className="mb-3" sm="10">
              <Form.Control name="AR File" type="file" onChange={handleARFile} />
            </Col>
          </Row>
        </Form.Group>

        <div style={{ height: "5px" }}></div>
        <hr />

        <div style={{ height: "15px" }}></div>
        <div className="mb-3" style={{ fontSize: "22px" }}>
          Intimation to Police
        </div>
        <Form.Group>
          <Row>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="IP No."
                name="IP No."
                type="number"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Issues No."
                name="Issues No."
                type="number"
                onChange={updateInput}
              />
            </Col>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Place of Accident"
                name="Place of Accident"
                type="text"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Police station limit"
                name="Police station limit"
                type="text"
                onChange={updateInput}
              />
            </Col>

            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Admitted Doctor Name"
                name="Admitted by Doctor Name"
                type="text"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label column sm="2">
              Date of Accident :
            </Form.Label>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Date of Accident"
                name="Date of Accident"
                type="date"
                onChange={updateInput}
              />
            </Col>
            <Form.Label column sm="2">
              Time of Accident :
            </Form.Label>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Time of Accident"
                name="Time of Accident"
                type="time"
                onChange={updateInput}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              Photo of IP Form :
            </Form.Label>
            <Col className="mb-3" sm="10">
              <Form.Control name="IP File" type="file" onChange={handleIPFile} />
            </Col>
          </Row>
        </Form.Group>
        <div style={{ height: "20px" }} />

        <Button className="me-3" style={{width:'80px'}} onClick={() => navigate('/hospital')}>Back</Button>
        <Button style={{width:'80px'}} onClick={detailsSubmit}>Send</Button>

        <div style={{ height: "30px" }} />
      </Container>
    </>
  );
}
