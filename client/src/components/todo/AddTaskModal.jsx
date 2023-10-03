import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AddTaskModal({ isOpen, setIsOpen, type, setType, id = "", setId }) {
    const [list, setList] = useState("");
    const [listData, setListData] = useState("");
    const [listToggel, setListToggel] = useState(false);
    const [task, setTask] = useState({
        name: "",
        date: "",
        time: "",
        list: "default",
        status: false
    })

    const handleTask = (e) => {
        setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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

    const getTaskData = async () => {
        try {
            if (type === "edit") {
                const response = await axios.get(`/todo/get/task/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                });
                if (response.status === 200) {
                    setTask({
                        name: response.data.task.name,
                        date: response.data.task.date,
                        time: response.data.task.time,
                        list: response.data.task.list,
                        status: response.data.task.status
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTaskData();
    },[id])

    const addTask = async () => {
        try {
            if (type === "add") {
                setId("54");
                if (task.name.length <= 0) {
                    alert("Task name is required!!");
                }
                else {
                    const response = await axios.post(`/todo/add`, { task }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("user")}`
                        }
                    });
                    if (response.status === 200) {
                        setIsOpen(false);
                        setTask({
                            name: "",
                            date: "",
                            time: "",
                            list: "default",
                        })
                        setListData("");
                        setId(" ");
                        setListToggel(false);
                        alert("task added success!!");
                    }
                }
            }
            else if (type === "edit" && id.length > 2) {
                if (task.name.length <= 0) {
                    alert("Task name is required!!");
                }
                else {
                    const response = await axios.put(`/todo/update/task/${id}`, { task }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("user")}`
                        }
                    });
                    if (response.status === 200) {
                        setIsOpen(false);
                        setTask({
                            name: "",
                            date: "",
                            time: "",
                            list: "default",
                            status: false
                        })
                        setId("");
                        setType("");
                        setListData("");
                        setListToggel(false);
                        alert("task updated success!!");
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addNewList = async () => {
        try {
            const response = await axios.post(`/list/add`, { list }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            if (response.status === 200) {
                setListToggel(false);
                setList("");
                alert("List Added!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const closeModel = () => {
        setIsOpen(false);
        setTask({
            name: "",
            date: "",
            time: "",
            list: "default",
            status: false
        })
        setType("");
        setId("");
        setListData("");
        setListToggel(false);
        setIsOpen(false)

    }

    return (
        <>
            {
                isOpen && <>
                    <div className='modal'>
                        <div className='modal-container'>
                            <div className='modal-box'>
                                <div className='modal-box-head'>
                                    <h3>Add Task</h3>
                                    <button className='red-btn' onClick={() => closeModel()}>Close</button>
                                </div>

                                <div className="task-form">
                                    <div className="task-form-group">
                                        <label htmlFor="name">What is to be done?</label>
                                        <input className="input-box"
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={handleTask}
                                            value={task.name}
                                            placeholder="Enter Task Here.."
                                        />
                                    </div>
                                    <div className="task-form-group">
                                        <label htmlFor="date">Due date</label>
                                        <input className="input-box"
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={task.date}
                                            onChange={handleTask}
                                        />
                                    </div>
                                    <div className="task-form-group">
                                        <label htmlFor="time">Due Time</label>
                                        <input className="input-box"
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={task.time}
                                            onChange={handleTask}
                                        />
                                    </div>

                                    {
                                        type === "edit" && <div className="task-form-group">
                                            <label htmlFor="time">Task Status</label>
                                            <select
                                                value={task.status}
                                                onChange={handleTask}
                                                name="status"
                                            >
                                                <option value={true}>Completed</option>
                                                <option value={false}>Not Completed</option>
                                            </select>
                                        </div>
                                    }


                                    <div className="task-form-group">
                                        <label htmlFor="time">Add to list</label>
                                        <div className='add-list-box'>
                                            <select
                                                value={task.list}
                                                onChange={handleTask}
                                                name="list"
                                                required
                                            >
                                                {
                                                    listData && listData?.map((item) => (
                                                        <>
                                                            <option value={item}>{item}</option>
                                                        </>
                                                    ))
                                                }
                                            </select>
                                            {
                                                !listToggel ? (
                                                    <>
                                                        <button className='btn'
                                                            onClick={() => setListToggel(true)}
                                                        >
                                                            Add List
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className='red-btn'
                                                            onClick={() => setListToggel(false)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div className='add-list-section'>
                                        {
                                            listToggel && <div className="task-form-group">

                                                <label htmlFor="list">Add New List</label>
                                                <div className='add-list'>
                                                    <input className="input-box task-input-box"
                                                        type="text"
                                                        id="list"
                                                        name="list"
                                                        onChange={(e) => setList(e.target.value)}
                                                        value={list}
                                                        placeholder="Enter List Name"
                                                    />
                                                    <button className='btn'
                                                        onClick={addNewList}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <button
                                        onClick={addTask}
                                        className="task-button"
                                    >
                                        {
                                            type === 'add' ? "Add" : "Submit"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
