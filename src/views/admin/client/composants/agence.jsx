import Card from 'components/card';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddAgence from './addAgence';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AgenceList = () => {
  const { clientId, clientName } = useParams();
  const [clientAgences, setClientAgences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(clientName)
  console.log(clientId)
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (client) => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/client/${clientId}/agences`);
        if (response.ok) {
          const data = await response.json();
          setClientAgences(data);
        } else {
          console.error('Failed to fetch client agences');
        }
      } catch (error) {
        console.error('Error fetching client agences:', error);
      }
    };

    fetchAgences();
  }, [clientId]);
  const handleDeleteAgence = async (agenceId) => {
    try {
      const response = await fetch(`${backendUrl}/api/client/agence/${agenceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClientAgences(clientAgences.filter(agence => agence._id !== agenceId));
        console.log('Agence deleted successfully');
      } else {
        console.error('Failed to delete agence');
      }
    } catch (error) {
      console.error('Error deleting agence:', error);
    }
  };
  return (
    <div className=''>
      <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'> {clientName}  Agences </h1>
      <div className="mt-2 flex justify-end">
        <button
          title="Ajouter agence"
          class="group cursor-pointer bg-tunisys-100  w-[50px] rounded outline-none "
          onClick={handleOpenModal}
        >
          <p className='font-bold text-[50px] hover:rotate-90 duration-300 text-white'>+</p>
        </button>
      </div>
      <ul>
        {clientAgences.length > 0 ? (
          clientAgences.map((agence) => (
            <li key={agence._id}>

              <Card className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-navy-700'>
                <Link to={`./${agence.agence}/${agence._id}`}>

                  <p className='text-[15px] text-tunisys-100 font-bold dark:text-white'><span> Agence :</span>{agence.agence}</p>
                  <p className='text-[15px] text-black font-bold dark:text-white'><span>Localisation :</span>{agence.localisation}</p>
                  <p className='text-[15px] text-black font-bold dark:text-white'><span>Adresse :</span>{agence.adresse}</p>
                  <p className='text-[15px] text-black font-bold dark:text-white'><span>Gouvernourat :</span>{agence.gouvernourat}</p>
                  <p className='text-[15px] text-black font-bold dark:text-white'>
                    <span>Contact :</span>
                    {agence.contacts.map((contact, index) => (
                      <span key={index}>{contact.name} : {contact.phone}{index < agence.contacts.length - 1 ? ', ' : ''}</span>
                    ))}
                  </p>
                </Link>

                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md "
                  onClick={() => handleDeleteAgence(agence._id)}
                >
                  Supprimer
                </button>
              </Card>

            </li>
          ))
        ) : (
          <li>
            <p>Aucune agence appartient à cet client</p>
          </li>
        )}
      </ul>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content border-x-violet-800	'>
            <span className='close' onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            {isModalOpen && <AddAgence handleClose={handleCloseModal} />
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenceList;
