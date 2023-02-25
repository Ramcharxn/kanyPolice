import React from 'react'
import './style.css'

export default function MainComp2() {

  return (
    <div className='d-flex align-items-center justify-content-center'>
        <div className='main'>
        <section className='table_header'>
            <h1>Customer's Orders</h1>
        </section>
        <section className="table_body">
            <table>
                <thead>
                    <tr>
                    <th>S.No</th>
                    <th>Patient Name</th>
                    <th>Gender</th>
                    <th>Phone No.</th>
                    <th>Type</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td> 1 </td>
                    <td> Ramcharan </td>
                    <td> Male </td>
                    <td> 638294404 </td>
                    <td> Accident </td>
                    <td> normal </td>
                    </tr>
                </tbody>
            </table>
        </section>
        </div>
    </div>
  )
}
