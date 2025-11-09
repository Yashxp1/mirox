import React from 'react';

const footerItems = ['About', 'Use cases', 'Help Center', 'Features'];

const Footer = () => {
  return (
    <footer className=" text-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div>
          <h3 className="text-sm flex py-10  gap-8 mb-4">
            {footerItems.map((i, idx) => (
              <p key={idx}>{i}</p>
            ))}
          </h3>
          <hr />
          <div className='text-[12px] text-zinc-600 py-10 flex justify-between'>
            <p>© 2025 crewspace. All rights reserved.</p>
            <div className='flex justify-between gap-4'>
              <p>Terms of service</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </footer>
  );
};

export default Footer;
