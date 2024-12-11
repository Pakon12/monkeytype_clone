import React from 'react';

const wordComponent = ({ word, index }) => {
    console.log(word)
    return (
        <div key={index} className="word tracking-widest">
            {[...word].map((char, charIndex) => (
                <span key={charIndex} className=''>{char}</span>
            ))}
        </div>
    );
}

export default wordComponent;
