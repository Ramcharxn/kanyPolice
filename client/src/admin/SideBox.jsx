import React, { useEffect, useState } from "react";
import { ReactComponent as New } from "../resource/new.svg";
import { ReactComponent as Profile } from "../resource/profile.svg";
import { ReactComponent as Dashboard } from "../resource/dashboard.svg";
import { ReactComponent as Police } from "../resource/police.svg";
import { ReactComponent as Hospital } from "../resource/hospital.svg";
import { ReactComponent as ManageUser } from "../resource/user-manage.svg";
import { ReactComponent as Prev } from "../resource/prev.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function App_pageDes({isActive, setIsActive}) {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [hover5, setHover5] = useState(false);
  const [viewSide, setViewSide] = useState(true);
  const navigate = useNavigate()
  const [DToken, setDToken] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const decodedToken = jwtDecode(token).user
    setDToken(decodedToken)
  },[])

  return (
      <div
      className={`side-box px-2 py-5 ${isActive ? "active" : ""}`}
      >
        <div className="close-btn" onClick={() => setIsActive(false)}><Prev /></div>

        <div style={{fontSize:'18px', fontFamily:''}}>HPD KIOSK SYSTEM</div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
            className='image-profile'
          >
            {/* <img
              src="images/police.png"
              alt="your image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            /> */}
          </div>
          <p className="mt-2" style={{ fontSize: "12px" }}>
            {DToken ? DToken['Police station name'] : 'Station Name'}
          </p>
        </div>
          {/* <div
            className="d-flex justify-content-center align-items-center"
            style={{
              marginLeft: "100px",
              cursor: "pointer",
              width: "30px",
              borderRadius: "100%",
              height: "30px",
              position:'relative',
              right:'-60px',
              backgroundColor: "#6868ED",
            }}
            onClick={() => setViewSide(!viewSide)}
          >
            {viewSide ? <Prev /> : <Next />}
          </div> */}
        <div>
          <div
            style={{
              fontSize: "12px",
              width: "250px",
              cursor: "pointer",
              marginTop: "30px",
              marginLeft:'-40px'
            }}
          >
            <div
              style={{
                height: "50px",
                backgroundColor: hover1 ? "#5555FA" : "#6868ED",
                transition: "background-color 0.5s ease, transform 0.5s ease",
                transform: hover1 ? "translateX(-20px)" : "translateX(0)",
                paddingLeft: "75px",
              }}
              onMouseEnter={() => setHover1(true)}
              onMouseLeave={() => setHover1(false)}
              className="align-items-center d-flex"
              onClick={() => navigate('/police')}
            >
              <Dashboard className="me-4" />
              Dashboard
            </div>
            <div
              style={{
                height: "50px",
                backgroundColor: hover3 ? "#5555FA" : "#6868ED",
                transition: "background-color 0.5s ease, transform 0.5s ease",
                transform: hover3 ? "translateX(-20px)" : "translateX(0)",
                paddingLeft: "75px",
              }}
              onMouseEnter={() => setHover3(true)}
              onMouseLeave={() => setHover3(false)}
              className="align-items-center d-flex"
              onClick={() => navigate('/register-hospital')}
            >
              <Hospital className="me-4" />
              Reg Hospital
            </div>
            <div
              style={{
                height: "50px",
                backgroundColor: hover4 ? "#5555FA" : "#6868ED",
                transition: "background-color 0.5s ease, transform 0.5s ease",
                transform: hover4 ? "translateX(-20px)" : "translateX(0)",
                paddingLeft: "75px",
              }}
              onMouseEnter={() => setHover4(true)}
              onMouseLeave={() => setHover4(false)}
              className="align-items-center d-flex"
              onClick={() => navigate('/register-police')}
            >
              <Police className="me-4" />
              Reg Police
            </div>
            <div
              style={{
                height: "50px",
                backgroundColor: hover5 ? "#5555FA" : "#6868ED",
                transition: "background-color 0.5s ease, transform 0.5s ease",
                transform: hover5 ? "translateX(-20px)" : "translateX(0)",
                paddingLeft: "75px",
              }}
              onMouseEnter={() => setHover5(true)}
              onMouseLeave={() => setHover5(false)}
              className="align-items-center d-flex"
              onClick={() => navigate('/Manage-user')}
            >
              <ManageUser className="me-4" />
              Manage User
            </div>
            <div
              style={{
                height: "50px",
                backgroundColor: hover2 ? "#5555FA" : "#6868ED",
                transition: "background-color 0.5s ease, transform 0.5s ease",
                transform: hover2 ? "translateX(-20px)" : "translateX(0)",
                paddingLeft: "75px",
              }}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              className="align-items-center d-flex"
              onClick={() => navigate('/profile')}
            >
              <Profile className="me-4" />
              profile
            </div>
            
          </div>
        </div>
      </div>
  );
}
