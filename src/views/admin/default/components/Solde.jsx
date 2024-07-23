import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import {useAuthContext} from 'views/auth/hooks/useAuthContext'

const Solde = () => {
  const {user} = useAuthContext()

  return (
    <Card extra="pb-7 p-[20px]">
        <p className="text-2xl text-tunisys-100 font-bold dark:text-white">Votre Solde:</p>
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
          <div className="flex flex-col items-center">{user && (
                  <p className=" font-bold text-navy-700 text-4xl dark:text-white">
                    {user.solde}
                  </p>
                  )}   
          
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
       <div className='flex space-x-5 ml-3 borded rounded-2xl  p-4'>
        <p className="text-xl text-tunisys-100 font-bold dark:text-white">Solde Utilise:</p>
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
          <div className="flex flex-col items-center">{user && (
                  <p className=" font-bold text-navy-700 text-4xl dark:text-white">
                    {user.solde}
                  </p>
                  )}   
              
           
          
          </div>
        </div>
        
        
        <p className="text-xl text-tunisys-100 font-bold dark:text-white">Prix :</p>
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
          <div className="flex flex-col items-center">{user && (
                  <p className=" font-bold text-navy-700 text-4xl dark:text-white">
                    {user.solde}
                  </p>
                  )}   
              
           
          
          </div>
        </div>
        </div>

    </Card>
  );
};

export default Solde;
