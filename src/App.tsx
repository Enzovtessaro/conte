import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Comparison from './components/Comparison';
import Footer from './components/Footer';
import Plans from './components/Plans';
import { Routes, Route } from 'react-router-dom';
import Blog from './pages/blog';
import BlogPostPage from './pages/blog/[slug]';
import CalculatorPage from './pages/CalculatorPage';
import CLTvsPJPage from './pages/CLTvsPJPage';
import HelpFloatingButton from './components/HelpFloatingButton';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href') || '');
        if (target) {
          window.scrollTo({
            top: (target as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  const handleOpenCompany = () => {
    window.open('https://sejaconte.fillout.com/abertura-de-empresa', '_blank');
  };

  const handleSwitchToConte = () => {
    window.open('https://sejaconte.fillout.com/mude-para-conte', '_blank');
  };

  return (
    <div className="font-sans">
      <Navbar 
        onOpenCompanyForm={handleOpenCompany}
        onSwitchForm={handleSwitchToConte}
      />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero 
              onOpenCompanyForm={handleOpenCompany}
              onSwitchForm={handleSwitchToConte}
            />
            <Features 
              onOpenCompanyForm={handleOpenCompany}
              onSwitchForm={handleSwitchToConte}
            />
            <Plans
              onOpenCompanyForm={handleOpenCompany}
            />
            <Comparison
              onOpenCompanyForm={handleOpenCompany}
              onSwitchForm={handleSwitchToConte}
            />
            <Testimonials />
            <CTA 
              onOpenCompanyForm={handleOpenCompany}
              onSwitchForm={handleSwitchToConte}
            />
          </main>
        } />
        <Route path="/calculadora" element={<CalculatorPage />} />
        <Route path="/clt-vs-pj" element={<CLTvsPJPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
      <Footer />
      <HelpFloatingButton />
    </div>
  );
}

export default App;