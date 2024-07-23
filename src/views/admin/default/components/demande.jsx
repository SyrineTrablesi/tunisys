import React, { useState, useEffect } from 'react';
import Card from 'components/card';

import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const Demande = () => {
  const [demande, setDemande] = useState([]);
  const { user } = useAuthContext();
  const lastDemande = demande[demande.length - 1];

  const getColorClass = () => {
    if (lastDemande.resultat === 'en cours') {
      return 'text-orange-500'; // Adjust Tailwind class for orange text
    } else if (lastDemande.resultat === 'accepte') {
      return 'text-green-500'; // Adjust Tailwind class for green text
    } else if (lastDemande.resultat === 'refuse') {
      return 'text-red-500'; // Adjust Tailwind class for red text
    } else {
      return ''; // Default color or handle other cases if needed
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/conges/my', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDemande(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-2xl text-tunisys-100 font-bold dark:text-white ">Votre Demande : </p>
      <br></br>
      <br></br>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center text-2xl">
        {demande.length === 0 ? (
        <p className='text-center'>Vous n'avez pas aucune demande</p>
      ) : (
        <div>
          <p className='text-center'>Votre derniere demande est:</p>
          <p  className={`text-center font-bold text-3xl ${getColorClass()}`}> <br></br>{lastDemande.resultat}</p>
        
        </div>
      )}
        </div>
      </div>
    
      <br></br>
      <br></br>
      <br></br>
      <button class="button flex space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
          </svg>
        <div className="text-2xl ">
    <a href='./historique'>Votre Demande de Conges</a>
</div>


      </button>
    </Card>
  )
}

export default Demande

