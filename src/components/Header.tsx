
import { Button } from "@/components/ui/button";
import { Download, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 sm:p-6 lg:p-8">
      <div className="flex items-center">
        <img 
          src="/logo.png"
          alt="QompaApp"
          className="h-6 sm:h-8 w-auto object-contain rounded-lg px-2 sm:px-3 py-1"
        />
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          onClick={() => {
            window.open('https://link.qompa.io', '_blank');
          }}
          className="bg-qompa-dark-green hover:bg-qompa-dark-green-light text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg hidden sm:flex text-sm sm:text-base"
        >
          <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
          Descargar APP
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="sm:hidden text-qompa-dark-green hover:bg-white hover:bg-opacity-20 rounded-full"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
