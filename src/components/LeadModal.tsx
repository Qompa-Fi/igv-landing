import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onEmailSave: (email: string) => Promise<void>;
}

const LeadModal = ({ isOpen, onClose, totalAmount, onEmailSave }: LeadModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading) {
      setIsLoading(true);
      try {
        await onEmailSave(email);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error al guardar email:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-qompa-dark-green text-xl font-bold">
            {isSubmitted ? '¡Gracias!' : 'Obtén tu resultado completo'}
          </DialogTitle>
        </DialogHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center text-gray-600 mb-4">
              Ingresa tu email para ver el monto total a pagar y recibir consejos sobre impuestos.
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="pl-12 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-qompa-green focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-qompa-dark-green hover:bg-qompa-dark-green-light text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              {isLoading ? 'Guardando...' : 'Ver mi resultado'}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-qompa-green bg-opacity-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-qompa-dark-green mb-2">
                Tu monto total a pagar es:
              </h3>
              <div className="text-3xl font-bold text-qompa-dark-green">
                S/ {new Intl.NumberFormat('es-PE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(totalAmount)}
              </div>
            </div>
            
            <Button
              onClick={handleClose}
              className="w-full bg-qompa-green hover:bg-qompa-green-light text-qompa-dark-green font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Continuar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;
