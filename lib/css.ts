import type { CSSProperties } from "react";

/** Inline custom properties (progress values, stagger indexes) typed for JSX. */
export const vars = (value: Record<string, string | number>) => value as CSSProperties;
