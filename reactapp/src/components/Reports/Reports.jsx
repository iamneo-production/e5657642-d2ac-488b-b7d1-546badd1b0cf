import React, { useState, useEffect, useRef } from 'react';
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';

import Chart from 'chart.js/auto';
import './Reports.css';


const Reports = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance reference
  const [transactionData, setTransactionData] = useState({});
  const [debtData, setDebtData] = useState({});
 
  const [showDebtGraph, setShowDebtGraph] = useState(true); // State to toggle debt graph visibility
  useEffect(() => {
    fetchTransactionData();
    fetchDebtData();

  }, []);
  const fetchTransactionData = async () => {
    try {
      // Fetch transaction data
      const responseBalance = await fetch('https://8080-afbabacabedeeeebcfbfbdcabeaeaadbdbabf.project.examly.io/Report/Balance');
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
      const responseDebtPaid = await fetch('https://8080-afbabacabedeeeebcfbfbdcabeaeaadbdbabf.project.examly.io/Report/total-interest');
      const totalDebt = parseFloat(await responseDebtPaid.json());
      console.log('Total debt:', totalDebt);

      
      setDebtData({ totalDebt });
    } catch (error) {
      console.log('Error fetching debt data:', error);
    }
  };
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
  } else {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
  }
}, [ debtData, showDebtGraph,]);
const handleDebtGraphButtonClick = () => {
  setShowDebtGraph(true);

};

  return (
    <div>
      <Header />
      <SideBar>
      {/* <h1 className="Finance">Financial Report</h1> */}
      <button onClick={handleDebtGraphButtonClick}>Debt Report</button>
      <div className="chart-container">
       
        {showDebtGraph && <canvas ref={chartRef}></canvas>}
        
      </div>
      </SideBar>
    </div>
  )
}

export default Reports