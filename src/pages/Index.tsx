
import React from 'react';
import Header from '@/components/Header';
import TaxCalculator from '@/components/TaxCalculator';
import PromoSection from '@/components/PromoSection';
import PlaceholderImage from '@/components/PlaceholderImage';

const Index = () => {
  return (
    <div className="min-h-screen bg-qompa-bg-main">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center lg:text-left px-2">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-qompa-dark-green leading-tight mb-4 sm:mb-6">
                Conoce cuánto de IGV deberás pagar en tu siguiente declaración.
              </h1>
            </div>
            
            <TaxCalculator />
            
            <div className="text-center lg:text-left px-2">
              <p className="text-qompa-dark-green text-sm lg:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                Indica el monto total de ventas y compras que vayas a declarar para obtener 
                el IGV (18%) que te correspondería pagar en tu próxima declaración.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            <PlaceholderImage />
            <PromoSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
