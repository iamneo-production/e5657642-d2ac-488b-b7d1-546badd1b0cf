import React, { useState, useEffect } from 'react';
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import './Transaction.css';
import axios from 'axios';

const Transaction = () => {
  const [getaccountId, setAccountId] = useState();
  const [accounts, setAccounts] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [userData, setUserData] = useState();
  const [transactions, setTransactions] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [lastViewedAccountId, setLastViewedAccountId] = useState(null);

  useEffect(() => {
    const storedid = localStorage.getItem('id');
    if (storedid) {
      setUserData(storedid);
      fetchAccounts();
      loadLastViewedAccountData();
    } else {
      clearLastViewedAccountData();
    }
  }, []);

  useEffect(() => {
    // When the transactions state changes, save it in local storage
    const storedTransactions = JSON.parse(localStorage.getItem('lastViewedAccountTransactions'));
    const updatedStoredTransactions = { ...storedTransactions, [lastViewedAccountId]: transactions };
    localStorage.setItem('lastViewedAccountTransactions', JSON.stringify(updatedStoredTransactions));
  }, [transactions, lastViewedAccountId]);

  const loadLastViewedAccountData = () => {
    // Retrieve the transactions for the last viewed account
    const lastViewedAccountData = localStorage.getItem('lastViewedAccountData');
    if (lastViewedAccountData) {
      const { accountId, accountDetails, transactionsData } = JSON.parse(lastViewedAccountData);
      setAccountId(accountId);
      setAccountList(accountDetails);
      // Use the transactionsData from local storage if it exists
      if (transactionsData && transactionsData.length > 0) {
        setTransactions(transactionsData);
      } else {
        // Otherwise, generate new random transactions
        generateRandomValues();
      }
      setLastViewedAccountId(accountId);
    }
  };
  const clearLastViewedAccountData = () => {
    // Clear the last viewed account data from state and local storage
    setAccountId(null);
    setAccountList([]);
    setTransactions([]);
    setLastViewedAccountId(null);
    localStorage.removeItem('lastViewedAccountData');
  };
  const fetchAccounts = async () => {
    try {
      const response = await axios.get('https://8080-afbabacabedeeeebcfbfbdcabeaeaadbdbabf.project.examly.io/accounts');
      setAccounts(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAccountChange = (e) => {
    setAccountId(e.target.value);
    setIsButtonDisabled(e.target.value === "");
    setLastViewedAccountId(null);
  };

  const fetchAccountData = async () => {
    if (!getaccountId || getaccountId === lastViewedAccountId) {
      return;
    }
    try {
      const response = await axios.get(`https://8080-afbabacabedeeeebcfbfbdcabeaeaadbdbabf.project.examly.io/accounts/id?id=${getaccountId}`);
      setAccountList(response.data);
      // Check if transactions exist for the selected account ID
      const storedTransactions = JSON.parse(localStorage.getItem('lastViewedAccountTransactions'));
      if (storedTransactions && storedTransactions[getaccountId] && storedTransactions[getaccountId].length > 0) {
        // If transactions exist, use them
        setTransactions(storedTransactions[getaccountId]);
      } else {
        // Otherwise, generate new random transactions
        generateRandomValues();
      }
      // Save the account data in local storage for the last viewed account
      const accountData = {
        accountId: getaccountId,
        accountDetails: response.data,
      };
      localStorage.setItem('lastViewedAccountData', JSON.stringify(accountData));
      setLastViewedAccountId(getaccountId);

    } catch (error) {
      console.log(error);
      console.log('Error fetching account data');
    }
  };

  const fixedBalance = 10000;

  const generateRandomValues = () => {
    const maxCredit = fixedBalance;
    const maxDebit = Math.min(fixedBalance, 100);
    const numberOfTransactions = 10;

    let currentBalance = fixedBalance;
    const newTransactions = Array.from({ length: numberOfTransactions }, (_, index) => {
      let isCredit = Math.random() < 0.5;
      let tid = generateTransactionId();
      let date = getRandomDate();
      let description = getRandomDescription();

      let amount = 0;

      if ((description === 'Salary' || description === 'LIC') && !isCredit) {
        amount = Math.floor(Math.random() * (maxCredit + 1));
        currentBalance += amount;
      } else if (
        (description === 'Refund' || description === 'Vehicle Insurance' || description === 'Interest') &&
        isCredit
      ) {
        const count = countCreditTransactions(transactions, description);
        if (count < 3) {
          amount = Math.floor(Math.random() * (maxCredit + 1));
          currentBalance += amount;
        } else {
          isCredit = false;
        }
      } else if (!isCredit) {
        amount = Math.floor(Math.random() * (maxDebit + 1));
        currentBalance = Math.max(currentBalance - amount, 0);
      } else {
        isCredit = false;
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
    const randomDay = Math.floor(Math.random() * (today.getDate() + 1));
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
              <option key={account.id} value={account.id}>
                {account.id}
              </option>
            ))}
          </select>
          <button className="showtrans" onClick={fetchAccountData} disabled={isButtonDisabled}>Show transaction</button>

          {accountList && accountList.length > 0 && (
            <table className="account_detail">
              {accountList.map((account) => (
                <tbody>
                  <tr key={account.id}>
                    <td>Account ID</td>
                    <td>{account.id}</td>
                  </tr>
                  <tr key={account.accountName}>
                    <td>Account Name</td>
                    <td>{account.accountName}</td>
                  </tr>
                  <tr key={account.accountType}>
                    <td>Account Type</td>
                    <td>{account.accountType}</td>
                  </tr>
                  {/* <tr key={userData}>
                    <td>User ID</td>
                    <td>{userData}</td>
                  </tr> */}
                  <tr key={account.balance}>
                    <td>Balance</td>
                    <td>{account.balance}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>TID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
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
  );
};

export default Transaction;