const DAY_LABELS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export function todayKey() {
  return dateKey(new Date());
}

export function lastNDays(n) {
  const days = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({ key: dateKey(d), label: DAY_LABELS[d.getDay()] });
  }
  return days;
}
