import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as Next } from "./resource/next.svg";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import beep from "./resource/beep.wav";
import db from "./firebase";
import { useNavigate } from "react-router-dom";

const MainComp = () => {
  const [record, setRecord] = useState([]);
  const [modal1Show, setModal1Show] = useState(false);
  const [audio, setAudio] = useState();



  const patientsRef = collection(db, "patients");

   const handleModalOpen = async (data) => {
    // if (modal1Show == true) {
    //   return
    // }
    var sound = new Audio(beep);
    console.log("added", data.id);
    sound.loop = true;
    sound.playbackRate = 1;
    sound.play();
    setAudio(sound);

    console.log("in");
    const Patient = doc(db, "patients", data.id);
    console.log("here", Patient);
    await updateDoc(Patient, { viewed: true }, { merge: true });

    setModal1Show(true);
  };

  const closeModal = () => {
    pauseAudio();
    setModal1Show(false);
  };

  const pauseAudio = () => {
    audio.pause();
  };


  useEffect(() => {
    const q = query(patientsRef, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRecord(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    onSnapshot(patientsRef, (snapShot) => {
      snapShot.docs.map((doc) => {
        if (!doc.data().viewed) {
          handleModalOpen({ ...doc.data(), id: doc.id });
        }
      });
    });

    console.log("added");

    return () => unsubscribe();
  }, []);

  
  return (
    <div>
helo
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
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                Emergency Case
              </div>
            </div>

            {/* <div class="d-flex flex-wrap" className="mt-4 mb-5" style={{width: '300px'}}> */}

            <div className="mt-4 d-flex flex-column justify-content-center">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <pre style={{ fontSize: "16px" }}>Hospital Name : </pre>
                  <div>SIMS Hospital</div>
                </div>
                <div className="d-flex flex-row">
                  <pre style={{ fontSize: "16px" }}>Location : </pre>
                  <div style={{ width: "200px" }} className="mb-3">
                    No.1, Jawaharlal Nehru Salai, 100 Feet Road, Near Vadapalani
                    Metro Station, Chennai, Tamil Nadu 600026
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <pre style={{ fontSize: "16px" }}>Patient Name : </pre>
                  <div>Achintya Murari</div>
                </div>
                <div className="d-flex flex-row">
                  <pre style={{ fontSize: "16px" }}>Type of Case : </pre>
                  <div>Accident</div>
                </div>
                <div className="d-flex flex-row">
                  <pre style={{ fontSize: "16px" }}>Case severity : </pre>
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
            onClick={() => pauseAudio()}
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

export default MainComp;
