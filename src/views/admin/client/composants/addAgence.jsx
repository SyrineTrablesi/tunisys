import React, { useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import { useParams } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddAgence = ({ handleClose }) => {
  const { clientId } = useParams();
  const { user } = useAuthContext();
  const [agence, setAgence] = useState('');
  const [adresse, setAdresse] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [gouvernourat, setGouvernourat] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const validateFields = () => {
    const emptyFieldsTemp = [];
    if (!agence) emptyFieldsTemp.push('agence');
    if (!adresse) emptyFieldsTemp.push('adresse');
    if (!localisation) emptyFieldsTemp.push('localisation');
    if (!gouvernourat) emptyFieldsTemp.push('gouvernourat');
    setEmptyFields(emptyFieldsTemp);
    return emptyFieldsTemp.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setError('Please fill in all required fields.');
      return;
    }

    const agencesData = {
      client: clientId,
      agence,
      localisation,
      adresse,
      gouvernourat,
      contacts,
    };

    try {
      const response = await fetch(`${backendUrl}/api/client/addagence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(agencesData),
      });

      const data = await response.json();
      if (response.ok) {
        handleClose();
        setLocalisation('');
        setAgence('');
        setAdresse('');
        setGouvernourat('');
        setSuccessMessage('Agence ajoutée avec succès');
        setContacts([]);
        setNewContact({ name: '', phone: '' });
        setError('');
        setEmptyFields([]);

      }
      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'ajout de l\'agence.');
      }


    } catch (error) {
      console.error('Error adding agency:', error.message);
      setError(error.message || 'Une erreur est survenue lors de l\'ajout de l\'agence.');
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      setError('Nom et Téléphone sont requis.');
      return;
    }

    if (contacts.some(contact => contact.phone === newContact.phone)) {
      setError('Le numéro de téléphone doit être unique.');
      return;
    }

    setContacts([...contacts, newContact]);
    setNewContact({ name: '', phone: '' });
    setError(''); 
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const governorates = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan",
    "Kasserine", "Kebili", "Kef", "Mahdia", "Manouba", "Medenine", "Monastir", "Nabeul",
    "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <div className="rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100">
        <h2 className="mb-4 text-xl font-semibold text-center text-tunisys-100">Ajouter agence</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>Agence:</label>
          <input
            className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('agence') ? 'border-red-500' : 'border-[#ddd]'}`}
            type="text"
            onChange={(e) => setAgence(e.target.value)}
            value={agence}
          />
          <label>Localisation:</label>
          <div className="flex items-center">
            <input
              className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('localisation') ? 'border-red-500' : 'border-[#ddd]'}`}
              type="text"
              onChange={(e) => setLocalisation(e.target.value)}
              value={localisation}
            />
         { /* <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="ml-2">
              <img src="https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png" alt="Google Maps" className="w-6 h-6" />
            </a>*/}
          </div>
          <label>Adresse:</label>

          <input
            className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('adresse') ? 'border-red-500' : 'border-[#ddd]'}`}
            type="text"
            onChange={(e) => setAdresse(e.target.value)}
            value={adresse}
          />

          <label>Gouvernourat:</label>
          <select
            className={`block appearance-none w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('gouvernourat') ? 'border-red-500' : 'border-[#ddd]'}`}
            onChange={(e) => setGouvernourat(e.target.value)}
            value={gouvernourat}
          >
            <option value="" disabled>Sélectionnez un gouvernourat</option>
            {governorates.map((gov, index) => (
              <option key={index} value={gov}>
                {gov}
              </option>
            ))}
          </select>

          <label>Liste des contacts:</label>
          <div className="flex gap-2 mb-2">
            <input
              className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('contact') ? 'border-red-500' : 'border-[#ddd]'}`}
              type="text"
              placeholder="Nom"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('contact') ? 'border-red-500' : 'border-[#ddd]'}`}
              type="text"
              placeholder="Téléphone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handleAddContact}
            >
              Ajouter
            </button>
          </div>

          {contacts.length > 0 && (
            <ul className="mb-2">
              {contacts.map((contact, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 rounded p-2">
                  <span>{contact.name} - {contact.phone}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveContact(index)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="text-indigo-00 text-green-600 text- mt-4 rounded py-2 px-4 font-bold hover:text-green-600"
            type="submit"
          >
            Enregistrer
          </button>
          {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
          {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
          <button
            className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgence;
