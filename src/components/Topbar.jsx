import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTime } from '../features/choose/chooseTimeSlice';
import { setChooseWord } from '../features/choose/chooseWordSlice';

const Topbar = ({ setIsWord }) => {
  const [change, setChange] = useState(true);
  const [chooseTime, setChooseTime] = useState('15');
  const [chooseWords, setChooseWords] = useState('10');
  const [customValue, setCustomValue] = useState(''); // เก็บค่าที่ผู้ใช้ป้อนใน custom

  const dispatch = useDispatch();

  const handleChange = (type) => {
    const isTime = type === 'time';
    setChange(isTime);
    setIsWord(!isTime);
    localStorage.setItem('setItem-time', isTime ? 'true' : 'false');
  };

  const handleChooseTime = (time) => {
    if (time === 'custom') {
      setChooseTime('custom');
      return;
    }
    setChooseTime(time);
    dispatch(setTime(time));
    localStorage.setItem('setChoose-time', time);
  };

  const handleChooseWords = (words) => {
    if (words === 'custom') {
      setChooseWords('custom');
      return;
    }
    setChooseWords(words);
    dispatch(setChooseWord(words));
    localStorage.setItem('setChoose-words', words);
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value > 0) {
      setCustomValue(value);
    }
  };

  const handleCustomSubmit = () => {
    if (change) {
      setChooseTime(customValue);
      dispatch(setTime(customValue));
      localStorage.setItem('setChoose-time', customValue);
    } else {
      setChooseWords(customValue);
      dispatch(setChooseWord(customValue));
      localStorage.setItem('setChoose-words', customValue);
    }
  };

  useEffect(() => {

    const savedPreference = localStorage.getItem('setItem-time');
    const savedTime = localStorage.getItem('setChoose-time');
    const savedWords = localStorage.getItem('setChoose-words');
    if (!savedPreference) {
      localStorage.setItem('setItem-time', 'true');
    }
    if(!savedTime){
      localStorage.setItem('setChoose-time', '15');
    }
    if(!savedWords){
      localStorage.setItem('setChoose-words', '10');
    }

    if (savedPreference) {
      setChange(savedPreference === 'true');
    }
    if (savedTime) {
      setChooseTime(savedTime);
    }
    if (savedWords) {
      setChooseWords(savedWords);
    }
  }, []);

  return (
    <div className="w-auto h-full bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-md">
      {/* Toggle Section */}
      <div className="flex justify-around items-center py-4">
        <div className="flex space-x-6">
          <span
            className={`hover:text-white text-lg font-semibold ${change ? 'text-green-400 underline' : 'text-gray-400'
              }`}
            onClick={() => handleChange('time')}
          >
            Time
          </span>
          <span
            className={`hover:text-white text-lg font-semibold ${!change ? 'text-green-400 underline' : 'text-gray-400'
              }`}
            onClick={() => handleChange('word')}
          >
            Words
          </span>
        </div>

        <div className="flex space-x-4">
          {change ? (
            <>
              {['15', '30', '60', '120', 'custom'].map((time) => (
                <span
                  key={time}
                  className={`hover:text-white px-3 py-1 rounded-md ${chooseTime === time ? 'bg-green-500 text-white' : 'text-gray-400'
                    }`}
                  onClick={() => handleChooseTime(time)}
                >
                  {time}
                </span>
              ))}
            </>
          ) : (
            <>
              {['10', '25', '50', '100', 'custom'].map((wordCount) => (
                <span
                  key={wordCount}
                  className={`hover:text-white px-3 py-1 rounded-md ${chooseWords === wordCount ? 'bg-green-500 text-white' : 'text-gray-400'
                    }`}
                  onClick={() => handleChooseWords(wordCount)}
                >
                  {wordCount}
                </span>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Custom Input */}
      {(chooseTime === 'custom' || chooseWords === 'custom') && (
        <div className="mt-4 flex items-center space-x-4 justify-end">
          <input
            type="number"
            min="1"
            value={customValue}
            onChange={handleCustomChange}
            className="w-24 px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
            placeholder="Enter value"
          />
          <button
            onClick={handleCustomSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;
