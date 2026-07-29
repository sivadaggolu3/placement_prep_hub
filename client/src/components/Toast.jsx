import { useTasks } from '../context/TasksContext';

export default function Toast() {
  const { toastMsg } = useTasks();
  return <div id="toast" className={toastMsg ? 'show' : ''}>{toastMsg}</div>;
}
