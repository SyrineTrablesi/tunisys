import Card from "components/card";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const CongesForm = () => {
  const { user } = useAuthContext();
  const [DateDebut, setDatedebut] = useState('');
  const [DateFin, setDatefin] = useState('');
  const [Raison, setRaison] = useState('');
  const [Attachement, setAttachement] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const conges = { DateDebut, DateFin, Raison, Attachement };
      console.log(conges)
      const response = await fetch('/api/conges/add', {
        method: 'POST',
        body: JSON.stringify(conges),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Fixed the Authorization header
        },
      });

      const json = await response.json();

      if (!response.ok) {
        if (json && json.error) {
          setError(json.error);
        } else {
          setError('An error occurred during the request.');
        }

        if (json && json.emptyFields) {
          setEmptyFields(json.emptyFields);
        } else {
          setEmptyFields([]);
        }

        return; // Exit the function early on error
      }

      // Reset form fields on success
      setEmptyFields([]);
      setDatedebut('');
      setDatefin('');
      setRaison('');
      setAttachement('');
      setError(null);
      toast.success('Demande  ajouté avec succès');
    } catch (error) {
      console.error('An error occurred during the request:', error);
      setError('An unexpected error occurred. Please try again later.');
      setEmptyFields([]);
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setAttachement(file); // set the file object directly
      console.log(file);
    }
  };
  


  return (
    <div>
      <ToastContainer />
      <h1 className="ml-6 font-semibold text-[3rem] dark:text-tunisys-100 text-tunisys-100 text-center mt-3">Demande Conges</h1>
      <Card className="p-8 h-full w-full bg-gray-100 rounded-lg border">

        <label className="block text-gray-700 text-lg font-bold mb-2">Date Debut :</label>
        <input
          value={DateDebut}
          onChange={(e) => setDatedebut(e.target.value)}
          className="block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-red-500 : border-[#ddd]"
          type="datetime-local"
        />

        <label className="block text-gray-700 text-lg font-bold mb-2">Date Fin :</label>
        <input
          value={DateFin}
          onChange={(e) => setDatefin(e.target.value)}
          className="block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-red-500 : border-[#ddd]"
          type="datetime-local"
        />

        <label className="block text-gray-700 text-lg font-bold mb-2">Type de Conges:</label>
        <select
          value={Raison}
          onChange={(e) => setRaison(e.target.value)}
        >
          <option value="">Null</option>
          <option value="maladie">Conges Maladie</option>
          <option value="Annuel">Conges Annuel</option>
          <option value="affaire">Conges D'affaire</option>
          <option value="autre">Autre</option> {/* Add 'autre' option */}
        </select>

        {Raison === 'autre' && (
          <input
            className="block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-red-500 : border-[#ddd]"
            type="text"
            placeholder="Autres"
          />
        )}
        <label className="block text-gray-700 text-lg font-bold mb-2"> Attachement:</label>
        <input
          className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-red-500 : border-[#ddd]}`}
          type="file"
          accept=".jpg, .jpeg, .png, .pdf" // Add the accepted file types
          onChange={handleLogoChange}
        />


        <button className="text-white rounded cursor-pointer p-2.5 border-0 bg-tunisys-100 justify-center text-xl" onClick={handleSubmit}>
          Envoyer la demande
        </button>
        {error}
      </Card>
    </div>
  );
};

export default CongesForm;
