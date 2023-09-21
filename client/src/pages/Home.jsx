import { useEffect, useState } from "react"
import Navbar from "../components/navbar/Navbar"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const [userData, setUserData] = useState("");
    const { _id } = useParams();
    const navigate = useNavigate();
    const getUserToken = async () => {
        const user = localStorage.getItem("user");
        if (!user || user.length < 30) {
            navigate("/login")
        }
    }
    useEffect(() => {
        getUserToken()
    })
    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/user/${_id}`);
            console.log(response.data);
            if(response.status === 200){
                setUserData(response.data);
            }
            else{
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserData();
    }, [_id])
    return (
        <>
        {
            userData && <Navbar {...userData}/>
        }
        </>
    )
}

export default Home
