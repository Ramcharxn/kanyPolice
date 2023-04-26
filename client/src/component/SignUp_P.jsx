import React, {useState} from "react";
import { toast } from "react-hot-toast";
import bcrypt from 'bcryptjs'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useNavigate } from "react-router-dom";
import withAuth from "../withAuth";

const SignUp = () => { 
  const [name, setName] = useState('')
  const [id, setID] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [incharge, setIncharge] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [area, setArea] = useState('')
  const [city, setCity] = useState('')

  const navigate = useNavigate()

  // const policeRef = collection(db, "police");
  const userRef = collection(db, "user");

  const [unqid, setUnqid] = useState(0)

  const getAllDoc = async () => {
    const querySnapshot = await getDocs(userRef);
    // console.log(querySnapshot.docs)
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

  //   var unqID = (Math.floor(Math.random()*90000) + 10000)
  // console.log((filteredData.filter(data => data['unq id'] == unqID).length == 0))

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

      await setDoc(doc(userRef), {
        'Police station name': name,
        'unq id': unqid,
        'Police station incharge': incharge,
        'Incharge phone number': phoneNum,
        'password': hashedPassword,
        'area': area,
        'city': city,
        'type': 'police'
      });

      navigate('/')
      toast.success('Registration completed successfully')
      } catch(err) {
        toast.error('something went wrong')
      }
    }

    // try {
    //   if(state.password.length > 8) { throw 'length' }
    //   if(state.password !== state['re password']) { throw 'mismatch' }
    //   else {handleSubmit()}
    // }
    // catch(err){
    //   switch (err) {
    //     case (err == 'length'): {
    //       toast.error('Password length should be minimum of 8 charecter long')
    //       break;
    //     }
    //     case (err == 'mismatch'): {
    //       toast.error('Password mismatch')
    //       break;
    //     }
    //     default: {
    //       toast.error('Something went wrong')
    //     }
    //   }
    // }
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
              Serving with honor, safeguarding with pride....
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
            onSubmit={validateData}
          >
            <div
              style={{ fontSize: "36px", color: "#459BF2", fontWeight: "600" }}
            >
              New Police
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
                  Police Station Name *
                </div>
                <input
                  className="input-box2"
                  type="text"
                  required
                  name='station name'
                  placeholder="R-8 Police Station"
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
                  name='password'
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
                  name='re password'
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
                  Police Station Incharge Name 
                </div>
                <input
                  className="input-box2"
                  type="text"
                  name='station incharge'
                  placeholder="Ramcharan"
                  value={incharge}
                  onChange={e => setIncharge(e.target.value)}
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
                  Police Station Incharge Phone Number *
                </div>
                <input
                  className="input-box2"
                  type="number"
                  required
                  name='station name phone number'
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
                  Area *
                </div>
                <input
                  className="input-box2"
                  type="text"
                  required
                  name='area'
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
                required
                  className="input-box2"
                  type="text"
                  name='city'
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
              className="mt-5 mb-3"
              type='submit'
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