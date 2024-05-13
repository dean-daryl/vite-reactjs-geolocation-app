import React from 'react';
import favorites from '../assets/favorites.svg';
import info from '../assets/info.svg';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.svg';

const MobileNavbar: React.FC = () => {
  return (
    <div className="mx-10 py-2">
      <ul className="flex items-center justify-between">
        <li>
          <a href="">
            <img className="icons" src={favorites} alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img className="icons" src={info} alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img className="icons" src={notification} alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img className="icons" src={profile} alt="" />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default MobileNavbar;
