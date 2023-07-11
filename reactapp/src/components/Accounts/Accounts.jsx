import React from 'react'
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import { useState, useEffect } from 'react';
import AccountForm from './AccountForm';
import DropDownButton from './DropDownButton';
import './Account.css';
import Table from './Table';
import axios from 'axios';
import base_url from './AccountsApi';

const Accounts = () => {
  const [accountList, setAccountList] = useState([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    axios
      .get(`${base_url}/accounts`)
      .then((response) => {
        setAccountList(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error fetching accounts');
      });
      
  };

  const handleAddAccount = (newAccount) => {
    axios
      .post(`${base_url}/accounts`, newAccount)
      .then((response) => {
        console.log(response);
        console.log('Account added successfully');
        fetchAccounts();// Fetch the updated list of accounts from the server
      })
      .catch((error) => {
        console.log(error);
        console.log('Error adding account');
      });
      window.location.reload(false);
  };

  const handleDeleteAccount = () => {
    if (selectedAccountIndex !== null) {
      const accountId = accountList[selectedAccountIndex].id;
      axios
        .delete(`${base_url}/accounts?id=${accountId}`)
        .then((response) => {
          console.log(response);
          console.log('Account deleted successfully');
          fetchAccounts(); // Fetch the updated list of accounts from the server
        })
        .catch((error) => {
          console.log(error);
          console.log('Error deleting account');
        });
        window.location.reload(false);
    }
  };

  const handleSelectAccount = (e) => {
    const index = e.target.value !== '' ? parseInt(e.target.value) : null;
    setSelectedAccountIndex(index);
  };


  return (
    <div>
      <Header />
      <SideBar>
        {/*Do your code inside the sidebar tag*/}
        
        <div className='account-container'>
        <div className='account-title'> ADD NEW ACCOUNT </div>
        <div className='account-wrapper'>
          <AccountForm onAddAccount={handleAddAccount} onDeleteAccount={handleDeleteAccount} />
        </div>
        <DropDownButton
          accountList={accountList}
          handleSelectAccount={handleSelectAccount}
          handleDeleteAccount={handleDeleteAccount}
          selectedAccountIndex={selectedAccountIndex}
        />
      </div>

      <div>
        <Table accountList={accountList} />
      </div>

      <div className="note">
        <i>*Note: You can see only the account details. If you want to see transaction details, go to the dashboard and select an account.</i>
      </div>
      </SideBar>
    </div>
  )
}

export default Accounts