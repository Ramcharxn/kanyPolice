import React from 'react'
import withAuth from '../withAuth'

const Profile = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setTimeout(console.log('in'),1000)
        window.location.reload()
    }
  return (
    <div>Profile
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default withAuth(['police','hospital'])(Profile)