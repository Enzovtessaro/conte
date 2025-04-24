import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Comparison from './components/Comparison';
import Founder from './components/Founder';
import Footer from './components/Footer';
import Modal from './components/Modal';
import OpenCompanyForm from './components/OpenCompanyForm';
import SwitchToConteForm from './components/SwitchToConteForm';

function App() {
  const [isOpenCompanyFormOpen, setIsOpenCompanyFormOpen] = useState(false);
  const [isSwitchFormOpen, setIsSwitchFormOpen] = useState(false);

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
      <Navbar 
        onOpenCompanyForm={() => setIsOpenCompanyFormOpen(true)}
        onSwitchForm={() => setIsSwitchFormOpen(true)}
      />
      <main>
        <Hero 
          onOpenCompanyForm={() => setIsOpenCompanyFormOpen(true)}
          onSwitchForm={() => setIsSwitchFormOpen(true)}
        />
        <Features 
          onOpenCompanyForm={() => setIsOpenCompanyFormOpen(true)}
          onSwitchForm={() => setIsSwitchFormOpen(true)}
        />
        <Testimonials />
        <CTA 
          onOpenCompanyForm={() => setIsOpenCompanyFormOpen(true)}
          onSwitchForm={() => setIsSwitchFormOpen(true)}
        />
        <Comparison
          onOpenCompanyForm={() => setIsOpenCompanyFormOpen(true)}
          onSwitchForm={() => setIsSwitchFormOpen(true)}
        />
        <Founder />
      </main>
      <Footer />

      {/* Modals */}
      <Modal isOpen={isOpenCompanyFormOpen} onClose={() => setIsOpenCompanyFormOpen(false)}>
        <OpenCompanyForm onClose={() => setIsOpenCompanyFormOpen(false)} />
      </Modal>
      <Modal isOpen={isSwitchFormOpen} onClose={() => setIsSwitchFormOpen(false)}>
        <SwitchToConteForm onClose={() => setIsSwitchFormOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;