// Prefix site-relative paths ("/images/x.svg") with Vite's base URL so they
// work when the site is served from a sub-path (e.g. /my-qhkvo-portfolio/).
// Full URLs, mailto: links and data: URIs pass through unchanged.
export const asset = (path: string) =>
  path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path;
