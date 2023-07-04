import React from 'react';
import '../NavBar/NavBar.css'
import Header from '../NavBar/Header'
import SideBar from '../NavBar/SideBar';

const Home = () => {
  return (
    <div>
      <Header />
      <SideBar>
        {/*Do your code inside the sidebar tag*/}
        <h1>Dashboard</h1>
      </SideBar>
    </div>
  )
}

export default Home