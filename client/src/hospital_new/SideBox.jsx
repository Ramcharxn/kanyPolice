import React, { useState, useEffect } from "react";
import { ReactComponent as New } from "../resource/new.svg";
import { ReactComponent as Profile } from "../resource/profile.svg";
import { ReactComponent as Dashboard } from "../resource/dashboard.svg";
import { ReactComponent as Prev } from "../resource/prev.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function App_pageDes({isActive, setIsActive}) {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
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
            className='profile-image'
          >
            {/* <img
              src="images/sims.jpeg"
              alt="your image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            /> */}
          </div>
          <p className="mt-4" style={{ fontSize: "12px", letterSpacing:'1.5px' }}>
            {DToken ? DToken['Hospital name'] : 'Hospital Name'}
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
                backgroundColor: hover3 ? "#5555FA" : "#6868ED",
                transition: "background-color 0.5s ease, transform 0.5s ease",
                transform: hover3 ? "translateX(-20px)" : "translateX(0)",
                paddingLeft: "75px",
              }}
              onMouseEnter={() => setHover3(true)}
              onMouseLeave={() => setHover3(false)}
              className="align-items-center d-flex"
              onClick={() => navigate('/hospital')}
            >
              <Dashboard className="me-4" />
              Dashboard
            </div>
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
              className=" align-items-center d-flex"
              onClick={() => navigate('/hospital/new_report')}
            >
              <New className="me-4" />
              new
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
