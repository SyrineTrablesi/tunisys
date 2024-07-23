import React, { useState, useEffect } from "react";
import EquipementList from "views/Modals/EquipementList";
import TechnicienList from "views/Modals/ListeTechnicien";
import axios from "axios"; // Correction : axios doit être importé depuis 'axios', pas 'react'
import { toast, ToastContainer } from "react-toastify";
import EquipementTicket from "views/Modals/EquiementTicket";
import { equipementsReducer } from "Contexts/equipementContext";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddFieldTicket = () => {
  const type = "FIELD";
  const status = "ASSIGNED"
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [setSelectedAgence, setSetSelectedAgence] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [agences, setAgences] = useState([]);
  const [agence, setAgence] = useState('');
  const [equipement, setEquipement] = useState('');
  const [equipements, setEquipements] = useState([]);
  const [modele, setModele] = useState("");

  const handleChangeClient = async (e) => {
    const selectedClientId = e.target.value;
    setSelectedClient(selectedClientId);

    try {
      const response = await fetch(`${backendUrl}/api/client/${selectedClientId}/agences`);
      if (response.ok) {
        const data = await response.json();
        setAgences(data);
        setAgence('');
      } else {
        console.error('Failed to fetch agences for selected client');
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setAgences([]);
    }
  };
  
  const handleChangeAgence = async (e) => {
    const selectedAgenceId = e.target.value;
    setSelectedAgence(selectedAgenceId);
    console.log(selectedAgenceId);

    try {
      const response = await fetch(`${backendUrl}/api/equi/agence/${selectedAgenceId}`);
      if (response.ok) {
        const data = await response.json();
        setEquipements(data);
        setEquipement('');
      } else {
        console.error('Failed to fetch equipement for selected agence');
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setEquipements([]);
    }
  };
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/client/list`);
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const [users, setUsers] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);
  const [note, setNote] = useState("");
  const [call_time, setCallTime] = useState("");
  const [service_station, setservice_station] = useState("");
  const [service_type, setServiceType] = useState("");
  const [reference, setReferenceNumber] = useState("");
  const [isTechnicienModalOpen, setTechnicienModalOpen] = useState(false);
  const [isEquipementModalOpen, setEquipementModalOpen] = useState(false);
  //// Helpdesk ////
  const [technicien, setTechnicien] = useState("");
  const [nameHelpdesk, setNameHelpdesk] = useState("");
  const [lastname, setLastName] = useState("");
  /// Equipement Data //////
  const [selectedEquipementSn, setselectedEquipementSn] = useState([])
  const [equipement_type, setEquipementType] = useState("");
  const [client, setClient] = useState('');
  const [StartGarantie_Date, setStartGarantieDate] = useState("");
  const [EndGarantie_Date, setEndGarantieDate] = useState("");
  const [service_status, setServiceStatus] = useState("");
  ////////////////////////////////////////////////////////
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const handleTechnicienSelection = (techbicien) => {
    setTechnicien(techbicien._id)
    setNameHelpdesk(techbicien.firstname)
    setLastName(techbicien.lastname)
  }
  
  const openTechnicienModal = () => {
    setTechnicienModalOpen(true);
  };

  const closeTechnicienModal = () => {
    setTechnicienModalOpen(false);
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      equipement,
      technicien: technicien,
      service_type,
      equipement_type,
      garantie_end_date: EndGarantie_Date,
      garantie_start_date: StartGarantie_Date,
      service_station,
      service_status,
      client: clientId,
      description: note,
      call_time,
      type,
      status,
      reference
    };
    const response = await fetch(`${backendUrl}/api/ticket/phone`, {
      method: 'POST',
      body: JSON.stringify(ticketData),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setClient('');
      setselectedEquipementSn('')
      setServiceStatus('')
   
      setEquipementType('')
      setStartGarantieDate('')
      setEndGarantieDate('')
      setTechnicien('')
      setReferenceNumber('')
      setServiceType('')
      setservice_station('')
      setCallTime('')
      setNote('')
      setError(null);
      setSuccessMessage("Ticket ajouté avec succès");
      console.log('Request sent successfully');
      setEmptyFields([]);
      toast.success('Ticket ajouté avec succès');
      setError(null);
    }
  }
  return (
    <>
      <ToastContainer />
      <h1 className="mx-0  mb-2.5 text-center text-[1.7em] font-semibold text-navy-700 dark:text-gray-500">
        Ajouter Phone Ticket :
      </h1>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Client</label>
              <div>
                <select
                  id="client-select"
                  value={selectedClient}
                  onChange={handleChangeClient}
                  className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Choisir client...</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="agence-select" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Agence</label>
              <select
                id="agence-select"
                value={agence}
                onChange={(e) => setAgence(e.target.value)}
                className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >

                <option value="">Choisir agence...</option>
                {agences.length === 0 ? (
                  <option disabled>Aucune agence trouvée</option>
                ) : (
                  agences.map((agence) => (
                    <option key={agence._id} value={agence._id}>
                      {agence.agence}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="equipement-select" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"> Numéro de serie</label>
              <select
                id="equipement-select"
                value={equipement}
                onChange={(e) => setEquipement(e.target.value)}
                className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Choisir equipement...</option>
                {equipements.length === 0 ? (
                  <option disabled>Aucun equipement trouvé</option>
                ) : (
                  equipements.map((equipement) => (
                    <option key={equipement._id} value={equipement._id}>
                      {equipement.numero_serie}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="call_time"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
               Numéro de serie
              </label>
              <div className="mt-2">
                <input
                  value={call_time}
                  onChange={(e) => setCallTime(e.target.value)}
                  type="datetime-local"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="user-list"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Technicien
              </label>
              <div className="mt-2">
                <input
                  value={`${nameHelpdesk} ${lastname}`}
                  onChange={(e) => setNameHelpdesk(e.target.value)}
                  type="text"
                  onClick={openTechnicienModal}
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />

              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="call_time"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Call in time
              </label>
              <div className="mt-2">
                <input
                  value={call_time}
                  onChange={(e) => setCallTime(e.target.value)}
                  type="datetime-local"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="service-type"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service Type
              </label>
              <div className="mt-2">
                <select
                  value={service_type}
                  onChange={(e) => setServiceType(e.target.value)}
                  name="service-type"
                  id="service-type"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                >
                  <option value="">Sélectionnez type de service</option>

                  <option value="Corrective Maintenance">Corrective Maintenance</option>
                  <option value="Preventive Maintenance">Preventive Maintenance</option>
                  <option value="Staging Service">Staging Service</option>
                  <option value="Installation-Onsite inpection">Installation-Onsite inpection</option>
                  <option value="Installation-Physical Installation">
                    Installation-Physical Installation
                  </option>
                  <option value="Installation-Online Activation">
                    Installation-Online Activation
                  </option>
                  <option value="Hardware-Online update">Hardware-Online update</option>
                  <option value="Software-upgrade update">Software-upgrade update</option>
                  <option value="Removal">Removal</option>
                  <option value="Disable">Disable</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service Status
              </label>
              <div className="mt-2">
                <input
                  value={service_status}
                  onChange={(e) => setServiceStatus(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Reference number
              </label>
              <div className="mt-2">
                <input
                  value={reference}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Equipement type
              </label>
              <div className="mt-2">
                <input
                  value={equipement_type}
                  onChange={(e) => setEquipementType(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service station
              </label>
              <div className="mt-2">
                <input
                  value={service_station}
                  onChange={(e) => setservice_station(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Garantie End Date
              </label>
              <input
                value={EndGarantie_Date}
                onChange={(e) => setEndGarantieDate(e.target.value)}
                type="date"
                className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <div className="mt-2"></div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Garantie Start Date
              </label>
              <input
                value={StartGarantie_Date}
                onChange={(e) => setStartGarantieDate(e.target.value)}
                type="date"
                className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <div className="mt-2"></div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  id="about"
                  name="about"
                  rows="3"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTechnicienModalOpen && (
        <TechnicienList handleClose={closeTechnicienModal} handleTechnicienSelection={handleTechnicienSelection} />
      )}
 
      {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

      {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className=" font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>

      </div>
    </>
  );
};
export default AddFieldTicket;
