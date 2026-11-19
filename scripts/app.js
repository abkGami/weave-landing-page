(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- mobile nav ---------- */
  const navToggle = $('.nav-toggle');
  const navPanel = $('#nav-panel');

  if (navToggle && navPanel) {
    const closeNav = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navPanel.hidden = true;
    };
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navPanel.hidden = open;
    });
    navPanel.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ---------- reveal ---------- */
  const revealEls = $$('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !reduceMotion.matches) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-in'));
    }
  }

  /* ---------- the orders board ---------- */
  const stages = $$('.stage');
  const boardDetail = $('.board-detail');
  stages.forEach((stage) => {
    stage.addEventListener('click', () => {
      stages.forEach((other) => other.setAttribute('aria-pressed', String(other === stage)));
      if (boardDetail) boardDetail.textContent = stage.dataset.detail || '';
    });
  });

  /* ---------- lineage trace ---------- */
  const mapEdges = $$('.map-edge').map((path) => ({
    path,
    from: path.dataset.from,
    to: path.dataset.to,
  }));
  const mapNodes = $$('.map-node');
  const mapDetail = $('[data-map-detail]');
  const mapDefault = mapDetail ? mapDetail.innerHTML : '';
  const names = {
    orders: 'postgres.orders',
    charges: 'stripe.charges',
    events: 's3.events',
    stg_orders: 'stg_orders',
    stg_charges: 'stg_charges',
    stg_events: 'stg_events',
    fct_orders: 'fct_orders',
    dim_customers: 'dim_customers',
    rev_daily: 'rev_daily',
    churn_monthly: 'churn_monthly',
    exec_dashboard: 'exec_dashboard',
    rev_alerts: '#rev-alerts',
  };

  const list = (ids) => {
    const items = ids.map((id) => names[id] || id);
    if (items.length < 2) return items.join('');
    if (items.length === 2) return items[0] + ' and ' + items[1];
    return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
  };

  const walk = (start, direction) => {
    const seen = new Set();
    let frontier = [start];
    while (frontier.length) {
      const next = [];
      frontier.forEach((id) => {
        mapEdges.forEach((edge) => {
          const from = direction === 'down' ? edge.from : edge.to;
          const to = direction === 'down' ? edge.to : edge.from;
          if (from === id && !seen.has(to) && to !== start) {
            seen.add(to);
            next.push(to);
          }
        });
      });
      frontier = next;
    }
    return seen;
  };

  const trace = (id) => {
    if (!mapNodes.length) return;
    const down = walk(id, 'down');
    const up = walk(id, 'up');
    const keep = new Set([id, ...down, ...up]);

    mapNodes.forEach((node) => {
      node.classList.toggle('is-lit', keep.has(node.dataset.node));
    });
    mapEdges.forEach((edge) => {
      const onPath = (up.has(edge.from) || edge.from === id) && (down.has(edge.to) || edge.to === id);
      edge.path.classList.toggle('is-lit', onPath);
      edge.path.classList.toggle('is-muted', !onPath);
    });

    if (mapDetail) {
      const inbound = mapEdges.filter((edge) => edge.to === id).map((edge) => edge.from);
      const outbound = mapEdges.filter((edge) => edge.from === id).map((edge) => edge.to);
      const label = '<strong>' + (names[id] || id) + '</strong>';
      let sentence;
      if (!inbound.length) {
        sentence = label + ' is a source table. It feeds ' + list(outbound) + '.';
      } else if (!outbound.length) {
        sentence = label + ' is the end of the line. ' + list(inbound) + ' both land here.';
      } else {
        sentence = label + ' reads from ' + list(inbound) + ' and feeds ' + list(outbound) + '.';
      }
      mapDetail.innerHTML = sentence;
    }
  };

  const clearTrace = () => {
    mapNodes.forEach((node) => node.classList.remove('is-lit'));
    mapEdges.forEach((edge) => {
      edge.path.classList.remove('is-lit', 'is-muted');
    });
    if (mapDetail) mapDetail.innerHTML = mapDefault;
  };

  mapNodes.forEach((node) => {
    node.addEventListener('mouseenter', () => trace(node.dataset.node));
    node.addEventListener('focus', () => trace(node.dataset.node));
    node.addEventListener('mouseleave', clearTrace);
    node.addEventListener('blur', clearTrace);
  });

  if (mapNodes.length) trace('fct_orders');

  /* ---------- query router ---------- */
  const engines = $$('.engine, .rm-engine');
  const routes = $$('.route');
  const routerNote = $('[data-router-note]');
  const routerNotes = {
    snowflake: 'Snowflake at $0.42. Fastest at 1.9s, and four times the cost.',
    bigquery: 'BigQuery at $0.11, inside the 3 second budget.',
    duckdb: 'DuckDB at $0.02, but 11.2s is outside the budget.',
  };

  const pickEngine = (id) => {
    engines.forEach((engine) => {
      engine.setAttribute('aria-pressed', String(engine.dataset.engine === id));
    });
    routes.forEach((route) => {
      const chosen = route.dataset.engine === id;
      route.classList.toggle('is-lit', chosen);
      route.classList.toggle('is-muted', !chosen);
    });
    if (routerNote) routerNote.textContent = routerNotes[id] || '';
  };

  engines.forEach((engine) => {
    engine.addEventListener('click', () => pickEngine(engine.dataset.engine));
    engine.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        pickEngine(engine.dataset.engine);
      }
    });
  });

  /* ---------- ask the map ---------- */
  const askInput = $('#ask-input');
  const askButton = $('[data-ask]');
  const answerBox = $('[data-answer]');
  const answerText = $('[data-answer-text]');
  const answers = [
    { test: /late|stale|blocked|behind/i, text: 'events_raw is 38 minutes past its 09:00 window. The extract has not landed since 03:58, and fct_orders is blocked behind it.' },
    { test: /own|owner|who|team/i, text: 'events_raw is owned by A. Haddad, with M. Okafor as backup. Its freshness target is 30 minutes.' },
    { test: /cost|spend|expensive|dollar|bill/i, text: 'churn_monthly cost $412 this week across three runs. BigQuery served all three.' },
    { test: /order|revenue|pipeline/i, text: 'The orders extract is the open item today. It is 38 minutes late, and fct_orders has been blocked since 04:12.' },
  ];
  const fallbackAnswer = 'The orders extract is the open item today. It is 38 minutes late, and fct_orders has been blocked since 04:12.';

  const ask = (question) => {
    if (!answerBox || !answerText) return;
    const found = answers.find((entry) => entry.test.test(question));
    answerText.textContent = found ? found.text : fallbackAnswer;
    answerBox.hidden = false;
  };

  if (askButton && askInput) {
    askButton.addEventListener('click', () => ask(askInput.value.trim()));
    askInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ask(askInput.value.trim());
      }
    });
  }

  $$('[data-q]').forEach((button) => {
    button.addEventListener('click', () => {
      if (askInput) askInput.value = button.dataset.q || '';
      ask(button.dataset.q || '');
    });
  });

  /* ---------- copy ---------- */
  $$('.copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Press Ctrl C';
      }
      window.setTimeout(() => { button.textContent = 'Copy'; }, 1800);
    });
  });
})();
