import Card from 'components/card';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Addmodele = ({ handleClose }) => {
    const { user } = useAuthContext();
    const { marqueId } = useParams();
    const [modele_ecran, setmodele_ecran] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const handleCheckboxChange = (value) => {
        setmodele_ecran((prevValue) => (prevValue === value ? '' : value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let fields = [];
        if (!name) fields.push('name');
        if (!modele_ecran) fields.push('modeleEcran');
        setEmptyFields(fields);

        if (fields.length > 0) {
            setError('Please fill in all required fields.');
            return;
        }

        const modeleData = {
            marque: marqueId,
            name,
            modele_ecran,
        };

        try {
            const response = await fetch(`${backendUrl}/api/marque/addModele`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(modeleData),
            });

            const data = await response.json();

            if (response.ok) {
                handleClose();
                setName('');
                setmodele_ecran('');
                setSuccessMessage('Modele ajouté avec succès.');
                setError('');
                setEmptyFields([]);
            } else {
                throw new Error(data.error || "Une erreur est survenue lors de l'ajout du modele.");
            }
        } catch (error) {
            console.error('Error adding modele:', error.message);
            setError(error.message || "Une erreur est survenue lors de l'ajout du modele.");
        }
    };

    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
            <div className="rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100">
                <h2 className="mb-4 text-xl font-semibold text-center text-tunisys-100">Ajouter Modele</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>
                        Nom Modele:
                    </label>
                    <input
                        className={`block w-full border rounded mb-2 p-2.5 border-solid ${emptyFields.includes('name') ? 'border-red-500' : 'border-[#ddd]'}`}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label>
                        Modele ecran:
                    </label>
                    <div className="block w-full mb-2">
                        <label className={`block  p-2.5 mb-2 ${emptyFields.includes('modeleEcran') ? 'border-red-500' : 'border-[#ddd]'}`}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('15')}
                                checked={modele_ecran === '15'}
                            />
                            15
                        </label>
                        <label className={`block p-2.5 mb-2 ${emptyFields.includes('modeleEcran') ? 'border-red-500' : 'border-[#ddd]'}`}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('19')}
                                checked={modele_ecran === '19'}
                            />
                            19
                        </label>
                    </div>
                    <button
                        className="text-indigo-00 text-green-600 mt-4 rounded py-2 px-4 font-bold hover:text-green-600"
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

export default Addmodele;
