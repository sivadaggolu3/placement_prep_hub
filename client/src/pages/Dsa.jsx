import TopicPage from '../components/TopicPage';
import QuickLinks from '../components/QuickLinks';
import { DSA_SECTIONS } from '../data/dsa';
import { DSA_SHEETS, CODING_PLATFORMS } from '../data/resources';

export default function Dsa() {
  return (
    <TopicPage
      emoji="🧮"
      title="DSA Topics"
      subtitle="Click + Add to track a topic on your dashboard"
      sections={DSA_SECTIONS}
      extra={
        <div className="qlinks-row">
          <QuickLinks title="Practice Sheets" presetLinks={DSA_SHEETS} category="DSA_SHEETS" />
          <QuickLinks title="Coding Platforms" presetLinks={CODING_PLATFORMS} category="DSA_PLATFORMS" />
        </div>
      }
    />
  );
}
