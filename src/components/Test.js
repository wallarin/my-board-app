import React, { useState } from 'react';

function Test() {
  const [isRed, setIsRed] = useState(false);

  const toggleBackground = () => {
    setIsRed(!isRed);
  };

  return (
    <div className='bg-blue-500' onClick={toggleBackground}>
      {/* 파란색 또는 빨간색 배경 */}
      <div
        onClick={toggleBackground}
        className={`h-screen w-full transition-all duration-[1000ms] ease-in-out ${
          isRed ? 'bg-red-500' : 'bg-blue-500'
        }`}
        style={{
          transform: isRed ? 'translateX(0)' : 'translateX(-100%)',
        }}
      ></div>
    </div>
  );
}

export default Test;