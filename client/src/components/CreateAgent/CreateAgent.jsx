import "./CreateAgent.css";
import React, { useState } from "react";

function CreateAgent() {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        agentName: "",
        description: "",
        agentType: "",
        role: "",
        instructions: "",
    });

  return (
    <section className="create-agent-page">

      <header className="create-agent-header">
        <h1>Create AI Agent</h1>
        <p>Set up your AI assistant in a few simple steps.</p>
      </header>
      
      <div className="wizard-content">

        <div className="wizard-progress">
            <div className="progress-steps">
               {[1,2,3,4,5].map((step) => (
                <React.Fragment key={step}>
                    <span
                    className={`step ${currentStep >= step ? "active" : ""}`}>
                        {step}
                    </span>

                    {step < 5 && <span className="step-line"></span>}

                </React.Fragment>
               ))

               }
            </div>
            
            <div className="progress-labels">
                {["Basic Info", "Instructions", "Knowledge", "Appearance", "Review"].map((label, index) => (
                    <span
                     key={label}
                     className={currentStep === index + 1 ? "active-label" : ""}>
                        {label}
                    </span>
                ))}
            </div>
        </div>

        <h2>Basic Information</h2>
        <p>Let's give your AI agent an identity.</p>

        <div className="agent-form">
            
            <div className="form-group">
                <label>Agent Name</label>
                <input
                type="text"
                placeholder="e.g. Customer Support Agent"
                value={formData.agentName}
                onChange={(e) => setFormData({...formData, agentName: e.target.value})}
                />
            </div>
            
            <div className="form-group">
                <label>Description</label>
                <textarea
                placeholder="What will your AI agent help customers with?"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <div className="form-group">
            <label>Agent Type</label>
            <select
                value={formData.agentType}
                onChange={(e) => setFormData({...formData, agentType: e.target.value})}
            >
                <option value="">Select agent type</option>
                <option value="support">Customer Support</option>
                <option value="sales">Sales Assistant</option>
                <option value="faq">FAQ Assistant</option>
            </select>
            </div>

            <div className="wizard-actions">
                <button
                className="wizard-back-btn"
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}>
                    ← Back
                </button>
        
                <button 
                className="wizard-next-btn"
                onClick={() => setCurrentStep(prev => Math.min(prev + 1, 5))}>
                    Continue →
                </button>
            </div>

        </div>
      </div>

    </section>
  );
}

export default CreateAgent;