import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'

export default function Layout({heading, appBarColor}) {
  return (
    
    <Navbar className='d-flex justify-content-between' fixed='top' collapseOnSelect expand="lg" bg={appBarColor} variant="dark">
        <Navbar.Text className='ms-5'>{heading}</Navbar.Text>
        <div style={{color:'white'}} className='me-5 d-flex justify-content-center align-items-center'  >
          <div style={{width:'20px',height:'20px', borderRadius:'50%', backgroundColor:'white'}} className='me-2' /> Profile
        </div>
    </Navbar>
  )
}
