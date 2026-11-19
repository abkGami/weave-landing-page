import { vars } from "@/lib/css";

export default function Spend() {
  return (
    <>
      <section className="section" id="spend" aria-labelledby="spend-title">
        <div className="container spend-grid">
          <div className="spend-bars reveal">
            <div className="spend-group">
              <div className="spend-total"><span>Snowflake</span><span>61%</span></div>
              <div className="spend-total-bar" style={vars({ "--v": 0.61 })}><i /></div>
              <div className="spend-row" style={vars({ "--v": 0.24 })}><span className="spend-name">fct_orders</span><span className="track"><i /></span><span className="spend-val">24%</span></div>
              <div className="spend-row" style={vars({ "--v": 0.18 })}><span className="spend-name">events_raw</span><span className="track"><i /></span><span className="spend-val">18%</span></div>
              <div className="spend-row" style={vars({ "--v": 0.11 })}><span className="spend-name">stg_charges</span><span className="track"><i /></span><span className="spend-val">11%</span></div>
              <div className="spend-row" style={vars({ "--v": 0.08 })}><span className="spend-name">other</span><span className="track"><i /></span><span className="spend-val">8%</span></div>
            </div>
            <div className="spend-group">
              <div className="spend-total"><span>BigQuery</span><span>39%</span></div>
              <div className="spend-total-bar" style={vars({ "--v": 0.39 })}><i /></div>
              <div className="spend-row" style={vars({ "--v": 0.16 })}><span className="spend-name">churn_monthly</span><span className="track"><i /></span><span className="spend-val">16%</span></div>
              <div className="spend-row" style={vars({ "--v": 0.13 })}><span className="spend-name">ad_hoc</span><span className="track"><i /></span><span className="spend-val">13%</span></div>
              <div className="spend-row" style={vars({ "--v": 0.10 })}><span className="spend-name">other</span><span className="track"><i /></span><span className="spend-val">10%</span></div>
            </div>
            <p className="spend-foot">Priced from the bills you already pay. Sample workspace, last 30 days.</p>
          </div>
          <div className="spend-copy reveal" style={vars({ "--i": 1 })}>
            <h2 id="spend-title">Know where every dollar goes.</h2>
            <p className="body">Cost per warehouse, model and query, joined to the lineage map.</p>
            <a className="link" href="#ask">Ask what a table cost</a>
          </div>
        </div>
      </section>

    </>
  );
}
