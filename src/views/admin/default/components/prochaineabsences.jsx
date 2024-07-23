import React, { useState, useEffect } from 'react';
import Card from 'components/card';

import face1 from 'assets/img/avatars/face1.jpg'
import face2 from 'assets/img/avatars/face2.jpg'
import face4 from 'assets/img/avatars/face4.jpg'

const Prochaineabsences = () => {



  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-2xl text-tunisys-100 font-bold dark:text-white"> Prochaine Absences </p>
       <p >Aujourd'hui</p>
   
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">

   

        <div className='flex space-x-2 mt-5'>
          <img src={face1}  className='border rounded-2xl  h-[70px] w-[70px]' />

          <img src={face2}  className='border rounded-2xl  h-[70px] w-[70px]'/>
          <img src={face4} className='border rounded-2xl  h-[70px] w-[70px]'/>
        </div>
       <br></br>

      </div>
<br/>
        <button class="button flex space-x-9">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
          </svg>
          
            <a href='./Conges' >Voir qui absent cette semaine</a>
 

        </button>


    </Card>
  );
};

export default Prochaineabsences;

