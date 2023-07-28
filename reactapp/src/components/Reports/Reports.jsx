import React, { useState, useEffect, useRef } from 'react';
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import base_url from '../API/api';
import Chart from 'chart.js/auto';
import './Reports.css';
import axios from 'axios';


const Reports = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance reference
  const [transactionData, setTransactionData] = useState({});
  const [debtData, setDebtData] = useState({});
  const [allGoals , setAllGoals] = useState([]);
  const [allBudgets , setAllBudgets] = useState([]);
 
  const [showDebtGraph, setShowDebtGraph] = useState(false); // State to toggle debt graph visibility
  const [showGoalGraph,setShowGoalGraph]=useState(false); 
  const [showBudgetGraph,setShowBudgetGraph]=useState(false);

  useEffect(() => {
    fetchTransactionData();
    fetchDebtData();
    fetchGoalData();
    fetchBudgetData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      // Fetch transaction data
      const responseBalance = await fetch(`${base_url}/Report/Balance`);
      const Balance = parseFloat(await responseBalance.json());
      console.log('Total Balance:', Balance);

      

      setTransactionData({ Balance });
    } catch (error) {
      console.log('Error fetching transaction data:', error);
    }
  };
 
  const fetchDebtData = async () => {
    try {
      // Fetch debt data
      const responseDebtPaid = await fetch(`${base_url}/Report/total-interest`);
      const totalDebt = parseFloat(await responseDebtPaid.json());
      console.log('Total debt:', totalDebt);

      
      setDebtData({ totalDebt });
    } catch (error) {
      console.log('Error fetching debt data:', error);
    }
  };

  const fetchBudgetData= async() =>{
    let data = {};
    data.id = JSON.parse(localStorage.getItem('id'));
    await axios({
      url : `${base_url}/budget`,
      method : "get",
    }).then((response) => {
      console.log(response)
      if(response.data) {
        setAllBudgets(response.data);
      }
    }).catch((err) => {
      console.log(err);
    })

  }

  const fetchGoalData = async() =>{
    let data = {};
    data.id = JSON.parse(localStorage.getItem('id'));
    await axios({
      url : `${base_url}/goals`,
      method : "get",
    }).then((response) => {
      console.log(response)
      if(response.data) {
        setAllGoals(response.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {if (debtData.totalDebt && showDebtGraph) {
    const labels = ['Total debt', 'Payable'];
    const data = [debtData.totalDebt,transactionData.Balance ];
    const colors = ['#36A2EB', '#FF6384'];

    const chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Debt Report',
            data: data,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'White',
          },
        },
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the chart instance
    chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
  } 
  else if(allBudgets && showBudgetGraph){

    console.log(allBudgets)
    const labels = [];
      
    const data = [];
    
    const data2 = [];
    allBudgets.forEach((ele) => 
    {
      data.push(ele.amount)
      let msDiff = new Date(ele.date).getTime() - new Date().getTime(); 
      let diffInDate = (Math.floor(msDiff / (1000 * 60 * 60 * 24)))
      data2.push(diffInDate)
      labels.push(ele.category)
    }
    )
    
    console.log(labels, data , data2)
    const colors = ['#36A2EB', '#FF6384', '#FFCE56'];

    const chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Remaining Days',
            data: data2,
            backgroundColor: colorize(false),
          },
        ],
      },
      options: {
        response : true,
          plugins: {
            customCanvasBackgroundColor: {
              color: 'White',
          },
        maintainAspectRatio: true}},
    
    };  
  
    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the chart instance
    chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
  }
  else if(allGoals && showGoalGraph){

    console.log(allGoals)
    const labels = [];
    const data = [];
    const data2 = [];
    allGoals.forEach((ele) => 
      {
        data.push(ele.currentamount)
        data2.push(ele.targetamount)
        labels.push(ele.description)
      }
    )
    const colors = ['#36A2EB', '#FF6384', '#FFCE56'];

    const chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Target Amount',
            data: data2,
            backgroundColor: "#FF6384",
          },
          {
            label: 'Current Amount',
            data: data,
            backgroundColor: "#36A2EB",

          },
          
        ],
      },
      options: {
        response : true,
          plugins: {
            customCanvasBackgroundColor: {
              color: 'White',
          },
        maintainAspectRatio: true}},
    
    };  
  
    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the chart instance
    chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
  }
  else {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
  }
}, [ debtData, showDebtGraph,showGoalGraph,allGoals,allBudgets,showBudgetGraph]);

const handleDebtGraphButtonClick = () => {
  setShowDebtGraph(true);
  setShowGoalGraph(false);
  setShowBudgetGraph(false);
  console.log(showBudgetGraph);
  console.log(showGoalGraph);
  console.log(showDebtGraph);

};

const handleGoalGraphButtonClick = () => {
  setShowGoalGraph(true);
  setShowDebtGraph(false);
  setShowBudgetGraph(false);
  console.log(showBudgetGraph);
  console.log(showGoalGraph);
  console.log(showDebtGraph);
};

const handleBudgetGraphButtonClick=()=>{
  setShowBudgetGraph(true);
  setShowDebtGraph(false);
  setShowGoalGraph(false); 
  console.log(showBudgetGraph);
  console.log(showGoalGraph);
  console.log(showDebtGraph);
};

function colorize(opaque) {
  return (ctx) => {
    if(ctx.parsed){
      const v = ctx.parsed.y;
      var c = "#00A36C"
      if(allBudgets[ctx.parsed.x].status === 'NOT PAID') {
        c = '#D60000'
      }
      return c;
    }
    return null;
  };
}  

  return (
    <div>
      <Header />
      <SideBar>
      {/* <h1 className="Finance">Financial Report</h1> */}
      <button className='button' onClick={handleBudgetGraphButtonClick}>Budget Report</button>
      <button className='button' onClick={handleDebtGraphButtonClick}>Debt Report</button>
      <button className='button' onClick={handleGoalGraphButtonClick}>Goal Report</button>
      <div className="chart-container">
        {showGoalGraph && <canvas ref={chartRef}></canvas>}
        {showDebtGraph && <canvas ref={chartRef}></canvas>}
        {showBudgetGraph && <canvas ref={chartRef}></canvas>}               
      </div>
      </SideBar>
    </div>
  )
}

export default Reports