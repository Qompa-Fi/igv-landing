
import React from 'react';
import { Button } from "@/components/ui/button";

const PromoSection = () => {
  return (
    <div className="bg-qompa-dark-green rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center max-w-md sm:max-w-lg w-full mx-auto mt-6 sm:mt-8 lg:mt-0 animate-fade-in">
      <h3 className="text-qompa-green font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 leading-tight text-left">
        Tu IGV se carga automáticamente y sabrás exactamente cuánto pagar en tu próxima declaración.
      </h3>
      
      <Button className="bg-qompa-green hover:bg-qompa-green-light text-qompa-dark-green font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-sm sm:text-lg w-full">
        ¡Simplifica tus impuestos! Descárgala ahora
      </Button>
    </div>
  );
};

export default PromoSection;
