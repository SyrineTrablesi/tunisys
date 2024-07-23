import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AgenceDetails = () => {
  const { clientId, clientName, agenceId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agenceDetails, setAgenceDetails] = useState(null); 
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = agenceDetails.contacts.map((contact, i) => (
      i === index ? { ...contact, [field]: value.trim() } : contact
    ));
    setAgenceDetails({ ...agenceDetails, contacts: updatedContacts });
  };

  const handleNewContactChange = (field, value) => {
    setNewContact({ ...newContact, [field]: value.trim() });
  };

  const addNewContact = () => {
    if (newContact.name && newContact.phone) {
      setAgenceDetails({ ...agenceDetails, contacts: [...agenceDetails.contacts, newContact] });
      setNewContact({ name: '', phone: '' });
    } else {
      alert('Please fill in both name and phone number.');
    }
  };

  const removeContact = (index) => {
    const updatedContacts = agenceDetails.contacts.filter((_, i) => i !== index);
    setAgenceDetails({ ...agenceDetails, contacts: updatedContacts });
  };

  const saveChanges = () => {
    fetch(`${backendUrl}/api/client/agence/${agenceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agenceDetails),
    })
      .then(response => response.json())
      .then(data => {
        setAgenceDetails(data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating agence details:', error));
  };

  useEffect(() => {
    if (agenceId) {
      fetch(`${backendUrl}/api/client/agence/${agenceId}`)
        .then(response => response.json())
        .then(data => setAgenceDetails(data))
        .catch(error => console.error('Error fetching agence details:', error));
    }
  }, [agenceId]);

  if (!agenceDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-[1.7em] text-tunisys-100 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Agence {agenceDetails.agence}</h1>
      <div className='min-w-screen p-5 py-10 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-gray-900'>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Agence:</strong></p>
            {isEditing ? (
              <input
                type="text"
                value={agenceDetails.agence || ""}
                onChange={(e) => setAgenceDetails({ ...agenceDetails, agence: e.target.value.trim() })}
              />
            ) : (
              <p className={`mb-1 text-${agenceDetails.agence ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {agenceDetails.agence || "Non rempli"}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Localisation:</strong></p>
            {isEditing ? (
              <input
                className='w-[500px]'
                type="text"
                value={agenceDetails.localisation || ""}
                onChange={(e) => setAgenceDetails({ ...agenceDetails, localisation: e.target.value.trim() })}
              />
            ) : (
              <p className={`mb-1 text-${agenceDetails.localisation ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {agenceDetails.localisation || "Non rempli"}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Adresse:</strong></p>
            {isEditing ? (
              <input
                className='w-[500px]'
                type="text"
                value={agenceDetails.adresse || ""}
                onChange={(e) => setAgenceDetails({ ...agenceDetails, adresse: e.target.value.trim() })}
              />
            ) : (
              <p className={`mb-1 text-${agenceDetails.adresse ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {agenceDetails.adresse || "Non rempli"}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Gouvernourat:</strong></p>
            {isEditing ? (
              <input
                className='w-[500px]'
                type="text"
                value={agenceDetails.gouvernourat || ""}
                onChange={(e) => setAgenceDetails({ ...agenceDetails, gouvernourat: e.target.value.trim() })}
              />
            ) : (
              <p className={`mb-1 text-${agenceDetails.gouvernourat ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {agenceDetails.gouvernourat || "Non rempli"}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Contacts:</strong></p>
            <ul>
              {agenceDetails.contacts && agenceDetails.contacts.map((contact, index) => (
                <li key={index}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                      />
                      <button onClick={() => removeContact(index)}>Remove</button>
                    </>
                  ) : (
                    <span>{contact.name} - {contact.phone}{index < agenceDetails.contacts.length - 1 ? ', ' : ''}</span>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="name"
                    value={newContact.name}
                    onChange={(e) => handleNewContactChange('name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="phone"
                    value={newContact.phone}
                    onChange={(e) => handleNewContactChange('phone', e.target.value)}
                  />
                </div>
                <button onClick={addNewContact}>Add Contact</button>
              </>
            )}
          </div>
          <div>
            <button onClick={() => isEditing ? saveChanges() : setIsEditing(true)}   className={isEditing ? 'bg-red-900 text-white p-3 rounded' : 'rounded p-3 text-white bg-green-600'}>
              {isEditing ? "Enregistrer" : "Modifier"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgenceDetails;
