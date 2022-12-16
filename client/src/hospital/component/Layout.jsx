import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'

export default function Layout({heading}) {
  return (
    
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Text className='ms-5'>{heading}</Navbar.Text>
    </Navbar>
  )
}
