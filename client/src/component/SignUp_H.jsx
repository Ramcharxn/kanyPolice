import React, { useState, useEffect } from "react";
import bcrypt from 'bcryptjs'
import { collection, doc, setDoc, onSnapshot, getDocs } from "firebase/firestore";
import db from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import withAuth from "../withAuth";

const SignUp = () => {
  
  const [name, setName] = useState('')
  const [id, setID] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [area, setArea] = useState('')
  const [policeNear, setPoliceNear] = useState('')
  const [city, setCity] = useState('')

  const [policeData, setPoliceData] = useState([])

  const navigate = useNavigate()

  // const policeRef = collection(db, "police");
  // const hospitalRef = collection(db, "hospital");

  const userRef = collection(db, 'user')

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setPoliceData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const [unqid, setUnqid] = useState(0)

  const getAllDoc = async () => {
    const querySnapshot = await getDocs(userRef);
    // console.log(querySnapshot.docs)
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    
  // var unqID = (Math.floor(Math.random()*90000) + 10000)
  // console.log((filteredData.filter(data => data['unq id'] == 1).length == 0))

    while(true) {
      var unqID = (Math.floor(Math.random()*90000) + 10000)
      if ((filteredData.filter(data => data['unq id'] == unqID).length == 0)) {
        setUnqid(unqID)
        break
      }
      console.log('trying')
    }
  };


  getAllDoc()

  const validateData = async(e) => {
    e.preventDefault()

    if(password.length < 3) {
      toast.error('Password should be minimum of 8 character long')
      return
    }
    else if(password !== rePassword) {
      toast.error('Password mismatch')
      return
    }
    else {
      try {
        const hashedPassword= await bcrypt.hash(password, 10)
      console.log(hashedPassword)

        console.log(policeData)

      await setDoc(doc(userRef), {
        'Hospital name': name,
        'unq id': unqid,
        'police nearby': policeNear,
        'Hospital phone number': phoneNum,
        'password': hashedPassword,
        'area': area,
        'city': city,
        'type':'hospital'
      });
       navigate('/police')
       toast.success('Registration completed successfully')
      } catch(err) {
        console.log(err)
        toast.error('something went wrong')
      }
    }
  }

  return (
    <div className="d-flex">
      <div className="image-signup">
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
              Care and compassion, our duty to all....
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="main-signup">
          <form
            style={{
              border: "4px solid #459BF2",
              height: "100%",
              padding: "10px",
            }}
            className="scrollable"
            onSubmit={e => validateData(e)}
          >
            <div
              style={{ fontSize: "36px", color: "#459BF2", fontWeight: "600" }}
            >
              New Hospital
            </div>

            {/* <div>
            <label class="upload-btn">
              <input type="file"/>
              <img src="/images/sims.jpeg" style={{
                width: "100px",
                height: "100px",
              }} alt="" />
            </label>
            </div> */}


            <div
              class="grid-container"
              style={{ width: "100%", padding: "0 20px" }}
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
                  Hospital Name *
                </div>
                <input
                  className="input-box2"
                  type="text"
                  required
                  placeholder="SIMS Vadapalani"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
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
                  Password *
                </div>
                <input
                  className="input-box2"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
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
                  Re-enter Password *
                </div>
                <input
                  className="input-box2"
                  type="password"
                  required
                  placeholder="Re-enter Password"
                  value={rePassword}
                  onChange={e => setRePassword(e.target.value)}
                />
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
                  Hospital Phone Number *
                </div>
                <input
                  className="input-box2"
                  type="number"
                  required
                  placeholder="973628126"
                  value={phoneNum}
                  onChange={e => setPhoneNum(e.target.value)}
                />
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
                  Near by Police Station *
                </div>
                <select onChange={e => setPoliceNear(e.target.value)} className="input-box2" >
                  {policeData.length > 0 && policeData.filter(d => d.type=='police').map(data => {
                    return <option value={data.id}>{data['Police station name']}</option>
                  })}
                </select>
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
                  Area *
                </div>
                <input
                  className="input-box2"
                  type="text"
                  required
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="97, Street Name, Area Name"
                />
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
                  City *
                </div>
                <input
                  className="input-box2"
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Chennai"
                />
              </div>
              
            </div>
            <button
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#42A0FF",
                padding: "10px 20px",
                width: "200px",
                color: "white",
                textTransform: "uppercase",
              }}
              type='submit'
              className="mt-5 mb-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(['admin'])(SignUp)
