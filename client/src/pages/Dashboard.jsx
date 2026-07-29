import { useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTasks } from '../context/TasksContext';
import AchievementsModal from '../components/AchievementsModal';
import Calendar from '../components/Calendar';

ChartJS.register(ArcElement, Tooltip, Legend);

const QUOTES = [
  "Keep pushing — you're closer than you think! 🚀",
  'Every small step counts 🌸',
  'Consistency beats intensity 💪',
  'Believe in yourself ✨',
  'Hard work always pays off 🎯',
  'One topic at a time builds mastery 📚',
  'Your future self will thank you 🌟',
];

const CATS = [
  ['DSA', 'dsa'],
  ['Aptitude', 'apt'],
  ['Verbal', 'verbal'],
  ['Core', 'core'],
];

export default function Dashboard() {
  const { tasks, addTask, markDone, markPending, deleteTask, resetAll } = useTasks();
  const [name, setName] = useState('');
  const [cat, setCat] = useState('DSA');
  const [achOpen, setAchOpen] = useState(false);
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  const pending = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  const counts = { DSA: { done: 0, total: 0 }, Aptitude: { done: 0, total: 0 }, Verbal: { done: 0, total: 0 }, Core: { done: 0, total: 0 } };
  tasks.forEach((t) => {
    if (counts[t.category]) {
      counts[t.category].total++;
      if (t.done) counts[t.category].done++;
    }
  });

  const overallPct = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    addTask(trimmed, cat, { silent: true });
    setName('');
  };

  const handleReset = () => {
    if (window.confirm('Reset ALL tasks? This cannot be undone.')) resetAll();
  };

  const reminderTask = done.length ? done[Math.floor(Math.random() * done.length)] : null;
  const reminder = reminderTask
    ? `Revise: ${reminderTask.title} (${reminderTask.category})`
    : 'Complete some tasks to get revision reminders!';

  const chartData = {
    labels: ['DSA', 'Aptitude', 'Verbal', 'Core'],
    datasets: [
      {
        data: [counts.DSA.total, counts.Aptitude.total, counts.Verbal.total, counts.Core.total],
        backgroundColor: ['#818cf8', '#fbbf24', '#34d399', '#f472b6'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <div className="page active">
      <div className="wrap">
        <div className="dash">
          {/* LEFT COLUMN */}
          <div>
            <div className="card">
              <div className="form-title">Add Task</div>
              <div className="form-sub">Track a new preparation topic</div>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="e.g. Binary Trees"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <select value={cat} onChange={(e) => setCat(e.target.value)}>
                  <option value="DSA">DSA</option>
                  <option value="Aptitude">Aptitude</option>
                  <option value="Verbal">Verbal</option>
                  <option value="Core">Core</option>
                </select>
              </div>
              <div className="btn-row">
                <button className="btn btn-add" onClick={handleAdd}>+ Add Task</button>
                <button className="btn btn-rst" onClick={handleReset}>↺ Reset</button>
              </div>
            </div>

            <div className="card">
              <div className="card-label">Progress</div>
              <div className="prog-list">
                {CATS.map(([label, key]) => {
                  const c = counts[label];
                  const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
                  return (
                    <div key={label}>
                      <div className="prog-top"><span>{label}</span><b>{pct}%</b></div>
                      <div className="prog-track">
                        <div className={`prog-fill d-${key}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card" style={{ cursor: 'pointer' }} onClick={() => setAchOpen(true)}>
              <div className="card-label">
                Achievements <span style={{ fontSize: 10, color: 'var(--primary)' }}>↗ view all</span>
              </div>
              <div className="bdgs">
                {done.length === 0 && <span className="no-bdg">Complete 10 tasks to earn badges!</span>}
                {done.length >= 10 && <span className="badge">🥉 Bronze</span>}
                {done.length >= 25 && <span className="badge">🥈 Silver</span>}
                {done.length >= 50 && <span className="badge">🥇 Gold</span>}
              </div>
            </div>

            <Calendar />
          </div>

          {/* CENTER COLUMN */}
          <div>
            <div className="card">
              <div className="stat-row">
                <div className="sbox"><div className="n">{tasks.length}</div><div className="l">Total Tasks</div></div>
                <div className="sbox g"><div className="n">{done.length}</div><div className="l">Completed</div></div>
              </div>
            </div>

            <div className="card">
              <div className="tcols">
                <div>
                  <div className="col-head"><h3>📝 Pending</h3><span className="col-cnt">{pending.length}</span></div>
                  <ul className="tul">
                    {pending.length === 0 && <li className="empty">No pending tasks 🎉</li>}
                    {pending.map((t) => (
                      <li className="ti" key={t._id}>
                        <span className="tn">{t.title}</span>
                        <span className={`ttag tg-${t.category}`}>{t.category}</span>
                        <div className="tact">
                          <button className="ico ok" title="Mark done" onClick={() => markDone(t._id)}>✓</button>
                          <button className="ico rm" title="Delete" onClick={() => deleteTask(t._id)}>✕</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="col-head"><h3>✅ Completed</h3><span className="col-cnt">{done.length}</span></div>
                  <ul className="tul">
                    {done.length === 0 && <li className="empty">No completed tasks yet</li>}
                    {done.map((t) => (
                      <li className="ti dn" key={t._id}>
                        <span className="tn">{t.title}</span>
                        <span className={`ttag tg-${t.category}`}>{t.category}</span>
                        <div className="tact">
                          <button className="ico ud" title="Move to pending" onClick={() => markPending(t._id)}>↩</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-label">Task Distribution</div>
              <div className="chart-wrap" style={{ width: 200, height: 200 }}>
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: false,
                    cutout: '60%',
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11, family: 'Inter' }, padding: 10 } } },
                  }}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="card">
              <div className="card-label">⏰ Revision Reminder</div>
              <div className="rem-box">{reminder}</div>
            </div>
            <div className="card">
              <div className="card-label">💡 Motivation</div>
              <div className="quote-box">{quote}</div>
            </div>
            <div className="card">
              <div className="card-label">Overall Progress</div>
              <div className="overall-num">
                <div className="pct">{overallPct}%</div>
                <div className="sub">tasks completed</div>
              </div>
              <div className="thick">
                <div
                  className="prog-fill"
                  style={{ width: `${overallPct}%`, background: 'linear-gradient(90deg,#818cf8,#ec4899)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {achOpen && <AchievementsModal done={done} onClose={() => setAchOpen(false)} />}
    </div>
  );
}
