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
                <button className="nav-item active">Home</button>
                <button className="nav-item">Conversation</button>
                <button className="nav-item">Knowledge Base</button>
                <button className="nav-item">Setting</button>
            </nav>

            <div className="recent-section">
                <h2>Recent Chat</h2>
                <ul className="recent-list">
                    {chats.map((chat) => {
                        return <li key={chat}>
                            <button className="recent-chat">
                                <span className="chat-icon">◻</span>
                                <span>{chat}</span>
                            </button>
                        </li>;
                    })}
                </ul>
            </div>

            <div className="profile-section">
                <div className="profile-avatar">M</div>
                <div className="profile-info">
                    <strong>Monish</strong>
                    <span>Personal Account</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;