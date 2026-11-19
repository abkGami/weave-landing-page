import { vars } from "@/lib/css";

export default function Setup() {
  return (
    <>
      <section className="section" id="setup" aria-labelledby="setup-title">
        <div className="container">
          <div className="setup-head reveal">
            <h2 id="setup-title">Two commands, then it stays quiet.</h2>
            <p className="body">A read-only role, and one command.</p>
          </div>
          <div className="setup-grid">
            <div className="terminal reveal">
              <div className="terminal-bar">
                <span>arbor init</span>
                <button className="copy" type="button" data-copy="npx arbor init">Copy</button>
              </div>
              <pre><code><span className="t-dim">$</span> npx arbor init{"\n"}<span className="t-dim">?</span> warehouse{"      "}snowflake://acme/prod{"\n"}<span className="t-dim">?</span> role{"           "}arbor_reader{"\n"}<span className="t-ok">ok</span> collector running in 14s{"\n"}{"\n"}<span className="t-dim">$</span> arbor status{"\n"}orders{"        "}<span className="t-hot">stale 38m</span>{"\n"}fct_orders{"    "}blocked upstream</code></pre>
            </div>
            <ol className="steps reveal" style={vars({ "--i": 1 })}>
              <li>
                <h3>Add the role</h3>
                <p>Paste a read-only key.</p>
                <span className="code-chip">arbor_reader</span>
              </li>
              <li>
                <h3>Run the collector</h3>
                <p>One container, every five minutes.</p>
                <span className="code-chip">npx arbor collect</span>
              </li>
              <li>
                <h3>Keep your tools</h3>
                <p>Your dbt project stays as it is.</p>
                <span className="code-chip">dbt build</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

    </>
  );
}
