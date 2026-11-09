import { useState } from "react";

function ChatInput() {

    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        console.log(message);
        setMessage("");
    }

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Ask FlowPilot anytrhing..."
            value={message}
            onChange={(e) => {setMessage(e.target.value)}}
            />
            <button type="submit"></button>
        </form>
    )
}

export default ChatInput