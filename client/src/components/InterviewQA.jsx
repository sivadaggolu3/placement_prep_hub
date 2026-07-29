import { useState } from 'react';
import { INTERVIEW_CATEGORIES } from '../data/interviewQuestions';

export default function InterviewQA() {
  const [open, setOpen] = useState(null); // `${catIndex}-${qIndex}` or null

  return (
    <div style={{ marginTop: 40 }}>
      <div className="ph"><h1>🎤 Interview Questions</h1><p>Common questions asked for these core subjects</p></div>
      <div className="qa-grid">
        {INTERVIEW_CATEGORIES.map((cat, ci) => (
          <div className="card" key={cat.title}>
            <div className="card-label">{cat.icon} {cat.title}</div>
            <div className="qa-list">
              {cat.questions.map((item, qi) => {
                const key = `${ci}-${qi}`;
                const isOpen = open === key;
                return (
                  <div className="qa-item" key={key}>
                    <button
                      className="qa-q"
                      onClick={() => setOpen(isOpen ? null : key)}
                    >
                      <span>{item.q}</span>
                      <span className="qa-caret">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && <div className="qa-a">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
