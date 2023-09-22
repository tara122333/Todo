import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"

const Signup = () => {
    const [userData, setUserData] = useState({
        fullname : "",
        email: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const signup = async () => {
        try {
            const response = await axios.post("http://localhost:4000/auth/signup", { credentials: userData });
            console.log(response);
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(userData);
    return (
        <div className="signup-page">
            <div className="signup">
                <h2 className="signup-heading">Sign Up</h2>
                <div className="signup-form">
                    <div className="signup-form-group">
                        <label htmlFor="fullname">Email</label>
                        <input className="input-box"
                            type="text"
                            id="fullname"
                            name="fullname"
                            onChange={handleChange}
                            value={userData.fullname}
                            placeholder="Tara Chand Kumawat"
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="email">Email</label>
                        <input className="input-box"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={userData.email}
                            placeholder="tara@gmail.com"
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">Password</label>
                        <input className="input-box"
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="*******"
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input className="input-box"
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            value={userData.cpassword}
                            onChange={handleChange}
                            placeholder="*******"
                        />
                    </div>
                    <button
                        onClick={signup}
                        className="signup-button">Sign up</button>
                </div>
                <div>
                    <Link to={"/login"}>
                        Have an account? Log in
                    </Link>
                </div>
                <div className="google-login">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="google login" className="google-logo" />
                    <button className="google-login-button">Sign up with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Signup
