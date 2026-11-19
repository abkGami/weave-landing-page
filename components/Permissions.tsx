export default function Permissions() {
  return (
    <>
      <section className="section permissions" id="permissions" aria-labelledby="perm-title">
        <div className="container">
          <h2 id="perm-title">Reads metadata. Never your rows.</h2>
          <p className="body">Column names, types and statistics only.</p>
          <ul className="perm-list reveal">
            <li>
              <h3>Read-only role</h3>
              <p>Metadata views only. No write grants.</p>
            </li>
            <li>
              <h3>No row data</h3>
              <p>Counts and ranges, computed in place.</p>
            </li>
            <li>
              <h3>Run it where you like</h3>
              <p>Your VPC, or ours.</p>
            </li>
          </ul>
          <a className="btn btn-primary btn-lg" href="#setup">Connect a warehouse</a>
        </div>
      </section>

    </>
  );
}
