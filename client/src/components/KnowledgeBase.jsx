import { useState, useEffect } from "react";
import "./KnowledgeBase.css";

function KnowledgeBase() {
    const [faqs, setFaqs] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState("faqs");
    const [showFaqForm, setShowFaqForm] = useState(false);
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
            const response = await fetch("http://localhost:5000/api/faqs",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(faqForm)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to Create FAQ");
            }

            setFaqs(prevFaqs => [data.faq, ...prevFaqs]);

            setFaqForm({
                question:"",
                answer:"",
                category:""
            });

            setShowFaqForm(false);

            alert("FAQ created Successfully!");

        } catch(error) {
            console.error("Create FAQ Error:", error);
            alert(error.message);
        }
    };

    return (
        <section className="knowledge-base-page">
            <h1>Knowledge Base</h1>
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
                        <h2>Add new FAQ</h2>
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
                            Save FAQ
                        </button>

                        <button
                            className="cancel-faq-btn" 
                            onClick={() => setShowFaqForm(false)}
                        >
                            Cancel
                        </button>  
                    </div>

                </div>
            )}

            {activeTab === "faqs" ? (
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
                                <span>{faq.category}</span>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div>
                    <h2>Documents</h2>
                    <p>No documents uploaded yet.</p>
                </div>
            )}           

        </section>
    );

}

export default KnowledgeBase;