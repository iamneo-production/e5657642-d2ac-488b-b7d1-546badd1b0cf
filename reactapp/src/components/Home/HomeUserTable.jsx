import React,{useState,useEffect} from 'react';
import axios from 'axios';
import * as EmailValidator from 'email-validator';
import base_url from './HomeApi';
const HomeUserTable = ({isUserEditing,onInputChange}) => {

    const [userData, setUserData] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [userFormData,setUserFormData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        role:""
    });

  
  //fetching userData
    useEffect(() => {
        fetchUserData();
        const storedid = localStorage.getItem('id');
    }, []);

    const fetchUserData = () => {
        axios
            //getting user data
            .get(`${base_url}/user`)
            .then((response) => {
                //console.log(response.data[0]);
                const storedUserID = localStorage.getItem('id');
        const usersData=response.data;
        const userExists = usersData.find(user => user.id === parseInt(storedUserID));
        console.log(userExists.data);
        setUserData(userExists);
        setUserFormData(userExists);
            })
            .catch((error) => {
                //handling error
                console.log(error);
                console.log('Error fetching user data');
            });
    };

    //handling input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prevState) => ({
        ...prevState,
        [name]: value
    }));

        onInputChange(); // Call the parent component's input change handler
    };
  
    //handling save click
    const handleSaveClick = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        if (!EmailValidator.validate(userFormData.email)) {
            window.alert("Please enter a valid email address");
            setIsSaving(false);
            return;
        }

        try {
            // Check if email already exists in the database
            const responseNew = await axios.get(`${base_url}/user`);
            const users = responseNew.data;
            const emailExists = users.some((user) => user.email === userFormData.email && user.email !== localStorage.email);
            console.log(userFormData.email);
            if (emailExists) {
                window.alert("Email already exists. Please use a different email.");
                setIsSaving(false);
                return;
            } 
            else {
                axios
                //updating user data
                .put(`${base_url}/user/${userData.id}`, userFormData)
                .then((response) => {
                    console.log(response.data);
                    setIsSaving(false);
                    window.alert("user updated succesfully.");
            })
            .catch((error) => {
                //handle error
                console.log(error);
                setIsSaving(false);
            });
        }
    }
        catch(error)
        {
            console.log(error);
        };
        window.location.reload(false);
};
  return (
    <div>
        <table className="user-table">
            <tbody>
                <tr>
                    <td>User ID</td>
                    <td>
                        {userData.id}
                    </td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>{isUserEditing ? (
                        <input
                            type="text"
                            name="firstname"
                            value={userFormData.firstname}
                            onChange={handleInputChange}
                        />
                        ) : (
                            userData.firstname
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>
                        {isUserEditing ? (
                        <input
                            type="text"
                            name="lastname"
                            value={userFormData.lastname}
                            onChange={handleInputChange}
                        />
                        ) : (
                            userData.lastname
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        {isUserEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={userFormData.email}
                            onChange={handleInputChange}
                        />
                        ) : (
                            userData.email
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td>
                        {isUserEditing ? (
                        <input
                            type="text"
                            name="role"
                            value={userFormData.role}
                            onChange={handleInputChange}
                        />
                        ) : (
                            userData.role
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
        {isUserEditing && (
            <button className="SaveButton" disabled={isSaving} onClick={handleSaveClick}>
                {isSaving ? 'Saving...' : 'Save'}
            </button>
        )}
    </div>
  );
};

export default HomeUserTable;
