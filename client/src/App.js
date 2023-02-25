import { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./hospital_new/Dashboard";
import NewReport from "./hospital_new/NewReport";
import EditReport from "./hospital_new/EditReport";
import ViewReport from "./police/ViewReport";
import Login from "./component/Login";
import Police from "./police/Dashboard";
import PoliceHome from "./police/PoliceHome";
import ViewReportHos from "./hospital_new/ViewReport";
import SignUp_H from "./component/SignUp_H";
import SignUp_P from "./component/SignUp_P";
import Profile from "./component/Profile";
import { ReactComponent as Offline } from "./resource/offline.svg";

function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      var condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        console.log("ONLINE");
        fetch("https://www.google.com/", {
          // Check for internet connectivity
          mode: "no-cors",
        })
          .then(() => {
            console.log("CONNECTED TO INTERNET");
            setIsOnline(true);
          })
          .catch(() => {
            console.log("INTERNET CONNECTIVITY ISSUE");
            setIsOnline(false);
          });
      } else {
        console.log("OFFLINE");
        setIsOnline(false);
      }
    };
    setInterval(checkStatus, 10000);
  }, []);
  return (
    <BrowserRouter>
      <div>
        {!isOnline && (
          <div
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              backgroundColor:'#efefef',
              color:'#555',
              padding:'5px 10px',
              display:'flex',
              alignItems:'center'
            }}
          >
            <Offline />
            <div style={{marginLeft:'15px'}}>offline</div>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register-hospital" element={<SignUp_H />}></Route>
        <Route exact path="/register-police" element={<SignUp_P />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>

        <Route exact path="/hospital" element={<Dashboard />}></Route>
        <Route
          exact
          path="/hospital/new_report"
          element={<NewReport />}
        ></Route>
        <Route
          exact
          path="/hospital/edit_report/:report_id"
          element={<EditReport />}
        ></Route>
        <Route
          exact
          path="/hospital/view_report/:report_id"
          element={<ViewReportHos />}
        ></Route>

        <Route exact path="/police" element={<Police />}></Route>
        <Route exact path="/policeh" element={<PoliceHome />}></Route>
        <Route
          exact
          path="/police/view_report/:report_id"
          element={<ViewReport />}
        ></Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

