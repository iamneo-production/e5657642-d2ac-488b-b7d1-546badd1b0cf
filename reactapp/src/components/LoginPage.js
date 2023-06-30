import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [loginData, setLoginData] = React.useState(
        {
            Username: "",
            Password: ""
        }
    );
    let n = useNavigate()
    const [data, userdata] = React.useState()
    const { Username, Password } = loginData;
    const onchange = e => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        axios.get("http://localhost:8081/user").then((resp) => userdata(resp.data))
            .catch((error) => console.log(error))
    }, [])

    const submit = (e) => {
        e.preventDefault();
        console.log(data)
        const verify = data.find(i =>
            (loginData.Username === i.email && loginData.Password === i.password))
        if (verify) {
            n('/Home')
        }
        else {
            window.alert("details not matched")
        }
        setLoginData({ Username: "", Password: "" })


    }





    return (
        <div className="bgcolor">
            <div className="section2">
                <div className='header'>Personal Finance Manager</div>
                <form className="login" onSubmit={submit}>
                    <p className="Letsgearup">&nbsp;&nbsp;User Login</p>
                    <input id="Username" type="email" value={Username} placeholder="Usermail" name="Username" onChange={onchange} /><br /><br />
                    <input id="Password" type="password" value={Password} placeholder="Password" name="Password" onChange={onchange} /><br /><br />
                    <button id="LoginButton" type="submit" value="submit">Login</button><br /><br />
                    <a id="link" href='forgotpassword'>Forgot username or Password? </a>
                </form>
                <br />
                <p className="register">&nbsp;&nbsp;&nbsp;New user?&nbsp;&nbsp;<Link to={'/Register'}>Register</Link>&nbsp;&nbsp;for new account</p>
            </div>
        </div>
    )
}

export default LoginPage