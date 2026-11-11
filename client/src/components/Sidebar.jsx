
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>FlowPilot</h2>
      </div>

      <button className="new-chat">
        + Create AI Agent
      </button>

      <nav className="sidebar-nav">
        <button className="nav-item active">Overview</button>
        <button className="nav-item">AI Agents</button>
        <button className="nav-item">Conversations</button>
        <button className="nav-item">Knowledge Base</button>
        <button className="nav-item">Integrations</button>
        <button className="nav-item">Settings</button>
      </nav>

      <div className="recent-section">
        <h2>Recent Activity</h2>

        <ul className="recent-list">
          <li>
            <span className="activity-dot"></span>
            <span>Dashboard created</span>
          </li>
          <li>
            <span className="activity-dot"></span>
            <span>Knowledge base updated</span>
          </li>
        </ul>
      </div>

      <div className="profile-section">
        <div className="profile-avatar">M</div>

        <div className="profile-info">
          <strong>Monish</strong>
          <span>Company Workspace</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
