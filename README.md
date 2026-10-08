# my-qhkvo-portfolio

Live at **https://qhkvo.github.io/my-qhkvo-portfolio/**.

## Local dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/ (for final check)
npm run preview   # serve dist/ locally to check production build before pushing (npm run build first)
```

Requires Node 20+.

## Editing content

All content lives in `src/data/`

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, bio, location, email, links, portrait |
| `uniLife.ts` | Uni Life photo grid (set `award: true` for the Award label) |
| `experience.ts` | Co-op timeline, newest first |
| `projects.ts` | Projects & hackathons |
| `techStack.ts` | Grouped tech lists |

Components pass `/images/` through `asset()` (`src/asset.ts`), which adds the `/my-qhkvo-portfolio/` base path automatically.

### Add a project

1. Drop images into `public/images/projects/<slug>/` (a `cover` plus any gallery images).
2. Add an entry to `src/data/projects.ts`:

```ts
{
  slug: 'my-project',               // URL: /#/projects/my-project
  title: 'My Project',
  tagline: 'One line about it',
  year: '2026',
  type: 'project',                  // or 'hackathon'
  role: 'Solo',
  cover: '/images/projects/my-project/cover.png',
  coverBg: '#000',                  // optional: black tile instead of grey
  description: ['Paragraph one.', 'Paragraph two.'],
  highlights: ['Optional bullet'],
  stack: ['React', 'TypeScript'],
  links: { github: 'https://github.com/...', demo: '...', devpost: '...', video: '...' },
  gallery: ['/images/projects/my-project/1.png'],
},
```

### Add a co-op

1. Drop 3–6 photos into `public/images/experience/<id>/`.
2. Add an entry at the **top** of `src/data/experience.ts` (newest first):

```ts
{
  id: 'acme-2026',
  role: 'Software Developer Co-op',
  company: 'Acme',
  location: 'Ottawa, ON',
  start: 'Jan 2026',
  end: 'Apr 2026',
  bullets: ['What you did', 'What changed because of it'],
  stack: ['Go', 'Kubernetes'],
  photos: [{ src: '/images/experience/acme-2026/1.jpg', alt: 'Team at the whiteboard' }],
},
```

### Placeholders

`npm run placeholders` regenerates the flat-colour SVG placeholders. Delete
`scripts/placeholders.mjs` and the `.svg` files once you have real photos.


Routing uses `HashRouter`, so deep links like `/my-qhkvo-portfolio/#/projects/agentslm` survive a refresh without a 404 page.
