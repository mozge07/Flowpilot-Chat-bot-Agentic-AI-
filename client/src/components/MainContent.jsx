import "./MainContent.css";

function MainContent() {
  return (
    <main className="main-workspace">
      <section className="dashboard">

        <header className="dashboard-header">
          <div>
            <h1>Welcome back, Monish!</h1>
            <p>Here's what's happening with your AI support.</p>
          </div>

          <button className="create-agent-btn">
            + Create AI Agent
          </button>
        </header>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <span>AI Agents</span>
            <h2>01</h2>
            <p>Manage your AI agents</p>
          </div>

          <div className="dashboard-card">
            <span>Conversations</span>
            <h2>24</h2>
            <p>Customer interactions</p>
          </div>

          <div className="dashboard-card">
            <span>Knowledge Base</span>
            <h2>12</h2>
            <p>FAQs and documents</p>
          </div>

          <div className="dashboard-card">
            <span>Agent Status</span>
            <h2>Active</h2>
            <p>Your agent is running</p>
          </div>
        </div>

        <section className="agent-overview">
          <h2>Your AI Agent</h2>
          <p>Manage your customer support assistant.</p>

          <div className="agent-card">
            <div>
              <h3>Customer Support Agent</h3>
              <span>Active</span>
            </div>

            <button>Manage Agent</button>
          </div>
        </section>

      </section>
    </main>
  );
}

export default MainContent;
