import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // duration in ms, default 2000
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const elementRef = useRef<HTMLSpanElement>(null);
  const isIntersectingRef = useRef<boolean>(false);
  const animationStartedRef = useRef<boolean>(false);
  const prevValueRef = useRef<number>(0);

  // Helper to parse numeric value and its suffix (like K, M, %, +)
  const parseValue = (val: string | number) => {
    const cleanStr = String(val).replace(/,/g, '').trim();
    // Match numeric prefix (including decimals) and any trailing non-numeric suffix
    const match = cleanStr.match(/^([\d.]+)(.*)$/);
    if (match) {
      return {
        number: parseFloat(match[1]),
        suffix: match[2]
      };
    }
    return { number: 0, suffix: '' };
  };

  const { number: targetNumber, suffix } = parseValue(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIntersectingRef.current) {
          isIntersectingRef.current = true;
          // Trigger animation once visible
          if (!animationStartedRef.current) {
            startAnimation();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetNumber, suffix]);

  // Handle dynamic value updates after the initial viewport animation has completed
  useEffect(() => {
    if (animationStartedRef.current && isIntersectingRef.current) {
      // If the target number changed slightly (like a visitor count ticker incrementing), 
      // smoothly update without restarting the whole animation from 0.
      const diff = Math.abs(targetNumber - prevValueRef.current);
      if (diff > 0 && diff <= 10) {
        animateIncrement(prevValueRef.current, targetNumber);
      } else {
        // For large changes, run a full animation
        startAnimation();
      }
    }
  }, [targetNumber]);

  const easeOutQuad = (t: number) => t * (2 - t);

  const startAnimation = () => {
    animationStartedRef.current = true;
    const start = 0;
    const end = targetNumber;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      const current = start + (end - start) * easedProgress;
      prevValueRef.current = current;

      // Format the number and append suffix
      const formatted = Math.floor(current).toLocaleString();
      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Ensure exact final value is set at the end
        setDisplayValue(`${Math.floor(end).toLocaleString()}${suffix}`);
        prevValueRef.current = end;
      }
    };

    requestAnimationFrame(update);
  };

  const animateIncrement = (start: number, end: number) => {
    const startTime = performance.now();
    const tickDuration = 500; // Faster transition for simple increments

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / tickDuration, 1);
      const easedProgress = easeOutQuad(progress);
      
      const current = start + (end - start) * easedProgress;
      prevValueRef.current = current;

      const formatted = Math.floor(current).toLocaleString();
      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(`${Math.floor(end).toLocaleString()}${suffix}`);
        prevValueRef.current = end;
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <span ref={elementRef} className="font-tabular-nums">
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
