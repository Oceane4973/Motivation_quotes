import './App.css';
import React from 'react';
import InputBar from './components/input/input/InputBar';
import Header from './components/header/Header';
import MessagesContainer from './components/message/MessagesContainer';
import { QuotesMessages, ExtendedQuotesMessages } from './interface/interface';
import apiService from './services/apiService';

function App() {
  const [isInputBarExpanded, setIsInputBarExpanded] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const messagesContainerRef = React.useRef(null);

  React.useEffect(() => {
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);

    const inputBarTimer = setTimeout(() => {
      setIsInputBarExpanded(true);
    }, 1000);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(inputBarTimer);
    };
  }, []);

  const addQuotesMessages = (messageQuote) => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
    setMessages((prevMessages) => [
      ...prevMessages,
      messageQuote,
    ]);
  }

  const getQuotesMessages = async (message, lang) => {

    const quotesAPI = await apiService.quotes(message)

    const translatedQuote = await apiService.translate(quotesAPI.quotes, lang)
    const quote = ExtendedQuotesMessages(
      {
        _message: translatedQuote.translated,
        _isFromUser: false,
        _author: quotesAPI.author,
        _score: quotesAPI.score
      }
    )
    addQuotesMessages(quote)
  }

  const handleSendMessage = (message, lang) => {
    if (message.trim()) {
      if (isHeaderVisible) {
        setIsHeaderVisible(false);
      }
      addQuotesMessages(QuotesMessages({ _message: message, _isFromUser: true }))
      getQuotesMessages(message, lang);
    }
  };

  return (
    <div>
      <Header isVisible={isHeaderVisible} />
      <div className="page-container">
        <div className="app-container">
          <MessagesContainer
            ref={messagesContainerRef}
            messages={messages}
            isVisible={messages.length > 0}
          />
          <InputBar isExpanded={isInputBarExpanded} onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
