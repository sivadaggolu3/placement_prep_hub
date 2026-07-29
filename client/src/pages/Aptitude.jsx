import TopicPage from '../components/TopicPage';
import QuickLinks from '../components/QuickLinks';
import { APTITUDE_SECTIONS } from '../data/aptitude';
import { APTITUDE_LINKS } from '../data/resources';

export default function Aptitude() {
  return (
    <TopicPage
      emoji="⚡"
      title="Aptitude Practice"
      subtitle="Click + Add to track a topic on your dashboard"
      sections={APTITUDE_SECTIONS}
      extra={
        <div className="qlinks-row">
          <QuickLinks title="Practice on IndiaBix" presetLinks={APTITUDE_LINKS} category="Aptitude" />
        </div>
      }
    />
  );
}
