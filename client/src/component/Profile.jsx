import React, {useEffect, useState} from 'react'
import withAuth from '../withAuth'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import bcrypt from 'bcryptjs'
import { collection, doc, setDoc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { ReactComponent as Logout } from "../resource/logout.svg";
import axios from 'axios'

const Profile = () => {

  const [DToken, setDToken] = useState(null)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setTimeout(console.log('in'),1000)
        window.location.reload()
    }

    useEffect(() => {
      const token = localStorage.getItem('authToken')
      if(token != null) {
        setDToken(jwtDecode(token).user)
        console.log(jwtDecode(token).user)
        return
      }
    },[navigate])

    const [name, setName] = useState('')
    const [id, setID] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [incharge, setIncharge] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [area, setArea] = useState('')
    const [policeNear, setPoliceNear] = useState('')
    const [city, setCity] = useState('')
    const [data, setData] = useState([])
  
    // const policeRef = collection(db, "police");
    const userRef = collection(db, "user");

    

    const getData = async () => {
      const docRef = doc(db, "user", DToken.id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setData(docSnap.data());
        console.log('set')
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    useEffect(() => {

      getData()

    },[oldPassword])


  
    const validateData = async(e) => {
      e.preventDefault()

      if(oldPassword==''){
        toast.error('Please enter your Currect password')
        return
      }

      console.log(data)

      const state = data.password && await bcrypt.compare(oldPassword, data.password)

      if(!state) {
        toast.error('Please check your current passoword')
        return
      }
  
      if(password!=='' && password.length < 3) {
        toast.error('Password should be minimum of 3 character long')
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

        const policedata = {
          'Police station name':  name!='' ? name : DToken['Police station name'],
          'unq id': DToken['unq id'],
          'Police station incharge': incharge!='' ? incharge : DToken['Police station incharge'],
          'Incharge phone number': phoneNum!='' ? phoneNum : DToken['Incharge phone number'],
          'password': password!='' ? hashedPassword : DToken['password'],
          'area': area!='' ? area : DToken['area'],
          'city':  city!='' ? city : DToken['city'],
          'type': 'police',
          'id':DToken['id']
        }

        const hospitalData = {
          'Hospital name': name!='' ? name : DToken['Hospital name'],
          'unq id': DToken['unq id'],
          'police nearby': policeNear!='' ? policeNear : DToken['police nearby'],
          'Hospital phone number': phoneNum!='' ? phoneNum : DToken['Hospital phone number'],
          'password': password!='' ? hashedPassword : DToken['password'],
          'area': area!='' ? area : DToken['area'],
          'city': city!='' ? city : DToken['city'],
          'type':'hospital',
          'id':DToken['id']
        }

        const adminData = {
          'Police station name':  name!='' ? name : DToken['Police station name'],
          'unq id': DToken['unq id'],
          'phone number': phoneNum!='' ? phoneNum : DToken['Incharge phone number'],
          'password': password!='' ? hashedPassword : DToken['password'],
          'type': 'admin',
          'id':DToken['id']
        }

        const response = await axios.post("https://kanya-project-server.onrender.com/create-token", DToken.type == 'police' ? policedata : DToken.type == 'hospital' ? hospitalData : adminData,)
        localStorage.setItem('authToken',response.data.token)
        const userRef = doc(db, "user", DToken.id);
  
        await updateDoc(
          userRef,
          DToken.type == 'police' ? policedata : DToken.type == 'hospital' ? hospitalData : adminData,
          // { Severity: severity, status: status, active: active },
          { merge: true }
        );
  
        navigate('/')
        toast.success('Registration completed successfully')
        } catch(err) {
          console.log(err)
          toast.error('something went wrong')
        }
      }

    }
    const [policeData, setPoliceData] = useState([])

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

  return (
    <div className="d-flex">
      <div style={{position:'fixed', top:'20px', right:'20px', cursor:'pointer'}} onClick={handleLogout}><Logout /></div>
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
              Protect and serve, duty before self....
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
              {DToken ? DToken.type=='hospital' ? DToken['Hospital name'] : DToken['Police station name'] : 'Station Name'}
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
              {DToken ? DToken.type=='police' ? <><div class="grid-item">
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
                  name='station name'
                  placeholder={DToken && DToken['Police station name']}
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
                  Current Password *
                </div>
                <input
                  className="input-box2"
                  type="password"
                  required
                  name='password'
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
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
                  placeholder={DToken && DToken['Police station incharge']}
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
                  name='station name phone number'
                  placeholder={DToken && DToken['Incharge phone number']}
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
                  name='area'
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder={DToken && DToken['area']}
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
                  name='city'
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder={DToken && DToken['city']}
                />
              </div></> : DToken.type=='hospital' ? <>
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
                  placeholder={DToken && DToken['Hospital name']}
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
                  Old Password *
                </div>
                <input
                  className="input-box2"
                  type="password"
                  required
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
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
                  New Password *
                </div>
                <input
                  className="input-box2"
                  type="password"
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
                  placeholder={DToken && DToken['Hospital phone number']}
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
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder={DToken && DToken['area']}
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
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder={DToken && DToken['city']}
                />
              </div>
              </> : <>
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
                  name='station name'
                  placeholder={DToken && DToken['Police station name']}
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
                  Current Password *
                </div>
                <input
                  className="input-box2"
                  type="password"
                  required
                  name='password'
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
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
                  Phone Number *
                </div>
                <input
                  className="input-box2"
                  type="number"
                  name='phone number'
                  placeholder={DToken && DToken['phone number']}
                  value={phoneNum}
                  onChange={e => setPhoneNum(e.target.value)}
                />
              </div>
              </>: 'Loading...'}
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withAuth(['police', 'admin','hospital'])(Profile)