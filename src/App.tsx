import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MeetSolange from './components/MeetSolange';
import Services from './components/Services';
import Features from './components/Features';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CalculatorPage from './pages/CalculatorPage';
import CLTvsPJPage from './pages/CLTvsPJPage';
import NotFound from './pages/NotFound';
import HelpFloatingButton from './components/HelpFloatingButton';
import Seo from './components/Seo';
import { homeSchema } from './data/schema';

function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper font-sans text-ink">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Seo
                  title="Contabilidade online para PJ e MEI, com contadora | Conte"
                  description="Contabilidade online para PJ e MEI com uma contadora dedicada no WhatsApp. Abertura de empresa grátis, notas fiscais e impostos em dia a partir de R$99/mês."
                  path="/"
                  jsonLd={homeSchema}
                />
                <Hero />
                <MeetSolange />
                <Services />
                <Features />
                <Plans />
                <Testimonials />
                <FAQ />
                <CTA />
              </main>
            }
          />
          <Route path="/calculadora" element={<CalculatorPage />} />
          <Route path="/clt-vs-pj" element={<CLTvsPJPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <HelpFloatingButton />
      </div>
    </MotionConfig>
  );
}

export default App;
