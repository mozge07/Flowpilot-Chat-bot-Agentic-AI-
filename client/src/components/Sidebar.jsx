function Sidebar(){

    const chats = [
        "Refund policy question",
        "Password reset help",
        "subscription information"
    ];

    return(
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>FlowPilot</h2>
            </div>
            <button className="new-chat">New Chat</button>

            <nav className="sidebar-nav">
                <button className="nav-item">Home</button>
                <button className="nav-item">Conversation</button>
                <button className="nav-item">Knowledge Base</button>
                <button className="nav-item">Setting</button>
            </nav>

            <div className="recent-section">
                <h2>Recent Chat</h2>
                <ul className="recent-list">
                    {chats.map((chat) => {
                        return <li key={chat}>{chat}</li>;
                    })}
                </ul>
            </div>

            <div className="profile-section">
                Monish <span>Account</span>
            </div>
        </aside>
    )
}

export default Sidebar;