import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LeadModal from './LeadModal';

const TaxCalculator = () => {
  const [sales, setSales] = useState<string>('40,000');
  const [purchases, setPurchases] = useState<string>('20,000');
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatNumber = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';
    
    // Format with thousands separators
    const number = parseInt(numericValue, 10);
    return new Intl.NumberFormat('es-PE').format(number);
  };

  const parseNumber = (value: string) => {
    return parseInt(value.replace(/[^\d]/g, ''), 10) || 0;
  };

  const calculateTax = () => {
    const salesAmount = parseNumber(sales);
    const purchasesAmount = parseNumber(purchases);
    
    // IGV is 18% in Peru
    const salesIGV = salesAmount * 0.18;
    const purchasesIGV = purchasesAmount * 0.18;
    const netTax = salesIGV - purchasesIGV;
    
    setTotalToPay(Math.max(0, netTax));
  };

  const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setSales(formatted);
  };

  const handlePurchasesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setPurchases(formatted);
  };

  const handleCalculateClick = () => {
    calculateTax();
    setIsModalOpen(true);
  };

  const handleEmailSaved = async (email: string) => {
    // Aquí puedes reemplazar esta función con tu lógica de API
    console.log('Guardando email:', { email, totalToPay, sales: parseNumber(sales), purchases: parseNumber(purchases) });
    
    // Ejemplo de cómo podrías llamar a tu API:
    try {
      await fetch('https://q-panel.qompa.io/api/igv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          totalAmount: totalToPay,
          salesAmount: parseNumber(sales),
          purchasesAmount: parseNumber(purchases),
          createdAt: new Date().toISOString()
        })
      });
      
      console.log('Email guardado exitosamente');
    } catch (error) {
      console.error('Error guardando email:', error);
    }
  };

  useEffect(() => {
    calculateTax();
  }, [sales, purchases]);

  return (
    <>
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl w-full max-w-sm sm:max-w-md mx-auto animate-fade-in">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="sales" className="text-gray-700 font-medium text-sm sm:text-base">
                Monto total de tus Ventas
              </Label>
              <div className="relative mt-1 sm:mt-2">
                <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">
                  S/
                </span>
                <Input
                  id="sales"
                  type="text"
                  inputMode="numeric"
                  value={sales}
                  onChange={handleSalesChange}
                  className="pl-8 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg font-medium border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-qompa-green focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  placeholder="40,000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purchases" className="text-gray-700 font-medium text-sm sm:text-base">
                Monto total de tus Compras
              </Label>
              <div className="relative mt-1 sm:mt-2">
                <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">
                  S/
                </span>
                <Input
                  id="purchases"
                  type="text"
                  inputMode="numeric"
                  value={purchases}
                  onChange={handlePurchasesChange}
                  className="pl-8 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg font-medium border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-qompa-green focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  placeholder="20,000"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleCalculateClick}
            className="w-full bg-qompa-dark-green hover:bg-qompa-dark-green-light text-white font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg text-base sm:text-lg"
          >
            Calcular IGV a pagar
          </Button>
        </div>
      </div>

      <LeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={totalToPay}
        onEmailSave={handleEmailSaved}
      />
    </>
  );
};

export default TaxCalculator;
