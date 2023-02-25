import React from 'react'

export default function BGImage() {
  return (
    <div style={{width:'100%', height:'100vh', position:'fixed', zIndex:-100, opacity:0.1}} className="d-flex justify-content-center align-items-center">
        <img src="police.png" style={{width:'500px'}} />
    </div>
  )
}
