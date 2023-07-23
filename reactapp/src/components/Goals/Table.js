 
import React,{ useEffect, useState } from 'react';
import './Table.css';
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Table() {
    const navigate = useNavigate();

  const navigateToReports = () => {
    
    navigate('/reports');
  };
    const[goals,setGoals]=useState([]);    

    

    useEffect(()=>{
       loadGoals();
    },[]);

    const loadGoals=async()=>{
        const result=await axios.get("https://8080-abdbccecdcbcfbfbdcabfdecaedefadebea.project.examly.io/goals");
        setGoals(result.data);
    };
    const deleteGoal = async (id) => {
        await axios.delete(`https://8080-abdbccecdcbcfbfbdcabfdecaedefadebea.project.examly.io/deletegoal/${id}`);
        loadGoals();
      };
    return(
        <div className='crud'>
            <div>
            
            <table className='table1'>
                <thead>
                    <th>Goal No</th>
                    <th>Goal Name</th>
                    <th>Description</th>
                    <th>Target Amount</th>
                    <th>Current Amount</th>
                    <th>Status</th>
                    <th>Delete</th>
                    <th>Update</th>
                </thead>
                {
                    
                       goals.map((goal,index)=>(
                       
                       <tr>
                            <td scope='row' key={index}>{index+1}</td>
                            <td>{goal.goalname}</td>
                            <td>{goal.description}</td>
                            <td>{goal.targetamount}</td>
                            <td>{goal.currentamount}</td>
                            <td>{parseInt(goal.targetamount)<=parseInt(goal.currentamount)?<div style={{fontSize:'2vh',color:'green',fontWeight:'bold'}}>Reached</div>:<div style={{fontSize:'2vh',color:'red',fontWeight:'bold'}}>Not Reached</div>}</td>
                            <td><button  onClick={() => deleteGoal(goal.id)} className='delete' type='button' >DELETE</button></td>
                            <td><Link className='edit' to={`/editgoal/${goal.id}`} >EDIT</Link> </td>                          
                   
          
                        </tr>
                    ))
                }
            </table>
            <div className='save'><button className='report' type='button' onClick={navigateToReports} >SHOW REPORT</button></div>
            </div>
        </div>
    )  
    
}

  


export default Table;