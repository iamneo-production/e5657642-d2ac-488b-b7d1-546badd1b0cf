import { React,useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import Header from '../NavBar/Header';
import '../NavBar/NavBar.css';
import SideBar from '../NavBar/SideBar';
import './Table.css';

function EditGoal() {
    let navigate = useNavigate();

  const navigateToGoals = () => {
    
    navigate('/goals');
  };
  
    const { id } = useParams();
  
    const [goal, setGoal] = useState({
      goalname: "",
      description: "",
      targetamount: "",
      currentamount:"",
    });
  
    const { goalname, description,targetamount, currentamount } = goal;
  
    const onInputChange = (e) => {
      setGoal({ ...goal, [e.target.name]: e.target.value });
    };
  
   
    useEffect(()=>{
     loadGoal(); },[]);
    
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`https://8080-dabbdacedfaabcfbfbdcabfdecaedefadebea.project.examly.io/editgoal/${id}`, goal)
      navigate("/goals");
    };
  
    const loadGoal = async () => {
    const result = await axios.get(`https://8080-dabbdacedfaabcfbfbdcabfdecaedefadebea.project.examly.io/goal/${id}`)
    setGoal(result.data);
    };
  
    return (
     <div>
      <Header />
      <SideBar>
        <form className='addForm' onSubmit={(e)=>onSubmit(e)}>
        <h1 style={{fontFamily:'Lucida Sans'}}>UPDATE GOAL</h1>
         <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="goalname" 
          value={goalname}
         onChange={(e) => onInputChange(e)}/>
         <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="description" 
          value={description}
         onChange={(e) => onInputChange(e)}/>
         <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="targetamount"
           value={targetamount}
          onChange={(e) => onInputChange(e)}/>
         <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="currentamount"
           value={currentamount}
          onChange={(e) => onInputChange(e)}/>
         <button type="submit"  style={{marginLeft:'13%',fontFamily:'Lucida Sans'}}>DONE</button>
         <button type="cancel" onClick={navigateToGoals} style={{marginLeft:'10%',backgroundColor:'rgb(216, 15, 8)',fontFamily:'Lucida Sans'}}>CANCEL</button>
         
           
     </form>
     </SideBar>
     </div>
);

  }

  export default EditGoal