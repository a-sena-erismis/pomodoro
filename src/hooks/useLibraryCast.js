import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { CHARACTER_ORDER, MAX_SEATS } from '../components/library/characters';

const ENTER_MS = 1900;
const LEAVE_MS = 1900;

export function useLibraryCast(mode) {
  const [seatCount, setSeatCount] = useLocalStorage('rk-cast-count', 1);
  const [seatTypes, setSeatTypes] = useLocalStorage(
    'rk-cast-types',
    CHARACTER_ORDER.slice(0, MAX_SEATS),
  );

  const activeSeats = Math.min(seatCount, MAX_SEATS);

  const [phase, setPhase] = useState(mode === 'focus' && activeSeats > 0 ? 'seated' : 'empty');
  const prevMode = useRef(mode);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const wasFocus = prevMode.current === 'focus';
    const isFocus = mode === 'focus';
    const modeChanged = prevMode.current !== mode;
    prevMode.current = mode;

    if (modeChanged) {
      clearTimeout(timeoutRef.current);
      if (!wasFocus && isFocus && activeSeats > 0) {
        setPhase('entering');
        timeoutRef.current = setTimeout(() => setPhase('seated'), ENTER_MS);
      } else if (wasFocus && !isFocus) {
        setPhase('leaving');
        timeoutRef.current = setTimeout(() => setPhase('empty'), LEAVE_MS);
      }
      return;
    }

    if (isFocus && activeSeats > 0 && phase === 'empty') {
      setPhase('entering');
      timeoutRef.current = setTimeout(() => setPhase('seated'), ENTER_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, activeSeats]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function setSeatType(index, type) {
    setSeatTypes((prev) => {
      const next = [...prev];
      next[index] = type;
      return next;
    });
  }

  const cast = Array.from(
    { length: activeSeats },
    (_, i) => seatTypes[i] || CHARACTER_ORDER[i % CHARACTER_ORDER.length],
  );

  return {
    phase: activeSeats === 0 ? 'empty' : phase,
    cast,
    seatCount: activeSeats,
    setSeatCount,
    seatTypes,
    setSeatType,
  };
}
