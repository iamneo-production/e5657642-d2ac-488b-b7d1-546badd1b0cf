import axios from "axios";
import React, { useState } from "react";


export default function Form() {

  const [goal, setGoal] = useState({
    goalname: "",
    description: "",
    targetamount: "",
    currentamount:"",
  });

  const { goalname, description, targetamount,currentamount } = goal;

  const onInputChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (String(goalname).trim() === ''||String(description).trim() === ''||String(targetamount).trim() === ''||String(currentamount).trim() === '') {
      alert('Please enter all the entries!');
    } 
    else{
    e.preventDefault();
    await axios.post("https://8080-abdbccecdcbcfbfbdcabfdecaedefadebea.project.examly.io/goal", goal);
    window.location.reload(false);
    }
  };

  return (
    <form className='addForm' onSubmit={(e)=>onSubmit(e)}>
           <h1 style={{fontFamily:'Lucida Sans'}}>SET NEW GOAL</h1>
            <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%',}} name="goalname" 
            placeholder="Goal Name" value={goalname}
            onChange={(e) => onInputChange(e)}/>
            <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="description" 
            placeholder="Description" value={description}
            onChange={(e) => onInputChange(e)}/>
            <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="targetamount"
             placeholder="Target Amount" value={targetamount}
             onChange={(e) => onInputChange(e)}/>
            <input type="text" id='formtext' style={{height:'4vh',backgroundColor:'aliceblue',marginBottom:'2vh',marginLeft:'13%'}} name="currentamount"
             placeholder="Current Amount" value={currentamount}
             onChange={(e) => onInputChange(e)}/>
            <button type="submit"  style={{marginLeft:'13%',fontFamily:'Lucida Sans'}}>SET GOAL</button>
            
        </form>
  );

}
