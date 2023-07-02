import React from 'react'
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';

const Reports = () => {
  return (
    <div>
      <Header />
      <SideBar>
        {/*Do your code inside the sidebar tag*/}
        <h1>Reports</h1>
      </SideBar>
    </div>
  )
}

export default Reports