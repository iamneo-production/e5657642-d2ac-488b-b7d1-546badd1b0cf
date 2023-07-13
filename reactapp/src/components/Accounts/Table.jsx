import React, { useState, useEffect } from 'react';
import './Account.css';
import axios from 'axios';
import base_url from './AccountsApi';

const Table = () => {
  const [accountList, setAccountList] = useState([]);
  const [userData, setUserData] = useState([]);
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
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get(`${base_url}/user`)
      .then((response) => {
        console.log(response.data[0]);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUserData(response.data[0].id);
        } else {
          console.log('Empty or invalid response');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('Error fetching user data');
      });
  };
  return (
    <div>
      <table className="account-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Name</th>
            <th>Account Type</th>
            <th>User Id</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.accountName}</td>
              <td>{account.accountType}</td>
              <td>{userData}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;