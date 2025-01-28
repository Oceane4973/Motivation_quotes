import './App.css';
import React from 'react';
import InputBar from './components/input/InputBar';
import Header from './components/header/Header';
import MessagesContainer from './components/message/MessagesContainer';
import { QuotesMessages, ExtendedQuotesMessages } from './interface/interface';
import apiService from './services/apiService';

function App() {
  const [isInputBarExpanded, setIsInputBarExpanded] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [error, setError] = React.useState(null);
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
    try {
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 100);

      setMessages((prevMessages) => [...prevMessages, messageQuote]);
    } catch (error) {
      console.error('Error adding message:', error.message);
      setError('An error occurred while adding a message.');
    }
  };

  const getQuotesMessages = async (message, lang) => {
    try {
      // Récupération des citations depuis l'API
      const quotesAPI = await apiService.quotes(message);
      if (quotesAPI.error) {
        throw new Error(quotesAPI.error);
      }

      // Traduction de la citation
      const translatedQuote = await apiService.translate(quotesAPI.quotes, lang);
      if (translatedQuote.error) {
        throw new Error(translatedQuote.error);
      }

      // Création et ajout du message
      const quote = ExtendedQuotesMessages({
        _message: translatedQuote.translated,
        _isFromUser: false,
        _author: quotesAPI.author,
        _score: quotesAPI.score,
      });
      addQuotesMessages(quote);
    } catch (error) {
      console.error('Error fetching or translating quotes:', error.message);
      setError('Failed to fetch or translate the quotes. Please try again.');
    }
  };

  const handleSendMessage = (message, lang) => {
    try {
      if (!message.trim()) {
        setError('Message cannot be empty.');
        return;
      }

      if (isHeaderVisible) {
        setIsHeaderVisible(false);
      }

      // Ajout du message utilisateur
      addQuotesMessages(
        QuotesMessages({ _message: message, _isFromUser: true })
      );

      // Récupération et traduction des citations
      getQuotesMessages(message, lang);
    } catch (error) {
      console.error('Error handling message send:', error.message);
      setError('An error occurred while sending your message.');
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
