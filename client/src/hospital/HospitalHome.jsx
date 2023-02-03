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
import { ReactComponent as Add } from "../resource/add.svg";
import { ReactComponent as Next } from "../resource/next.svg";
import { ReactComponent as Prev } from "../resource/prev.svg";
import { ReactComponent as CheckBox } from "../resource/checkbox.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hospital() {
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

  const [search, setSearch] = useState("");
  const [serachBy, setSearchBy] = useState("Name");
  const [modal1Show, setModal1Show] = useState(false);
  const [modal2Show, setModal2Show] = useState(false);
  const [medCaseType, setMedCaseType] = useState("");
  const [medEmrgType, setMedEmrgType] = useState("");

  const handleClick = () => {
    if (medCaseType == "Emergency") {
      setModal2Show(true);
      setModal1Show(false);
    } else if (medCaseType == "") {
      return;
    } else {
      setModal1Show(false);

      navigate("/hospital/new_report", {
        state: {
          medCase: medCaseType,
          emrgCase: medEmrgType,
        },
      });
    }
  };

  const handleBackClick = () => {
    setModal2Show(false);
    setModal1Show(true);
  };

  const handleNextClick = () => {
    if (medEmrgType != "") {
      navigate("/hospital/new_report", {
        state: {
          medCase: medCaseType,
          emrgCase: medEmrgType,
        },
      });
    }
  };

  function getRowColor(severity) {
    switch (severity) {
      case "Critical":
        return "red";
      case "Moderate":
        return "orange";
      case "Normal":
        return "yellow";
      default:
        return "yellow";
    }
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
      <Layout heading="Hospital Name" appBarColor="primary" />
      <div style={{ height: "50px" }} />
      <Container className="my-5">
        <Row>
          <Col sm="3" className="mb-3">
            <Form.Select
              className="me-3"
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
          <Col sm="6" className="mb-3">
            <Form.Control
              placeholder="Search here...."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Col>

          <Col sm="3" className="d-flex justify-content-end">
            <Button
              style={{ height: "40px" }}
              className="ms-5 "
              onClick={() => navigate("/hospital/new_report")}
          >
              <div style={{ width: "60px" }}>
                New <Add />
              </div>
            </Button>
          </Col>
        </Row>

        <Table className="mt-5" bordered hover responsive="sm" center>
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
                  <tr
                    // style={{ backgroundColor: getRowColor(arr.Severity) }}
                    onClick={() => navigate(`/hospital/view_report/${i + 1}`)}
                  >
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
        onHide={() => setModal1Show(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Medico legal case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div>
              <b>Type of medico legal case</b>
            </div>

            {/* <div class="d-flex flex-wrap" className="mt-4 mb-5" style={{width: '300px'}}> */}

            <div className="mt-4 d-flex flex-row justify-content-center">
              <div className="d-flex flex-column">
                <Form.Check
                  inline
                  label="Accident"
                  value="Accident"
                  name="type"
                  type="radio"
                  onChange={(e) => setMedCaseType(e.target.value)}
                />
                <div style={{ height: "10px" }} />
                <Form.Check
                  inline
                  label="Poision"
                  value="Poision"
                  name="type"
                  type="radio"
                  onChange={(e) => setMedCaseType(e.target.value)}
                />
                <div style={{ height: "10px" }} />
              </div>
              <div style={{ width: "10px" }} />
              <div className="d-flex flex-column">
                <Form.Check
                  inline
                  label="Emergency"
                  value="Emergency"
                  name="type"
                  type="radio"
                  onChange={(e) => setMedCaseType(e.target.value)}
                />
                <div style={{ height: "10px" }} />
                <Form.Check
                  inline
                  label="Assualt"
                  value="Assualt"
                  name="type"
                  type="radio"
                  onChange={(e) => setMedCaseType(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn bg-transparent "
            variant="outline-light"
            onClick={handleClick}
          >
            <div style={{ color: "black", fontSize: 14 }}>
              Next <Next />
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal For second popup */}

      <Modal
        show={modal2Show}
        onHide={() => setModal2Show(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Medico legal case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div>
              <b>Type of Emergency</b>
            </div>

            {/* <div class="d-flex flex-wrap" className="mt-4 mb-5" style={{width: '300px'}}> */}

            <div className="mt-4 d-flex flex-row justify-content-center">
              <Form.Check
                inline
                label="Accident"
                value="Accident"
                name="type"
                type="radio"
                onChange={(e) => setMedEmrgType(e.target.value)}
              />
              <Form.Check
                inline
                label="Poision"
                value="Poision"
                name="type"
                type="radio"
                onChange={(e) => setMedEmrgType(e.target.value)}
              />
              <Form.Check
                inline
                label="Assualt"
                value="Assualt"
                name="type"
                type="radio"
                onChange={(e) => setMedEmrgType(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            className="btn bg-transparent"
            variant="outline-light"
            onClick={handleBackClick}
          >
            <div style={{ color: "black", fontSize: 14 }}>
              <Prev /> Back
            </div>
          </Button>
          <Button
            className="btn bg-transparent"
            variant="outline-light"
            onClick={handleNextClick}
          >
            <div style={{ color: "black", fontSize: 14 }}>
              Next <Next />
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
