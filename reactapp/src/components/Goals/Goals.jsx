import React from 'react'
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import Table from './Table'
import Form from './Form'

const Goals = () => {
  return (
    <div>
      <Header />
      <SideBar>
      <Form/>
      <Table/>
      </SideBar>
    </div>
  )
}

export default Goals