import Card from 'components/card';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Addmarque from './addMarque';
import { MdDelete, MdEdit } from 'react-icons/md';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Marques = () => {
  const [Marques, setMarques] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/marque/list`);
        if (response.ok) {
          const data = await response.json();
          setMarques(data);
        } else {
          console.error('Failed to fetch Marques');
        }
      } catch (error) {
        console.error('Error fetching Marques:', error);
      }
    };

    fetchMarques();
  }, []);

  const handleDeleteMarque = async (marqueId) => {
    try {
      const response = await fetch(`${backendUrl}/api/marque/${marqueId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMarques(prevMarques => prevMarques.filter(marque => marque._id !== marqueId));
      } else {
        console.error('Failed to delete marque');
      }
    } catch (error) {
      console.error('Error deleting marque:', error);
    }
  };

  return (
    <>
      <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Fournisseurs</h1>
      <div className="mt-2 flex justify-end">
        <button
          title="Ajouter Marque"
          class="group cursor-pointer bg-tunisys-100  w-[50px] rounded outline-none "
          onClick={handleOpenModal}
        >
          <p className='font-bold text-[50px] hover:rotate-90 duration-300 text-white'>+</p>
        </button>
      </div>
      {Marques.map((Marque) => (

        <Card className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-navy-700' extra="pb-7 p-[20px] h-[100px]"
        > <Link
          key={Marque._id}
          to={{
            pathname: `/admin/${Marque.name}/${Marque._id}/modeles`,
            state: { MarqueName: Marque.name },
          }}
          style={{ textDecoration: 'none' }}
        >
            <div className='flex'>
              <div>
                <p className="text-[30px] text-center text-tunisys-100 font-bold dark:text-white">
                  {Marque.name}
                </p>
              </div>
            </div>    </Link>
          <div className='absolute top-2 right-2 flex space-x-2'>
            {/* <button
              className="bg-green-500 text-white py-1 px-2 rounded-md "
            //onClick={() => handleDeleteAgence(agence._id)}
            >
              <MdEdit className="h-6 w-6" />
            </button>*/}
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md"
              onClick={() => handleDeleteMarque(Marque._id)}
            >
              <MdDelete className="h-6 w-6" />
            </button>
          </div>
        </Card>

      ))}
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content border-x-violet-800	'>
            <span className='close' onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            {isModalOpen && <Addmarque handleClose={handleCloseModal} />
            }
          </div>
        </div>
      )}

    </>
  );
};

export default Marques;
