import { useCallback, useState } from 'react';
import './App.css';
import PixelCandle from './components/PixelCandle';
import PixelTimer from './components/PixelTimer';
import TaskList from './components/TaskList';
import StatsPanel from './components/StatsPanel';
import LibraryScene from './components/library/LibraryScene';
import CastPicker from './components/library/CastPicker';
import { useTimer } from './hooks/useTimer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLibraryCast } from './hooks/useLibraryCast';
import { playBell, playClick } from './utils/sound';
import { todayKey } from './utils/date';

function App() {
  const [tasks, setTasks] = useLocalStorage('rk-tasks', []);
  const [activeTaskId, setActiveTaskId] = useLocalStorage('rk-active-task', null);
  const [stats, setStats] = useLocalStorage('rk-stats', { byDate: {}, totalFocusMinutes: 0 });

  const handleSessionComplete = useCallback(
    ({ mode, minutes }) => {
      playBell();
      if (mode !== 'focus') return;

      const key = todayKey();
      setStats((prev) => ({
        byDate: { ...prev.byDate, [key]: (prev.byDate[key] || 0) + 1 },
        totalFocusMinutes: (prev.totalFocusMinutes || 0) + minutes,
      }));

      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeTaskId ? { ...task, pomodoros: (task.pomodoros || 0) + 1 } : task,
        ),
      );
    },
    [activeTaskId, setStats, setTasks],
  );

  const timer = useTimer({ onSessionComplete: handleSessionComplete });
  const cast = useLibraryCast(timer.mode);

  const activeTask = tasks.find((t) => t.id === activeTaskId && !t.done);

  function addTask(text) {
    const id = `${text}-${tasks.length}-${Math.random().toString(36).slice(2, 8)}`;
    setTasks((prev) => [...prev, { id, text, done: false, pomodoros: 0 }]);
  }

  function toggleTask(id) {
    playClick();
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTaskId === id) setActiveTaskId(null);
  }

  function selectTask(id) {
    setActiveTaskId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="app">
      <LibraryScene
        phase={cast.phase}
        cast={cast.cast}
        lighting={timer.mode === 'focus' ? 'work' : 'break'}
      />

      <header className="header">
        <PixelCandle />
        <div>
          <h1>Rahiplerin Kütüphanesi</h1>
          <div className="subtitle">sessizlik içinde odaklan, tefekkür et</div>
        </div>
        <PixelCandle className="right" />
      </header>

      <div className="layout">
        <PixelTimer timer={timer} activeTaskLabel={activeTask?.text} />

        <div className="side-stack">
          <TaskList
            tasks={tasks}
            onAdd={addTask}
            onToggle={toggleTask}
            onRemove={removeTask}
            activeTaskId={activeTaskId}
            onSelect={selectTask}
          />
          <CastPicker
            seatCount={cast.seatCount}
            setSeatCount={cast.setSeatCount}
            seatTypes={cast.seatTypes}
            setSeatType={cast.setSeatType}
          />
          <StatsPanel stats={stats} />
        </div>
      </div>

      <footer className="credits">✦ Four Wings — Rahiplerin Kütüphanesi ✦</footer>
    </div>
  );
}

export default App;
