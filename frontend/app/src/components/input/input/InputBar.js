// InputBar.js
import React from 'react';
import './InputBar.css';

const InputBar = ({ isExpanded, onSend }) => {
  const [inputValue, setInputValue] = React.useState('');

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
      onSend(inputValue);
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
                onChange={(e) => console.log(`Langue sélectionnée : ${e.target.value}`)}
                defaultValue="en"
              >
                <option value="en">En</option>
                <option value="fr">Fr</option>
                <option value="es">Es</option>
                <option value="de">De</option>
                <option value="it">It</option>
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