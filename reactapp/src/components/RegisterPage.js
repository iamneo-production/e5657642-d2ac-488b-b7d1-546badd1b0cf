import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const RegisterPage = () => {
    //const [dbdata, setdbdata] = useState()

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
    // useEffect(() => {
    //     axios.get("/user")
    //         .then((resp) => setdbdata(resp.data))
    //         .catch((error) => {

    //             console.error(error);
    //         });
    // }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === Reenterpassword) {
            console.log("Signup form submitted!");
            axios.post("https://8080-edbafcdbcfbfbdcabfdecaedefadebea.project.examly.io/register", SignupData)
                .then(() => window.alert("registered sucessfully")
                    .catch((error) => console.log(error)))
        }
        else {
            window.alert("password dosent matched")
        }
        // const auth = dbdata.find(i => (SignupData.email === i.email))
        // if (auth) {
        //     window.alert("email already exist")
        // }
        // else {

        // if (password === Reenterpassword) {
        //     console.log("Signup form submitted!");
        
        //     fetch("https://8080-edbafcdbcfbfbdcabfdecaedefadebea.project.examly.io/user/register", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(SignupData)
        //     })
        //     .then(response => {
        //         if (response.ok) {
        //             window.alert("Registered successfully");
        //         } else {
        //             throw new Error("Network response was not ok.");
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // } else {
        //     window.alert("Password doesn't match");
        // }
        
        // }
        // Reset the form fields
        setSignupData({ role: "", firstname: "", lastname: "", email: "", password: "", Reenterpassword: "" })

    };


    return (
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
                        <Link to={'/'}><button id="button2">Back to Login</button></Link>

                    </form>
                </section>
            </div>
        </div>
    );
};

export default RegisterPage;