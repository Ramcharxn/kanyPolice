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
} from "react-bootstrap";
import Layout from "../component/Layout";
import { ReactComponent as Add } from "../../svg/add.svg";
import { ReactComponent as Next } from "../../svg/next.svg";
import { ReactComponent as Prev } from "../../svg/prev.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const Array = [
    {
      Name: "Ram",
      Gender: "Male",
      Severity: "Moderate",
      Type: "Accident",
      Phone: "6382944040",
    },
    {
      Name: "Achintya",
      Gender: "Female",
      Severity: "Normal",
      Type: "Poison",
      Phone: "999444000",
    },
    {
      Name: "Selva",
      Gender: "Male",
      Severity: "Normal",
      Type: "Accident",
      Phone: "66677778888",
    },
    {
      Name: "Mahidhar",
      Gender: "Male",
      Severity: "Moderate",
      Type: "Assualt",
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
    if(medEmrgType != "") {
        navigate("/hospital/new_report", {
            state: {
              medCase: medCaseType,
              emrgCase: medEmrgType,
            },
          });
    }
  };

  return (
    <div>
      <Layout heading={"Hospital Name"} />
      <Container className="my-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Form.Select
              className="me-3"
              required
              aria-label="Default select example"
              name="sex"
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="Name">Name</option>
              <option value="Severity">Severity</option>
              <option value="Phone">Phone No.</option>
              <option value="Type">Type</option>
            </Form.Select>

            <Form.Control
              style={{ width: "500px" }}
              placeholder="Search here...."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button className="ms-5 " onClick={() => setModal1Show(true)}>
            New <Add />
          </Button>
        </div>

        <Table className="mt-5" striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Phone No.</th>
              <th>Severity</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {Array.filter((arr) => arr[serachBy].includes(search)).map(
              (arr, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{arr.Name}</td>
                    <td>{arr.Gender}</td>
                    <td>{arr.Phone}</td>
                    <td>{arr.Severity}</td>
                    <td>{arr.Type}</td>
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
                <Form.Check
                  inline
                  label="Assualt"
                  value="Assualt"
                  name="type"
                  type="radio"
                  onChange={(e) => setMedCaseType(e.target.value)}
                />
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
                  label="Dying decleration"
                  value="Dying decleration"
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
