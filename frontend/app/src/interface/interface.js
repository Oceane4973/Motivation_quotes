export const QuotesMessages = ({ _message, _isFromUser }) => {
  return {
    message: _message,
    isFromUser: _isFromUser,
  };
};

export const ExtendedQuotesMessages = ({ _message, _isFromUser, _author, _score }) => {
  return {
    message: _message,
    isFromUser: _isFromUser,
    author: _author,
    score: _score,
  };
};