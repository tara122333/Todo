import { useEffect, useState } from "react"
import Navbar from "../components/navbar/Navbar"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllTask from "../components/todo/AllTask";

const Home = () => {
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();
    const getUserToken = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login")
        }
    }
    useEffect(() => {
        getUserToken()
    })
    const getUserData = async () => {
        try {
            const response = await axios.get(`/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            if (response.status === 200) {
                setUserData(response.data);
            }
            else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserData();
    })

    return (
        <>
            {
                userData && <Navbar {...userData} />
            }
            <div>
                <AllTask />
            </div>
        </>
    )
}

export default Home
