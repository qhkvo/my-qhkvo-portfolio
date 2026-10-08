import { lazy, Suspense, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import type { SectionId } from './data/sections';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

export default function App() {
  const [active, setActive] = useState<SectionId | null>(null);
  const { pathname } = useLocation();
  const current: SectionId | null = pathname.startsWith('/projects') ? 'projects' : pathname === '/' ? active : null;

  return (
    <>
      <button className="skip-link" onClick={() => document.getElementById('main')?.focus()}>
        Skip to content
      </button>
      <Header active={current} />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home onActive={setActive} />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
