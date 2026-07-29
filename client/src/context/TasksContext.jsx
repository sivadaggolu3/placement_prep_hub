import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  };

  const refresh = useCallback(async () => {
    if (!user) return;
    const res = await api.get('/tasks');
    setTasks(res.data);
  }, [user]);

  useEffect(() => {
    if (user) refresh();
    else setTasks([]);
  }, [user, refresh]);

  const addTask = async (title, category, { silent = false } = {}) => {
    if (!silent) {
      const dupe = tasks.some(
        (t) => t.title === title && t.category === category && !t.done
      );
      if (dupe) {
        showToast(`"${title}" already in pending!`);
        return;
      }
    }
    const res = await api.post('/tasks', { title, category });
    setTasks((prev) => [res.data, ...prev]);
    showToast(`➕ ${title} added!`);
  };

  const markDone = async (id) => {
    const res = await api.put(`/tasks/${id}`, { done: true });
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    showToast('✅ Marked complete!');
  };

  const markPending = async (id) => {
    const res = await api.put(`/tasks/${id}`, { done: false });
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    showToast('↩ Moved to pending');
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast('🗑️ Task deleted');
  };

  const resetAll = async () => {
    await api.delete('/tasks');
    setTasks([]);
    showToast('🔄 All tasks reset');
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, markDone, markPending, deleteTask, resetAll, toastMsg }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
