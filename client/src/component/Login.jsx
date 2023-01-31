import React, {useState} from 'react'
import { Col, Form, Row, Container, Card, Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'

export default function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState("")

    const handleLogin = () => {
        if (user != "") {
            if(user == "Police"){
                toast.success("Logged in as Police")
                navigate("/police")
            } else if (user == "Hospital") {
                toast.success("Logged in as Hospital")
                navigate("/hospital")
            } else {
              toast.error("User Name : 'Hospital' or 'Police'")
            }
        } else {
            toast.error("Please enter User Name")
        }
    }

  return (
    <>
        <Layout heading="Login" appBarColor="success" />
        <div style={{height:"50px"}} />
        <Container className="mt-4 d-flex justify-content-center align-items-center" style={{width:"100%", height: "80vh"}}>
        
        <Card className='p-5' style={{width: "50%", minWidth:"350px"}}>
        <div className="mb-3" style={{ fontSize: "22px" }}>
          Login
        </div>
            <Col className="mb-3" sm="12">
              <Form.Control
                placeholder="User Name"
                name="User Name"
                type="text"
                value={user}
                autoComplete="off"
                onChange={e => setUser(e.target.value)}
              />
            </Col>
            <Col className="mb-3" sm="12">
              <Form.Control
                placeholder="Password"
                name="Password"
                type="password"
              />
            </Col>
            <Button onClick={handleLogin} variant='success'>
                Submit
            </Button>
        </Card>
        </Container>
    </>
  )
}
