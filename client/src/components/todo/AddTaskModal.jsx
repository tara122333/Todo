import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Select from 'react-select'

export default function AddTaskModal({ isOpen, setIsOpen }) {
    const [list, setList] = useState("");
    const [listData, setListData] = useState("");
    const [listToggel, setListToggel] = useState(false);
    const [task, setTask] = useState({
        name: "",
        date: "",
        time: "",
        list: "",
    })
    const { _id } = useParams();

    const handleTask = (e) => {
        setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const getAllUserList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/list/get/${_id}`);
            setListData(response.data.findUserList.list)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllUserList();
    })

    const addTask = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/todo/add/${_id}`, { task });
            console.log(response);
            if (response.status === 200) {
                setIsOpen(false);
                setTask({
                    name: "",
                    date: "",
                    time: "",
                    list: "",
                })
                setListData("");
                setListToggel(false);
                alert("task added success!!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addNewList = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/list/add/${_id}`, { list });
            console.log(response);
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
            list: "",
        })
        setListData("");
        setListToggel(false);
        setIsOpen(false)

    }

    return (
        <>
            {
                isOpen && <div className='modal'>
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
                                                    <option value={item}>{item}</option>
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
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
