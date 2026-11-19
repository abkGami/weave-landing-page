import { vars } from "@/lib/css";

export default function Ask() {
  return (
    <>
      <section className="section" id="ask" aria-labelledby="ask-title">
        <div className="container ask-grid">
          <div className="ask-copy reveal">
            <h2 id="ask-title">Ask the map a question.</h2>
            <p className="body">Answers cite the tables they came from.</p>
          </div>
          <div className="ask-panel reveal" style={vars({ "--i": 1 })}>
            <div className="ask-field">
              <label className="visually-hidden" htmlFor="ask-input">Ask about your data</label>
              <input id="ask-input" type="text" placeholder="Which table is late today?" autoComplete="off" />
              <button className="ask-send" type="button" data-ask aria-label="Ask the map">
                <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 13V3" /><path d="M3.5 7.5 8 3l4.5 4.5" />
                </svg>
              </button>
            </div>
            <ul className="ask-suggestions">
              <li><button type="button" data-q="Which table is late today?">Which table is late today?</button></li>
              <li><button type="button" data-q="Who owns events_raw?">Who owns events_raw?</button></li>
              <li><button type="button" data-q="What did churn_monthly cost?">What did churn_monthly cost?</button></li>
            </ul>
            <div className="ask-answer" data-answer hidden>
              <span className="tag">Sample answer</span>
              <p data-answer-text />
            </div>
            <p className="ask-caption">Sample answers, running on the sample workspace.</p>
          </div>
        </div>
      </section>

    </>
  );
}
