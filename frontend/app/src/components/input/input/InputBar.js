// InputBar.js
import React from 'react';
import './InputBar.css';
import apiService from '../../../services/apiService';

const InputBar = ({ isExpanded, onSend }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [languages, setLanguages] = React.useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
  };

  React.useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await apiService.languages();
        let languages = response.languages || ["en", "fr"];
        languages.sort((a, b) => a.localeCompare(b));
        setLanguages(languages);
        setSelectedLanguage(languages[0])
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLanguages(["en", "fr"]);
        setSelectedLanguage(languages[0])
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
    if (onSend) {
      onSend(inputValue, selectedLanguage);
    }
    setInputValue('');
  };

  return (
    <div className='input-container'>
      <div
        className={`input-bar ${isExpanded ? 'expanded' : ''}`}
        style={{ transformOrigin: 'center', transition: 'transform 1s ease', transform: isExpanded ? 'scaleX(1)' : 'scaleX(0)' }}
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
                defaultValue={selectedLanguage}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <button className="send-btn" onClick={handleSend}>➤</button>
          </>
        )}
      </div>
    </div>
  );
};

export default InputBar;