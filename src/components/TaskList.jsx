import { useState } from 'react';

function TaskList({ tasks, onAdd, onToggle, onRemove, activeTaskId, onSelect }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  }

  return (
    <section className="pixel-panel">
      <h2 className="section-title">Kutsal Görevler</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Yeni bir görev kaydet..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={120}
        />
        <button type="submit" className="pixel-btn">
          Ekle
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="task-empty">Kütüphane sessiz... henüz görev yok.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="task-item"
              style={{
                borderColor: task.id === activeTaskId ? 'var(--gold)' : undefined,
              }}
            >
              <button
                type="button"
                className={`task-check ${task.done ? 'done' : ''}`}
                onClick={() => onToggle(task.id)}
                aria-label="tamamlandı olarak işaretle"
              >
                {task.done ? '✓' : ''}
              </button>
              <span
                className={`task-text ${task.done ? 'done' : ''}`}
                onClick={() => !task.done && onSelect(task.id)}
                style={{ cursor: task.done ? 'default' : 'pointer' }}
                title={task.done ? '' : 'bu ayin için görevi seç'}
              >
                {task.text}
              </span>
              {task.pomodoros > 0 && (
                <span className="task-pomo-count">🕯️ {task.pomodoros}</span>
              )}
              <button
                type="button"
                className="task-remove"
                onClick={() => onRemove(task.id)}
                aria-label="görevi sil"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
