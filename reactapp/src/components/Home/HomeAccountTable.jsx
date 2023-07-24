import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import base_url from '../API/api';
const HomeAccountTable = () => {

  const [accountList, setAccountList] = useState([]);
  const [userData, setUserData] = useState([]);


    //fetching account data from the database
    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = () => {
        axios
        //getting accounts
        .get(`${base_url}/accounts`)
        .then((response) => {
            //setting the data to account list
            setAccountList(response.data);
        })
        .catch((error) => {
            //handling error
            console.log(error);
            console.log('Error fetching account data');
        });
    };

    //fetching user data from the database
    useEffect(() => {
        const storedid = localStorage.getItem('id');
  setUserData(storedid || "");
    }, []);


    return (
        <div>
            <table className="home-table">
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Account Name</th>
                        <th>Account Type</th>
                        <th>User ID</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accountList.map((account, index) => (
                        <tr key={index}>
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

export default HomeAccountTable;