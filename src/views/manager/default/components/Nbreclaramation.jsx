import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Nbreclaramation = () => {
  const { user } = useAuthContext();
  const [recCount, setRecCount] = useState(null);

  useEffect(() => {
    if (user && user.token) {
      fetch(`${backendUrl}/api/ticket/number`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then(response => response.json())
        .then(data => setRecCount(data.count))
        .catch(error => console.error('Error:', error));
    }
  }, [user]);

  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-lg text-tunisys-100 font-bold dark:text-white">Nombre Tickets </p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center">
          {recCount !== null && 
          <p className="text-4xl mt-5 text-tunisys-100 font-bold dark:text-white">{recCount}</p>
          }
        </div>
      </div>
    </Card>
  );
};

export default Nbreclaramation;
