import React from 'react';
import "./MessagesContainer.css";

const MessagesContainer = React.forwardRef(({ messages, isVisible }, ref) => {
    React.useEffect(() => {
        const handleScroll = () => {
            try {
                if (ref && ref.current) {
                    const container = ref.current;
                    const messages = container.querySelectorAll(".message");
                    const containerHeight = container.getBoundingClientRect().height;

                    messages.forEach((message) => {
                        const { top, bottom } = message.getBoundingClientRect();
                        const containerTop = container.getBoundingClientRect().top;

                        const relativePosition = (top - containerTop) / containerHeight;

                        if (bottom > containerTop) {
                            const opacity = Math.max(0.0, Math.min(1, relativePosition));
                            message.style.opacity = opacity.toString();
                        } else {
                            message.style.opacity = "0";
                        }
                    });
                }
            } catch (error) {
                console.error("Error in handleScroll:", error.message);
            }
        };

        if (ref && ref.current) {
            try {
                const container = ref.current;
                container.addEventListener("scroll", handleScroll);
                handleScroll(); // Initial scroll handling
            } catch (error) {
                console.error("Error attaching scroll listener:", error.message);
            }
        }

        return () => {
            try {
                if (ref && ref.current) {
                    ref.current.removeEventListener("scroll", handleScroll);
                }
            } catch (error) {
                console.error("Error detaching scroll listener:", error.message);
            }
        };
    }, [ref]);

    if (!Array.isArray(messages)) {
        console.error("Invalid prop: 'messages' must be an array");
        return (
            <div className="messages-container error">
                <p>Une erreur est survenue lors de l'affichage des messages.</p>
            </div>
        );
    }

    return (
        <div
            className={`messages-container ${isVisible ? 'visible' : ''}`}
        >
            <div className='messages-box' ref={ref}>
                {messages.map((msg, index) => {
                    if (!msg || typeof msg.message !== 'string') {
                        console.error(`Invalid message format at index ${index}`);
                        return null; // Ignore invalid message
                    }

                    return (
                        <div
                            key={index}
                            className={`message ${msg.isFromUser ? 'from-user' : 'from-other'}`}
                        >
                            {msg.isFromUser ? (
                                msg.message
                            ) : (
                                <>
                                    <div className="quote">
                                        <blockquote>{msg.message}</blockquote>
                                        <cite>{msg.author || 'Unknown'}</cite>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default MessagesContainer;
