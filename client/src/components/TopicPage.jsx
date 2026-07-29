import { useTasks } from '../context/TasksContext';

export default function TopicPage({ emoji, title, subtitle, sections, extra }) {
  const { addTask } = useTasks();

  return (
    <div className="page active">
      <div className="wrap">
        <div className="ph">
          <h1>{emoji} {title}</h1>
          <p>{subtitle}</p>
        </div>
        {extra}
        <div className="sgrid">
          {sections.map((section) => (
            <div className="scard" key={section.title}>
              <h3>{section.icon} {section.title}</h3>
              <ul>
                {section.topics.map((topic) => (
                  <li key={topic}>
                    {topic}
                    <button
                      className="add-btn"
                      onClick={() => addTask(topic, section.category)}
                    >
                      + Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
