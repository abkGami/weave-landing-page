export default function SiteFooter() {
  return (
    <>
      <footer className="foot">
        <div className="container">
          <div className="foot-top">
            <div className="foot-brand">
              <a className="brand" href="#main" aria-label="Arbor, back to top">
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
              <p className="foot-line">A living map of your data.</p>
              <a className="btn btn-primary" href="#setup">Connect a warehouse</a>
            </div>
            <nav className="foot-cols" aria-label="Footer">
              <div className="foot-col">
                <p className="foot-head">Product</p>
                <a href="#lineage">Lineage</a>
                <a href="#board">Owners</a>
                <a href="#spend">Spend</a>
                <a href="#router">Router</a>
              </div>
              <div className="foot-col">
                <p className="foot-head">Setup</p>
                <a href="#setup">Install</a>
                <a href="#ask">Ask the map</a>
                <a href="#permissions">Permissions</a>
              </div>
            </nav>
          </div>
          <div className="foot-word" aria-hidden="true">arbor</div>
          <div className="foot-bottom">
            <p>A design concept. The workspace is sample data.</p>
            <p>Built as a study, 2026.</p>
          </div>
        </div>
      </footer>

    </>
  );
}
