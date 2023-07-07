import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const RegisterPage = () => {
    const [SignupData, setSignupData] = useState(
        {

            firstname: "",
            lastname: "",
            email: "",
            password: "",
            Reenterpassword: "",
            role: "",

        }
    )

    const { role, firstname, lastname, email, password, Reenterpassword } = SignupData
    const onchange = (e) => {
        setSignupData({ ...SignupData, [e.target.name]: e.target.value })
    }
   

    const handleSubmit = (event) => {
        event.preventDefault();
       

            if (password === Reenterpassword) {
                console.log("Signup form submitted!");
                axios.post("https://8080-edbafcdbcfbfbdcabfdecaedefadebea.project.examly.io/register", SignupData)
                    .then(() => window.alert("registered sucessfully")
                        .catch((error) => console.log(error)))
            }
      
        setSignupData({ role: "", firstname: "", lastname: "", email: "", password: "", Reenterpassword: "" })

    };



    return (
        <div className='App'>
            <div className="bgcolor">
                <div className="container2">
                    <section className="box2">
                        <form onSubmit={handleSubmit}>
                            <b>Register User</b>



                            <input
                                id="container7"
                                type="text"
                                placeholder="First name"
                                name="firstname"
                                value={firstname}
                                onChange={onchange}
                            />
                            <br />
                            <input
                                id="container1"
                                type="text"
                                placeholder="Last name"
                                name="lastname"
                                value={lastname}
                                onChange={onchange}
                            />
                            <br />
                            <input
                                id="container8"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onchange}
                            />
                            <br />
                            <input
                                id="container3"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onchange}
                            />
                            <br />
                            <input
                                id="container4"
                                type="password"
                                placeholder="Re-enter password"
                                name="Reenterpassword"
                                value={Reenterpassword}
                                onChange={onchange}
                            />
                            <br />
                            <input
                                id="container5"
                                type="text"
                                placeholder="Role"
                                name="role"
                                value={role}
                                onChange={onchange}
                            />
                            <br />
                            <button id="button1" type="submit" value="submit">Sign up</button>
                            <Link to={'/login'}><button id="button2">Back to Login</button></Link>

                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};


export default RegisterPage;