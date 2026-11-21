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
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const duplicateAgent = (agent) => {
        const newAgent = {
            ...agent,
            id: crypto.randomUUID(),
            name: `${agent.name} (Copy)`,
            status: "Draft"
        };

        setAgents((prevAgents) => [...prevAgents, newAgent]);
    };    

    const handleEditAgent = (agent) => {
        setSelectedAgent(agent);
        setIsEditing(true);
        setOpenMenuId(null);
    }

    const filteredAgents = agents.filter((agent) => {
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
            agent.name.toLowerCase().includes(query) ||
            agent.description.toLowerCase().includes(query) ||
            agent.type.toLowerCase().includes(query);

        const matchesStatus =
            statusFilter === "all" ||
            agent.status.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select 
                className="agents-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Agents</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                </select>
            </div>

           {isEditing && selectedAgent ? (
                <div className="edit-agent-container">
                    <h2>Edit Agent</h2>

                    <div className="edit-agent-form">
                    <div className="form-group">
                        <label>Agent Name</label>
                        <input
                        type="text"
                        value={selectedAgent.name}
                        onChange={(e) =>
                            setSelectedAgent({
                            ...selectedAgent,
                            name: e.target.value
                            })
                        }
                        />
                    </div>

                    <div className="form-group">
                        <label>Agent Description</label>
                        <textarea
                        value={selectedAgent.description}
                        onChange={(e) =>
                            setSelectedAgent({
                            ...selectedAgent,
                            description: e.target.value
                            })
                        }
                        />
                    </div>

                    <div className="form-group">
                        <label>Agent Type</label>

                        <select
                            value={selectedAgent.type}
                            onChange={(e) => 
                                setSelectedAgent({
                                    ...selectedAgent,
                                    type: e.target.value
                                })
                            }
                        >
                            <option value="Customer Support">Customer Support</option>
                            <option value="Sales">Sales</option>
                            <option value="FAQ">FAQ</option>
                        </select>
                    </div>

                    </div>
                </div>
                ) : (
                <div className="agents-list">
                    {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent) => (
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
                                    setOpenMenuId(
                                    openMenuId === agent.id ? null : agent.id
                                    )
                                }
                                >
                                ⋮
                                </button>

                                {openMenuId === agent.id && (
                                <div className="agent-dropdown">
                                    <ul className="agent-menu">
                                    <li>
                                        <button
                                        type="button"
                                        onClick={() => handleEditAgent(agent)}
                                        >
                                        Edit Agent
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                        type="button"
                                        onClick={() => {
                                            duplicateAgent(agent);
                                            setOpenMenuId(null);
                                        }}
                                        >
                                        Duplicate Agent
                                        </button>
                                    </li>

                                    {agent.status !== "Draft" && (
                                        <li>
                                        <button
                                            type="button"
                                            onClick={() => {
                                            setAgents((prevAgents) =>
                                                prevAgents.map((item) =>
                                                item.id === agent.id
                                                    ? {
                                                        ...item,
                                                        status:
                                                        item.status === "Active"
                                                            ? "Paused"
                                                            : "Active"
                                                    }
                                                    : item
                                                )
                                            );

                                            setOpenMenuId(null);
                                            }}
                                        >
                                            {agent.status === "Active"
                                            ? "Pause Agent"
                                            : "Activate Agent"}
                                        </button>
                                        </li>
                                    )}

                                    <li>
                                        <button
                                        type="button"
                                        className="delete-action"
                                        onClick={() => {
                                            const confirmed = window.confirm(
                                            "Are you sure you want to delete this agent?"
                                            );

                                            if (confirmed) {
                                            setAgents((prevAgents) =>
                                                prevAgents.filter(
                                                (item) => item.id !== agent.id
                                                )
                                            );
                                            }

                                            setOpenMenuId(null);
                                        }}
                                        >
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
                    ))
                    ) : (
                    <p className="no-agents-message">No agents found.</p>
                    )}
                </div>
                )}
                

        </section>
    );
}

export default AgentsPage;