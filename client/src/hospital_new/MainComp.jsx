import React, { useState, useEffect } from "react";
import { Row, Col, Form, Table } from "react-bootstrap";
import "./style.css";
import { ReactComponent as Edit } from "../resource/edit.svg";
import { ReactComponent as View } from "../resource/view.svg";
import TableScrollbar from "react-table-scrollbar";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import db from "../firebase";
import { useNavigate } from "react-router-dom";
import withAuth from "../withAuth";
import jwtDecode from "jwt-decode";
import { ReactComponent as Done } from "../resource/done.svg";

const MainComp = () => {
  const [search, setSearch] = useState("");
  const [serachBy, setSearchBy] = useState("Patient Name");
  const [record, setRecord] = useState([]);
  const Array = [
    {
      id: 1,
      "Patient Name": "Achintya Murari L S",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-7 Police Station",
    },
    {
      id: 2,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-8 Police Station",
    },
    {
      id: 3,
      "Patient Name": "Mahidhar",
      Sex: "Male",
      Severity: "Dead",
      Type_of_Medico_legal_case: "Assualt",
      status: "Arrived",
      "Phone number": "1112225557",
      "Police station limit": "R-7 Police Station",
    },
    {
      id: 4,
      "Patient Name": "Ram",
      Sex: "Male",
      Severity: "Moderate",
      Type_of_Medico_legal_case: "Accident",
      status: "Acknowledged",
      "Phone number": "6382944040",
      "Police station limit": "R-8 Police Station",
    },
    {
      id: 5,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-8 Police Station",
    },
    {
      id: 6,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-7 Police Station",
    },
    {
      id: 7,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-8 Police Station",
    },
    {
      id: 8,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-7 Police Station",
    },
    {
      id: 9,
      "Patient Name": "Ram",
      Sex: "Male",
      Severity: "Moderate",
      Type_of_Medico_legal_case: "Accident",
      status: "Acknowledged",
      "Phone number": "6382944040",
      "Police station limit": "R-7 Police Station",
    },
    {
      id: 10,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-8 Police Station",
    },
    {
      id: 11,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-8 Police Station",
    },
    {
      id: 12,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-7 Police Station",
    },
    {
      id: 13,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-7 Police Station",
    },
  ];

  const [dataPol, setDataPol] = useState(null);

  const userRef = collection(db, "user");

  useEffect(() => {
    const q = query(userRef, where("type", "==", "police"));

    const unSubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const filteredData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const polData = filteredData.map((item) => ({
          id: item.id,
          policeStation: item["Police station name"],
        }));

        setDataPol(
          polData.reduce(function (r, e) {
            r[e.id] = e.policeStation;
            return r;
          }, {})
        );
      }
    );
    return unSubscribe;
  }, []);

  const [openRow, setOpenRow] = useState(null);
  const handleClick = (index, e) => {
    setOpenRow(index === openRow ? null : index);
  };

  // console.log(dataPol['ccSxD7RkWGUWqXdJbmH4'])

  //   const getPoliceStation = (id) => {
  //     const docRef = doc(db, "user", id);
  //     getDoc(docRef).then(res => {
  //       const val = res.data()
  //       return val['Police station name']
  //     }).catch(err => {
  //       return 'station name'
  //     })

  // }

  const patientsRef = collection(db, "patients");

  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(selectedRow === row.id ? null : row.id);
    setIsActive(selectedRow === row.id);
  };

  const [DToken, setDToken] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token).user;
    setDToken(decodedToken);
    // console.log(decodedToken)
  }, []);

  useEffect(() => {
    const q = query(patientsRef, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setRecord(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }
    );

    return () => unsubscribe();
  }, []);

  function circleColor(Severity) {
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
  return (
    <div className="main-comp">
      <Row className="mt-5 mb-3 d-flex">
        <div
          className="mb-2"
          style={{
            color: "blue",
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "sans-serif",
            letterSpacing: "1px",
          }}
        >
          {DToken["Hospital name"] ? DToken["Hospital name"] : "Hospital name"}
        </div>
        <hr />
        <Row className="mt-3">
          <Col style={{ maxWidth: "200px" }} className="mb-3">
            <Form.Select
              className="me-3"
              required
              aria-label="Default select example"
              name="sex"
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="Patient Name">Name</option>
              <option value="Severity">Severity</option>
              <option value="Police station limit">Reported Station</option>
              <option value="status">Status</option>
              <option value="Type_of_Medico_legal_case">Type</option>
            </Form.Select>
          </Col>
          <Col className="mb-3">
            <Form.Control
              placeholder="Search here...."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Col>
        </Row>
      </Row>

      <div
        class="table-wrapper"
        style={{ width: "100%", backgroundColor: "#EFEFEF", height: "550vh" }}
      >
        <table className="table-fixed">
          <thead>
            <tr
              style={{
                height: "50px",
                backgroundColor: "#6868ED",
                color: "white",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              <th></th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                S.No
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Name
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Allocated Police
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Type
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Status
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}></th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#EFEFEF" }}>
            {record.length > 0
              ? record
                  .filter(
                    (arr) =>
                      arr[serachBy].toLowerCase().includes(search) &&
                      arr["Hospital ID"] == DToken["id"]
                  )
                  .map((arr, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr
                          onClick={(e) => handleClick(i, e)}
                          // style={{ backgroundColor: getRowColor(arr.Severity) }}
                          className="table-row"
                        >
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {circleColor(arr.Severity)}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {i + 1}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {arr["Patient Name"].length > 15
                              ? arr["Patient Name"].substring(0, 15) + "..."
                              : arr["Patient Name"]}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {dataPol[arr["Police station limit"]]}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {arr.Type_of_Medico_legal_case}
                          </td>
                          {/* <td>{arr.Status == "Arrived" ? <CheckBox/> : null}</td> */}
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {arr.status}
                          </td>
                          <td
                            className="d-flex justify-content-between align-items-center"
                            style={{
                              marginTop: "10px",
                              paddingLeft: "20px",
                              paddingRight: "30px",
                            }}
                          >
                            <div
                              onClick={() =>
                                navigate(`/hospital/view_report/${arr.id}`, {
                                  state: {
                                    rec: arr,
                                  },
                                })
                              }
                              className="me-3"
                            >
                              <View />
                            </div>
                            <div
                              onClick={() =>
                                navigate(`/hospital/edit_report/${arr.id}`, {
                                  state: {
                                    rec: arr,
                                  },
                                })
                              }
                            >
                              <Edit />
                            </div>
                          </td>
                        </tr>
                        {openRow === i && (
                          <tr>
                            <td style={{ backgroundColor: "#ddd" }} colSpan={7}>
                              <div
                                class="grid-container2"
                                style={{ width: "100%", padding: "20px" }}
                              >
                                <div class="grid-item">
                                  <div
                                    style={{
                                      textTransform: "uppercase",
                                      fontSize: "10px",
                                      letterSpacing: "1px",
                                      padding:'10px 20px',
                                    }}
                                    className="d-flex justify-content-center"
                                  >
                                    Severity
                                  </div>
                                  <select
                                    // onChange={updateInput}
                                    name="Sex"
                                    className="input-box3"
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
                                      padding:'10px 20px',
                                    }}
                                    className="d-flex justify-content-center"
                                  >
                                    Status
                                  </div>
                                  <select
                                    // onChange={updateInput}
                                    name="Sex"
                                    className="input-box3"
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
                                      padding:'10px 20px',
                                    }}
                                    className="d-flex justify-content-center"
                                  >
                                    Active
                                  </div>
                                  <select
                                    // onChange={updateInput}
                                    name="Sex"
                                    className="input-box3"
                                  >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                  </select>
                                </div>
                                <div class="grid-item" style={{width:'70px'}}>
                                  <Done />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
              : null}
          </tbody>
        </table>
        <div
          className="d-flex justify-content-evenly flex-column align-items-start"
          style={{
            backgroundColor: "#0001",
            borderRadius: "10px",
            padding: "0 20px",
            height: "40px",
            position: "fixed",
            bottom: "10px",
            right: "10px",
          }}
        >
          {/* <div style={{fontSize:'13px', color:'#0009'}}>Patients Current State</div> */}
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "green",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{ color: "#0008", fontSize: "12px" }}
                className="me-3"
              >
                : Normal
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "yellow",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{ color: "#0008", fontSize: "12px" }}
                className="me-3"
              >
                : Moderate
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "red",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{ color: "#0008", fontSize: "12px" }}
                className="me-3"
              >
                : Critical
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <div
                style={{
                  backgroundColor: "black",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{ color: "#0008", fontSize: "12px" }}
                className="me-3"
              >
                : Dead
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(["hospital"])(MainComp);
