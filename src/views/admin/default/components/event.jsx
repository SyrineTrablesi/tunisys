import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import CardMenu from 'components/card/CardMenu';
import { BsCalendar2Day, BsCalendar2Event, BsCalendarEventFill } from 'react-icons/bs';
import { Calendar } from 'react-calendar';
import { MdEventBusy, MdEventNote } from 'react-icons/md';
import c1 from 'assets/img/calendar/c1.png'


const Event = () => {

  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-2xl text-tunisys-100 font-bold dark:text-white ">Prochaines Evenements</p>
      
     
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center"> 
         <div className="flex space-x-2 mt-5 flex flex-col items-center"><img src={c1} className='border rounded-2xl  h-[70px] w-[70px]'/></div> 
          <div className="text-2xl color-black font-bold dark:text-white " >
         
            <br></br>
            <br></br>
            <div className='flex'>
            <MdEventNote></MdEventNote>
            <p>10e anniversaire </p>
           
            </div>
           <p className='ml-6'>de l'entreprise</p>
            <br></br>
           
            
          </div>

        </div>
      </div>
      <div>

      </div>
    </Card>
  )
}

export default Event