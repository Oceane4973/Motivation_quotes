import React from 'react';
import './InputBar.css';
import apiService from '../../services/apiService';

const InputBar = ({ isExpanded, onSend }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [languages, setLanguages] = React.useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
  };

  React.useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await apiService.languages();

        if (!response.languages || !Array.isArray(response.languages)) {
          throw new Error('Invalid response format for languages');
        }

        const languages = response.languages.sort((a, b) => a.localeCompare(b));
        setLanguages(languages);
        setSelectedLanguage(languages[0]);
        setError(null);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setError('Failed to load languages. Defaulting to English and French.');
        const fallbackLanguages = ['en', 'fr'];
        setLanguages(fallbackLanguages);
        setSelectedLanguage(fallbackLanguages[0]);
      }
    };

    fetchLanguages();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    if (!selectedLanguage) {
      setError('No language selected.');
      return;
    }

    try {
      if (onSend) {
        onSend(inputValue, selectedLanguage);
      }
      setInputValue('');
      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send the message. Please try again.');
    }
  };

  return (
    <div className="input-container">
      {error && <div className="error-message">{error}</div>}
      <div
        className={`input-bar ${isExpanded ? 'expanded' : ''}`}
        style={{
          transformOrigin: 'center',
          transition: 'transform 1s ease',
          transform: isExpanded ? 'scaleX(1)' : 'scaleX(0)',
        }}
      >
        {isExpanded && (
          <>
            <input
              type="text"
              className="input-field"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <div className="language-dropdown">
              <select
                className="language-select"
                onChange={handleChange}
                value={selectedLanguage || ''}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <button className="send-btn" onClick={handleSend}>
              ➤
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InputBar;