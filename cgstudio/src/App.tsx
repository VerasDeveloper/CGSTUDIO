import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { BookingAndContactSection } from './components/BookingAndContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PackagesSection } from './components/PackagesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingCategoryId } from './data/studioData';

export function App() {
  const [packagesTab, setPackagesTab] = useState<'noiva' | 'debutante'>('noiva');
  const [bookingSelection, setBookingSelection] = useState<{
    category?: BookingCategoryId;
    serviceId?: string;
    timestamp?: number;
  }>({});

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackagesTab = (tab: 'noiva' | 'debutante') => {
    setPackagesTab(tab);
    scrollToSection('#pacotes');
  };

  const handleBookService = (category: BookingCategoryId, serviceId?: string) => {
    setBookingSelection({
      category,
      serviceId,
      timestamp: Date.now(),
    });
    scrollToSection('#agendamento');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-ivory text-deep">
        <Navbar onScheduleClick={() => scrollToSection('#agendamento')} />

        <main className="flex-1">
          {/* 1. Hero */}
          <HeroSection
            onScheduleClick={() => scrollToSection('#agendamento')}
            onExploreServices={() => scrollToSection('#servicos')}
          />

          {/* 2. Serviços */}
          <ServicesSection
            onSelectPackagesTab={handleSelectPackagesTab}
            onBookService={handleBookService}
          />

          {/* 3. Sobre Cássia & Experiência */}
          <AboutSection />

          {/* 4. Pacotes */}
          <PackagesSection
            activeTab={packagesTab}
            onTabChange={setPackagesTab}
            onRequestQuote={(category, serviceId) =>
              handleBookService(category, serviceId)
            }
          />

          {/* 5. Portfólio e Depoimentos */}
          <PortfolioSection />

          {/* 6. Contato, Regiões e Agendamento Online */}
          <BookingAndContactSection
            preselectedCategory={bookingSelection.category}
            preselectedServiceId={bookingSelection.serviceId}
            selectionTimestamp={bookingSelection.timestamp}
          />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
