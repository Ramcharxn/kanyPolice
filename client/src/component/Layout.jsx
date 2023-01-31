import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'

export default function Layout({heading, appBarColor}) {
  return (
    
    <Navbar fixed='top' collapseOnSelect expand="lg" bg={appBarColor} variant="dark">
        <Navbar.Text className='ms-5'>{heading}</Navbar.Text>
    </Navbar>
  )
}
