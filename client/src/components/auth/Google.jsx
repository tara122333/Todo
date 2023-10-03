import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const Google = () => {
    const { token } = useParams();

    const navigate = useNavigate();

    const setUserInfo = async () => {
        localStorage.clear();
        localStorage.setItem("user", token);
        navigate(`/`)
    }

    useEffect(() => {
        setUserInfo();
    })
    return (
        <>
            <h2>
                Wait for some time.....
            </h2>
        </>
    )
}

export default Google
