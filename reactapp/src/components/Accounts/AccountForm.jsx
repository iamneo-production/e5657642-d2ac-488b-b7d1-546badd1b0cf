import React, { useState } from 'react';
import './Account.css';
import axios from 'axios';
import base_url from './AccountsApi';

const AccountForm = ({ onAddAccount, onDeleteAccount }) => {
  const [data, setData] = useState({
    accountId: '',
    accountName: '',
    accountType: '',
  });

  const { accountId, accountName, accountType } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (String(accountId).trim() === ''||String(accountName).trim() === ''||String(accountType).trim() === '') {
      alert('Please enter all the entries!');
    } 
    else{
    const newAccount = { ...data,balance: getRandomBalance()};
    console.log(newAccount);
    postDatatoServer(newAccount);
    onAddAccount(newAccount);
    setData({
      accountId: '',
      accountName: '',
      accountType: '',
    });
  }
  };
  const getRandomBalance = () => {
    const minBalance = 1;
    const maxBalance = 1000000;
    return Math.floor(Math.random() * (maxBalance - minBalance + 1) + minBalance).toString();
  };

  const postDatatoServer = (newAccount) => {
    axios
      .post(`${base_url}/accounts`, newAccount)
      .then((response) => {
        console.log(response);
        console.log('Account added successfully');
      })
      .catch((error) => {
        console.log(error);
        console.log('Error adding account');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="accountId"
          placeholder="Account ID"
          name="accountId"
          value={accountId}
          onChange={onChange}
        />
        <input
          type="text"
          className="accountName"
          placeholder="Account Name"
          name="accountName"
          value={accountName}
          onChange={onChange}
        />

        <select
          name="accountType"
          className="accountType"
          value={accountType}
          onChange={onChange}
        >
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
          <option value="Credit">Credit</option>
        </select>

        <input type="submit" className="addAccountButton" value="Add Account" />
        <button type="button" className="deleteAccountButton" onClick={onDeleteAccount}>
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default AccountForm;