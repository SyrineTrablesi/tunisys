import Card from 'components/card';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Addmodele from './addModele';
import { MdDelete, MdEdit } from 'react-icons/md';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ModeleList = () => {
    const { marqueId, marqueName } = useParams();
    const [marqueModeles, setmarqueModeles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(marqueName)
    console.log(marqueId)
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = (client) => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        const fetchModele = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/marque/${marqueId}/modeles`);
                if (response.ok) {
                    const data = await response.json();
                    setmarqueModeles(data);
                } else {
                    console.error('Failed to fetch  Modeles');
                }
            } catch (error) {
                console.error('Error fetching Modeles:', error);
            }
        };

        fetchModele();
    }, [marqueId]);
    const handleDeleteModele = async (modeleId) => {
        try {
          const response = await fetch(`${backendUrl}/api/marque/deleteModele/${modeleId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            setmarqueModeles(prevMarques => prevMarques.filter(modele => modele._id !== modeleId));
          } else {
            console.error('Failed to delete marque');
          }
        } catch (error) {
          console.error('Error deleting marque:', error);
        }
      };
    return (
        <div className=''>
            <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'> {marqueName}  </h1>
            <div className="mt-2 flex justify-end">
                <button
                    title="AjouterModele"
                    className="group cursor-pointer bg-tunisys-100  w-[50px] rounded outline-none "
                    onClick={handleOpenModal}
                >
                    <p className='font-bold text-[50px] hover:rotate-90 duration-300 text-white'>+</p>
                </button>
            </div>
            <ul>
                {marqueModeles.length > 0 ? (
                    marqueModeles.map((modele) => (
                        <li key={modele._id}>

                            <Card className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-navy-700'>
                                <div className='flex'>
                                    <div>
                                        <p className='text-[15px] text-red-600 font-bold dark:text-white'><span>Modele :</span>{modele.name}</p>
                                        <p className='text-[15px] text-navy-900 font-bold dark:text-white'><span>Modele ecran:</span>{modele.modele_ecran}</p>
                                    </div>
                                </div>
                                <div className='absolute top-2 right-2 flex space-x-2'>
                                    {                       /*             <button
                                        className="bg-green-500 text-white py-1 px-2 rounded-md "
                                    //onClick={() => handleDeleteAgence(agence._id)}
                                    >
                                        <MdEdit className="h-6 w-6" />
                                    </button>*/}
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                    onClick={() => handleDeleteModele(modele._id)}
                                    >
                                        <MdDelete className="h-6 w-6" />
                                    </button>
                                </div>
                            </Card>

                        </li>
                    ))
                ) : (
                    <li>
                        <p>Aucune Modele appartient à cett fournisseur</p>
                    </li>
                )}
            </ul >

            {
                isModalOpen && (
                    <div className='modal'>
                        <div className='modal-content border-x-violet-800	'>
                            <span className='close' onClick={() => setIsModalOpen(false)}>
                                &times;
                            </span>
                            {isModalOpen && <Addmodele handleClose={handleCloseModal} />
                            }
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ModeleList;
