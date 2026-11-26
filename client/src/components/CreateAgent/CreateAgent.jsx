import "./CreateAgent.css";
import React, { useState } from "react";

const sampleFaqs = [
  {
    id: "faq-1",
    question: "What are your business hours?",
    category: "General"
  },
  {
    id: "faq-2",
    question: "How can I reset my password?",
    category: "Account"
  },
  {
    id: "faq-3",
    question: "What payment methods do you accept?",
    category: "Billing"
  }
];

const sampleDocuments = [
  {
    id: "doc-1",
    name: "Company Policy.pdf",
    type: "PDF"
  },
  {
    id: "doc-2",
    name: "Product Documentation.pdf",
    type: "PDF"
  }
];

function CreateAgent() {

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        agentName: "",
        description: "",
        agentType: "",
        agentRole: "",
        instructions: "",
        selectedFaqs: [],
        selectedDocuments: [],
        avatar: "",
        primaryColor: "#7546DB",
        welcomeMessage: "Hi! How can I help you today?",
        widgetPosition: "bottom-right"
    });

    const handleCreateAgent = async () => {
        try {
            setIsSubmitting(true);

            const response = await fetch("http://localhost:5000/api/agents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.agentName,
                    description: formData.description,
                    type: formData.agentType,
                    agentRole: formData.agentRole,
                    instructions: formData.instructions,
                    selectedFaqs: formData.selectedFaqs,
                    selectedDocuments: formData.selectedDocuments,
                    avatar: formData.avatar,
                    primaryColor: formData.primaryColor,
                    welcomeMessage: formData.welcomeMessage,
                    widgetPosition: formData.widgetPosition
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to Create Agent");
            }

            alert("Agent Created Successfully!");

        } catch(error) {
            console.error("Create Agent Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

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

        {currentStep === 1 && (
            <>
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

            </div>
            </>
        )}

        {currentStep === 2 && (
            <>
            <h2>Agent Instructions</h2>
            <p>Define your agent's role and how it should behave.</p>

            <div className="agent-form">
                <div className="form-group">
                    <label >Agent Role</label>
                    <input
                        type="text"
                        placeholder="e.g. Provide customer support Representative"
                        value={formData.agentRole}
                        onChange={(e) => setFormData({...formData, agentRole: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Instructions</label>
                    <textarea
                        placeholder="Describe how your agent should behave..."
                        rows="5"
                        value={formData.instructions}
                        onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                    />
                </div>  
            </div>
            </>
            )}

        {currentStep === 3 && (
            <>
                <h2>Knowledge Base</h2>
                <p>Select the FAQs your AI agent should use.</p>

                <div className="knowledge-list">
                    {sampleFaqs.map(faq => (
                        <label key={faq.id} className="knowledge-item">
                            <input 
                                type="checkbox"
                                checked={formData.selectedFaqs.includes(faq.id)}
                                onChange={(e) => {
                                    if(e.target.checked) {
                                        setFormData(prev => ({
                                            ...prev,
                                            selectedFaqs: [...prev.selectedFaqs, faq.id]
                                        }));
                                    } else {
                                        setFormData(prev => ({
                                            ...prev,
                                            selectedFaqs: prev.selectedFaqs.filter(id => id !== faq.id)
                                        }));
                                    }
                                }}
                            />
                            <div>
                                <h3>{faq.question}</h3>
                                <span>{faq.category}</span>
                            </div>
                        </label>
                    ))}
                </div>

                <h3>Documents</h3>
                <p>Select documents your AI agent can reference.</p>

                <div className="knowledge-list">
                    {sampleDocuments.map((doc) => (
                        <label key={doc.id} className="knowledge-item">
                            <input
                                type="checkbox"
                                checked={formData.selectedDocuments.includes(doc.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                    setFormData(prev => ({
                                        ...prev,
                                        selectedDocuments: [...prev.selectedDocuments, doc.id]
                                    }));
                                    } else {
                                    setFormData(prev => ({
                                        ...prev,
                                        selectedDocuments: prev.selectedDocuments.filter(id => id !== doc.id)
                                    }));
                                    }
                                }}
                                />
                            <div>   
                                <h3>{doc.name}</h3>
                                <span>{doc.type}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </>
        )}

        {currentStep === 4 && (
            <>
                <h2>Appearance</h2>
                <p>Customize how your AI agent appears to customers.</p>

                <div className="agent-form">
                <div className="form-group">
                    <label>Agent Avatar</label>

                    <div className="avatar-options">
                    {["🤖", "💬", "🎧", "✨"].map((avatar) => (
                        <button
                        type="button"
                        key={avatar}
                        className={`avatar-option ${
                            formData.avatar === avatar ? "selected" : ""
                        }`}
                        onClick={() =>
                            setFormData(prev => ({ ...prev, avatar }))
                        }
                        >
                        {avatar}
                        </button>
                    ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Primary Color</label>

                    <div className="color-options">
                        {["#7546DB", "#2563EB", "#16A34A", "#EA580C", "#DB2777"].map((color) => (
                        <button
                            type="button"
                            key={color}
                            className={`color-option ${
                            formData.primaryColor === color ? "selected" : ""
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() =>
                            setFormData(prev => ({ ...prev, primaryColor: color }))
                            }
                        />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Welcome Message</label>

                    <textarea
                        rows="3"
                        placeholder="Write a welcome message..."
                        value={formData.welcomeMessage}
                        onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            welcomeMessage: e.target.value
                        }))
                        }
                    />

                    <span className="field-hint">
                        This message will appear when a customer opens the chat.
                    </span>
                </div>

                <div className="form-group">
                    <label>Widget Position</label>

                    <div className="position-options">
                        {[
                        { value: "bottom-right", label: "Bottom Right" },
                        { value: "bottom-left", label: "Bottom Left" }
                        ].map((position) => (
                        <button
                            type="button"
                            key={position.value}
                            className={`position-option ${
                            formData.widgetPosition === position.value ? "selected" : ""
                            }`}
                            onClick={() =>
                            setFormData(prev => ({
                                ...prev,
                                widgetPosition: position.value
                            }))
                            }
                        >
                            {position.label}
                        </button>
                        ))}
                    </div>
                </div>

            </div>
            </>
        )}

        {currentStep === 5 && (
            <>
                <h2>Review Your AI Agent</h2>
                <p>Review your configuration before creating your agent.</p>

                <div className="review-section">
                    <h3>Basic Information</h3>

                    <div className="review-item">
                        <span>Agent Name</span>
                        <strong>{formData.agentName}</strong>
                    </div>

                    <div className="review-item">
                        <span>Description</span>
                        <strong>{formData.description}</strong>
                    </div>

                    <div className="review-item">
                        <span>Agent Type</span>
                        <strong>{formData.agentType}</strong>
                    </div>
                </div>

                <div className="review-section">
                    <h3>Agent Instructions</h3>

                    <div className="review-item">
                        <span>Agent Role</span>
                        <strong>{formData.agentRole}</strong>
                    </div>

                    <div className="review-item">
                        <span>Instructions</span>
                        <strong>{formData.instructions}</strong>
                    </div>
                </div>

                <div className="review-section">
                    <h3>Knowledge Base</h3>

                    <div className="review-item">
                        <span>Selected FAQs</span>
                        <strong>{formData.selectedFaqs.length}</strong>
                    </div>

                    <div className="review-item">
                        <span>Selected Documents</span>
                        <strong>{formData.selectedDocuments.length}</strong>
                    </div>
                </div>

                <div className="review-section">
                    <h3>Appearance</h3>

                    <div className="review-item">
                        <span>Selected Avatar</span>
                        <strong>{formData.avatar || "Not selected"}</strong>
                    </div>

                    <div className="review-item">
                        <span>Primary Color</span>

                        <div className="review-color">
                            <span
                            className="review-color-swatch"
                            style={{ backgroundColor: formData.primaryColor }}
                            />
                            <strong>{formData.primaryColor}</strong>
                        </div>
                    </div>

                    <div className="review-item">
                        <span>Welcome Message</span>
                        <strong>{formData.welcomeMessage}</strong>
                    </div>

                    <div className="review-item">
                        <span>Widget Position</span>
                        <strong>{formData.widgetPosition}</strong>
                    </div>
                </div>
            </>
        )}


        <div className="wizard-actions">
                <button
                className="wizard-back-btn"
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}>
                    ← Back
                </button>
        
                <button 
                className="wizard-next-btn"
                onClick={() => {
                    if (currentStep === 1) {
                        if (
                            !formData.agentName.trim() ||
                            !formData.description.trim() ||
                            !formData.agentType
                            ) {
                                alert("Please fill in all required fields before proceeding.");
                                return;
                            }   
                    }

                    if (currentStep === 2) {
                        if (
                            !formData.agentRole.trim() ||
                            !formData.instructions.trim()
                            ) {
                                alert("Please fill in the agent role and instructions.");
                                return;
                            }
                        }

                        if (currentStep === 3) {
                            if (
                                formData.selectedFaqs.length === 0 &&
                                formData.selectedDocuments.length === 0
                                ) {
                                    alert("Please select at least one FAQ or document.");
                                    return;
                                }
                            }

                        if (currentStep === 4) {
                            if (!formData.welcomeMessage.trim()) {
                                alert("Please enter a welcome message.");
                                return;
                            }
                        }


                        if (currentStep === 5) {
                            handleCreateAgent();    
                        } else {
                            setCurrentStep(prev => prev + 1);
                        }
                    }}

                disabled={isSubmitting}
                >
                    {currentStep === 5 
                    ? (isSubmitting ? "Creating..." : "Create Agent")
                    : "Continue ->"
                    }
                </button>
            </div>
      </div>

    </section>
  );
}

export default CreateAgent;