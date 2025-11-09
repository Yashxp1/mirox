import Image from 'next/image';
import React from 'react';

const Screenshot = () => {
  return (
    <div className="relative h-screen">
      <svg className="absolute w-0 h-0">
        <filter id="grainy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
      </svg>

      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-100 via-blue-300 to-indigo-500"
        style={{ filter: 'url(#grainy)' }}
      />

      <div className="relative h-full flex justify-center items-center z-10">
        <Image
          src="/home.png"
          alt="test"
          width={1300}
          height={1300}
          className="rounded-md shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Screenshot;
