const ACHS = [
  { icon: '🥉', title: 'Bronze Beginner', desc: 'Complete 10 tasks', req: 10, custom: null },
  { icon: '🥈', title: 'Silver Grinder', desc: 'Complete 25 tasks', req: 25, custom: null },
  { icon: '🥇', title: 'Gold Champion', desc: 'Complete 50 tasks', req: 50, custom: null },
  { icon: '💻', title: 'DSA Starter', desc: 'Complete 5 DSA tasks', req: 0, custom: 'dsa5' },
  { icon: '⭐', title: 'All-Rounder', desc: 'Tasks in all 4 categories', req: 0, custom: 'all4' },
];

export default function AchievementsModal({ done, onClose }) {
  const dsaDone = done.filter((t) => t.category === 'DSA').length;
  const cats = new Set(done.map((t) => t.category));

  return (
    <div
      id="ach-ov"
      className="open"
      onClick={(e) => e.target.id === 'ach-ov' && onClose()}
    >
      <div id="ach-m">
        <button className="mcl" onClick={onClose}>✕</button>
        <h2>🏆 Achievements</h2>
        <div id="ach-list">
          {ACHS.map((a) => {
            let unlocked;
            if (a.custom === 'dsa5') unlocked = dsaDone >= 5;
            else if (a.custom === 'all4') unlocked = cats.size >= 4;
            else unlocked = done.length >= a.req;

            return (
              <div className={`ai${unlocked ? '' : ' locked'}`} key={a.title}>
                <span style={{ fontSize: 28 }}>{a.icon}</span>
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.desc} {unlocked ? '✅' : '🔒'}</span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="ach-note">
          Completed {done.length} task{done.length !== 1 ? 's' : ''} so far. Keep going! 💪
        </p>
      </div>
    </div>
  );
}
