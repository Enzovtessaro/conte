import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img src="/logo.jpg" alt="Conte" width={118} height={40} className="h-10 w-auto" />
    </div>
  );
};

export default Logo;
