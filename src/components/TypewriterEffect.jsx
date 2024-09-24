import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ words, typingSpeed = 150, erasingSpeed = 100, delayBetweenWords = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const word = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentText((current) => current.slice(0, -1));
        }, erasingSpeed);
        return () => clearTimeout(timeoutId);
      }
    } else {
      if (currentText === word) {
        const timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentText((current) => word.slice(0, current.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, erasingSpeed, delayBetweenWords]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="text-primary-9">
      {currentText}
      <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
};

export default TypewriterEffect;