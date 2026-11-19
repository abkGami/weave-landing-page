import { vars } from "@/lib/css";

export default function Ownership() {
  return (
    <>
      <section className="band" id="board" aria-labelledby="board-title">
        <div className="container board-grid">
          <div className="board-copy reveal">
            <h2 id="board-title">See who owns what, and what is late.</h2>
            <p className="body">Owners, freshness targets and spend on one board, answered before standup.</p>
            <a className="link" href="#ask">Ask the map about an owner</a>
          </div>
          <div className="table-card reveal" style={vars({ "--i": 1 })}>
            <div className="table-head">
              <p className="table-title">Ownership</p>
              <p className="chip">30 day window</p>
            </div>
            <table className="data">
              <caption className="visually-hidden">Sample ownership board for the orders workspace</caption>
              <thead>
                <tr>
                  <th scope="col">Dataset</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Freshness</th>
                  <th scope="col">Quality</th>
                  <th scope="col" className="num">Spend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="ds" data-label="Dataset">fct_orders</td>
                  <td data-label="Owner">M. Okafor</td>
                  <td data-label="Freshness">6 min</td>
                  <td data-label="Quality">
                    <span className="qbar"><span className="qbar-track"><span className="qbar-fill" style={vars({ "--v": 0.98 })} /></span>98%</span>
                  </td>
                  <td className="num" data-label="Spend">$1.8k</td>
                </tr>
                <tr>
                  <td className="ds" data-label="Dataset">events_raw</td>
                  <td data-label="Owner">A. Haddad</td>
                  <td className="late" data-label="Freshness">38 min late</td>
                  <td data-label="Quality">
                    <span className="qbar"><span className="qbar-track"><span className="qbar-fill" style={vars({ "--v": 0.71 })} /></span>71%</span>
                  </td>
                  <td className="num" data-label="Spend">$2.4k</td>
                </tr>
                <tr>
                  <td className="ds" data-label="Dataset">stg_charges</td>
                  <td data-label="Owner">R. Silva</td>
                  <td data-label="Freshness">42 min</td>
                  <td data-label="Quality">
                    <span className="qbar"><span className="qbar-track"><span className="qbar-fill" style={vars({ "--v": 0.94 })} /></span>94%</span>
                  </td>
                  <td className="num" data-label="Spend">$620</td>
                </tr>
                <tr>
                  <td className="ds" data-label="Dataset">dim_customers</td>
                  <td data-label="Owner">J. Park</td>
                  <td data-label="Freshness">3 h</td>
                  <td data-label="Quality">
                    <span className="qbar"><span className="qbar-track"><span className="qbar-fill" style={vars({ "--v": 0.89 })} /></span>89%</span>
                  </td>
                  <td className="num" data-label="Spend">$310</td>
                </tr>
                <tr>
                  <td className="ds" data-label="Dataset">rev_daily</td>
                  <td data-label="Owner">M. Okafor</td>
                  <td data-label="Freshness">12 min</td>
                  <td data-label="Quality">
                    <span className="qbar"><span className="qbar-track"><span className="qbar-fill" style={vars({ "--v": 0.99 })} /></span>99%</span>
                  </td>
                  <td className="num" data-label="Spend">$480</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </>
  );
}
