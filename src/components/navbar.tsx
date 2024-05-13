import React from 'react';
import burger from '../assets/burger.svg';
const Navbar: React.FC = () => {
  return (
    <nav className="">
      <div className="px-2 py-1 sm:px-6 lg:px-5">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex justify-start">
              <img className="w-[20px] h-[20px]" src={burger} alt="" />
            </div>
            <div className="font-bold text-xl font-unbounded">Startup</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
