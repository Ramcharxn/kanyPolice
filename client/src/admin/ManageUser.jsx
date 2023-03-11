import MainComp from './MainComp'
import SideBox from './SideBox'
import { ReactComponent as Menu } from "../resource/menu.svg";
import { ReactComponent as Close } from "../resource/close.svg";
import withAuth from '../withAuth';
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as DropDown } from "../resource/dropdown.svg";
import jwtDecode from "jwt-decode";
import db from "../firebase";
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
    deleteDoc
  } from "firebase/firestore";

//   const ConfirmationDialog = (props) => {
//     return (
//       <div className="dialog">
//         <h3>{props.title}</h3>
//         <p>{props.message}</p>
//         <button onClick={() => props.onConfirm(true)}>Yes</button>
//         <button onClick={() => props.onConfirm(false)}>No</button>
//       </div>
//     );
//   };

const ManageUser = () => {

    const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [policeFilter, setPoliceFilter] = useState("All");
  const [hospitalFilter, setHospitalFilter] = useState("All");

  const [search, setSearch] = useState("");
  const [serachBy, setSearchBy] = useState("unq id");
  const [record, setRecord] = useState([]);
  const [modal1Show, setModal1Show] = useState(false);
  const [audio, setAudio] = useState();
  const [newReport, setNewReport] = useState([]);
    const [DToken, setDToken] = useState({});

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteData, setDeleteData] = useState(null);

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async(id) => {
        console.log(id)
        await deleteDoc(doc(db, "user", id));
    }

    // const handleConfirmation = (confirmed) => {
    //     if (confirmed) {
    //       // do something if the user clicked "Yes"
    //     }
    //     setShowConfirmation(false);
    //   };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token).user;
        setDToken(decodedToken);
      }, []);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const userRef = collection(db, "user");

  const q = query(userRef, where("type","!=", "admin"))
  
  useEffect(() => {

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

  return (
    <div className='d-flex'>
      {!isActive ? <div className='menu-bar'  onClick={handleClick} style={{position: 'fixed', top:'48px', right:'10px'}}>
          <Menu />
        </div> : <div className='menu-bar'  onClick={handleClick} style={{position: 'fixed', top:'48px', right:'10px'}}>
          <Close />
        </div>}
        <SideBox isActive={isActive} setIsActive={setIsActive} />

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
              {/* <option value="name">Name</option> */}
              <option value="unq id">ID</option>
              <option value="name">Name</option>
              {/* <option value="Severity">Severity</option>
              <option value="status">Status</option>
              <option value="Type_of_Medico_legal_case">Type</option> */}
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
              {/* <th></th> */}
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                ID
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Name
              </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Incharge Number
                </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                Type<span style={{ position:'relative'}}><DropDown />
              <select 
                  onChange={(e) => setTypeFilter(e.target.value)} style={{
                    cursor: "pointer",
                    position: "absolute",
                    opacity: "0",
                    left: "-10px",
                    width: "40px",
                  }}>
                <option value='All'>All</option>
                <option value='police'>Police</option>
                <option value='hospital'>Hospital</option>
                
                </select>
                </span>
              </th>
              <th
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Status 
                 </th>
              <th style={{ paddingLeft: "10px", paddingRight: "10px" }}></th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#EFEFEF" }}>
            {record.length > 0 
              ? record
                  .filter(
                    (arr) => serachBy == "name" ? arr.type=='hospital' ? arr['Hospital name'].toLowerCase().includes(search) : arr['Police station name'].toLowerCase().includes(search) : arr[serachBy].includes(search)
                    // (arr) => arr[serachBy].includes(search)
                    //   && arr["Police station limit"] == DToken["id"]
                  ).filter((arr) =>
                  typeFilter !== "All" ? arr.type == typeFilter : arr
                )
                  .map((arr, i) => {
                    return (
                        <React.Fragment key={i}>
                        <tr
                        //   onClick={(e) => handleClick(i, arr, e)}
                          // style={{ backgroundColor: getRowColor(arr.Severity) }}
                          className="table-row"
                        >
                          {/* <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {i + 1}
                          </td> */}
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {arr['unq id']}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                          {arr["Hospital name"]
                            ? arr["Hospital name"]
                            : arr["Police station name"]}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                          {arr["Hospital phone number"]
                            ? arr["Hospital phone number"]
                            : arr["Incharge phone number"]}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {arr.type[0].toUpperCase() + arr.type.substr(1)}

                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            <button style={{
                                border:'none',
                                outline:'none',
                                backgroundColor:'red',
                                color:'white',
                                fontSize:'12px',
                                width:'50px',
                                height:'30px',
                            }}
                            onClick={() => (handleShow(), setDeleteData(arr))}
                            >Delete</button>
                          </td>
                          </tr>
                          </React.Fragment>
                    );
                  })
              : null}
              {/* {showConfirmation && (
        <ConfirmationDialog
          title="Are you sure?"
          message="Do you really want to delete this item?"
          onConfirm={handleConfirmation}
        />
      )} */}
          </tbody>
        </table>
        </div>
        </div>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Are Your </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
            <div style={{fontSize:'25px', fontWeight:'800'}}>
                Are you sure you want to delete this user
                <div style={{color:'red', fontSize:'12px'}}>
                **Once User is deleted it cannot be UNDONE**
            </div>
            </div>
            
            <div style={{marginTop:'30px',fontWeight:'700'}}>
                Name - {deleteData != null && (deleteData['Hospital name'] ? deleteData['Hospital name'] : deleteData['Police station name'])}
            </div>
            <div style={{marginTop:'10px', fontWeight:'700'}}>
            Area - {deleteData != null && deleteData['area']}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={() => (handleClose(), handleDelete(deleteData.id))} >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default withAuth(['admin'])(ManageUser)
