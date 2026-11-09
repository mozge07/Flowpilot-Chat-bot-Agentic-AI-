import { motion } from "framer-motion"

function MainContent(){
    return(
        <main className="main-workspace">

            <section className="welcome-screen">
                <div className="hero-glow"></div>

                <div className="welcome-content">
                    <motion.div
                    className="ai-orb"
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.06, 1],
                        rotate: [0, 360]
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

                    <h1>Hey, <span>Monish!</span></h1>
                    <p>How Can I assist you today ?</p>

                </div>

            </section>

        </main>
    )
}

export default MainContent;