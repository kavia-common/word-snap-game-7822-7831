//
// Ocean Professional Theme constants and helpers
//

// PUBLIC_INTERFACE
export const Theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // Blue
    primaryHover: "#1D4ED8",
    secondary: "#F59E0B", // Amber
    secondaryHover: "#D97706",
    error: "#EF4444",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    shadow: "rgba(0, 0, 0, 0.06)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    round: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.06)",
    lg: "0 10px 25px rgba(0,0,0,0.08)",
  },
  transition: "all 200ms ease",
};

// PUBLIC_INTERFACE
export function applyCSSVariables() {
  const r = document.documentElement;
  const c = Theme.colors;
  const rad = Theme.radius;
  r.style.setProperty("--ocn-primary", c.primary);
  r.style.setProperty("--ocn-primary-hover", c.primaryHover);
  r.style.setProperty("--ocn-secondary", c.secondary);
  r.style.setProperty("--ocn-secondary-hover", c.secondaryHover);
  r.style.setProperty("--ocn-error", c.error);
  r.style.setProperty("--ocn-bg", c.background);
  r.style.setProperty("--ocn-surface", c.surface);
  r.style.setProperty("--ocn-text", c.text);
  r.style.setProperty("--ocn-text-muted", c.textMuted);
  r.style.setProperty("--ocn-border", c.border);
  r.style.setProperty("--ocn-shadow", c.shadow);
  r.style.setProperty("--ocn-radius-sm", rad.sm);
  r.style.setProperty("--ocn-radius-md", rad.md);
  r.style.setProperty("--ocn-radius-lg", rad.lg);
  r.style.setProperty("--ocn-radius-xl", rad.xl);
  r.style.setProperty("--ocn-radius-round", rad.round);
  r.style.setProperty("--ocn-transition", Theme.transition);
}
