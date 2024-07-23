import React, { useState, useEffect } from 'react';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ClientGestion = () => {
    const [clients, setClients] = useState([]);
    const [editingClientId, setEditingClientId] = useState(null);
    const [newClientName, setNewClientName] = useState('');

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

    useEffect(() => {
        fetchClients();
    }, []);

    const handleEditClient = async (clientId, currentName) => {
        if (!newClientName || newClientName.trim() === '') {
            alert('Name must not be an empty string.');
            return;
        }

        // If the new name is the same as the current name, skip the update
        if (newClientName === currentName) {
            setEditingClientId(null);
            setNewClientName('');
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/client/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newName: newClientName }),
            });

            if (response.ok) {
                console.log(`Client ${clientId} updated successfully.`);
                fetchClients();
                setEditingClientId(null);
                setNewClientName('');
            } else {
                const errorData = await response.json();
                console.error(`Failed to update client ${clientId}: ${errorData.error}`);
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    const handleDeleteClient = async (clientId) => {
        try {
            const response = await fetch(`${backendUrl}/api/client/${clientId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Client ${clientId} deleted successfully.`);
                fetchClients();
            } else {
                console.error(`Failed to delete client ${clientId}`);
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const startEditingClient = (clientId, currentName) => {
        setEditingClientId(clientId);
        setNewClientName(currentName);
    };

    return (
        <>
            <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Gestion Clients</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-900 sm:table lg:table">
                    <thead className="overflow-x-auto bg-gray-50 text-xs uppercase dark:bg-gray-900">
                        <tr>
                            <th scope="col" className="px-2 py-1 text-gray-900 dark:text-gray-300 text-center">
                                Client
                            </th>
                            <th scope="col" className="px-2 py-3 text-gray-900 dark:text-gray-300 text-center">
                                Modifier
                            </th>
                            <th scope="col" className="px-2 py-3 text-gray-900 dark:text-gray-300 text-center">
                                Supprimer
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client._id} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                <td
                                    scope="row"
                                    className="text-center whitespace-nowrap px-[15] py-4 font-medium text-gray-900 dark:text-white client-name-cell"
                                >
                                    {editingClientId === client._id ? (
                                        <input
                                            type="text"
                                            value={newClientName}
                                            onChange={(e) => setNewClientName(e.target.value)}
                                            className="w-full p-1 border-red-500 dark:text-navy-900 border border-navy-900 "
                                            />
                                    ) : (
                                        client.name
                                    )}
                                </td>
                                <td
                                    scope="row"
                                    className="text-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {editingClientId === client._id ? (
                                        <button
                                            className="text-[15px] ml-5 text-white bg-green-500 dark:text-white p-2 rounded"
                                            onClick={() => handleEditClient(client._id, client.name)}
                                        >
                                            enregistrer
                                        </button>
                                    ) : (
                                        <button
                                            className="text-[15px] ml-5 text-white bg-green-500 dark:text-white p-2 rounded"
                                            onClick={() => startEditingClient(client._id, client.name)}
                                        >
                                            Modifier
                                        </button>
                                    )}
                                </td>
                                <td
                                    className="text-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    <button
                                        className="text-[15px] ml-5 text-white bg-red-500 dark:text-white p-2 rounded"
                                        onClick={() => handleDeleteClient(client._id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ClientGestion;
