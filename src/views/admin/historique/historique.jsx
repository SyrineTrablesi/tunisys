import React, { useEffect, useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const Historique = () => {
  const [demande, setDemande] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/conges/historique', {
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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="ml-6 font-semibold text-[3rem] dark:text-tunisys-100 text-tunisys-100 text-center mt-3">Historique</h1>
      
      {loading ? (
        <p className="text-center">Chargement en cours...</p>
      ) : demande.length > 0 ? (
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
                    <strong>Resultat: </strong> {item.resultat}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg mt-9">Pas de demandes acceptées ou refusées pour le moment.</p>
      )}
    </>
  );
};

export default Historique;
