import { useState } from "react";

function ChatInput({ onSend }) {

    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        console.log(message);
        onSend(message);
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
            <button type="submit">Send</button>
        </form>
    )
}

export default ChatInput