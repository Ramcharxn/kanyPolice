import React, { useState } from "react";
import {
  Container,
  InputGroup,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  Table,
  Modal,
  Col,
  Row,
} from "react-bootstrap";
import Layout from "../component/Layout";
import { ReactComponent as Next } from "../resource/next.svg";
import beep from "../resource/beep.wav";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'

export default function Police() {
  const Array = [
    {
      Name: "Ram",
      Gender: "Male",
      Severity: "Moderate",
      Type: "Accident",
      Status: "Acknowledged",
      Phone: "6382944040",
    },
    {
      Name: "Achintya",
      Gender: "Female",
      Severity: "Critical",
      Type: "Poison",
      Status: "Closed",
      Phone: "999444000",
    },
    {
      Name: "Selva",
      Gender: "Male",
      Severity: "Normal",
      Type: "Accident",
      Status: "Intimated",
      Phone: "66677778888",
    },
    {
      Name: "Mahidhar",
      Gender: "Male",
      Severity: "Dead",
      Type: "Assualt",
      Status: "Arrived",
      Phone: "11122255576",
    },
  ];

  const navigate = useNavigate();
  
  // let path = "../resource/emergency.mp3";


  const [search, setSearch] = useState("");
  const [serachBy, setSearchBy] = useState("Name");
  const [modal1Show, setModal1Show] = useState(false);
  const [audio, setAudio] = useState();

  const [number, setNumber] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    
  }, [])

  const handleModalOpen = () => {
    var sound = new Audio(beep)
    sound.loop = true
    sound.playbackRate = 1
    sound.play();
    setAudio(sound);
    setModal1Show(true)
  }

  const closeModal = () => {
    pauseAudio()
    setModal1Show(false)
  }

  const pauseAudio = () => {
    audio.pause();
  }

  function circleColor (Severity) {
    switch (Severity) {
      case "Normal":
        return (
          <div
            style={{
              backgroundColor: "green",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        );
      case "Moderate":
        return (
          <div
            style={{
              backgroundColor: "yellow",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        );
      case "Critical":
        return (
          <div
            style={{
              backgroundColor: "red",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        );
        case "Dead":
        return (
          <div
            style={{
              backgroundColor: "black",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        );
      default:
        return null;
    }
  }

  const policeSTatus = (status) => {
    switch (status) {
      case "Viewed":
        return "Viewed"
      case "Arrived":
        return "Arrived"
      case "Closed":
        return "Closed"
      default:
        return "Intimated"
    }
  }

  return (
    <div>
      <Layout heading="Police Station Name" appBarColor="danger" />
      <div style={{height:"50px"}} />
      <Container className="my-5">
        <Row>
        <Col sm="3" className="mb-3">
            <Form.Select
              className="me-3 form-control"
              required
              aria-label="Default select example"
              name="sex"
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="Name">Name</option>
              <option value="Severity">Severity</option>
              <option value="Status">Status</option>
              <option value="Type">Type</option>
            </Form.Select>
          </Col>
          <Col sm="6">
            <Form.Control
            className="form-focus"
              placeholder="Search here...."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Col>
          <Col sm="3" className="d-flex justify-content-end">
            <Button variant="danger" style={{height:"40px"}} className="ms-5 " onClick={handleModalOpen}>
             <div  style={{width:'100px'}}>New Report</div> 
            </Button>
          </Col>
        </Row>

        {/* <Row>
          <Col sm="3">
            <Form.Control
            className="form-focus"
            value={number}
              placeholder="Search here...."
              onChange={(e) => setNumber(e.target.value)}
            />
          </Col>
          <Col sm="6">
            <Form.Control
            className="form-focus"
              placeholder="Search here...."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Col>
          <Col sm="3">
            <Button onClick={sendSMS}>sumbit</Button>
          </Col>
        </Row> */}

        <Table className="mt-5" striped bordered hover responsive="sm" center>
          <thead>
            <tr style={{backgroundColor:"#d7d7d7"}}>
              <th></th>
              <th>S.No</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Phone No.</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.filter((arr) => arr[serachBy].toLowerCase().includes(search)).map(
              (arr, i) => {
                return (
                  <tr key={i} onClick={() => navigate(`/police/view_report/${i+1}`)}>
                    <td>
                      {circleColor(arr.Severity)}
                    </td>
                    <td>{i + 1}</td>

                    <td>{arr.Name}</td>
                    <td>{arr.Gender}</td>
                    <td>{arr.Phone}</td>
                    <td>{arr.Type}</td>
                    {/* <td>{arr.Status == "Arrived" ? <CheckBox/> : null}</td> */}
                    <td>{policeSTatus(arr.Status)}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </Container>

      {/* Modal For first popup */}

      <Modal
        show={modal1Show}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // style={{backgroundColor:'rgb(91, 86, 1)'}}
        // style={{backgroundColor:'rgb(41, 41, 41)'}}
        // style={{backgroundColor:'rgb(10, 82, 0)'}}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div>
              <div style={{fontSize:'20px', fontWeight:"900"}}>Emergency Case</div>
            </div>

            {/* <div class="d-flex flex-wrap" className="mt-4 mb-5" style={{width: '300px'}}> */}

            <div className="mt-4 d-flex flex-column justify-content-center">
              <div className="d-flex flex-column" >
              <div className="d-flex flex-row">
              <pre style={{fontSize:'16px'}}>Hospital Name  : </pre>
              <div>SIMS Hospital</div>
              </div>
              <div className="d-flex flex-row">
              <pre style={{fontSize:'16px'}}>Location       : </pre>
              <div style={{width:'200px'}} className="mb-3">No.1, Jawaharlal Nehru Salai, 100 Feet Road, Near Vadapalani Metro Station, Chennai, Tamil Nadu 600026</div>
              </div>
              <div className="d-flex flex-row">
              <pre style={{fontSize:'16px'}}>Patient Name   : </pre>
              <div>Achintya Murari</div>
              </div>
              <div className="d-flex flex-row">
              <pre style={{fontSize:'16px'}}>Type of Case   : </pre>
              <div>Accident</div>
              </div>
              <div className="d-flex flex-row">
              <pre style={{fontSize:'16px'}}>Case severity  : </pre>
              <div>Emergency</div>
              </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn bg-transparent "
            variant="outline-light"
            onClick={() => (navigate(`/police/view_report/${1}`), pauseAudio())}
          >
            <div style={{ color: "black", fontSize: 14 }}>
              View <Next />
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      
    </div>
  );
}
