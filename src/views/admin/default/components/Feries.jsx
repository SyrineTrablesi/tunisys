import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import MiniCalendar from 'components/calendar/MiniCalendar';
import { HiOutlineCalendar } from 'react-icons/hi';
import MyCalendar from 'components/calendar/MyCalendar';
import c3 from 'assets/img/calendar/c3.jpg';
import c2 from 'assets/img/calendar/c2.png';

const Feries = () => {
  const { user } = useAuthContext();


  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-2xl text-tunisys-100 font-bold dark:text-white">JOURS FERIERS A  VENIR </p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center">

          <div className='flex space-x-2 mt-5'>
            <div className='borded rounded-2xl bg-gray-100 p-4'>
              <img src={c2} className='border ml-4 rounded-2xl  text-center h-[70px] w-[70px]' />
              <p>Fête Nationale</p>
            </div>
            <div className='borded rounded-2xl bg-gray-100 p-4 '>
              <img src={c3} className='border ml-4 rounded-2xl  text-center h-[70px] w-[70px]' />
              <p >Fête du Travail</p>
            </div>

          </div>
          <br></br>
          <br></br>
          <div className="flex space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
              </svg>
              <div className="text-xl color-black " >
                <a href='./calendrier'>Afficher Le Calendrier</a>
              </div>
          </div>

        </div>

      </div>


    </Card>
  );
};

export default Feries;
