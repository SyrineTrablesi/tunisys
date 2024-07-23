import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backendUrl from '../../../config';

const AddEquipement = () => {
    const [selectedMarque, setSelectedMarque] = useState('');
    const [numero_serie, setnumero_serie] = useState("");
    const [type, settype] = useState("");
    const [modele, setModele] = useState("");
    const [date_livraison, setDate_livraison] = useState([]);
    const [date_installation_physique, setDate_installation_physique] = useState([]);
    const [date_mise_enservice, setDate_mise_enservice] = useState([]);
    const [agenceId, setagenceId] = useState("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    const [clientId, setClientId] = useState("");
    const [marques, setMarques] = useState([]);
    const [models, setModels] = useState([]);
    const [clients, setClients] = useState([]);
    const [agences, setAgences] = useState([]);
    const [contrat, setContrat] = useState('');
    const [agence, setAgence] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [newDateLivraison, setNewDateLivraison] = useState('');
    const [newDateInstallation, setNewDateInstallation] = useState('');
    const [newDateMiseEnService, setNewDateMiseEnService] = useState('');
    const handleReset = () => {
        setnumero_serie('');
        settype('');
        setModele('');
        setClientId('');
        setagenceId('');
        setDate_livraison([]);
        setDate_installation_physique([]);
        setDate_mise_enservice([]);
        setContrat('');
        setSelectedMarque('');
        setSelectedClient('');
        setNewDateLivraison('');
        setNewDateInstallation('');
        setNewDateMiseEnService('');
        setError('');
        setSuccessMessage('');
    };

    const handleAddDateLivraison = () => {
        if (!newDateLivraison) {
            setError('Veuillez sélectionner une date de livraison.');
            return;
        }

        setDate_livraison([...date_livraison, newDateLivraison]);
        setNewDateLivraison('');
        setError('');
    };

    const handleAddDateInstallation = () => {
        if (!newDateInstallation) {
            setError('Veuillez sélectionner une date d\'installation physique.');
            return;
        }

        setDate_installation_physique([...date_installation_physique, newDateInstallation]);
        setNewDateInstallation('');
        setError('');
    };

    const handleAddDateMiseEnService = () => {
        if (!newDateMiseEnService) {
            setError('Veuillez sélectionner une date de mise en service.');
            return;
        }

        setDate_mise_enservice([...date_mise_enservice, newDateMiseEnService]);
        setNewDateMiseEnService('');
        setError('');
    };

    const handleRemoveDateLivraison = (index) => {
        const updatedDates = [...date_livraison];
        updatedDates.splice(index, 1);
        setDate_livraison(updatedDates);
    };

    const handleRemoveDateInstallation = (index) => {
        const updatedDates = [...date_installation_physique];
        updatedDates.splice(index, 1);
        setDate_installation_physique(updatedDates);
    };

    const handleRemoveDateMiseEnService = (index) => {
        const updatedDates = [...date_mise_enservice];
        updatedDates.splice(index, 1);
        setDate_mise_enservice(updatedDates);
    };
    const types = [
        "DAB Interne", "DAB Externe", "DAB Hors site", "GAB Interne", "GAB Externe", "GAB Hors site", "Autres"
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();

        const equipementData = {
            numero_serie,
            type,
            modele,
            date_livraison,
            date_installation_physique,
            date_mise_enservice,
            client: selectedClient,
            agence,
            contrat,
            marque: selectedMarque

        };
        /*if (!numero_serie || !type || !agenceId || !modele || date_livraison.length === 0 || date_installation_physique.length === 0 || date_mise_enservice.length === 0 || !selectedMarque || !clientId || !contrat) {
            setError('All fields are required.');
            return;
        }*/
        console.log(equipementData)

        try {
            const response = await fetch(`${backendUrl}/api/equi/create`, {
                method: 'POST',
                body: JSON.stringify(equipementData),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const json = await response.json();
            console.log(equipementData)

            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields || []);
            } else {
                setEmptyFields([]);
                handleReset();
                console.log(equipementData)
                setSuccessMessage("Équipement ajouté avec succès, Vous devez compléter les autres données !!");
                toast.success("Équipement ajouté avec succès, Vous devez compléter les autres données !! ");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred. Please try again.');
        }
    };


    //////////////////////////////////////////////////////// MODELE 
    const handleChangeMarque = async (e) => {
        const selectedMarqueId = e.target.value;
        setSelectedMarque(selectedMarqueId);

        try {
            const response = await fetch(`${backendUrl}/api/marque/${selectedMarqueId}/modeles`);
            if (response.ok) {
                const data = await response.json();
                setModels(data);
                setModele('');
            } else {
                console.error('Failed to fetch models for selected marque');
                setModels([]);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
            setModels([]);
        }
    };
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
                setModels([]);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
            setAgences([]);
        }
    };
    /////////////// MARQUE ///////////////
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
    }, [backendUrl]);
    ////////////////////////////////
    /////////////// CLIENT ///////////
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
    return (
        <div className="overflow-x-auto">
            <ToastContainer />
            <h1 className="text-[1.7em] mb-2.5 mx-0 text-center font-semibold dark:text-white">Ajouter Equipement:</h1>
            <div className="space-y-1">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 relative">
                            <div className="sm:col-span-3 relative">
                                <label htmlFor="marque-select" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Fournisseur</label>
                                <select
                                    id="marque-select"
                                    value={selectedMarque}
                                    onChange={handleChangeMarque}
                                    className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">Choisir fournisseur...</option>
                                    {marques.map((marque) => (
                                        <option key={marque._id} value={marque._id}>
                                            {marque.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3 relative">
                            <label htmlFor="modele-select" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Modèle</label>
                            <select
                                id="modele-select"
                                value={modele}
                                onChange={(e) => setModele(e.target.value)}
                                className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Choisir modéle...</option>
                                {models.map((model) => (
                                    <option key={model._id} value={model._id}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                            <label htmlFor="type-equipement" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Type equipement</label>
                            <select
                                id="type-equipement"
                                className={`block text-navy-900 appearance-none w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('equipement_type') ? 'border-red-500' : 'border-[#ddd]'}`}
                                onChange={(e) => settype(e.target.value)}
                                value={type}
                            >
                                <option value="" disabled>Sélectionnez un type</option>
                                {types.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="contrat" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Contrat</label>
                            <div>
                                <input
                                    id="contrat"
                                    type="text"
                                    value={contrat}
                                    onChange={(e) => setContrat(e.target.value)}
                                    className="block w-full border-red-700 dark:bg-navy-900 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 relative">
                            <label htmlFor="serial-number" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">N° Série</label>
                            <div>
                                <input
                                    id="serial-number"
                                    type="text"
                                    value={numero_serie}
                                    onChange={(e) => setnumero_serie(e.target.value)}
                                    className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-3">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Dates de livraison:</label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={newDateLivraison}
                                        onChange={(e) => setNewDateLivraison(e.target.value)}
                                        className={`block w-[500px] border rounded box-border mb-2 p-2.5 border-solid ${error && 'border-red-500'}`}
                                    />
                                    <button
                                        type="button"
                                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        onClick={handleAddDateLivraison}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                            {date_livraison.length > 0 && (
                                <ul className="mb-2">
                                    {date_livraison.map((date, index) => (
                                        <li key={index} className="flex justify-between items-center bg-gray-100 rounded p-2">
                                            <span>{date}</span>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleRemoveDateLivraison(index)}
                                            >
                                                Supprimer
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="sm:col-span-3">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Dates d'installation physique:</label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={newDateInstallation}
                                        onChange={(e) => setNewDateInstallation(e.target.value)}
                                        className={`block w-[500px] border rounded box-border mb-2 p-2.5 border-solid ${error && 'border-red-500'}`}
                                    />
                                    <button
                                        type="button"
                                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        onClick={handleAddDateInstallation}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                            {date_installation_physique.length > 0 && (
                                <ul className="mb-2">
                                    {date_installation_physique.map((date, index) => (
                                        <li key={index} className="flex justify-between items-center bg-gray-100 rounded p-2">
                                            <span>{date}</span>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleRemoveDateInstallation(index)}
                                            >
                                                Supprimer
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="sm:col-span-3">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Dates de mise en service:</label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={newDateMiseEnService}
                                        onChange={(e) => setNewDateMiseEnService(e.target.value)}
                                        className={`block w-[500px] border rounded box-border mb-2 p-2.5 border-solid ${error && 'border-red-500'}`}
                                    />
                                    <button
                                        type="button"
                                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        onClick={handleAddDateMiseEnService}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                            {date_mise_enservice.length > 0 && (
                                <ul className="mb-2">
                                    {date_mise_enservice.map((date, index) => (
                                        <li key={index} className="flex justify-between items-center bg-gray-100 rounded p-2">
                                            <span>{date}</span>
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleRemoveDateMiseEnService(index)}
                                            >
                                                Supprimer
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                >
                    Valider
                </button>
                <button
                    type="button" onClick={handleReset}

                    className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Annuler
                </button>
            </div>
            {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
            {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}

        </div>
    )
}
export default AddEquipement;
