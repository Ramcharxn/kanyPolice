import React, { useState } from 'react'
import MainComp from './MainComp'
import SideBox from './SideBox'
import { ReactComponent as Menu } from "../resource/menu.svg";
import { ReactComponent as Close } from "../resource/close.svg";
import withAuth from '../withAuth';

const Dashboard = () => {

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='d-flex'>
      {!isActive ? <div className='menu-bar'  onClick={handleClick} style={{position: 'fixed', top:'48px', right:'10px'}}>
          <Menu />
        </div> : <div className='menu-bar'  onClick={handleClick} style={{position: 'fixed', top:'48px', right:'10px'}}>
          <Close />
        </div>}
        <SideBox isActive={isActive} setIsActive={setIsActive} />
        <MainComp />
    </div>
  )
}

export default withAuth(['police'])(Dashboard)
