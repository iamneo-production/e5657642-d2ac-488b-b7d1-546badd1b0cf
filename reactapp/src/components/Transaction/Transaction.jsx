import React from 'react'
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import './Transaction.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


  

const Transaction = () => {
  const [getaccountId, setAccountId] = useState('');
  const handleAccountChange = (e) => {
    setAccountId(e.target.value);
    
    console.log(getaccountId);
    console.log(accounts);
  };

  //fetching accounts for dropdown 
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('https://8080-ffdbbecdfdbcfbfbdcabfdecaedefadebea.project.examly.io/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchAccounts();
  }, []);

  //fetching accounts for table
  const [accountList, setAccountList] = useState([]);
 
  const fetchAccountData = async () => {
    axios
      .get(`https://8080-ffdbbecdfdbcfbfbdcabfdecaedefadebea.project.examly.io/accounts/id?accountId=${getaccountId}`)
      .then((response) => {
        setAccountList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error fetching account data');
      });
  };
  useEffect(() => {
    fetchAccountData();
  }, [getaccountId]);

  const fixedBalance = 10000;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    generateRandomValues();
  }, []);

  const generateRandomValues = () => {
    const maxCredit = fixedBalance; // Maximum value for credit
    const maxDebit = Math.min(fixedBalance, 100); // Maximum value for debit
    const numberOfTransactions = 10; // Number of transactions to generate

    let currentBalance = fixedBalance;
    const newTransactions = Array.from({ length: numberOfTransactions }, (_, index) => {
      let isCredit = Math.random() < 0.5; // Randomly choose whether to generate credit or debit
      let tid = generateTransactionId();
      let date = getRandomDate();
      let description = getRandomDescription();

      let amount = 0;

      if ((description === 'Salary' || description === 'LIC') && !isCredit) {
        amount = Math.floor(Math.random() * (maxCredit + 1));
        currentBalance += amount; // Add credit to the current balance
      } else if (
        (description === 'Refund' || description === 'Vehicle Insurance' || description === 'Interest') &&
        isCredit
      ) {
        const count = countCreditTransactions(transactions, description);
        if (count < 3) {
          amount = Math.floor(Math.random() * (maxCredit + 1));
          currentBalance += amount; // Add credit to the current balance
        } else {
          isCredit = false; // Set isCredit to false if maximum credit transactions reached for the specific description
        }
      } else if (!isCredit) {
        amount = Math.floor(Math.random() * (maxDebit + 1));
        currentBalance = Math.max(currentBalance - amount, 0); // Subtract debit from the current balance, ensuring it remains positive
      } else {
        isCredit = false; // Set isCredit to false if no credit transaction is applicable
      }

      return {
        tid,
        date,
        description,
        credit: isCredit ? amount : 0,
        debit: !isCredit ? amount : 0,
        balance: currentBalance,
      };
    });

    // Add initial balance as the first transaction
    const initialTransaction = {
      tid: 'Initial',
      date: new Date().toDateString(),
      description: 'Initial Balance',
      credit: 0,
      debit: 0,
      balance: fixedBalance,
    };

    const updatedTransactions = [initialTransaction, ...newTransactions];
    setTransactions(updatedTransactions);
  };

  const generateTransactionId = () => {
    const characters = '0123456789';
    let transactionId = '';
    for (let i = 0; i < 10; i++) {
      transactionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return transactionId;
  };

  const getRandomDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const randomDay = Math.floor(Math.random() * (today.getDate() + 1)); // Random day from 1 to current date
    const randomDate = new Date(today.getFullYear(), currentMonth, randomDay);
    return randomDate.toDateString();
  };

  const getRandomDescription = () => {
    const descriptions = [
      'Groceries',
      'Rent',
      'Utilities',
      'Shopping',
      'Dining',
      'Transportation',
      'Amount Transfer',
      'Refund',
      'LIC',
      'Vehicle Insurance',
      'Interest',
    ];
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
  };

  const countCreditTransactions = (transactions, description) => {
    return transactions.reduce((count, transaction) => {
      if (transaction.description === description && transaction.credit > 0) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  return (
    <div>
      <Header />
      <SideBar>
      <div>
        <select id="dropdown-account" value={getaccountId} onChange={handleAccountChange}>
          <option value="">-- All Transactions --</option>
          {accounts.map((account) => (
            <option key={accounts.accountId} value={accounts.accountId}>
              {account.accountId}
            </option>
          ))}
        </select>
      <button className='showtrans' onClick={generateRandomValues}>Show transaction</button>
      </div>
      <div>
      <table className="account_detail">
      <tbody>
        <tr>
          <td>Account ID</td>
          <td>
              {accountList[0]?accountList[0].accountId:''}
          </td>
        </tr>
        <tr>
            <td>Account Name</td>
            <td>
            {accountList[0]?accountList[0].accountName:''}
            </td>
        </tr>
        <tr>
            <td>Account Type</td>
            <td>
            {accountList[0]?accountList[0].accountType:''}
            </td>
        </tr>
        <tr>
            <td>Balance</td>
            <td>
            {accountList[0]?accountList[0].balance:''}
            </td>
        </tr>
        </tbody>
    </table>
      </div>
        <table>
          <thead>
            <tr>
              <th>TID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              {/* <th>Balance</th> */}
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction, index) => {
            // Exclude transactions with both credit and debit as zero
            if (transaction.credit === 0 && transaction.debit === 0) {
              return null;
            }
            return (
              <tr key={index}>
                <td>{transaction.tid}</td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.credit}</td>
                <td>{transaction.debit}</td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </SideBar>
    </div>
  )
};

export default Transaction;