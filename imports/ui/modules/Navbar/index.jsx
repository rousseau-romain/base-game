import React, { useState, useCallback } from 'react'
import Header from './Header'
import Sidenav from './SideNav'

const NavBar = () => {
  let [ count, setCount ] = useState(0);

  const plus = useCallback(() => {
    setCount(count+1)
    console.log(count)
  }, [setCount])
    return (
      <div>
        <h3 >{count}</h3>
        <Sidenav></Sidenav>
        <Header plus={plus}></Header>
      </div>
    );
  }
  
export default NavBar;