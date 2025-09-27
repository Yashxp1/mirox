'use client';
import React, { useEffect, useState } from 'react';

const Topbar = () => {
  const [currTime, setCurrTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
      });
      setCurrTime(currentTime);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b p-2 text-zinc-300">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-mono">{currTime}</h1>
      </div>
    </div>
  );
};

export default Topbar;
