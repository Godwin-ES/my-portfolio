// Pure-CSS intro: only visible when the boot script adds `html.intro` (first home visit per session).
export function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-loader-inner">
        <span className="intro-count" />
        <span className="intro-name">Godwin <em>Ekanem</em></span>
        <span className="intro-bar"><i /></span>
        <span className="intro-caption">AI Automation · AI Engineering</span>
      </div>
      <span className="intro-panel intro-panel-a" />
      <span className="intro-panel intro-panel-b" />
    </div>
  );
}
