"use client";

import { useEffect } from "react";

/**
 * The landing page's behaviour, ported from the original vanilla script.
 * Markup stays server rendered; this only wires up what needs a browser.
 */
export default function SiteBehavior() {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const timers = new Set<number>();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function $<T extends Element>(sel: string, root: ParentNode = document) {
      return root.querySelector<T>(sel);
    }
    function $$<T extends Element>(sel: string, root: ParentNode = document) {
      return Array.from(root.querySelectorAll<T>(sel));
    }

    /* ---------- mobile nav ---------- */
    const navToggle = $<HTMLButtonElement>(".nav-toggle");
    const navPanel = $<HTMLElement>("#nav-panel");

    if (navToggle && navPanel) {
      const closeNav = () => {
        navToggle.setAttribute("aria-expanded", "false");
        navPanel.hidden = true;
      };

      navToggle.addEventListener(
        "click",
        () => {
          const open = navToggle.getAttribute("aria-expanded") === "true";
          navToggle.setAttribute("aria-expanded", String(!open));
          navPanel.hidden = open;
        },
        { signal }
      );

      navPanel.addEventListener(
        "click",
        (event) => {
          if ((event.target as Element).closest("a")) closeNav();
        },
        { signal }
      );

      document.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
            closeNav();
            navToggle.focus();
          }
        },
        { signal }
      );
    }

    /* ---------- reveal ---------- */
    const revealEls = $$<HTMLElement>(".reveal");
    let observer: IntersectionObserver | undefined;

    if (revealEls.length) {
      if ("IntersectionObserver" in window && !reduceMotion.matches) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-in");
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
        );
        revealEls.forEach((el) => observer?.observe(el));
      } else {
        revealEls.forEach((el) => el.classList.add("is-in"));
      }
    }

    /* ---------- the orders board ---------- */
    const stages = $$<HTMLButtonElement>(".stage");
    const boardDetail = $<HTMLElement>(".board-detail");

    stages.forEach((stage) => {
      stage.addEventListener(
        "click",
        () => {
          stages.forEach((other) =>
            other.setAttribute("aria-pressed", String(other === stage))
          );
          if (boardDetail) boardDetail.textContent = stage.dataset.detail || "";
        },
        { signal }
      );
    });

    /* ---------- lineage trace ---------- */
    const mapEdges = $$<SVGPathElement>(".map-edge").map((path) => ({
      path,
      from: path.dataset.from,
      to: path.dataset.to,
    }));
    const mapNodes = $$<SVGGElement>(".map-node");
    const mapDetail = $<HTMLElement>("[data-map-detail]");
    const mapDefault = mapDetail ? mapDetail.innerHTML : "";
    const names: Record<string, string> = {
      orders: "postgres.orders",
      charges: "stripe.charges",
      events: "s3.events",
      stg_orders: "stg_orders",
      stg_charges: "stg_charges",
      stg_events: "stg_events",
      fct_orders: "fct_orders",
      dim_customers: "dim_customers",
      rev_daily: "rev_daily",
      churn_monthly: "churn_monthly",
      exec_dashboard: "exec_dashboard",
      rev_alerts: "#rev-alerts",
    };

    const list = (ids: string[]) => {
      const items = ids.map((id) => names[id] || id);
      if (items.length < 2) return items.join("");
      if (items.length === 2) return items[0] + " and " + items[1];
      return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
    };

    const walk = (start: string, direction: "up" | "down") => {
      const seen = new Set<string>();
      let frontier = [start];
      while (frontier.length) {
        const next: string[] = [];
        frontier.forEach((id) => {
          mapEdges.forEach((edge) => {
            const from = direction === "down" ? edge.from : edge.to;
            const to = direction === "down" ? edge.to : edge.from;
            if (from === id && to && !seen.has(to) && to !== start) {
              seen.add(to);
              next.push(to);
            }
          });
        });
        frontier = next;
      }
      return seen;
    };

    const trace = (id: string) => {
      if (!mapNodes.length) return;
      const down = walk(id, "down");
      const up = walk(id, "up");
      const keep = new Set([id, ...down, ...up]);

      mapNodes.forEach((node) => {
        node.classList.toggle("is-lit", keep.has(node.dataset.node || ""));
      });
      mapEdges.forEach((edge) => {
        const onPath =
          (up.has(edge.from || "") || edge.from === id) &&
          (down.has(edge.to || "") || edge.to === id);
        edge.path.classList.toggle("is-lit", onPath);
        edge.path.classList.toggle("is-muted", !onPath);
      });

      if (mapDetail) {
        const inbound = mapEdges.filter((edge) => edge.to === id).map((edge) => edge.from || "");
        const outbound = mapEdges.filter((edge) => edge.from === id).map((edge) => edge.to || "");
        const label = "<strong>" + (names[id] || id) + "</strong>";
        let sentence: string;
        if (!inbound.length) {
          sentence = label + " is a source table. It feeds " + list(outbound) + ".";
        } else if (!outbound.length) {
          sentence = label + " is the end of the line. " + list(inbound) + " both land here.";
        } else {
          sentence = label + " reads from " + list(inbound) + " and feeds " + list(outbound) + ".";
        }
        mapDetail.innerHTML = sentence;
      }
    };

    const clearTrace = () => {
      mapNodes.forEach((node) => node.classList.remove("is-lit"));
      mapEdges.forEach((edge) => {
        edge.path.classList.remove("is-lit", "is-muted");
      });
      if (mapDetail) mapDetail.innerHTML = mapDefault;
    };

    mapNodes.forEach((node) => {
      node.addEventListener("mouseenter", () => trace(node.dataset.node || ""), { signal });
      node.addEventListener("focus", () => trace(node.dataset.node || ""), { signal });
      node.addEventListener("mouseleave", clearTrace, { signal });
      node.addEventListener("blur", clearTrace, { signal });
    });

    if (mapNodes.length) trace("fct_orders");

    /* ---------- query router ---------- */
    const engines = $$<HTMLElement>(".engine, .rm-engine");
    const routes = $$<SVGPathElement>(".route");
    const routerNote = $<HTMLElement>("[data-router-note]");
    const routerNotes: Record<string, string> = {
      snowflake: "Snowflake at $0.42. Fastest at 1.9s, and four times the cost.",
      bigquery: "BigQuery at $0.11, inside the 3 second budget.",
      duckdb: "DuckDB at $0.02, but 11.2s is outside the budget.",
    };

    const pickEngine = (id: string) => {
      engines.forEach((engine) => {
        engine.setAttribute("aria-pressed", String(engine.dataset.engine === id));
      });
      routes.forEach((route) => {
        const chosen = route.dataset.engine === id;
        route.classList.toggle("is-lit", chosen);
        route.classList.toggle("is-muted", !chosen);
      });
      if (routerNote) routerNote.textContent = routerNotes[id] || "";
    };

    engines.forEach((engine) => {
      engine.addEventListener("click", () => pickEngine(engine.dataset.engine || ""), { signal });
      engine.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            pickEngine(engine.dataset.engine || "");
          }
        },
        { signal }
      );
    });

    /* ---------- ask the map ---------- */
    const askInput = $<HTMLInputElement>("#ask-input");
    const askButton = $<HTMLButtonElement>("[data-ask]");
    const answerBox = $<HTMLElement>("[data-answer]");
    const answerText = $<HTMLElement>("[data-answer-text]");
    const answers = [
      { test: /late|stale|blocked|behind/i, text: "events_raw is 38 minutes past its 09:00 window. The extract has not landed since 03:58, and fct_orders is blocked behind it." },
      { test: /own|owner|who|team/i, text: "events_raw is owned by A. Haddad, with M. Okafor as backup. Its freshness target is 30 minutes." },
      { test: /cost|spend|expensive|dollar|bill/i, text: "churn_monthly cost $412 this week across three runs. BigQuery served all three." },
      { test: /order|revenue|pipeline/i, text: "The orders extract is the open item today. It is 38 minutes late, and fct_orders has been blocked since 04:12." },
    ];
    const fallbackAnswer = "The orders extract is the open item today. It is 38 minutes late, and fct_orders has been blocked since 04:12.";

    const ask = (question: string) => {
      if (!answerBox || !answerText) return;
      const found = answers.find((entry) => entry.test.test(question));
      answerText.textContent = found ? found.text : fallbackAnswer;
      answerBox.hidden = false;
    };

    if (askButton && askInput) {
      askButton.addEventListener("click", () => ask(askInput.value.trim()), { signal });
      askInput.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            ask(askInput.value.trim());
          }
        },
        { signal }
      );
    }

    $$<HTMLButtonElement>("[data-q]").forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          if (askInput) askInput.value = button.dataset.q || "";
          ask(button.dataset.q || "");
        },
        { signal }
      );
    });

    /* ---------- copy ---------- */
    $$<HTMLButtonElement>(".copy").forEach((button) => {
      button.addEventListener(
        "click",
        async () => {
          const value = button.dataset.copy || "";
          try {
            await navigator.clipboard.writeText(value);
            button.textContent = "Copied";
          } catch {
            button.textContent = "Press Ctrl C";
          }
          const id = window.setTimeout(() => {
            button.textContent = "Copy";
            timers.delete(id);
          }, 1800);
          timers.add(id);
        },
        { signal }
      );
    });

    return () => {
      controller.abort();
      observer?.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return null;
}
