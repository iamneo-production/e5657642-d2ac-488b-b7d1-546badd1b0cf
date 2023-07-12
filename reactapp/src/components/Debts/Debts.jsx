import {React,useEffect,useState} from 'react'
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import './Debts.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Debts = () => {
  const[debtname, setDebtname]=useState('');
  const[amount, setAmount]=useState('');
  const [interest, setInterest] = useState('');
  const [min, setMin] = useState('');
  const initial_amount = amount;

  const [total_interest_amount, setTotal_interest_amount] = useState(0);
  const [total_interest, setTotal_interest] = useState(0);
  const [total_months, setTotal_months] = useState(0);

  const [db_debts,db_getDebts ]=useState([]);

  useEffect(()=>{
    loadDebts();
  },[]);

  const loadDebts=async()=>{
    const result = await axios.get("https://8080-edbbaddbfdbcfbfbdcabfdecaedefadebea.project.examly.io/getDebts")
    db_getDebts(result.data);
  }
  const deleteDebt=async (id)=>{
    await axios.delete(`https://8080-edbbaddbfdbcfbfbdcabfdecaedefadebea.project.examly.io/deleteDebts/${id}`)
    loadDebts();
  }
  const handleDebtnameChange = (e) => {
    setDebtname(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleInterestChange = (e) => {
    setInterest(parseFloat(e.target.value));
  };

  const handleMinChange = (e) => {
    setMin(parseFloat(e.target.value));
  };

  const handlePrint = () => {
    if (String(debtname).trim() === ''||isNaN(parseFloat(amount))||isNaN(parseFloat(interest))||isNaN(parseFloat(min))) {
      alert('Please enter all the entries!');
    } 
    else{
    console.log(debtname);
    console.log(amount);
    console.log(interest);
    console.log(min);

    let totalmonths=0;
    let totalinterest= 0;
    let amt = amount;
    while(amt>0)
    {
      const monthly_interest = amt*interest/1200;
      const monthly_payoff = min-monthly_interest;
      amt = amt - monthly_payoff;
      totalinterest=totalinterest+monthly_interest;
      totalmonths++;
      if(monthly_payoff===0)
      {
        alert("With the amount "+monthly_interest+", You cannot pay off your debt!");
        setAmount('');
        setDebtname('');
        setInterest('');
        setMin('');
        return;
      }
    }
    setTotal_interest(totalinterest);
    setTotal_months(totalmonths);
    setTotal_interest_amount(totalinterest+initial_amount);
    console.log(total_interest_amount);
  }};

  const handleClear = () =>{
    setAmount('');
    setDebtname('');
    setInterest('');
    setMin('');
    setTotal_interest(0);
    setTotal_interest_amount(0);
    setTotal_months(0);
  };

  const initialpay_month = total_months - 1; 
  const total_initial_pay = initialpay_month*min;  
  const balancepay = total_interest_amount.toFixed(2)-total_initial_pay;

  const handleAdd=async (e)=>{
    e.preventDefault();
    if (String(debtname).trim() === ''||isNaN(parseFloat(amount))||isNaN(parseFloat(interest))||isNaN(parseFloat(min))) {
      alert('Please enter all the entries!');
      return;
    }
    if(total_interest_amount===0){
      alert('Calculate the values to add!');
      // return;
    } 
    else{
    const sampleValues = {
      debt_name: debtname,
      total_interest: total_interest.toFixed(2),
      total_interest_amount: total_interest_amount.toFixed(2),
      total_months: total_months,
      suggestions: 'At first ' + initialpay_month + ' months pay '+ min + ' ,so totally '+ total_initial_pay + ' and at the month of ' + total_months +' ,pay ' + balancepay.toFixed(2)
    };

    setAmount('');
    setDebtname('');
    setInterest('');
    setMin('');
    setTotal_interest(0);
    setTotal_interest_amount(0);
    setTotal_months(0);

    await axios.post("https://8080-edbbaddbfdbcfbfbdcabfdecaedefadebea.project.examly.io/Debts",sampleValues).then(response => {
      console.log('Data sent successfully to the backend:', response.data);
    }).catch(error => {
      console.error('Error sending data to the backend:', error);
    });
    // navigate("/reports")
    window.location.reload(false);

    }
  }

  return (
    <div>
      <Header />
      <SideBar>
        <div className="frame">
        <div className='inputbox'>
              Debt Name <input type='text'  className='inputbox1' value={debtname} onChange={handleDebtnameChange}></input><br></br><br></br>
              Amount <input type='text' className='inputbox2' value={amount} onChange={handleAmountChange}></input><br></br><br></br>
              Rate of interest % <input type='text' className='inputbox3' value={interest} onChange={handleInterestChange}></input><br></br><br></br>
              Min pay/month <input type='text' className='inputbox4' value={min} onChange={handleMinChange}></input><br></br>
        </div>
        <div className='output'>
            <button id='button1'onClick={handlePrint}>CALCULATE</button>
            <button id='buttonclear' onClick={handleClear}>X</button>
            <button id='button2'onClick={handleAdd}>ADD</button>
            <Link to="/reports">
            <button id="report_button">SHOW REPORT</button>
            </Link>
            <br></br><br></br>
            &nbsp;&nbsp;&nbsp;Total amount: {total_interest_amount.toFixed(2)}<br></br><br></br>
            &nbsp;&nbsp;&nbsp;Total interest: {total_interest.toFixed(2)}<br></br><br></br>
            &nbsp;&nbsp;&nbsp;No. of months: {total_months}
        </div>
      </div>

      <div className='table_ouput'>
        <table>
          <thead>
          <tr>
            <th>DEBT NAME</th>
            <th>TOTAL INTEREST</th>
            <th>TOTAL AMOUNT</th>
            <th>TOTAL MONTHS</th>
            <th>SUGGESTIONS</th>
            <th>DELETE</th>
          </tr>
          </thead>
          <tbody>
            
          {
            db_debts.map((row,index)=>(
              <tr>
                <td>{row.debt_name}</td>
                <td>{row.total_interest}</td>
                <td>{row.total_interest_amount}</td>
                <td>{row.total_months}</td>
                <td>{row.suggestions}</td>
                <td><button id="button3" onClick={()=>deleteDebt(row.id)}>DELETE</button></td>
              </tr>
            )
            )
          }
          </tbody>
        </table>
      </div>
      </SideBar>
    </div>
  )
}

export default Debts