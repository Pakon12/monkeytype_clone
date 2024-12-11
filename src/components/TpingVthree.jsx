import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '../features/Statetext/textSlice';
import { selectChooseWord } from '../features/choose/chooseWordSlice';
import { selectChooseTime } from '../features/choose/chooseTimeSlice';
import Summary from './summary';

import { word_body as words2 } from '../wordList';

import Word from './Word';
import Caret from './Caret';
import { use } from 'react';

const TpingVthree = () => {
    const [words, setWords] = useState(words2);
    const [input, setInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [correctEntries, setCorrectEntries] = useState(0);
    const [incorrectEntries, setIncorrectEntries] = useState(0);
    const [isBackToLine, setIsBackToLine] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false); // จบเกมเมื่อหมดเวลา
    const [timeLeft, setTimeLeft] = useState(localStorage.getItem('setChoose-time') || 15); // เพิ่มตัวจับเวลา 15 วินาที
    const [totalTime, setTotalTime] = useState(localStorage.getItem('setChoose-time') || 15);
    const [isTyping, setIsTyping] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [charStyles, setCharStyles] = useState([]);
    const [constWord, setConstWord] = useState([]);
    const [countLine, setCountLine] = useState(1);
    const [isStart, setIsStart] = useState(false);



    const [isOne, setIsOne] = useState(false);

    const dispatch = useDispatch();
    const numberWords = useSelector(selectChooseWord);
    const time = useSelector(selectChooseTime);



    const inactivityTimeout = useRef(null);
    const inputRef = useRef(null);
    const wordsRef = useRef(null);

    useEffect(() => {
        if (isStart) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer); // หยุดจับเวลาเมื่อถึง 0
                        setIsGameOver(true); // จบเกม

                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }

    }, [isStart]);

    const handleStart = () => {
        setIsStart(true);
        setStartTime(null);
        setIsTyping(false);
        setInput('');
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setCorrectEntries(0);
        setIsBackToLine(false);
        setCharStyles([]);
        setConstWord([]);
        setCountLine(1);
        setIsGameOver(false);
        setTimeLeft(localStorage.getItem('setChoose-time') || 15);
        setIncorrectEntries(0);
        const elements = document.querySelectorAll('.extra');
        elements.forEach((element) => {
            element.remove();
        });
        focusInput();

    };

    const handleRestart = () => {
        setIsStart(false);
        setIsGameOver(false);
        setStartTime(null);
        setIsTyping(false);
        setInput('');
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setCorrectEntries(0);
        setIsBackToLine(false);
        setCharStyles([]);
        setConstWord([]);
        setCountLine(1);
        setTimeLeft(localStorage.getItem('setChoose-time') || 15);
        setIncorrectEntries(0);
        const elements = document.querySelectorAll('.extra');
        elements.forEach((element) => {
            element.remove();
        });

    };

    


    useEffect(() => {
        const numberWord = localStorage.getItem('setChoose-words') || numberWords;
        setWords(
            [...words2]
                .sort(() => 0.5 - Math.random())
            // .slice(0, parseInt(numberWord))
        );
    
    }, [time]);


    useEffect(() => {
        setTimeLeft(time);
        setTotalTime(time);
        handleStart();
    }, [time]);



    const getWordsByLine = () => {
        const wordElements = wordsRef.current.querySelectorAll('.word');
        const lines = {};

        wordElements.forEach((word) => {
            const lineTop = word.offsetTop;
            if (!lines[lineTop]) {
                lines[lineTop] = [];
            }
            lines[lineTop].push(word);
        });

        return Object.keys(lines)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((key) => lines[key]);
    };
    const getLastWordInLine = (lineIndex) => {
        const lines = getWordsByLine();
        // console.log(lines.length-1)
        const lastLineIndex = lines.length - 2;
        const isLastLine = countLine !== lastLineIndex;
        if (!isLastLine) {
            setIsBackToLine(false);
        }
        if (lineIndex < lines.length && isLastLine) {
            const line = lines[lineIndex];
            return line[line.length - 1]?.textContent || '';
        }
        return '';
    };
    const autoScroll = () => {
        if (!wordsRef.current) return;

        const wordElements = wordsRef.current.querySelectorAll('.word');
        const currentWord = wordElements[currentWordIndex];
        const container = wordsRef.current;

        if (!currentWord) return;

        // Get current word and container positions
        const currentWordRect = currentWord.getBoundingClientRect();
        // console.log(currentWordRect.height + incrementScoll)

        // Check if the caret has reached the bottom of the visible area

        container.scrollBy({
            top: currentWordRect.height, // Scroll by one line height
            behavior: 'smooth',
        });
        setCountLine((prevCount) => prevCount + 1); // Update line count
    };


    const handleInputChange = (e) => {
        if (isGameOver) return;
        if(!isStart) return;

        const value = e.target.value;

        const wordElements = wordsRef.current.querySelectorAll('.word');
        const currentWord = wordElements[currentWordIndex];
        if (!currentWord) return;

        const charElements = Array.from(currentWord.querySelectorAll('span'));
        const currentChar = charElements[currentCharIndex];

        const caretElement = document.querySelector('#caret');

        // Disable caret animation during typing
        caretElement.style.animationName = 'none';



        // Handle Spacebar
        if (value.endsWith(' ')) {
            if (currentCharIndex === charElements.length) {
                setCurrentWordIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
                setCharStyles((prev) => [...prev, []]); // Keep styles for previous word
                setInput('');
                setIsOne(false);
                const lastWord = getLastWordInLine(countLine);
                if (currentWord.textContent === lastWord) {
                    autoScroll();
                    setIsBackToLine(true);
                }
                setCorrectEntries((prev) => prev + 1);
            }
            return;
        }

        // Handle Backspace
        if (e.nativeEvent.inputType === 'deleteContentBackward') {
            if (currentCharIndex > 0) {
                setInput((prev) => prev.slice(0, -1));
                setCurrentCharIndex((prev) => prev - 1);
                setCharStyles((prev) => {
                    const updatedStyles = [...prev];
                    updatedStyles[currentWordIndex] = [...(updatedStyles[currentWordIndex] || [])];
                    updatedStyles[currentWordIndex][currentCharIndex - 1] = ''; // Clear style
                    return updatedStyles;
                });

                const extraElements = currentWord.querySelectorAll('.extra');
                if (extraElements.length) {
                    extraElements[extraElements.length - 1].remove();
                }
            } else if (currentWordIndex > 0) {
                const prevWordIndex = currentWordIndex - 1;
                const prevWord = wordElements[prevWordIndex];
                const charElements = prevWord.querySelectorAll('span');
                setCurrentWordIndex(prevWordIndex);
                setCurrentCharIndex(charElements.length);
                setCharStyles((prev) => prev.slice(0, -1)); // Remove styles for the current word
            }
            return;
        }

        // Handle Typing
        if (currentChar) {
            setCurrentCharIndex((prev) => prev + 1);
            setCharStyles((prev) => {
                const updatedStyles = [...prev];
                updatedStyles[currentWordIndex] = [...(updatedStyles[currentWordIndex] || [])];
                updatedStyles[currentWordIndex][currentCharIndex] =
                    value[value.length - 1] === currentChar.textContent
                        ? 'text-white'
                        : 'text-red-500';
                return updatedStyles;
            });


        }
        if (!isOne) {
            setIsOne(true);
            setConstWord([...charElements]); // Cache the word's characters
        }


        if (value.length > constWord.length && value.length > 1) {
            const extra = value.slice(charElements.length);
            if (extra) {
                const extraSpan = document.createElement('span');
                extraSpan.classList.add('text-red-500');
                extraSpan.classList.add('extra');
                extraSpan.textContent = extra;
                currentWord.appendChild(extraSpan);
                setCurrentCharIndex((prev) => prev + 1);
            }
        }

        setInput(value.trimEnd());
        dispatch(setText(value));
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    useEffect(() => {
        const caretElement = document.querySelector('#caret');

        const resetInactivityTimer = () => {
            // Reset the caret animation and inactivity state
            clearTimeout(inactivityTimeout.current);
            setIsTyping(false);
            // caretElement.style.animationName = 'none'; // Stop caret flashing

            // Set a timeout for inactivity
            inactivityTimeout.current = setTimeout(() => {
                caretElement.style.animationName = 'caretFlashSmooth'; // Resume caret flashing
                setIsTyping(true); // Mark as inactive
            }, 5000); // 5 seconds of inactivity
        };

        window.addEventListener('click', resetInactivityTimer);
        window.addEventListener('keydown', resetInactivityTimer);

        return () => {
            // Clean up event listeners and timeout
            clearTimeout(inactivityTimeout.current);
            window.removeEventListener('click', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
        };
    }, []);

    const calculateWPM = () => {
        const elapsedTimeInSeconds = (totalTime - timeLeft) || 1; // เวลาที่ใช้จริง
        const minutes = elapsedTimeInSeconds / 60;
        return Math.round(correctEntries / minutes);
    };

    return (
        <>
            {isGameOver ? (
                <div className="text-center space-y-4">
                    <Summary wpm={calculateWPM()} />
                    <button
                        onClick={handleRestart}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out"
                    >
                        Restart
                    </button>

                </div>
            ) : (
                <>


                    <div className="bg-gray-800 text-white rounded-lg  max-w-sm mx-auto">
                        <div className="text-center space-y-4">
                            <p className="text-2xl font-bold text-green-400">{timeLeft}</p>
                            {
                                !isStart &&
                                <button
                                    onClick={handleStart}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
                                >
                                    Start
                                </button>
                            }
                        </div>
                    </div>



                    <div
                        id="wordsWrapper"
                        className={`w-full relative overflow-visible ${!isTyping && !isStart && 'blur-2xl'} `}
                        onClick={focusInput}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            className="absolute opacity-0"
                            ref={inputRef}
                        />
                        <Caret
                            wordsRef={wordsRef}
                            currentWord={words[currentWordIndex]}
                            currentWordIndex={currentWordIndex}
                            currentCharIndex={currentCharIndex}
                            isBackToLine={isBackToLine}
                        />
                        <div
                            id="words"
                            ref={wordsRef}
                            className="w-full h-52 bg-gray-800 flex flex-wrap text-gray-500 text-5xl overflow-hidden"
                        >
                            {words.map((word, index) => (
                                <Word
                                    key={index}
                                    word={word}
                                    index={index}
                                    charStyles={charStyles[index] || []}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default TpingVthree;
