import Card from 'components/card';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext'
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddClient = ({ handleClose }) => {
    const { user } = useAuthContext()
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('Vous devez etre connectez')
            return
        }
        const client = { name }
        const response = await fetch(`${backendUrl}/api/client/add`, {
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields || [])

        }
        if (response.ok) {
            setEmptyFields([])
            setName('')
            setSuccessMessage("Client ajouté avec succès");
            handleClose()
        }
    }
    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
            <div className="rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100">
                <h2 className="mb-4 text-xl font-semibold text-center text-tunisys-100">Ajouter client</h2>
                <form className="flex flex-col" onClick={handleSubmit} >
                    <label>
                        Nom Client:
                    </label>
                    <input className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('name') ? 'border-red-500' : 'border-[#ddd]'
                        }`} type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <button
                        className="text-indigo-00 text-green-600 text- mt-4 rounded py-2 px-4 font-bold hover:text-green-600"
                        type="submit"> Enregistrer </button>
                    {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
                    {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
                    <button
                        className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
                        type="button"
                        onClick={handleClose} >Annuler </button>
                </form>
            </div>
        </div>
    );
};

export default AddClient;
