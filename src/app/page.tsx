import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar';
import Screenshot from '@/components/landing/Screenshot';
import React from 'react';
import { Bricolage_Grotesque } from 'next/font/google';
import Working from '@/components/landing/Working';
import Join from '@/components/landing/Join';
import Footer from '@/components/landing/Footer';

const grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

const Page = () => {
  return (
    <div className={`${grotesque.className}`}>
      <Navbar />
      <div className="px-3 ">
        <Hero />
        <Screenshot />
        <Working />
        <Join />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
