import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [checkboxes, setCheckboxes] = useState({});
    const [completedTask, setCompletedTask] = useState([]);
    const [todayTask, setTodayTask] = useState([]);
    const [completedTodayTask, setCompletedTodayTask] = useState([]);
    const [pendingTask, setPendingTask] = useState([]);
    const [upcomingTask, setUpcomingTask] = useState([]);
    const [listData, setListData] = useState("");
    const [list, setList] = useState("");
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (!token) {
            navigate('/login');
        }
    })
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    const getAllTask = async () => {
        try {
            const response = await axios(`/todo/get/?list=${list}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            if (response.status === 200) {
                const task = response?.data?.taskArr;
                const currentYear = currentDateTime?.toString().split(' ')[3];
                let currentMonth = currentDateTime?.toString().split(' ')[1];
                const currentDay = currentDateTime?.toString().split(' ')[2];
                const upcomingTaskArr = [];
                const todayTaskArr = [];
                const completedTodayTaskArr = [];
                const pendingTaskArr = [];
                const completedTaskArr = [];

                if (currentMonth === "Jan") {
                    currentMonth = "01";
                } else if (currentMonth === "Feb") {
                    currentMonth = "02";
                } else if (currentMonth === "Mar") {
                    currentMonth = "03";
                } else if (currentMonth === "Apr") {
                    currentMonth = "04";
                } else if (currentMonth === "May") {
                    currentMonth = "05";
                } else if (currentMonth === "Jun") {
                    currentMonth = "06";
                } else if (currentMonth === "Jul") {
                    currentMonth = "07";
                } else if (currentMonth === "Aug") {
                    currentMonth = "08";
                } else if (currentMonth === "Sep") {
                    currentMonth = "09";
                } else if (currentMonth === "Oct") {
                    currentMonth = "10";
                } else if (currentMonth === "Nov") {
                    currentMonth = "11";
                }
                else if (currentMonth === "Dev") {
                    currentMonth = "12";
                }
                for (let i = 0; i < task?.length; i++) {
                    const day = task[i]?.date?.toString().split('-')[2];
                    const year = task[i]?.date?.toString().split('-')[0];
                    const month = task[i]?.date?.toString().split('-')[1];
                    if (year === currentYear && month === currentMonth && day === currentDay) {
                        if (task[i].status) {
                            completedTodayTaskArr.push(task[i]);
                        }
                        else {
                            todayTaskArr.push(task[i]);
                        }
                    }
                    else if (year >= currentYear) {
                        if (month >= currentMonth) {
                            if (day > currentDay) {
                                if (task[i].status) {
                                    completedTaskArr.push(task[i]);
                                }
                                else {
                                    upcomingTaskArr.push(task[i]);
                                }
                            }
                            else if (day === currentDay) {

                            }
                            else if (day < currentDay && month === currentMonth) {
                                if (task[i].status) {
                                    completedTaskArr.push(task[i]);
                                }
                                else {
                                    pendingTaskArr.push(task[i]);
                                }
                            }
                            else {
                                if (task[i].status) {
                                    completedTaskArr.push(task[i]);
                                }
                                else {
                                    upcomingTaskArr.push(task[i]);
                                }
                            }
                        } else {
                            if (task[i].status) {
                                completedTaskArr.push(task[i]);
                            }
                            else {
                                pendingTaskArr.push(task[i]);
                            }
                        }
                    }
                    else {
                        if (task[i].status) {
                            completedTaskArr.push(task[i]);
                        }
                        else {
                            pendingTaskArr.push(task[i]);
                        }
                    }
                }
                setTodayTask(todayTaskArr);
                setCompletedTodayTask(completedTodayTaskArr);
                setUpcomingTask(upcomingTaskArr);
                setPendingTask(pendingTaskArr);
                setCompletedTask(completedTaskArr);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTask();
    }, [list, id])

    const deleteTask = async (props) => {
        try {
            const response = await axios.delete(`/todo/delete/${props}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            if (response.status === 200) {
                getAllTask();
                alert("task deleted success!!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const completedTaks = async (props) => {
        try {
            const response = await axios.get(`/todo/completed/task/${props}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            if (response.status === 200) {
                alert("Task done!");
                getAllTask();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAllUserList = async () => {
        try {
            const response = await axios.get(`/list/get`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            setListData(response.data.findUserList.list)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllUserList();
    })

    const addTask = () => {
        setType("add")
        setOpenAddTaskModal(true);
    }

    const editTask = (props) => {
        setType("edit")
        setId(props);
        setOpenAddTaskModal(true);
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked,
        });
    };

    return (
        <>
            <AddTaskModal isOpen={openAddTaskModal} setIsOpen={setOpenAddTaskModal} type={type} setType={setType} id={id} setId={setId} />
            <div className="container">
                <div className="container-head">
                    <div className="filter-box">
                        <label htmlFor="time">Task Filter (Lists)</label>
                        <select
                            value={list}
                            onChange={(e) => { setList(e.target.value); }}
                            name="list"
                        >
                            <option value={""}>All</option>
                            {
                                listData && listData?.map((item) => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="container-info">
                        <div className="container-time">
                            <h5>Date : {currentDateTime.toString().split(' ')[2]}-{currentDateTime.toString().split(' ')[1]}-{currentDateTime.toString().split(' ')[3]}
                            </h5>
                            <h5>Time : {currentDateTime.toString().split(' ')[4]}</h5>
                        </div>
                        <button className="btn" onClick={addTask}>Add Task +</button>
                    </div>
                </div>
                <div className="todo-section">
                    <div className="todo-box">
                        <h3 className="todo-box-heading">Upcoming Task</h3>
                        {
                            upcomingTask.length > 0 && upcomingTask.map((item, index) => (
                                <>
                                    <div className="task-box" id="upcoming-task" key={index}>
                                        <div className="task-box-start">
                                            <input
                                                type="checkbox"
                                                name={item._id}
                                                checked={checkboxes[item._id] || false}
                                                onChange={handleCheckboxChange}
                                                onClick={() => { completedTaks(item._id) }}
                                            />
                                            <h4>🕑</h4>
                                            <h4 className="task-box-name task-box-text"> {item.name} </h4>
                                        </div>
                                        <div className="task-box-end">
                                            <div className="task-box-info">
                                                <h4 className="task-box-list task-box-text"> {item.list} </h4>
                                                <h4 className="task-box-date task-box-text"> {item.date} </h4>
                                                <h4 className="task-box-time task-box-text"> {item.time} </h4>
                                            </div>
                                            <div className="task-box-btn">
                                                <button className="btn edit-btn" onClick={() => { editTask(item._id) }}>Edit</button>
                                                <button className="delete-btn" onClick={() => deleteTask(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <div className="todo-box">
                        <h3 className="todo-box-heading">Today Task</h3>
                        {
                            todayTask.length > 0 && todayTask.map((item, index) => (
                                <>
                                    <div className="task-box" id="today-task" key={index}>
                                        <div className="task-box-start">
                                            <input
                                                type="checkbox"
                                                name={item._id}
                                                checked={checkboxes[item._id] || false}
                                                onChange={handleCheckboxChange}
                                                onClick={() => { completedTaks(item._id) }}
                                            />
                                            <h4>🚀</h4>
                                            <h4 className="task-box-name task-box-text"> {item.name} </h4>
                                        </div>
                                        <div className="task-box-end">
                                            <div className="task-box-info">
                                                <h4 className="task-box-list task-box-text"> {item.list} </h4>
                                                <h4 className="task-box-date task-box-text"> {item.date} </h4>
                                                <h4 className="task-box-time task-box-text"> {item.time} </h4>
                                            </div>
                                            <div className="task-box-btn">
                                                <button className="btn edit-btn" onClick={() => { editTask(item._id) }}>Edit</button>
                                                <button className="delete-btn" onClick={() => deleteTask(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                        {
                            completedTodayTask.length > 0 && completedTodayTask.map((item, index) => (
                                <>
                                    <div className="task-box" id="today-completed-task" key={index}>
                                        <div className="task-box-start">
                                            <h4>✅</h4>
                                            <h4 className="task-box-name task-box-text"> {item.name} </h4>
                                        </div>
                                        <div className="task-box-end">
                                            <div className="task-box-info">
                                                <h4 className="task-box-list task-box-text"> {item.list} </h4>
                                                <h4 className="task-box-date task-box-text"> {item.date} </h4>
                                                <h4 className="task-box-time task-box-text"> {item.time} </h4>
                                            </div>
                                            <div className="task-box-btn">
                                                <button className="btn edit-btn" onClick={() => { editTask(item._id) }}>Edit</button>
                                                <button className="delete-btn" onClick={() => deleteTask(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <div className="todo-box">
                        <h3 className="todo-box-heading">Completed Task</h3>
                        {
                            completedTask.length > 0 && completedTask.map((item, index) => (
                                <>
                                    <div className="task-box" id="completed-task" key={index}>
                                        <div className="task-box-start">
                                            <h4>✅</h4>
                                            <h4 className="task-box-name task-box-text"> {item.name} </h4>
                                        </div>
                                        <div className="task-box-end">
                                            <div className="task-box-info">
                                                <h4 className="task-box-list task-box-text"> {item.list} </h4>
                                                <h4 className="task-box-date task-box-text"> {item.date} </h4>
                                                <h4 className="task-box-time task-box-text"> {item.time} </h4>
                                            </div>
                                            <div className="task-box-btn">
                                                <button className="btn edit-btn" onClick={() => { editTask(item._id) }}>Edit</button>
                                                <button className="delete-btn" onClick={() => deleteTask(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <div className="todo-box">
                        <h3 className="todo-box-heading">Pending Task</h3>
                        {
                            pendingTask.length > 0 && pendingTask.map((item, index) => (
                                <>
                                    <div className="task-box" id="pending-task-box" key={index}>
                                        <div className="task-box-start">
                                            <input
                                                type="checkbox"
                                                name={item._id}
                                                checked={checkboxes[item._id] || false}
                                                onChange={handleCheckboxChange}
                                                onClick={() => { completedTaks(item._id) }}
                                            />
                                            <h4>❌</h4>
                                            <h4 className="task-box-name task-box-text"> {item.name} </h4>
                                        </div>
                                        <div className="task-box-end">
                                            <div className="task-box-info">
                                                <h4 className="task-box-list task-box-text"> {item.list} </h4>
                                                <h4 className="task-box-date task-box-text"> {item.date} </h4>
                                                <h4 className="task-box-time task-box-text"> {item.time} </h4>
                                            </div>
                                            <div className="task-box-btn">
                                                <button className="btn edit-btn" onClick={() => { editTask(item._id) }}>Edit</button>
                                                <button className="delete-btn" onClick={() => deleteTask(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllTask
