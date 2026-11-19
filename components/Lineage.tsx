export default function Lineage() {
  return (
    <>
      <section className="section" id="lineage" aria-labelledby="lineage-title">
        <div className="container">
          <div className="section-head reveal">
            <h2 id="lineage-title">Every column, from source to dashboard.</h2>
            <p className="body">Arbor reads metadata from your warehouse, dbt project and orchestrator, then draws the path a column takes. When a hop stalls, you see the hop.</p>
          </div>
          <div className="map-wrap reveal">
            <svg className="map" viewBox="0 0 1000 360" role="group" aria-label="Column lineage for the orders pipeline. Hover or focus a node to trace its upstream and downstream.">
              <g className="map-edges">
                <path className="map-edge" data-from="orders" data-to="stg_orders" d="M164 68 C194 68 194 68 224 68" />
                <path className="map-edge" data-from="charges" data-to="stg_charges" d="M164 176 C194 176 194 176 224 176" />
                <path className="map-edge" data-from="events" data-to="stg_events" d="M164 284 C194 284 194 284 224 284" />
                <path className="map-edge" data-from="stg_orders" data-to="fct_orders" d="M368 68 C398 68 398 120 428 120" />
                <path className="map-edge" data-from="stg_charges" data-to="fct_orders" d="M368 176 C398 176 398 120 428 120" />
                <path className="map-edge" data-from="stg_events" data-to="dim_customers" d="M368 284 C398 284 398 260 428 260" />
                <path className="map-edge" data-from="fct_orders" data-to="rev_daily" d="M572 120 C602 120 602 96 632 96" />
                <path className="map-edge" data-from="fct_orders" data-to="churn_monthly" d="M572 120 C602 120 602 264 632 264" />
                <path className="map-edge" data-from="dim_customers" data-to="churn_monthly" d="M572 260 C602 260 602 264 632 264" />
                <path className="map-edge" data-from="rev_daily" data-to="exec_dashboard" d="M776 96 C806 96 806 96 836 96" />
                <path className="map-edge" data-from="rev_daily" data-to="rev_alerts" d="M776 96 C806 96 806 264 836 264" />
                <path className="map-edge" data-from="churn_monthly" data-to="exec_dashboard" d="M776 264 C806 264 806 96 836 96" />
              </g>
              <g className="map-node" tabIndex={0} data-node="orders" aria-label="postgres.orders, source table">
                <rect x={20} y={48} width={144} height={40} rx={12} /><text x={34} y={73}>postgres.orders</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="charges" aria-label="stripe.charges, source table">
                <rect x={20} y={156} width={144} height={40} rx={12} /><text x={34} y={181}>stripe.charges</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="events" aria-label="s3.events, source table">
                <rect x={20} y={264} width={144} height={40} rx={12} /><text x={34} y={289}>s3.events</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="stg_orders" aria-label="stg_orders, staging model">
                <rect x={224} y={48} width={144} height={40} rx={12} /><text x={238} y={73}>stg_orders</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="stg_charges" aria-label="stg_charges, staging model">
                <rect x={224} y={156} width={144} height={40} rx={12} /><text x={238} y={181}>stg_charges</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="stg_events" aria-label="stg_events, staging model">
                <rect x={224} y={264} width={144} height={40} rx={12} /><text x={238} y={289}>stg_events</text>
              </g>
              <g className="map-node is-key" tabIndex={0} data-node="fct_orders" aria-label="fct_orders, model, used by two marts">
                <rect x={428} y={100} width={144} height={40} rx={12} /><text x={442} y={125}>fct_orders</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="dim_customers" aria-label="dim_customers, model">
                <rect x={428} y={240} width={144} height={40} rx={12} /><text x={442} y={265}>dim_customers</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="rev_daily" aria-label="rev_daily, mart">
                <rect x={632} y={76} width={144} height={40} rx={12} /><text x={646} y={101}>rev_daily</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="churn_monthly" aria-label="churn_monthly, mart">
                <rect x={632} y={244} width={144} height={40} rx={12} /><text x={646} y={269}>churn_monthly</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="exec_dashboard" aria-label="exec_dashboard, dashboard">
                <rect x={836} y={76} width={144} height={40} rx={12} /><text x={850} y={101}>exec_dashboard</text>
              </g>
              <g className="map-node" tabIndex={0} data-node="rev_alerts" aria-label="rev-alerts, Slack channel">
                <rect x={836} y={244} width={144} height={40} rx={12} /><text x={850} y={269}>#rev-alerts</text>
              </g>
            </svg>
            <div className="map-list" aria-label="Column lineage, listed by layer">
              <div className="ml-group">
                <p className="ml-layer">Sources</p>
                <ul>
                  <li><span className="ml-name">postgres.orders</span></li>
                  <li><span className="ml-name">stripe.charges</span></li>
                  <li><span className="ml-name">s3.events</span></li>
                </ul>
              </div>
              <div className="ml-group">
                <p className="ml-layer">Models</p>
                <ul>
                  <li><span className="ml-name">stg_orders</span></li>
                  <li><span className="ml-name">stg_charges</span></li>
                  <li><span className="ml-name">stg_events</span></li>
                  <li><span className="ml-name">fct_orders</span></li>
                  <li><span className="ml-name">dim_customers</span></li>
                </ul>
              </div>
              <div className="ml-group">
                <p className="ml-layer">Outputs</p>
                <ul>
                  <li><span className="ml-name">rev_daily</span></li>
                  <li><span className="ml-name">churn_monthly</span></li>
                  <li><span className="ml-name">exec_dashboard</span></li>
                  <li><span className="ml-name">#rev-alerts</span></li>
                </ul>
              </div>
            </div>
            <div className="map-detail">
              <p aria-live="polite" data-map-detail><strong>fct_orders</strong> sits at the centre of this map. Five tables feed it and two marts read from it.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
