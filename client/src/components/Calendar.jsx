export default function Calendar() {
  const now = new Date();
  const monthLabel = now.toLocaleString('default', { month: 'long' }) + ' ' + now.getFullYear();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= last; d++) cells.push(d);

  return (
    <div className="card">
      <div className="card-label">Calendar</div>
      <div className="cal-head">{monthLabel}</div>
      <div className="cal-g">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div className="cal-dn" key={i}>{d}</div>
        ))}
      </div>
      <div className="cal-g">
        {cells.map((d, i) => (
          <div key={i} className={d ? `cal-d${d === now.getDate() ? ' cal-today' : ''}` : ''}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
