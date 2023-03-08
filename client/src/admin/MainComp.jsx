import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";
import "./style.css";
import { ReactComponent as Edit } from "../resource/edit.svg";
import { ReactComponent as View } from "../resource/view.svg";
import { ReactComponent as Next } from "../resource/next.svg";
import { ReactComponent as DropDown } from "../resource/dropdown.svg";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";
import beep from "../resource/beep.wav";
import db from "../firebase";
import { useNavigate } from "react-router-dom";
import withAuth from "../withAuth";
import jwtDecode from "jwt-decode";

const MainComp = () => {
  const tableRef = useRef();
  const rowRef = useRef();
  
  const [Data, setData] = useState([])

  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [policeFilter, setPoliceFilter] = useState("All");
  const [hospitalFilter, setHospitalFilter] = useState("All");

  const [search, setSearch] = useState("");
  const [serachBy, setSearchBy] = useState("Patient Name");
  const [record, setRecord] = useState([]);
  const [modal1Show, setModal1Show] = useState(false);
  const [audio, setAudio] = useState();
  const [newReport, setNewReport] = useState([]);

  const [startDate, setStartDate] = useState(null);

  const [DToken, setDToken] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const Array = [
    {
      id: 1,
      "Patient Name": "Achintya Murari L S",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "Appolo Greems road",
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
      "Hospital Name": "SIMS Vadapalani",
    },
    {
      id: 3,
      "Patient Name": "Mahidhar",
      Sex: "Male",
      Severity: "Dead",
      Type_of_Medico_legal_case: "Assualt",
      status: "Arrived",
      "Phone number": "1112225557",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "SIMS Vadapalani",
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
      "Hospital Name": "Appolo Greems road",
    },
    {
      id: 5,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "SIMS Vadapalani",
    },
    {
      id: 6,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "Appolo Greems road",
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
      "Hospital Name": "SIMS Vadapalani",
    },
    {
      id: 8,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "Appolo Greems road",
    },
    {
      id: 9,
      "Patient Name": "Ram",
      Sex: "Male",
      Severity: "Moderate",
      Type_of_Medico_legal_case: "Accident",
      status: "Acknowledged",
      "Phone number": "6382944040",
      "Police station limit": "R-8 Police Station",
      "Hospital Name": "Appolo Greems road",
    },
    {
      id: 10,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "SIMS Vadapalani",
    },
    {
      id: 11,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-6 Police Station",
      "Hospital Name": "Appolo Greems road",
    },
    {
      id: 12,
      "Patient Name": "Achintya",
      Sex: "Female",
      Severity: "Critical",
      Type_of_Medico_legal_case: "Poison",
      status: "Closed",
      "Phone number": "9994440000",
      "Police station limit": "R-8 Police Station",
      "Hospital Name": "SIMS Vadapalani",
    },
    {
      id: 13,
      "Patient Name": "Selva",
      Sex: "Male",
      Severity: "Normal",
      Type_of_Medico_legal_case: "Accident",
      status: "Intimated",
      "Phone number": "6667777880",
      "Police station limit": "R-8 Police Station",
      "Hospital Name": "Appolo Greems road",
    },
  ];

  const [openRow, setOpenRow] = useState(null);
  const handleClick = (index, e) => {
    setOpenRow(index === openRow ? null : index);

    // tableRef.current.scrollTop = 0;

    // window.scroll(100,100)

    //   const table = tableRef.current;
    // const row = e.target.parentNode;

    // console.log(table,row)

    // const tableRect = table.getBoundingClientRect();
    // const rowRect = row.getBoundingClientRect();
    // const scrollTop = rowRect.top - tableRect.top + table.scrollTop;
    // // table.scrollTo({
    // //   top: 100,
    // //   left: 100,
    // //   behavior: "smooth",
    // // });
    // table.scrollTop = 10;
    //   console.log(table.scrollTop)
  };

  const handleModalOpen = async (data) => {
    var sound = new Audio(beep);
    console.log("added", data.id);
    sound.loop = true;
    sound.playbackRate =
      data["Severity"] == "Moderate"
        ? 1
        : data["Severity"] == "Normal"
        ? 0.5
        : 2;
    sound.play();
    sound.addEventListener("ended", handleAudioEnded);
    setAudio(sound);

    setNewReport(data);

    const Patient = doc(db, "patients", data.id);
    console.log("here", Patient);
    await updateDoc(Patient, { viewed: true }, { merge: true });

    setModal1Show(true);
  };

  const handleAudioEnded = () => {
    setAudio(null);
  };

  const closeModal = () => {
    audio.pause();
    setModal1Show(false);
    setAudio(null);
    console.log("inside close");
    setNewReport(null);
  };

  const pauseAudio = () => {
    audio.pause();
    setAudio(null);
    setNewReport(null);
    console.log("inside pause");
  };

  const patientsRef = collection(db, "patients");

  const navigate = useNavigate();

  // const [selectedRow, setSelectedRow] = useState(null);
  // const [isActive, setIsActive] = useState(false);

  // onSnapshot(patientsRef, (snapshot) => {
  //   snapshot.docChanges().forEach(function (change) {
  //     if (
  //       change.type === "added"
  //       // && change.doc.data().viewed == false
  //     ) {
  //       // console.log('inside docHange')
  //       // handleModalOpen(change.doc.data())
  //       // hasRun = true
  //       // console.log(change.doc.data())
  //     }
  //   });
  // });
  const [dataHos, setDataHos] = useState(null);
  const [dataPol, setDataPol] = useState(null);

  const userRef = collection(db, "user");

  useEffect(() => {
    const q = query(userRef, where("type", "==", "hospital"));
    const unSubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const filteredData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const hosData = filteredData.map((item) => ({
          id: item.id,
          hospital: item["Hospital name"],
        }));

        setDataHos(
          hosData.reduce(function (r, e) {
            r[e.id] = e.hospital;
            return r;
          }, {})
        );

        return unSubscribe;
      }
    );
  }, []);

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token).user;
    setDToken(decodedToken);

    // onSnapshot(patientsRef, { includeMetadataChanges: true }, (snapShot) => {
    //   snapShot.docs.map((doc) => {
    //     if (
    //       !doc.data().viewed &&
    //       doc.data()["Police station limit"] == decodedToken.id
    //     ) {
    //       console.log("inside");
    //       handleModalOpen({ ...doc.data(), id: doc.id });
    //       return;
    //     }
    //   });
    // });
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

  console.log(hospitalFilter, policeFilter)
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
          {DToken ? DToken["Police station name"] : "Admin"}
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
        style={{ width: "100%", backgroundColor: "#EFEFEF", height: "55vh" }}
      >
        <table ref={tableRef} className="table-fixed">
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
                Hospital Name<span style={{ position:'relative'}}><DropDown />
              <select 
                  onChange={(e) => setHospitalFilter(e.target.value)} style={{
                    cursor: "pointer",
                    position: "absolute",
                    opacity: "0",
                    left: "-10px",
                    width: "40px",
                  }}>
                <option value='All'>All</option>
                {Data.length > 0 && Data.filter(d => d.type=='hospital').map(data => {  
                    return <option value={data.id}>{data['Hospital name']}</option>
                })}
                </select>
                </span>
                </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Allocated Police<span style={{ position:'relative'}}><DropDown />
                {/* {typeFilter == "All" ? null : `(${typeFilter})`} */}
                <select 
                  onChange={(e) => setPoliceFilter(e.target.value)} style={{
                    cursor: "pointer",
                    position: "absolute",
                    opacity: "0",
                    left: "-10px",
                    width: "40px",
                  }}>
                <option value='All'>All</option>
                {Data.length > 0 && Data.filter(d => d.type=='police').map(data => {  
                    return <option value={data.id}>{data['Police station name']}</option>
                  })}
                </select>
               
               </span>
              </th>
              <th
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Status <span style={{ position:'relative'}}><DropDown />
                {/* {statusFilter == "All" ? null : `(${statusFilter})`} */}
                <select
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    opacity: "0",
                    left: "-10px",
                    width: "40px",
                  }}
                >
                  <option value="All">All</option>
                  <option value="Intimated">Intimated</option>
                  <option value="Acknowledged">Acknowledged</option>
                </select>
                </span>
                 </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}></th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#EFEFEF" }}>
            {record.length > 0 
              ? record
                  .filter(
                    (arr) => arr[serachBy].toLowerCase().includes(search)
                    //   && arr["Police station limit"] == DToken["id"]
                  ).filter((arr) =>
                  policeFilter !== "All"
                      ? arr['Police station limit'] == policeFilter
                      : arr
                  )
                  .filter((arr) =>
                  hospitalFilter !== "All"
                      ? arr['Hospital ID'] == hospitalFilter
                      : arr
                  ).filter((arr) =>
                  statusFilter !== "All" ? arr.status == statusFilter : arr
                )
                  .map((arr, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr
                          ref={rowRef}
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
                            {arr["Patient Name"].length > 10
                              ? arr["Patient Name"].substring(0, 10) + "..."
                              : arr["Patient Name"]}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {dataHos
                              ? dataHos[arr["Hospital ID"]].length > 18
                                ? dataHos[arr["Hospital ID"]].substring(0, 18) + "..."
                                : dataHos[arr["Hospital ID"]]
                              : null}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {dataPol
                              ? dataPol[arr["Police station limit"]].length > 18
                                ? dataPol[arr["Police station limit"]].substring(0, 18) + "..."
                                : dataPol[arr["Police station limit"]]
                              : null}
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
                                navigate(`/admin/view_report/${arr.id}`, {
                                  state: {
                                    rec: arr,
                                  },
                                })
                              }
                              className="me-3"
                            >
                              <View />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
              : null}
            {/* {Array.filter(
              (arr) =>
                arr[serachBy].toLowerCase().includes(search) &&
                arr["Police station limit"] == "R-8 Police Station"
            ).map((arr, i) => {
              return (
                <React.Fragment key={arr.id}>
                  <tr
                    className="table-row"
                  >
                    <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      {circleColor(arr.Severity)}
                    </td>
                    <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      {i + 5}
                    </td>

                    <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      {arr["Patient Name"].length > 15
                        ? arr["Patient Name"].substring(0, 15) + "..."
                        : arr["Patient Name"]}
                    </td>
                    <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      {arr["Hospital Name"]}
                    </td>
                    <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      {arr.Type_of_Medico_legal_case}
                    </td>
                    <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
                      <div className="me-3">
                        <View />
                      </div>
                      <div>
                        <Edit />
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })} */}
          </tbody>
        </table>
        <div
          className="d-flex justify-content-center align-items-center"
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
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "green",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
              }}
            />
            <div style={{ color: "#0008", fontSize: "12px" }} className="me-3">
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
            <div style={{ color: "#0008", fontSize: "12px" }} className="me-3">
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
            <div style={{ color: "#0008", fontSize: "12px" }} className="me-3">
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
            <div style={{ color: "#0008", fontSize: "12px" }} className="me-3">
              : Dead
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modal1Show}
        onHide={() => closeModal()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`my-modal modal ${
          newReport != null &&
          (newReport["Severity"] == "Moderate"
            ? "yellow"
            : newReport["Severity"] == "Normal"
            ? "green"
            : newReport["Severity"] == "Critical"
            ? "red"
            : "black")
        }`}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-row align-items-stretch justify-content-evenly"
            style={{ width: "100%" }}
          >
            {newReport != null ? (
              <>
                <div
                  className="d-flex flex-column"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontSize: "14px",
                  }}
                >
                  <div className="content-modal">Hospital Name</div>
                  <div className="content-modal">Hospital Phone Number</div>
                  <div className="content-modal">Patient Name</div>
                  <div className="content-modal">Patient Phone Number</div>
                  <div className="content-modal">Type of medico case</div>
                  <div className="content-modal">Case severity</div>
                  <div className="content-modal">Area</div>
                  <div className="content-modal">City</div>
                  <div className="content-modal">Pin Code</div>
                </div>
                <div
                  className="d-flex flex-column"
                  style={{ textTransform: "capitalize" }}
                >
                  <div className="content-modal">
                    : {newReport["Hospital Name"]}
                  </div>
                  <div className="content-modal">
                    : {newReport["Hospital Number"]}
                  </div>
                  <div className="content-modal">
                    : {newReport["Patient Name"]}
                  </div>
                  <div className="content-modal">
                    : {newReport["Phone number"]}
                  </div>
                  <div className="content-modal">
                    : {newReport["Type_of_Medico_legal_case"]}
                  </div>
                  <div className="content-modal">: {newReport["Severity"]}</div>
                  <div className="content-modal">
                    : 97. Street Name, Area Name
                  </div>
                  <div className="content-modal">: Chennai</div>
                  <div className="content-modal">: 600091</div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: "24px" }}>Unknown Error Occured</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn bg-transparent "
            variant="none"
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
};

export default withAuth(["admin"])(MainComp);
