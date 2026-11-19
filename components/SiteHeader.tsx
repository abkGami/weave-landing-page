export default function SiteHeader() {
  return (
    <>
      <div>
        <div className="announce">
          <div className="container announce-inner">
            <p>Drift alerts land in Slack first.</p>
            <a href="#lineage">See how</a>
          </div>
        </div>
        <header className="masthead">
          <div className="container masthead-inner">
            <a className="brand" href="#main" aria-label="Arbor, home">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                <path d="M12 21V9" />
                <path d="M12 12.8c0-2.5 1.8-4.2 4.4-4.2" />
                <path d="M12 15.6c0-2.1-1.6-3.7-4.1-3.7" />
                <circle cx="17.4" cy="7.6" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="6.9" cy="10.9" r="1.5" fill="currentColor" stroke="none" />
                <circle cx={12} cy={21} r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="brand-name">arbor</span>
            </a>
            <nav className="nav" aria-label="Primary">
              <a href="#lineage">Lineage</a>
              <a href="#board">Owners</a>
              <a href="#spend">Spend</a>
              <a href="#setup">Setup</a>
            </nav>
            <div className="nav-actions">
              <a className="nav-signin" href="#ask">Sign in</a>
              <a className="btn btn-primary btn-sm" href="#setup">Start free</a>
            </div>
            <button className="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-panel">Menu</button>
            <div className="nav-panel" id="nav-panel" hidden>
              <a href="#lineage">Lineage</a>
              <a href="#board">Owners</a>
              <a href="#spend">Spend</a>
              <a href="#setup">Setup</a>
              <a href="#ask">Ask the map</a>
              <a className="btn btn-primary" href="#setup">Start free</a>
            </div>
          </div>
        </header>
      </div>

    </>
  );
}
