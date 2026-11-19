export default function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Know your data before it breaks.</h1>
            <p className="lede">Lineage, freshness and spend for every pipeline your team owns.</p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#setup">Connect a warehouse</a>
              <a className="link" href="#ask">Ask the map a question</a>
            </div>
            <p className="hero-note">Read-only role. No row data.</p>
          </div>
          <div className="hero-board">
            <div className="board" aria-label="Sample workspace, the orders pipeline">
              <div className="board-top">
                <div>
                  <p className="board-name">orders</p>
                  <p className="board-sub">warehouse.prod</p>
                </div>
                <p className="chip chip-warn">Stale 38 min</p>
              </div>
              <div className="board-stages">
                <button className="stage" type="button" data-state="late" aria-pressed="true" data-detail="The orders extract missed its 04:12 window. The dashboard still shows yesterday’s revenue.">
                  <span className="stage-mark" aria-hidden="true" />
                  <span className="stage-name">postgres.orders</span>
                  <span className="stage-meta">38 min late</span>
                </button>
                <button className="stage" type="button" data-state="blocked" aria-pressed="false" data-detail="stg_orders has no new rows since 04:12. Its freshness target is 30 minutes.">
                  <span className="stage-mark" aria-hidden="true" />
                  <span className="stage-name">stg_orders</span>
                  <span className="stage-meta">blocked</span>
                </button>
                <button className="stage" type="button" data-state="blocked" aria-pressed="false" data-detail="fct_orders is waiting on stg_orders. The 05:00 run has not started.">
                  <span className="stage-mark" aria-hidden="true" />
                  <span className="stage-name">fct_orders</span>
                  <span className="stage-meta">blocked</span>
                </button>
                <button className="stage" type="button" aria-pressed="false" data-detail="The dashboard is serving yesterday’s revenue. No alert has fired yet.">
                  <span className="stage-mark" aria-hidden="true" />
                  <span className="stage-name">exec_dashboard</span>
                  <span className="stage-meta">serving yesterday</span>
                </button>
              </div>
              <figure className="board-chart">
                <svg viewBox="0 0 320 92" role="img" aria-label="Rows landed per minute, rising until the extract stops at 03:58.">
                  <path d="M0 70 L31 64 L62 68 L93 54 L124 58 L155 46 L186 50 L217 36 L248 40 L248 92 L0 92 Z" fill="var(--color-accent-soft)" />
                  <path d="M0 70 L31 64 L62 68 L93 54 L124 58 L155 46 L186 50 L217 36 L248 40" fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M248 40 L320 40" fill="none" stroke="var(--color-rule)" strokeWidth="1.4" strokeDasharray="3 5" />
                  <circle cx={248} cy={40} r="3.4" fill="var(--color-accent)" />
                  <line x1={0} y1={92} x2={320} y2={92} stroke="var(--color-rule)" strokeWidth={1} />
                </svg>
                <figcaption>Rows per minute. Last row at 03:58.</figcaption>
              </figure>
              <p className="board-detail" aria-live="polite">The orders extract missed its 04:12 window. The dashboard still shows yesterday’s revenue.</p>
              <div className="board-foot">
                <span>Sample workspace</span>
                <a className="link" href="#lineage">Open the map</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
