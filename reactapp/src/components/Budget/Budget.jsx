import React, { useState , useEffect } from "react";
import "../Budget/Budget.css";
import Modal from "react-modal";
import { NavLink } from "react-router-dom";
import base_url from '../API/api';
import Header from '../NavBar/Header';
import SideBar from '../NavBar/SideBar';
import axios from "axios";

const Budget = () => {

  const [users, setUsers] = useState([]);

  const [newusers, setNewusers] = useState({
    id: null, // New property to store the original ID
    category: "",
    purpose: "",
    date: "",
    amount: '',
    status: "NOT PAID",
  });
  const { category, purpose, date, amount, status } = newusers;

  const onCategoryChange = (e) => {
    setNewusers({ ...newusers, category: e.target.value });
  };
  const onPurposeChange = (e) => {
    setNewusers({ ...newusers, purpose: e.target.value });
  };
  const onDateChange = (e) => {
    setNewusers({ ...newusers, date: e.target.value });
  };
  const onAmountChange = (e) => {
    setNewusers({ ...newusers, amount: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
  
    if (isValid) {
      try {
        if (editIndex !== null) {
          const updatedUsers = [...users];
          const updatedBudget = {
            ...newusers,
            status: updatedUsers[editIndex].status, 
          };
          console.log(newusers.id);
          console.log(updatedBudget);
          await axios.put(`${base_url}/budget/${newusers.id}`, updatedBudget);
          
          updatedUsers[editIndex] = updatedBudget;
          setUsers(updatedUsers);
          loadUsers();
        } else {
          const newBudget = { ...newusers};
          await axios.post(`${base_url}/budget`, newBudget);
          loadUsers();
        }
        setFormErrors({});
        setModalIsOpen(false);
        setEditIndex(null);
        setNewusers({
          id: null,
          category: "",
          purpose: "",
          date: "",
          amount: '',
          status: "NOT PAID",
        });
      } catch (error) {
        console.error(error.response);
      }
    } else {
      alert("Please fill in all the input fields");
    }
  };

  const handleUpdate = (index) => {
    setEditIndex(index);
    const { id, category, purpose, date, amount } = users[index];
    setNewusers({ ...newusers, id, category, purpose, date, amount });
    setModalIsOpen(true);
  };

  const handleDelete = async (index) => {
    const user = users[index];
    console.log("User:", user);
    const userId = user.id;
    console.log("UserId:", userId);
  
    try {
      await axios.delete(`${base_url}/budget/${userId}`);
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  
  




  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${base_url}/budget`);
    const fetchedUsers = result.data;
  
    // Check if fetchedUsers array has data
    if (fetchedUsers.length > 0) {
      // Map the fetchedUsers array and assign the actual ID from the backend to originalId property
      const updatedUsers = fetchedUsers.map((user) => ({
        ...user,
      }));
      setUsers(updatedUsers);
    } else {
      setUsers(fetchedUsers);
    }
  };
  

  // const [months, setMonths] = useState([]);
  // const [years, setYears] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState("");
  // const [selectedYear, setSelectedYear] = useState("");

  // useEffect(() => {
  //   // Populate the month select with options
  //   const monthOptions = [];
  //   for (let i = 1; i <= 12; i++) {
  //     monthOptions.push(
  //       <option key={i} value={i}>
  //         {i}
  //       </option>
  //     );
  //   }
  //   setMonths(monthOptions);
  //   const currentYear = new Date().getFullYear();
  //   const yearOptions = [];
  //   for (let i = currentYear - 5; i <= currentYear + 5; i++) {
  //     yearOptions.push(
  //       <option key={i} value={i}>
  //         {i}
  //       </option>
  //     );
  //   }
  //   setYears(yearOptions);
  //   setSelectedMonth(new Date().getMonth() + 1);
  //   setSelectedYear(currentYear);
  // }, []);

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(parseInt(event.target.value));
  // };
  // const handleYearChange = (event) => {
  //   setSelectedYear(parseInt(event.target.value));
  // };

  const [estimateValue, setEstimateValue] = useState("");

  const handleEstimateChange = (event) => {
    setEstimateValue(event.target.value);
  };
  const [incomeValue, setIncomeValue] = useState("");

  const handleIncomeChange = (event) => {
    setIncomeValue(event.target.value);
  };

  // const [data, setData] = useState([]);

  const handleClick = async (index) => {
    if (isNaN(parseInt(estimateValue))) {
      alert("Please enter an estimate!");
      return;
    }
    if (isNaN(parseInt(incomeValue))) {
      alert("Please enter the total income!");
      return;
    }
    if (parseInt(incomeValue) < parseInt(estimateValue)) {
      alert("Your income is less than the estimate!");
      return;
    }
  
    const user = users[index];
    const updatedStatus = user.status === "PAID" ? "NOT PAID" : "PAID";
    const updatedUser = { ...user, status: updatedStatus };
  
    try {
      console.log(user.id);
      console.log(updatedUser);
      await axios.put(`${base_url}/budget/${user.id}`, updatedUser);
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const amountSum = users.reduce((sum, budget) => sum + budget.amount, 0);
    setTotalAmount(amountSum);
  }, [users]);

  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const currentAmountSum = users.reduce((sum, budget) => {
      if (budget.status === "PAID") {
        return sum + budget.amount;
      }
      return sum;
    }, 0);
    setCurrentAmount(currentAmountSum);
  }, [users]);

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};

    if (category === "") {
      errors.category = "Please select a category";
    }
    if (purpose === "") {
      errors.purpose = "Please enter a purpose";
    }
    if (date === "") {
      errors.date = "Please enter a date";
    }
    if (amount === 0 || amount < 0) {
      errors.amount = "Please enter an amount";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const customStyles = {
    content: {
      width: "400px",
      height: "450px",
      left: "35%",
      top: "20%",
      right: "auto",
      bottom: "auto",
    },
  };

  return (
    
    <div>
      <Header />
      <SideBar>
    <div className="budget-page-container">
      <div className="budget-details-con">
        <div className="budget-details">
          {/* <div className="drop-down" style={{ color: "WHITE" }}>
            <b>Month:</b>&nbsp;&nbsp;
            <select
              id="select1"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {months}
            </select>
            <b>Year:</b>&nbsp;&nbsp;
            <select
              id="select1"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {years}
            </select>
          </div> */}
          <div className="button">
            <button
              onClick={() => setModalIsOpen(true)}
              className="create-budget-button"
            >
              <b>CREATE BUDGET</b>
            </button>
          </div>
          <div className="estimate-income-container">
            <div className="estimate-row">
              <div className="estimate-div est-item">
                <span style={{ color: "red" }}>ESTIMATE :&nbsp;&nbsp; </span>
                <input
                  type="text"
                  value={estimateValue}
                  onChange={handleEstimateChange}
                  placeholder="Enter Estimate"
                />
              </div>
              <div className="est-item">
                <span>TOTAL EXPENDITURE : {totalAmount}</span>
              </div>
              <div className="est-item">
                <span>CURRENT EXPENDITURE : {currentAmount}</span>
              </div>
              <div className="est-item">
                <span>BALANCE : {estimateValue - currentAmount} </span>
              </div>
            </div>
            <div className="income-row">
              <div className="income-div ">
                <div className="inc-item">
                  <span style={{ color: "green" }}>TOTAL INCOME : </span>
                  <input
                    type="text"
                    value={incomeValue}
                    onChange={handleIncomeChange}
                    placeholder="Enter income"
                  />
                </div>

                <div className="inc-item">
                  <span className="savings">
                    {" "}
                    SAVINGS: {incomeValue - estimateValue}
                  </span>
                </div>
                <div className="inc-item"></div>
                <div className="inc-item"></div>
                <div className="inc-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="budget-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Purpose</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>
              user.id !== null &&
              user.category !== null &&
              user.purpose !== null &&
              user.date !== null &&
              user.amount !== null ? (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.category}</td>
                  <td>{user.purpose}</td>
                  <td>{user.date}</td>
                  <td>{user.amount}</td>
                  <td>
                    <button
                      onClick={() => handleClick(index)}
                      className={`status-button ${
                        user.status === "PAID" ? "paid" : "not-paid"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td>
                    <button
                      className="update-budget-button"
                      onClick={() => handleUpdate(index)}
                    >
                      UPDATE
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-budget-button"
                      onClick={() => handleDelete(index)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          // contentLabel="Popup Form"
          style={customStyles}
        >
          <form onSubmit={onSubmit}>
            <h2>{editIndex !== null ? "Edit Budget" : "Add Budget"}</h2>
            <div className="budgetpop">
              <div className="budget_popcontent">
                {/* <input
                  id="popup_text"
                  type={"text"}
                  placeholder="Enter id"
                  value={id}
                  onChange={(e) => onIDChange(e)}
                ></input> */}
                <br></br>
                <select
                  className="budget_dropdown"
                  value={category}
                  onChange={(e) => onCategoryChange(e)}
                >
                  <option>Select category</option>
                  <option>Food and Grocery</option>
                  <option>Travel and Expenses</option>
                  <option>Housing</option>
                  <option>Debt payment</option>
                  <option>Others</option>
                </select>
                <br></br>
                <input
                  id="popup_text"
                  type={"text"}
                  placeholder="Enter purpose"
                  value={purpose}
                  onChange={(e) => onPurposeChange(e)}
                ></input>
                <br></br>
                <input
                  id="popup_text"
                  type={"date"}
                  value={date}
                  onChange={(e) => onDateChange(e)}
                ></input>
                <br></br>
                <input
                  id="popup_text"
                  type={"text"}
                  value={amount}
                  placeholder="Enter amount"
                  onChange={(e) => onAmountChange(e)}
                ></input>
                <br></br>
                <div className="popup_submit">
                  <button className="submitbutton" type="submit">
                    {editIndex !== null ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
              <div id="budget_popclose">
                <button
                  id="budget_popbutton"
                  onClick={() => setModalIsOpen(false)}
                >
                  <b>X</b>
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>

      <div className="budget-buttons">
        <NavLink to={"/reports"}>
          <button className="show-report-button">SHOW REPORT</button>
        </NavLink>
      </div>
    </div>
    </SideBar>
    </div>
  );
};

export default Budget;
