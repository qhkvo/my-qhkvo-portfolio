import { prefersReducedMotion } from './hooks/useReducedMotion';

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  // Move focus for keyboard / screen-reader users without a second jump.
  el.focus({ preventScroll: true });
}
