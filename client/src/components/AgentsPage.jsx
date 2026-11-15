import CreateAgent from "./CreateAgent/CreateAgent.jsx";

import { useState } from "react";

function AgentsPage(){

    const [isCreating, setIsCreating] = useState(false);

    return (
        <section className="agents-page">
            <header className="agents-header">
                <div>
                    <h1>AI Agents</h1>
                    <p>Manage your AI Support agents.</p>
                </div>

                <button>+ Create New Agent</button>
            </header>
            <div className="agents-list">

            </div>
        </section>
    );
}

export default AgentsPage;