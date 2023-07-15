import React from 'react'
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import './Transaction.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';


  

const Transaction = () => {
  const [accountId, setAccountId] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`https://8080-ffdbbecdfdbcfbfbdcabfdecaedefadebea.project.examly.io/api/transactions/account?accountId=${accountId}`);
      const updatedTransactions = response.data.map(transaction => {
      const { credit, debit } = transaction;
      const balance = parseFloat(transaction.account.balance) + credit - debit;
      transaction.account.balance = balance;
      return transaction;
    });
    setTransactions(updatedTransactions);
  } catch (error) {
    console.log('Error:', error);
  }
};
fetchTransactions();
  }, [accountId]);


  const handleAccountChange = (e) => {
    setAccountId(e.target.value);
  };

  return (
    <div>
      <Header />
      <SideBar>
      <h2>Transactions by Account</h2>
      <div>
        <label htmlFor="accountId">Account Id:</label>
        <select id="accountId" value={accountId} onChange={handleAccountChange}>
          <option value="">-- Select Account Id --</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>TID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.tid}>
                <td>{transaction.tid}</td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.credit}</td>
                <td>{transaction.debit}</td>
                <td>{transaction.account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
      </SideBar>
    </div>
  )
};

export default Transaction;