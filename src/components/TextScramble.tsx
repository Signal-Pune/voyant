import React, { useEffect, useRef, useState } from 'react';

import type { ElementType } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 2000,
  as: Tag = 'span',
}) => {
  const [display, setDisplay] = useState('');
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    const startTimeout = setTimeout(() => {
      hasStarted.current = true;
      let frame = 0;
      const totalFrames = Math.floor(duration / 16);
      const length = text.length;
      const update = () => {
        let output = '';
        const progress = frame / totalFrames;
        for (let i = 0; i < length; i++) {
          if (i / length < progress) {
            output += text[i];
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(output);
        frame++;
        if (frame <= totalFrames) {
          requestAnimationFrame(update);
        } else {
          setDisplay(text);
        }
      };
      requestAnimationFrame(update);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, duration]);

  return React.createElement(Tag as string, { className }, display || '\u00A0');
};
