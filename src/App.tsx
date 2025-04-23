import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Comparison from './components/Comparison';
import Founder from './components/Founder';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          window.scrollTo({
            top: (target as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);
  
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        <Comparison />
        <Founder />
      </main>
      <Footer />
    </div>
  );
}

export default App;