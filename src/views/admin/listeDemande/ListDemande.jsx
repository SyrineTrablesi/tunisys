import React, { useEffect, useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

import Swal from 'sweetalert2';
import { IoMdAdd, IoMdDoneAll, IoMdEye, IoMdMedkit, IoMdOpen, IoMdSave, IoMdSettings, IoMdShare } from 'react-icons/io'
import { MdDelete, MdEdit, MdPersonAdd } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ListDemande = () => {

    const [demande, setDemande] = useState([]);
    const { user } = useAuthContext();

    const fetchData = async () => {
        try {
            const response = await fetch('/api/conges/encours', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setDemande(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div>
                <ToastContainer />

                <div className="mt-9 relative  shadow-lg sm:rounded-lg">
                    <div className="ml-2 flex items-center flex-wrap space-x-5">

                        <button
                            className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600  'cursor-not-allowed' : ''}`}

                        >
                            <IoMdEye className="h-6 w-6" />
                            View
                        </button>

                        <button
                            className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600? 'cursor-not-allowed' : ''}`}

                        >
                            <MdDelete className="h-6 w-6" />
                            Delete
                        </button>
                    </div>
                    <br />

                    <div className="ml-4 flex items-center flex-wrap space-x-5">
                        <label htmlFor="search" className=" text-gray-700 dark:text-gray-300">
                            Client :      </label>
                        <input
                            type="text"
                            id="search"
                            className="block p-2 text-sm text-gray-700 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"

                        />

                    </div>
                    <div className="border-b border-gray-900/10 pb-6">
                    </div>
                    <div className="">

                        <table className=" w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                            <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                                <tr className="">
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-gray-900   dark:text-gray-300 ">
                                        Demandes                       </th>

                                    <th scope="col" className="px-6 py-3 text-gray-900   dark:text-gray-300 ">
                                        Resultat                       </th>
                                    <th scope="col" className="text-center px-6 py-3 text-gray-900    dark:text-gray-300" >
                                        Actions                   </th>
                                </tr>
                            </thead>
                            <tbody>
                                {demande.map((item) => (

                                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input

                                                    type="checkbox"

                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

                                                />
                                                <label className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>

                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item._id}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.resultat}
                                        </td>
                                        <td scope="flex" className="text-center center space-x-4 flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white justify-center">
                                            <button class="w-24 h-8 bg-green-500 rounded-md border-none cursor-pointer flex items-center px-2 justify-between transition-all duration-300 transform hover:opacity-85 hover:translate-y-[-4px]">
                                                <span class="text-white text-xs font-bold leading-8 mx-auto">ACCEPTER</span>
                                                <svg class="text-white w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">

                                                </svg>
                                            </button>

                                            <button class="w-24 h-8 bg-red-600 rounded-md border-none cursor-pointer flex items-center px-2 justify-between transition-all duration-300 transform hover:opacity-85 hover:translate-y-[-4px]">
                                                <span class="text-white text-xs font-bold leading-8 mx-auto">REFUSER</span>
                                                <svg class="text-white w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">

                                                </svg>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal  text-gray-900    dark:text-gray-300 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default ListDemande