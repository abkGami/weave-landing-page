# Arbor — A living map of your data

Arbor is a data observability and lineage platform for data teams. It maps lineage, freshness, and spend across your warehouse, dbt project, and orchestrator — so a stalled table is visible before the dashboard lies.

## What it does

Arbor connects to your data warehouse (Snowflake, BigQuery), your dbt project, and your orchestrator, then builds a live, column-level map of how data flows from source tables to models to dashboards. When a pipeline stalls, you see exactly which hop broke and what's affected downstream — instead of discovering it when a dashboard shows stale revenue.

### Core capabilities

**Data lineage**
- End-to-end column-level lineage from source tables (e.g. `postgres.orders`, `stripe.charges`, `s3.events`) through staging models (`stg_orders`) and fact/mart tables (`fct_orders`, `rev_daily`) to dashboards and alerts (`exec_dashboard`, `#rev-alerts`).
- Interactive map: hover or focus a node to trace its upstream and downstream dependencies; lit paths show the affected flow, muted paths show everything else.
- Fallback list view for mobile and reduced-motion users.

**Freshness & ownership**
- Ownership board showing every dataset, its owner, freshness SLA (e.g. "38 min late", "6 min"), data quality score, and spend.
- Stage-level pipeline status (late / blocked / serving) with per-stage detail on what went wrong.
- Knows who owns what and what's late, answered before standup.

**Spend visibility**
- Cost per warehouse, model, and query, joined to the lineage map.
- Breakdown by warehouse (e.g. Snowflake 61%, BigQuery 39%) and by model/query within each.

**Query routing**
- Prices each query against multiple engines (Snowflake, BigQuery, DuckDB) and routes it inside your latency budget.
- Shows cost and latency per engine so you pick the cheapest option that still meets the clock.

**Ask the map**
- Natural-language Q&A over your data map (e.g. "Which table is late today?", "Who owns events_raw?", "What did churn_monthly cost?").
- Answers cite the tables they came from.

**Setup & security**
- Two commands: `npx arbor init` and `arbor status`.
- Read-only role only — metadata views (column names, types, statistics). No row data, no write grants.
- Runs in your VPC or in Arbor's.

## Real-world use case

Imagine a data team whose executive revenue dashboard hasn't updated since yesterday. With Arbor, they open the lineage map and see that the `orders` extract missed its 04:12 window, `stg_orders` is blocked waiting on it, `fct_orders` is blocked behind `stg_orders`, and the `exec_dashboard` is serving yesterday's revenue. They can trace the stalled hop, see that `events_raw` is owned by A. Haddad and is 38 minutes past its freshness target, check that `churn_monthly` cost $412 this week on BigQuery, and route the next query through the cheapest engine that still meets the latency budget — all without exposing any customer row data.

## Built with

- Next.js 16 (App Router, React 19, TypeScript)
- CSS custom properties (OKLCH design system)

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # production server
npm run typecheck
```

## Project structure

```
app/               # Next.js app router (layout, page, global styles)
components/        # React page sections (Hero, Lineage, Ownership, Spend, Router, Setup, Ask, Permissions, header/footer/behavior)
lib/               # Utility helpers (vars for inline custom properties)
styles/            # tokens.css, base.css, site.css (design system + component styles)
```

## License

A design concept. The workspace is sample data. Built as a study, 2026.
