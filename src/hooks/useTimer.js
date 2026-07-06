import { useCallback, useEffect, useRef, useState } from 'react';

export const MODES = {
  focus: { label: 'Çalışma', minutes: 25 },
  short: { label: 'Kısa Mola', minutes: 5 },
  long: { label: 'Uzun Mola', minutes: 15 },
};

const SESSIONS_BEFORE_LONG_BREAK = 4;

export function useTimer({ onSessionComplete } = {}) {
  const [durations, setDurations] = useState({
    focus: MODES.focus.minutes * 60,
    short: MODES.short.minutes * 60,
    long: MODES.long.minutes * 60,
  });
  const [mode, setMode] = useState('focus');
  const [secondsLeft, setSecondsLeft] = useState(durations.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return undefined;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft !== 0 || !isRunning) return;

    setIsRunning(false);

    if (mode === 'focus') {
      const nextCount = completedFocusSessions + 1;
      setCompletedFocusSessions(nextCount);
      const nextMode = nextCount % SESSIONS_BEFORE_LONG_BREAK === 0 ? 'long' : 'short';
      onSessionComplete?.({ mode, minutes: durations.focus / 60 });
      setMode(nextMode);
      setSecondsLeft(durations[nextMode]);
    } else {
      setMode('focus');
      setSecondsLeft(durations.focus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const switchMode = useCallback(
    (nextMode) => {
      setIsRunning(false);
      setMode(nextMode);
      setSecondsLeft(durations[nextMode]);
    },
    [durations],
  );

  const toggleRunning = useCallback(() => setIsRunning((prev) => !prev), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(durations[mode]);
  }, [durations, mode]);

  const updateDuration = useCallback(
    (targetMode, minutes) => {
      setDurations((prev) => {
        const next = { ...prev, [targetMode]: minutes * 60 };
        if (targetMode === mode && !isRunning) {
          setSecondsLeft(next[targetMode]);
        }
        return next;
      });
    },
    [mode, isRunning],
  );

  const totalSeconds = durations[mode];
  const progress = 1 - secondsLeft / totalSeconds;

  return {
    mode,
    modes: MODES,
    durations,
    secondsLeft,
    totalSeconds,
    progress,
    isRunning,
    completedFocusSessions,
    switchMode,
    toggleRunning,
    reset,
    updateDuration,
  };
}
