import React, { useState } from "react";
import Layout from "../component/Layout";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import '../App.css'
import { BrowserView, MobileView, isBrowser } from 'react-device-detect';
import pic from '../report.jpeg'

export default function ViewReportHos() {
  const navigate = useNavigate();

  const styleDic = isBrowser ? { fontSize: "18px", color: "blue" } : { fontSize: "14px", color: "white" };

  const bottomBar = isBrowser ? "" : " bottom-bar"

  const [design, setDesign] = useState("patient_detials");
  return (
    <>
      <Layout heading="Report severity" appBarColor="primary" />
      <div style={{height:"50px"}} />
      <div 
      style={{cursor:'pointer'}}
        className={"mt-3 d-flex justify-content-center align-items-center disable-text-selection" + bottomBar}
      >
        <div
          onClick={() => setDesign("patient_detials")}
          style={design == "patient_detials" ? styleDic :  isBrowser ? {fontSize: "14px"} : {fontSize: "12px"}}
        >
         &ensp; Patient Details &emsp; 
        </div>
        /
        <div
          onClick={() => setDesign("acc_register")}
          style={design == "acc_register" ? styleDic : isBrowser ? {fontSize: "14px"} : {fontSize: "12px"}}
        >
         &ensp; Accident Register &ensp; 
        </div>
        /
        <div
          onClick={() => setDesign("info_police")}
          style={design == "info_police" ? styleDic :  isBrowser ? {fontSize: "14px"} : {fontSize: "12px"}}
        >
         &ensp; Infomation to Police &ensp; 
        </div>
      </div>
     
      <Container className="mt-4">
        {(() => {
            if(design == "patient_detials"){
                return <>
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
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Age"
                name="Age"
                type="number"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Sex"
                name="Sex"
                type="text"
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Occupation"
                name="Occupation"
                type="text"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Relation"
                name="Relation"
                type="text"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Relation Name"
                name="Relation Name"
                type="text"
                disabled
                value=""
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
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Identification Mark 1"
                name="Identification Mark 1"
                type="text"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Identification Mark 2"
                name="Identification Mark 2"
                type="text"
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              PDF of bruises :
            </Form.Label>
            <Col sm="12">
              <div className="p-30">
                <embed
                  className="embed"
                  src={pic}
                  type="Image/jpg"
                  width="100%"
                  height="100%"
                />
              </div>
            </Col>
          </Row>
        </Form.Group>
                </>
            } else if (design == "acc_register") {
                return <>
                <div className="mb-3" style={{ fontSize: "22px" }}>
          Accident Register Details
        </div>
        <Form.Group>
          <Row>
            <Col className="mb-3" sm="3">
              <Form.Control placeholder="AR No." name="AR No." type="number"
                disabled
                value="" />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Hospital No."
                name="Hospital No."
                type="number"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Dying_declaration"
                name="Dying_declaration"
                type="number"
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Police_Info"
                name="Police_Info"
                type="number"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Consciousness"
                name="Consciousness"
                type="number"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="4">
              <Form.Control
                placeholder="Alleged cause of injury"
                name="Alleged cause of injury"
                type="text"
                disabled
                value=""
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
                type="text"
                disabled
                value=""
              />
            </Col>
            <Form.Label sm="2" column>
              Admission Time :
            </Form.Label>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Admission Time"
                name="Admission Time"
                type="text"
                disabled
                value=""
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
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              Photo of AR Form :
            </Form.Label>
            <Col sm="12">
              <div className="p-30">
                <embed
                  className="embed"
                  src={pic}
                  type="Image/jpg"
                  width="100%"
                  height="100%"
                />
              </div>
            </Col>
          </Row>
        </Form.Group>
                </>
            } else {
                return <>
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
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Issues No."
                name="Issues No."
                type="number"
                disabled
                value=""
              />
            </Col>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Place of Accident"
                name="Place of Accident"
                type="text"
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Police station limit"
                name="Police station limit"
                type="text"
                disabled
                value=""
              />
            </Col>

            <Col className="mb-3" sm="6">
              <Form.Control
                placeholder="Admitted Doctor Name"
                name="Admitted by Doctor Name"
                type="text"
                disabled
                value=""
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
                type="text"
                disabled
                value=""
              />
            </Col>
            <Form.Label column sm="2">
              Time of Accident :
            </Form.Label>
            <Col className="mb-3" sm="3">
              <Form.Control
                placeholder="Time of Accident"
                name="Time of Accident"
                type="text"
                disabled
                value=""
              />
            </Col>
          </Row>
          <Row>
            <Form.Label sm="2" column>
              Photo of IP Form :
            </Form.Label>
            <Col sm="12">
              <div className="p-30">
                <embed
                  className="embed"
                  src={pic}
                  type="Image/jpg"
                  width="100%"
                  height="100%"
                />
              </div>
            </Col>
          </Row>
        </Form.Group>
                </>
            }
        })()}
        
        
        <div style={{ height: "20px" }} />

        <div className="d-flex justify-content-between" style={{width: '100%'}} >
        <Button
          variant="primary"
          className="me-3"
          style={{ width: "80px" }}
          onClick={() => navigate("/hospital")}
        >
          Back
        </Button>

        <Button
        variant="success"
          className="me-3"
          style={{ width: "80px" }}
          onClick={() => navigate("/police")}
        >
          Arrived
        </Button>
        </div>

        <div style={{ height: "50px" }} />
      </Container>
    </>
  );
}
