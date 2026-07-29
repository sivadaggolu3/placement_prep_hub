import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';

export default function useResourceLinks(category) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/resource-links', { params: { category } });
      setLinks(res.data);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addLink = async (label, url) => {
    const res = await api.post('/resource-links', { category, label, url });
    setLinks((prev) => [res.data, ...prev]);
  };

  const deleteLink = async (id) => {
    await api.delete(`/resource-links/${id}`);
    setLinks((prev) => prev.filter((l) => l._id !== id));
  };

  return { links, loading, addLink, deleteLink };
}
