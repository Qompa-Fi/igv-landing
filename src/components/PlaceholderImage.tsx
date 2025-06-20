
import React from 'react';

const PlaceholderImage = () => {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="relative">
        <div className="w-[558px] h-[357px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
            <img src="/merchant.png" alt="Merchant" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderImage;
