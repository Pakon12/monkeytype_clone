import React from 'react';

const Summary = ({ wpm }) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-center">
      <h1 className="text-4xl font-extrabold text-white mb-2">Typing Summary</h1>
      <p className="text-lg text-gray-200">Your typing speed is:</p>
      <div className="text-6xl font-bold text-white my-4">{wpm} WPM</div>
      <p className="text-md text-gray-300">
        Words Per Minute (WPM) is a measure of how fast you type.
      </p>
    </div>
  );
};

export default Summary;
