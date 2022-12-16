import React from 'react'
import Layout from "../component/Layout";
import { useLocation } from 'react-router-dom'

export default function Details() {
  const location = useLocation()
  var medCase = location.state.medCase
  var emrgCase = location.state.emrgCase
  
  var headingText = medCase + " " + emrgCase 
  return (
    <>
      <Layout heading={emrgCase == "" ? medCase :headingText} />
    </>
  )
}
