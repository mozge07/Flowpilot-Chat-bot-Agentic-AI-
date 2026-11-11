import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ChatInput from "./ChatInput";

function MainContent() {
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages((prevMessages) => [
            ...prevMessages,
            {role: "user", content: message}
    ]);
    setHasStarted(true)
  }

  return (
    <main className="main-workspace">
      <AnimatePresence mode="wait">
        {hasStarted ? (
          <motion.section
            key="chat"
            className="chat-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div 
                        key={index} 
                        className={`message ${msg.role}`}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
                
                <ChatInput onSend={handleSend} />

          </motion.section>
        ) : (
          <motion.section
            key="welcome"
            className="welcome-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <div className="hero-glow"></div>

            <div className="welcome-content">
              <motion.div
                className="ai-orb"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.06, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />

              <h1>
                Hey, <span>Monish!</span>
              </h1>

              <p>How can I assist you today?</p>

              <ChatInput
                onSend={handleSend}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default MainContent;
