import React from 'react';
import "./MessagesContainer.css";

const MessagesContainer = React.forwardRef(({ messages, isVisible }, ref) => {
    React.useEffect(() => {
        const handleScroll = () => {
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
        };

        if (ref && ref.current) {
            const container = ref.current;
            container.addEventListener("scroll", handleScroll);

            handleScroll();
        }

        return () => {
            if (ref && ref.current) {
                ref.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [ref]);


    return (
        <div
            className={`messages-container ${isVisible ? 'visible' : ''}`}
        >
            <div className='messages-box' ref={ref}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.isFromUser ? 'from-user' : 'from-other'}`}
                    >
                        {msg.isFromUser ? (
                            msg.message
                        ) : (
                            <>
                                <div class="quote">
                                    <blockquote >{msg.message}</blockquote>
                                    <cite>{msg.author}</cite>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default MessagesContainer;
