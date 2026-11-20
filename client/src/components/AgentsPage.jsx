import "./AgentsPage.css";
import CreateAgent from "./CreateAgent/CreateAgent.jsx";

import { useState, useEffect } from "react";

const sampleAgents = [
  {
    id: 1,
    name: "Customer Support Agent",
    description: "Handles customer queries and support requests.",
    status: "Active",
    type: "Customer Support"
  },
  {
    id: 2,
    name: "Sales Assistant",
    description: "Helps customers with products and sales inquiries.",
    status: "Draft",
    type: "Sales"
  },
  {
    id: 3,
    name: "FAQ Assistant",
    description: "Answers frequently asked customer questions.",
    status: "Paused",
    type: "FAQ"
  }
];

function AgentsPage(){

    const [isCreating, setIsCreating] = useState(false);
    const [agents, setAgents] = useState(sampleAgents);
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".agent-menu-container")) {
                setOpenMenuId(null);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    console.log(isCreating);

    if(isCreating){
        return <CreateAgent />;
    }

    return (
        <section className="agents-page">
            <header className="agents-header">
                <div>
                    <h1>AI Agents</h1>
                    <p>Manage your AI Support agents.</p>
                </div>

                <button onClick={() => setIsCreating(true)}>
                    + Create New Agent
                </button>
            </header>
            <div className="agents-toolbar">
                <input
                    type="text"
                    placeholder="Search AI agents..."
                    className="agents-search"
                />

                <select className="agents-filter">
                    <option value="all">All Agents</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                </select>
            </div>

            <div className="agents-list">
                {agents.map((agent) => (
                    <div key={agent.id} className="agent-card">
                    <div className="agent-card-header">
                        <div>
                        <h3>{agent.name}</h3>
                        <span>{agent.type}</span>
                        </div>

                       <div className="agent-card-actions">
                            <span className={`agent-status ${agent.status.toLowerCase()}`}>
                                {agent.status}
                            </span>

                            <div className="agent-menu-container">
                                <button
                                className="agent-menu-btn"
                                type="button"
                                onClick={() =>
                                    setOpenMenuId(openMenuId === agent.id ? null : agent.id)
                                }
                                >
                                ⋮
                                </button>

                                {openMenuId === agent.id && (
                                <div className="agent-dropdown">
                                    <ul className="agent-menu">
                                    <li><button type="button">Edit Agent</button></li>
                                    <li><button type="button">Duplicate Agent</button></li>
                                    <li>
                                        <button type="button">
                                        {agent.status === "Active" ? "Pause Agent" : "Activate Agent"}
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="delete-action">
                                        Delete Agent
                                        </button>
                                    </li>
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <p>{agent.description}</p>
                    </div>
                ))}
            </div>

                

        </section>
    );
}

export default AgentsPage;