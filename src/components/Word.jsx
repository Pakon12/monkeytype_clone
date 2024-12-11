import React from 'react';

const Word = ({ word, charStyles }) => {
    return (
        <div className="word tracking-widest py-2.5 px-2" role="text">
            {[...word].map((char, charIndex) => (
                <span key={charIndex} className={charStyles?.[charIndex] || ''}>
                    {char}
                </span>
            ))}
        </div>
    );
};

export default Word;
