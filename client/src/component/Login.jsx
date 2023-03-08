import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import db from "../firebase";
import bcrypt from "bcryptjs";
import jwt from "react-jwt";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if(token != null) {
      const decodedToken = jwtDecode(token).user
      decodedToken.type == 'hospital' ? navigate('/hospital') : decodedToken.type == 'admin' ? navigate('/admin') : navigate('/police')
      console.log(decodedToken)
      return
    }
  },[navigate])

  // const policeRef = collection(db, 'police')
  // const hospitalRef = collection(db, 'hospital')

  // useEffect(() => {
  //   getAllDoc()
  // }, []);

  // const getAllDoc = async() => {

  //   const userSnapshot = await getDocs(userRef);
  //   const snapshotData = userSnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));

  //   setData(snapshotData)
  // }

  // console.log(data)

  const userRef = collection(db, "user");

  const validateData = async (e) => {
    e.preventDefault();
    // const docRef = doc(db, "user", 'unq id' == user);
    const q = query(userRef, where("unq id", "==", user));
    // const docRef = doc(q);
    const docSnap = await getDocs(q);

    console.log(docSnap.docs[0].data().password);
    if (docSnap.docs[0].data().password) {
      try {
        let hashedpass = docSnap.docs[0].data().password;
        const res = await bcrypt.compare(password, hashedpass);
        if(res){
          var dict = {
            ...docSnap.docs[0].data(),
            id: docSnap.docs[0].id
          }

          // const secretKey = 'mysecretkey';
          // const token = jwt.sign({user, hashedpass}, secretKey, { expiresIn: '1d' });
          const response = await axios.post("http://localhost:5000/create-token", dict)
          localStorage.setItem('authToken',response.data.token)
            
            setInterval(console.log('in'),1000)
  
          console.log("navigate", localStorage.getItem('authToken'), docSnap);
          if (docSnap.docs[0].data().type == "police") {
            navigate("/police");
          } else if (docSnap.docs[0].data().type == "admin") {
            navigate("/admin");
          } {
            navigate("/hospital");
          }
  
          toast.success("Login successfull");
        }
        else {
        toast.error("Check your user id and password");
        }
        
      } catch (err) {
        toast.error("Check your user id and password");
      }
    } else {
      toast.error("Check your user id and password");
    }
  };

  return (
    <div className="d-flex">
      <div className="image-signin">
        <div
          style={{
            height: "100%",
            color: "white",
            textTransform: "uppercase",
            fontWeight: "700",
          }}
          className="side-text d-flex justify-content-center align-items-center flex-column"
        >
          <div style={{ width: "80%" }}>
            <div>HPD KIOSK system</div>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "1px",
                fontWeight: "normal",
                textTransform: "capitalize",
              }}
            >
              Dedicated to serving, driven by justice....
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="main-signin">
          <div
            style={{ border: "4px solid #459BF2", height: "100%" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div
              style={{ padding: "50px", boxShadow: "0 0 10px 2px #0002" }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <div
                style={{
                  fontSize: "36px",
                  color: "#459BF2",
                  fontWeight: "600",
                }}
              >
                Sign In
              </div>
              <form
                onSubmit={(e) => validateData(e)}
                className="d-flex flex-column"
              >
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mt-4 mb-2"
                >
                  User id *
                </div>
                <input
                  className="input-box"
                  required
                  placeholder="12345"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                />
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    letterSpacing: "1px",
                  }}
                  className="mt-4 mb-2"
                >
                  password *
                </div>
                <input
                  className="input-box"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "#42A0FF",
                    height: "45px",
                    color: "white",
                    textTransform: "uppercase",
                    borderRadius: "15px",
                  }}
                  className="mt-5"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
