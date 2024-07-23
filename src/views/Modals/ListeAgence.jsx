import React, { useEffect, useState } from 'react';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AgenceList = ({ handleClose, handleAgenceSelection }) => {
    const [agenceData, setagenceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isagenceModalOpen, setagenceModalOpen] = useState(false);
    const [scnQuery, setSCNQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [agencesPerPage] = useState(5);

    const fetchagences = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/client/agences`);
            const data = await response.json();
            setagenceData(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching agences:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchagences();
    }, []);

    const selectagence = (agence) => {
        handleAgenceSelection(agence);
        handleClose();
    };

    const handleSearch = (query) => {
        setSCNQuery(query);
        setFilteredData(
            agenceData.filter((agence) =>
                agence.agence.toLowerCase().includes(query.toLowerCase()) ||
                (agence.client && agence.client.name.toLowerCase().includes(query.toLowerCase()))
            )
        );
    };

    // Get current agences
    const indexOfLastAgence = currentPage * agencesPerPage;
    const indexOfFirstAgence = indexOfLastAgence - agencesPerPage;
    const currentAgences = filteredData.slice(indexOfFirstAgence, indexOfLastAgence);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredData.length / agencesPerPage);

    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
            <div className="overflow-x-auto relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl rounded-md bg-white p-6 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-sm text-center dark:text-white p-2 text-tunisys-100">
                        Choisir agence:
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-left-modal" onClick={handleClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="ml-4 flex items-center flex-wrap space-x-5">
                    <label htmlFor="search" className="text-gray-700 dark:text-gray-300">Agence / Client :</label>
                    <input
                        type="text"
                        id="search"
                        className="block p-2 text-sm text-gray-700 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        value={scnQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                        <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-gray-900 dark:text-gray-300">Agence</th>
                                <th scope="col" className="px-6 py-3 text-gray-900 dark:text-gray-300">Client</th>
                                <th scope="col" className="px-6 py-3 text-gray-900 dark:text-gray-300">Localisation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAgences.map((agence, index) => (
                                <tr key={`${agence._id}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`checkbox-table-search-${index}`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onClick={() => selectagence(agence)}
                                            />
                                            <label className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {agence.agence}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {agence.client.name}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {agence.localisation}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            className="rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span className="text-sm font-semibold text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleClose}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgenceList;
