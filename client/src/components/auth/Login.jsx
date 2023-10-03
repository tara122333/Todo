import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const user = localStorage.getItem("user");
            if (user){
                const response = await axios.get(`/user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                });
                if (response.status === 200) {
                    navigate(`/`);
                }
                else {
                    localStorage.clear();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    })

    const googleLogin = async () => {
        window.location.href = `https://todo-7z9f.onrender.com/auth/google`;
    }
    const login = async (e) => {
        try {
            e.preventDefault();
            if (userData.email.length > 0 && userData.password.length > 0) {
                const response = await axios.post("/auth/signin", { credentials: userData });
                if (response.status === 200 && response.data.user.verified) {
                    localStorage.setItem("user", JSON.stringify({ token: response.data.token }));
                    localStorage.setItem("_id", response.data.user._id);
                    navigate(`/home/${response.data.user._id}`);
                }
                else {
                    alert("Invalid username or password");
                }
            }
            else {
                alert("email and password required");
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="login-page">
                <div className="login">
                    <h2 className="login-heading">Login</h2>
                    <div className="login-form">
                        <div className="login-form-group">
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
                        <div className="login-form-group">
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
                        <button onClick={login} className="login-button">Login</button>
                    </div>
                    <div>
                        <Link to={"/signup"}>
                            Don't have an account? Sign up
                        </Link>
                    </div>
                    <div className="google-login" onClick={googleLogin}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="google login" className="google-logo" />
                        <button className="google-login-button">Login with Google</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
