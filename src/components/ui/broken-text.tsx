'use client';

import { useEffect, useState, useCallback } from 'react';

const lettersAndSymbols =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?`-=[];\',./';

interface BrokenTextProps {
  text: string;
}

export function BrokenText({ text }: BrokenTextProps) {
  const [brokenText, setBrokenText] = useState('');

  const getRandomChar = useCallback(
    () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    [],
  );

  const animateText = useCallback(async () => {
    const duration = 50;
    const revealDuration = 80;
    const initialRandomDuration = 300;

    const generateRandomText = () =>
      text
        .split('')
        .map(() => getRandomChar())
        .join('');

    setBrokenText(generateRandomText());

    const endTime = Date.now() + initialRandomDuration;

    while (Date.now() < endTime) {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setBrokenText(generateRandomText());
    }

    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, revealDuration));
      setBrokenText(
        (prevText) =>
          text.slice(0, i + 1) +
          prevText
            .slice(i + 1)
            .split('')
            .map(() => getRandomChar())
            .join(''),
      );
    }
  }, [text, getRandomChar]);

  useEffect(() => {
    animateText();
  }, [text, animateText]);

  return <div className='relative inline-block'>{brokenText}</div>;
}
