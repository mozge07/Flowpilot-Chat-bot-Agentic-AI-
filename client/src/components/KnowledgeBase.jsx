import { useState, useEffect } from "react";
import "./KnowledgeBase.css";

function KnowledgeBase() {
    const [faqs, setFaqs] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState("faqs");
    const [showFaqForm, setShowFaqForm] = useState(false);
    const [editingFaqId, setEditingFaqId] = useState(null);
    const [faqMessage, setFaqMessage] = useState({
        type: "",
        text: ""    
    });
    const [faqForm, setFaqForm] = useState({
        question: "",
        answer: "",
        category: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/faqs");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to Fetch FAQs");
                }
                
                setFaqs(data.faqs);

            } catch(error) {
                console.error("Fetch FAQs Error:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchFaqs();
    }, []);

    const handleAddFaq = async () => {

        if (
            !faqForm.question.trim() ||
            !faqForm.answer.trim() ||
            !faqForm.category.trim()
        ) {
            alert("Please fill in all FAQ fields.")
            return;
        }

        try {
            const response = await fetch(
                editingFaqId 
                    ? `http://localhost:5000/api/faqs/${editingFaqId}`
                    :"http://localhost:5000/api/faqs",
                {
                    method: editingFaqId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(faqForm)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to Create FAQ");
            }

            if (editingFaqId) {
                setFaqs(prevFaqs =>
                    prevFaqs.map(faq =>
                        faq._id === editingFaqId ? data.faq : faq
                    )
                );
            } else {
                setFaqs(prevFaqs => [data.faq, ...prevFaqs]);
            }

            setFaqForm({
                question:"",
                answer:"",
                category:""
            });
            
            setEditingFaqId(null);
            setShowFaqForm(false);

            setFaqMessage({
                type: "success",
                text: "FAQ created successfully!"
            });

        } catch(error) {
            console.error("Create FAQ Error:", error);
            setFaqMessage({
                type: "error",
                text: error.message
            });
        }
    };

    const handleDeleteFaq = async (faqId) => {

        const isConfirmed = window.confirm(
            "Are you sure you want to delete this FAQ? This action cannot be undone."
        );

        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:5000/api/faqs/${faqId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to Delete FAQ");
            }

            setFaqs(prevFaqs => 
                prevFaqs.filter(faq => faq._id !== faqId)
            );

            alert("FAQ deleted successfully!")

        } catch(error) {
            console.error("Delete FAQ Error:", error);
            alert(error.message);
        }
    };

    const handleEditClick = (faq) => {
        setEditingFaqId(faq._id);

        setFaqForm({
            question: faq.question,
            answer: faq.answer,
            category: faq.category
        });

        setShowFaqForm(true);
    }

    const handleCancelFaq = () => {
        setFaqForm({
            question: "",
            answer: "",
            category: ""
        });

        setEditingFaqId(null);
        setShowFaqForm(false);
    };

    return (
        <section className="knowledge-base-page">
            <h1>Knowledge Base</h1>
            
            {faqMessage.text && (
                <div className={`faq-message ${faqMessage.type}`}>
                    {faqMessage.text}
                </div>
            )}

            <p>Manage your FAQs and Documents.</p>

            <div className="knowledge-base-tabs">
                <button 
                    className={activeTab === "faqs" ? "active" : ""}
                    onClick={() => setActiveTab("faqs")}
                >
                    FAQs
                </button>

                <button 
                    className={activeTab === "documents" ? "active" : ""}
                    onClick={() => setActiveTab("documents")}
                >
                    Documents
                </button>

            </div>

            {activeTab === "faqs" && (
                <button onClick={() => setShowFaqForm(true)}>
                    + Add FAQ
                </button>
            )}

            {showFaqForm && activeTab === "faqs" && (
                <div className="faq-form">
                    <div className="faq-form-header">
                        <h2>{editingFaqId ? "Edit FAQ" : "  Add new FAQ"}</h2>
                        <p>Add a question and answer to your company's knowledge base.</p>
                    </div>

                    <input 
                        type="text" 
                        placeholder="Enter Question"
                        value={faqForm.question}
                        onChange={(e) => 
                            setFaqForm({
                                ...faqForm,
                                question: e.target.value
                            })
                        }
                    />

                    <textarea 
                        placeholder="Enter Answer"
                        value={faqForm.answer}
                        onChange={(e) => 
                            setFaqForm({
                                ...faqForm,
                                answer: e.target.value
                            })
                        }
                    />

                    <input 
                        type="text" 
                        placeholder="Enter Category" 
                        value={faqForm.category}
                        onChange={(e) => 
                            setFaqForm({
                                ...faqForm,
                                category: e.target.value
                            })
                        }
                    />

                    <div className="faq-form-actions">
                        <button 
                            className="save-faq-btn"
                            onClick={handleAddFaq}
                        >
                            {editingFaqId ? "Update FAQ" : "Save FAQ"}
                        </button>

                        <button
                            className="cancel-faq-btn" 
                            onClick={handleCancelFaq}
                        >
                            Cancel
                        </button>  
                    </div>

                </div>
            )}

            {activeTab === "faqs" && !showFaqForm && (
                loading ? (
                    <p>Loading FAQs...</p>
                ) : faqs.length === 0 ? (
                    <p>No FAQs Found</p>
                ) : (
                    <div className="faq-list">
                        {faqs.map((faq) => (
                            <div className="faq-card" key={faq._id}>
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>

                                <div className="faq-card-footer">
                                    <span className="faq-category">{faq.category}</span>

                                    <div className="faq-actions">
                                        <button 
                                            className="edit-faq-btn"
                                            onClick={() => handleEditClick(faq)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-faq-btn"
                                            onClick={() => handleDeleteFaq(faq._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                )
            )}

            {activeTab === "documents" && (
                <div>
                    <h2>Documents</h2>
                    <p>No documents uploaded yet.</p>
                </div>
            )}          

        </section>
    );

}

export default KnowledgeBase;