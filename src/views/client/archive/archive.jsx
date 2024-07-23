import React, { useEffect, useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const Archive = () => {
  const [demande, setDemande] = useState([]);
  const { user } = useAuthContext();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/conges/mynotencours', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDemande(data);
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="ml-6 font-semibold text-[3rem] dark:text-tunisys-100 text-tunisys-100 text-center mt-3">Liste des demandes</h1>

      {demande.length <= 0 ? (
  <p className="text-center text-lg mt-9">Vous n'avez pas encore des demandes accepte ou refuse.</p>
) : (
  demande.map((item) => (
    <div key={item._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
      <div className='flex'>
        <div className='ml-4'>
          <ul>
            <li>
              <strong>Id Demande : </strong> {item._id}
            </li>
            <li>
              <strong>Date Debut: </strong>
              {new Date(item.DateDebut).toLocaleString('fr-FR')}
            </li>
            <li>
              <strong>DateFin: </strong>
              {new Date(item.DateFin).toLocaleString('fr-FR')}
            </li>
            <li>
              <strong>Raison: </strong> {item.Raison}
            </li>
            <li>
              <strong>Attachement : </strong> {item.Attachement}
            </li>
            <li>
              <strong>Resultat: </strong>{item.resultat}
            </li>
          </ul>
        </div>
      </div>
    </div>
  ))
)}
 </>
  );
};

export default Archive;
