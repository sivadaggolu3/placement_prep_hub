import { useState } from 'react';
import useResourceLinks from '../hooks/useResourceLinks';

export default function QuickLinks({ title, presetLinks, category }) {
  const { links: customLinks, addLink, deleteLink } = useResourceLinks(category);
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedLabel = label.trim();
    const trimmedUrl = url.trim();
    if (!trimmedLabel || !trimmedUrl) return;

    try {
      await addLink(trimmedLabel, /^https?:\/\//.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`);
      setLabel('');
      setUrl('');
      setAdding(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add link');
    }
  };

  return (
    <div className="card">
      <div className="card-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <button className="qlink-add-btn" onClick={() => setAdding((a) => !a)}>
          {adding ? '✕ Cancel' : '+ Add link'}
        </button>
      </div>

      {adding && (
        <form className="qlink-form" onSubmit={handleAdd}>
          {error && <div className="auth-error" style={{ marginBottom: 8 }}>{error}</div>}
          <input
            type="text"
            placeholder="Sheet or site name (e.g. Love Babbar Sheet)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" className="btn btn-add" style={{ padding: '9px 14px', fontSize: 13 }}>Save</button>
        </form>
      )}

      <div className="qlinks">
        {presetLinks.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="qlink">
            <span>{link.label}</span>
            <span className="qlink-arrow">↗</span>
          </a>
        ))}
        {customLinks.map((link) => (
          <div key={link._id} className="qlink qlink-custom">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <span>{link.label}</span>
              <span className="qlink-arrow">↗</span>
            </a>
            <button className="qlink-del" onClick={() => deleteLink(link._id)} title="Remove">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
