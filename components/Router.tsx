export default function Router() {
  return (
    <>
      <section className="section" id="router" aria-labelledby="router-title">
        <div className="container">
          <div className="router-card reveal">
            <div className="router-head">
              <h2 id="router-title">Cheapest engine that still meets the clock.</h2>
              <p className="body">Arbor prices each query against three engines, then routes it inside your latency budget. You keep the SQL.</p>
              <a className="link" href="#setup">Read how routing works</a>
            </div>
            <div className="router-visual">
              <svg className="router-svg" viewBox="0 0 1000 300" role="group" aria-label="One sample query priced against three engines. Select an engine to see its route.">
                <path className="route" data-engine="snowflake" d="M220 150 C380 150 560 62 760 62" />
                <path className="route is-lit" data-engine="bigquery" d="M220 150 C380 150 560 150 760 150" />
                <path className="route" data-engine="duckdb" d="M220 150 C380 150 560 238 760 238" />
                <g className="query">
                  <rect x={20} y={126} width={200} height={48} rx={12} />
                  <text x={34} y={147}>SELECT sum(total)</text>
                  <text x={34} y={164}>FROM orders</text>
                </g>
                <g className="engine" role="button" tabIndex={0} aria-pressed="false" data-engine="snowflake">
                  <rect x={760} y={30} width={220} height={64} rx={14} />
                  <text x={778} y={55}>Snowflake</text>
                  <text x={962} y={55} textAnchor="end">1.9s</text>
                  <text className="engine-cost" x={778} y={76}>$0.42 per run</text>
                </g>
                <g className="engine" role="button" tabIndex={0} aria-pressed="true" data-engine="bigquery">
                  <rect x={760} y={118} width={220} height={64} rx={14} />
                  <text x={778} y={143}>BigQuery</text>
                  <text x={962} y={143} textAnchor="end">2.4s</text>
                  <text className="engine-cost" x={778} y={164}>$0.11 per run</text>
                </g>
                <g className="engine" role="button" tabIndex={0} aria-pressed="false" data-engine="duckdb">
                  <rect x={760} y={206} width={220} height={64} rx={14} />
                  <text x={778} y={231}>DuckDB</text>
                  <text x={962} y={231} textAnchor="end">11.2s</text>
                  <text className="engine-cost" x={778} y={252}>$0.02 per run</text>
                </g>
              </svg>
              <div className="router-mobile" role="group" aria-label="Choose an engine for the sample query">
                <p className="rm-query">SELECT sum(total) FROM orders</p>
                <button className="rm-engine" type="button" data-engine="snowflake" aria-pressed="false">
                  <span className="rm-name">Snowflake</span>
                  <span className="rm-meta"><span>$0.42</span><span>1.9s</span></span>
                </button>
                <button className="rm-engine" type="button" data-engine="bigquery" aria-pressed="true">
                  <span className="rm-name">BigQuery</span>
                  <span className="rm-meta"><span>$0.11</span><span>2.4s</span></span>
                </button>
                <button className="rm-engine" type="button" data-engine="duckdb" aria-pressed="false">
                  <span className="rm-name">DuckDB</span>
                  <span className="rm-meta"><span>$0.02</span><span>11.2s</span></span>
                </button>
              </div>
              <div className="router-caption">
                <span>One sample query, priced three ways.</span>
                <span data-router-note aria-live="polite">BigQuery at $0.11, inside the 3 second budget.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
