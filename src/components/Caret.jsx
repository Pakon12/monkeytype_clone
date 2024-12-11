import React, { useState, useEffect } from 'react';

const Caret = ({ wordsRef, currentWordIndex, currentCharIndex ,isBackToLine}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const updateCaretPosition = () => {
        const wordElements = wordsRef.current.querySelectorAll('.word');
        const currentWord = wordElements[currentWordIndex];
        if (!currentWord) return;

        const charElements = currentWord.querySelectorAll('span');
        const currentChar =
            currentCharIndex === charElements.length
                ? charElements[charElements.length - 1] // Last character of the word
                : charElements[currentCharIndex];

        if (!currentChar) return;

        const charRect = currentChar.getBoundingClientRect();
        const wordsRect = wordsRef.current.getBoundingClientRect();

        setPosition({
            top:!isBackToLine? charRect.top - wordsRect.top + charRect.height / 2 : (wordsRect.height / 2) -2,
            left:
                currentCharIndex === charElements.length
                    ? charRect.right - wordsRect.left // Caret at the end of the word
                    : charRect.left - wordsRect.left, // Caret at the character's position
        });
    };

    useEffect(() => {
        updateCaretPosition();
    }, [currentCharIndex, currentWordIndex]);

    return (
        <div
            id="caret"
            style={{
                position: 'absolute',
                left: `${position.left - 3}px`,
                top: `${position.top - 31}px`,
            }}
            className="block animate-caret w-[0.2rem] h-[4rem] rounded-lg bg-green-400 transition-all duration-100"
        ></div>
    );
};

export default Caret;
