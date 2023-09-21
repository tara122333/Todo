
const Navbar = (props) => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-logo-section">
                    <div className="navbar-logo-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Microsoft_To-Do_icon.png/1200px-Microsoft_To-Do_icon.png" alt="logo" style={{ width: '100%', height: "100%" }} />
                    </div>
                    <h3>ToDo List</h3>
                </div>
                <div className="navbar-profile-section">
                    <h3>{props.user}</h3>
                    <div className="navbar-profile-img">
                        <img src="https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png" alt="user-profile" style={{ width: '100%', height: "100%" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
