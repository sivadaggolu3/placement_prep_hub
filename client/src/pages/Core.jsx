import TopicPage from '../components/TopicPage';
import QuickLinks from '../components/QuickLinks';
import InterviewQA from '../components/InterviewQA';
import { CORE_SECTIONS } from '../data/core';
import { CORE_LINKS } from '../data/resources';

export default function Core() {
  return (
    <>
      <TopicPage
        emoji="📚"
        title="Core Subjects"
        subtitle="Click + Add to track a topic on your dashboard"
        sections={CORE_SECTIONS}
        extra={
          <div className="qlinks-row">
            <QuickLinks title="Study on GeeksforGeeks" presetLinks={CORE_LINKS} category="Core" />
          </div>
        }
      />
      <div className="wrap">
        <InterviewQA />
      </div>
    </>
  );
}
