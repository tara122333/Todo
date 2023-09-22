import { useEffect, useState } from "react"
import Navbar from "../components/navbar/Navbar"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AllTask from "../components/todo/AllTask";

const Home = () => {
    const [userData, setUserData] = useState("");
    const { _id } = useParams();
    const navigate = useNavigate();
    const getUserToken = async () => {
        const user = localStorage.getItem("user");
        const user_id = localStorage.getItem("_id");
        if (!user || user.length < 30 || _id.length !== 24 || _id !== user_id) {
            navigate("/login")
        }
    }
    useEffect(() => {
        getUserToken()
    })
    const getUserData = async () => {
        try {
            if (_id) {
                const response = await axios.get(`http://localhost:4000/user/${_id}`);
                if (response.status === 200) {
                    setUserData(response.data);
                }
                else {
                    navigate("/login")
                }
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
