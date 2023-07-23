import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../NavBar/NavBar.css'
import Header from '../NavBar/Header'
import SideBar from '../NavBar/SideBar';
import HomeUserTable from './HomeUserTable';
import HomeAccountTable from './HomeAccountTable';
import './Home.css';
import axios from 'axios';
import base_url from './HomeApi';
const Home = () => {

  const [isUserEditing, setIsUserEditing] = useState(false);
  const [isSaveDisabled,setIsSaveDisabled]=useState(true);
  const [userData, setUserData] = useState([]);

    //fetching user data from the database
    useEffect(() => {
      fetchUserData();
    }, []);

    const fetchUserData = () => {
      axios
        //getting user data
        .get(`${base_url}/user`)
        .then((response) => {
          //console.log(response.data[0]);
          if (Array.isArray(response.data) && response.data.length > 0) {
            //setting the extracted data to userData
            setUserData(response.data[0].id);
          } else {
            //handling error if the reponse is invalid
            console.log('Empty or invalid response');
          }
        })
        .catch((error) => {
          console.log(error);
          console.log('Error fetching user data');
        });
    };
    //handling delete user
    const handleDeleteClick = () => {
      const storedUserID = localStorage.getItem('id');
      axios
        //passing user data
        
        .delete(`${base_url}/user/${storedUserID}`)
        .then((response) => {
          alert('User deleted successfully.');
          // Redirect to the login page
          window.location.href = '/';
        })
        .catch((error) => {
          // Handle error if the deletion fails
          console.log(error);
        });
    };

  //handling update user 
  const handleUpdateUserClick = () => {
    setIsUserEditing(true);
  };

  //handling when the input is changed
  const handleInputChange = () => {
    setIsSaveDisabled(false);
  };

  return (
    <div>

      <Header />
      <SideBar>
        <div className="HomeContainer">
      {/*add bank account, user details, update user button */}
      <div>
        <Link to="/accounts">
          <button className="dashboardButton">+ Add Bank Account</button>
        </Link>
        <button className="DeleteUserButton" onClick={handleDeleteClick}>
          Delete User
        </button>
        <button className="UpdateUserButton" onClick={handleUpdateUserClick}>
          Edit Profile
        </button>
      </div>

      {/*rendering the user data in the table by fetching from the database */}
      <HomeUserTable  isUserEditing={isUserEditing}  onInputChange={handleInputChange}  /> 

      {/* rendering account table connected to the accounts page*/}
      <HomeAccountTable/>
      </div>
      </SideBar>

    </div>
  )
}

export default Home