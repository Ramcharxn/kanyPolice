import React, { useState, useEffect } from "react";
import SideBox from "./SideBox";
import { ReactComponent as Menu } from "../resource/menu.svg";
import { ReactComponent as Close } from "../resource/close.svg";
import { ReactComponent as Download } from "../resource/download.svg";
import pic from "../resource/report.jpeg";
import { useLocation } from "react-router-dom";
import withAuth from "../withAuth";
import { onSnapshot, collection, query, orderBy, doc, getDocs, getDoc } from "firebase/firestore";
import db from "../firebase";
// import FileViewer from "react-file-viewer";

const ViewReport = () => {
  const [isActive, setIsActive] = useState(false);

  const location = useLocation();

  const [record, setRecord] = useState(location.state.rec);

  const userRef = collection(db, "user");
  const [dataPol,setDataPol] = useState(null);
  const [hosData,setHosData] = useState('');
  const [polData,setPolData] = useState('');

  useEffect(() => {
    const getAllDoc = async () => {
      const querySnapshot = await getDocs(userRef);
      // console.log(querySnapshot.docs)
      const filteredData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      const polData = filteredData.filter(d => d.type=='police').map(item => ({ id: item.id, policeStation: item['Police station name'] }));

      setDataPol(polData.reduce(function(r, e) {
        r[e.id] = e.policeStation;
        return r;
      }, {}))
    };

    getAllDoc()
  }, []);

  
  useEffect(() => {
    const getData = async () => {
        const hosRef = doc(db, "user", record['Hospital ID']);
        const hosSnap = await getDoc(hosRef);
        
        if (hosSnap.exists()) {
          setHosData(hosSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        console.log(hosSnap.data())

        const polRef = doc(db, "user", record['Police station limit']);
        const polSnap = await getDoc(polRef);

        console.log(polSnap.data())
    
        if (polSnap.exists()) {
          setPolData(polSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getData()
  },[])

  const handleClick = () => {
    setIsActive(!isActive);
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
        <div className="view-report-main">
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
                  className="mb-2"
                >
                  Patient Name
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Patient Name"] ? record["Patient Name"] : ""}
                </div>
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
                  Phone Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Phone number"] ? record["Phone number"] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Age"] ? record["Age"] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Sex"] ? record["Sex"] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Occupation"] ? record["Occupation"] : ""}
                </div>
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
                  {record["Relation"]}
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Relation Name"] ? record["Relation Name"] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Identification Mark 1"]
                    ? record["Identification Mark 1"]
                    : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Identification Mark 2"]
                    ? record["Identification Mark 2"]
                    : ""}
                </div>
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
                  Active
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["active"]
                    ? record["active"]
                    : ""}
                </div>
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
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    minHeight: "40px",
                    padding: "10px 20px",
                  }}
                  className="input-box2 d-flex justify-content-start align-items-start"
                >
                  {record["Address"] ? record["Address"] : ""}
                </div>
              </div>
            </div>
            {/* {record.Bruisestype == "image/png" ? (
              <img
                className="image-container"
                src={record.Bruisesdoc}
                alt={pic}
              />
            ) : record.Bruisestype == "image/jpeg" ? (
              <img
                className="image-container"
                src={record.Bruisesdoc}
                alt={pic}
              />
            ) : (
              <FileViewer
                fileType={record.Bruisestype}
                filePath={record.Bruisesdoc}
              />
            )} */}
            <div style={{backgroundColor:'#f1f1f1', borderRadius:'10px', padding:'20px'}}>
              <div className="d-flex justify-content-evenly align-items-center mb-4">
                <div>Image of Bruises{" "}</div>
                <a download={`Bruises image of ${record['Patient Name']}`} href={record.Bruisesdoc}>
                  <Download /><button style={{
                border: "none",
                outline: "none",
                color: "#6868ED",
                backgroundColor:'#f1f1f1',
                }}>Download</button>
                </a>
              </div>
              <img className="image-container" src={record.Bruisesdoc} />
            </div>
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
                  AR Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["AR No."] ? record["AR No."] : ""}
                </div>
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
                  Hospital Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Hospital No."] ? record["Hospital No."] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Dying_declaration"]
                    ? record["Dying_declaration"]
                    : ""}
                </div>
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
                  Type Of Medico Case
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Type_of_Medico_legal_case"]
                    ? record["Type_of_Medico_legal_case"]
                    : ""}
                </div>
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
                  Conscious State
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Consciousness"] ? record["Consciousness"] : ""}
                </div>
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
                  Alleged Cause Of Injury
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Alleged cause of injury"]
                    ? record["Alleged cause of injury"]
                    : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Admission Date"] ? record["Admission Date"] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Admission Time"] ? record["Admission Time"] : ""}
                </div>
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
                  Description of Injuries and Treatment
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    minHeight: "40px",
                    padding: "10px 20px",
                  }}
                  className="input-box2 d-flex justify-content-start align-items-start"
                >
                  {record["Description of injuries and Treatment"]
                    ? record["Description of injuries and Treatment"]
                    : ""}
                </div>
              </div>
            </div>
            {/* {record.ARtype == "image/png" ? (
              <img className="image-container" src={record.ARdoc} alt={pic} />
            ) : record.ARtype == "image/jpeg" ? (
              <img className="image-container" src={record.ARdoc} alt={pic} />
            ) : (
              <FileViewer fileType={record.ARtype} filePath={record.ARdoc} />
            )} */}
            <div style={{backgroundColor:'#f1f1f1', borderRadius:'10px', padding:'20px'}}>
              <div className="d-flex justify-content-evenly align-items-center mb-4">
                <div>Image of AR file</div>
                <a download={`AR File of ${record['Patient Name']}`} href={record.ARdoc}>
                <Download /><button style={{
                border: "none",
                outline: "none",
                color: "#6868ED",
                backgroundColor:'#f1f1f1',
                }}>Download</button>
                </a>
              </div>
              <img className="image-container" src={record.ARdoc} />
            </div>
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
                  IP Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["IP No."] ? record["IP No."] : ""}
                </div>
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
                  Issues Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Issue No."] ? record["Issue No."] : ""}
                </div>
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
                  Place Of Accident
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Place of Accident"]
                    ? record["Place of Accident"]
                    : ""}
                </div>
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
                  Police Station Limit
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Police station limit"] && dataPol
                    ? dataPol[record["Police station limit"]]
                    : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Admitted by Doctor Name"]
                    ? record["Admitted by Doctor Name"]
                    : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Severity"] ? record["Severity"] : ""}
                </div>
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
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Date of Accident"] ? record["Date of Accident"] : ""}
                </div>
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
                  Time of Accident
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {record["Time of Accident"] ? record["Time of Accident"] : ""}
                </div>
              </div>
            </div>
            {/* {record.IPtype == "image/png" ? (
              <img className="image-container" src={record.IPdoc} alt={pic} />
            ) : record.IPtype == "image/jpeg" ? (
              <img className="image-container" src={record.IPdoc} alt={pic} />
            ) : (
              <FileViewer fileType={record.IPtype} filePath={record.ARdoc} />
            )} */}
           <div style={{backgroundColor:'#f1f1f1', borderRadius:'10px', padding:'20px'}}>
              <div className="d-flex justify-content-evenly align-items-center mb-4">
                <div>Image of IP file</div>
                <a download={`IP File of ${record['Patient Name']}`} href={record.IPdoc}>
                <Download /><button style={{
                border: "none",
                outline: "none",
                color: "#6868ED",
                backgroundColor:'#f1f1f1',
                }}>Download</button>
                </a>
              </div>
              <img className="image-container" src={record.IPdoc} />
            </div>
          </div>


          <div className="view-heading">
          <div className="heading">Hospital Information</div>
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
                  Hospital Name
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {hosData != '' ? hosData['Hospital name'] :  null }
                </div>
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
                  Hospital Contact Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {hosData != '' ? hosData['Hospital phone number'] : null}
                </div>
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
                  Area
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {hosData != '' ? hosData['area'] : null}
                </div>
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
                  City
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {hosData != '' ? hosData['city'] : null}
                </div>
                </div>
                </div>
                
          </div>
          <div className="view-heading">
          <div className="heading">Police Station Information</div>
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
                  Police Station Name
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {polData != '' ? polData['Police station name'] :  null }
                </div>
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
                  Station Incharge
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {polData != '' ? polData['Police station incharge'] : null}
                </div>
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
                  Incharge Phone Number
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {polData != '' ? polData['Incharge phone number'] : null}
                </div>
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
                  Area
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {polData != '' ? polData['area'] : null}
                </div>
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
                  City
                </div>
                <div className="input-box2 d-flex justify-content-start align-items-center">
                  {polData != '' ? polData['city'] : null}
                </div>
                </div>
                </div>
                
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(['admin'])(ViewReport)