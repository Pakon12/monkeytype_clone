import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectChooseTime } from '../features/choose/chooseTimeSlice';

const CountDown = ({ setIsStart }) => {
  const [countDown, setCountDown] = useState(15);
  const [isStart, setLocalIsStart] = useState(false);
  const time = useSelector(selectChooseTime);

  // อัปเดตเวลาเริ่มต้นจาก Redux
  useEffect(() => {
    if (!isStart) {
      setCountDown(time || 15);
    }
  }, [time, isStart]);

  // แจ้ง Parent Component เมื่อเริ่มหรือจบการทำงาน
  useEffect(() => {
    if (isStart) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }, [isStart, setIsStart]);

  // ฟังก์ชันเริ่มต้นการนับถอยหลัง
  const handleStart = () => {
    setLocalIsStart(true);
  };

  // การนับถอยหลัง
  useEffect(() => {
    if (isStart) {
      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // หยุดจับเวลาเมื่อหมด
            setLocalIsStart(false); // รีเซ็ตสถานะ Local
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isStart]);

  return (
    <div className="flex flex-col items-center">
      {isStart ? (
        <div className="text-4xl font-extrabold text-green-400">
          {countDown > 0 ? countDown : 'Time’s up!'}
        </div>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-200"
          onClick={handleStart}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default CountDown;
