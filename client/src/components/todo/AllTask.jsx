import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";

const AllTask = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    const addTask = () => {
        setOpenAddTaskModal(true);
    }
    return (
        <>
            <AddTaskModal isOpen={openAddTaskModal} setIsOpen={setOpenAddTaskModal} />
            <div className="container">
                <div className="container-head">
                    <div className="container-time">
                        <h5>Date : {currentDateTime.toString().split(' ')[2]}-{currentDateTime.toString().split(' ')[1]}-{currentDateTime.toString().split(' ')[3]}
                        </h5>
                        <h5>Time : {currentDateTime.toString().split(' ')[4]}</h5>
                    </div>
                    <button className="btn" onClick={addTask}>Add Task +</button>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default AllTask
