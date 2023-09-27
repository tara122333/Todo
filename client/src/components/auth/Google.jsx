import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const Google = () => {
    const { _id, token } = useParams();

    const navigate = useNavigate();

    const setUserInfo = async () => {
        localStorage.setItem("user", token);
        localStorage.setItem("_id", _id);
        navigate(`/home/${_id}`)
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
