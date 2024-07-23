import React, { useState, useEffect } from "react";
import { IoMdAdd, IoMdDoneAll, IoMdEye, IoMdRefresh } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { format, differenceInMonths } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backendUrl from '../../../config';

const ManagementEquipement = () => {
  const [equipementData, setEquipementData] = useState([]);
  const [selectedEquipementIds, setSelectedEquipementIds] = useState([]);
  const [selectedEquipement, setSelectedEquipement] = useState([]);
  const [scnquery, setSCNQuery] = useState("");
  const [clientquery, setClientQuery] = useState("");
  const [agencequery, setAgenceQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const filteredEquipements = equipementData
  .filter((equipement) => 
    (equipement.numero_serie.toLowerCase().includes(scnquery.toLowerCase()) &&
    (equipement?.client?.name.toLowerCase().includes(clientquery.toLowerCase()) &&
    equipement?.agence?.agence.toLowerCase().includes(agencequery.toLowerCase())))
  );
  ///////// PAGINATION /////////
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEquipements = filteredEquipements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEquipements.length / itemsPerPage);
  //const currentEquipements = equipementData.slice(indexOfFirstItem, indexOfLastItem);
  //const totalPages = Math.ceil(equipementData.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  ///////// PAGINATION /////////
  const handleCheckboxChange = (equipementId) => {
    setSelectedEquipementIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(equipementId)) {
        return prevSelectedIds.filter((id) => id !== equipementId);
      } else {
        return [...prevSelectedIds, equipementId];
      }
    });
    console.log(equipementId);
  };
  useEffect(() => {
    fetchEquipementData();
  }, []);
  const fetchEquipementData = () => {
    fetch(`${backendUrl}/api/equi/list`)
      .then((response) => response.json())
      .then((data) => setEquipementData(data))
      .catch((error) => console.error("Error fetching equipment data:", error));
  };
  const onDelete = async (equipementId) => {
    try {
      console.log("Deleting equipement with ID:", equipementId);
      const response = await fetch(`${backendUrl}/api/equi/${equipementId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("La suppression a été effectuée avec succès.");
        fetchEquipementData();
      } else {
        throw new Error("equipement deletion failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue lors de la suppression");
    }
  };
  const handleDeleteClick = () => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation de suppression",
      text: "Êtes-vous sûr de vouloir supprimer ce client et ses contacts associés ?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        selectedEquipementIds.forEach((equipementId) => onDelete(equipementId));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Suppression annulée");
      }
    });
  };

  const handleReload = () => {
    fetchEquipementData();
  };

  return (
    <div>
      <ToastContainer />
      <div className="relative mt-9 overflow-x-auto shadow-lg sm:rounded-lg">
        <div className="ml-2 flex flex-wrap items-center space-x-5">
          <a href="/admin/add/equipement">
            <button className="flex text-gray-900 dark:text-gray-300 dark:text-gray-600">
              <IoMdAdd className="h-6 w-6" />
              Add
            </button>
          </a>
          <Link
            to={
              selectedEquipementIds.length === 1
                ? `/admin/equipement/details/${selectedEquipementIds[0]}`
                : "#"
            }>
            <button
              className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedEquipementIds.length !== 1 ? "cursor-not-allowed" : ""
                }`}
              onClick={() => {
                if (selectedEquipementIds.length !== 1) {
                  Swal.fire({
                    icon: "warning",
                    title: "Please select one Equipement",
                  });
                }
              }} >
              <IoMdEye className="h-6 w-6" />
              View
            </button>
          </Link>
          <button
            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedEquipementIds.length !== 1 ? "cursor-not-allowed" : ""
              }`}
            onClick={() => {
              if (selectedEquipementIds.length !== 1) {
                Swal.fire({
                  icon: "warning",
                  title: "Please select one Equipement",
                });
              } else {
                handleDeleteClick();
              }
            }}>
            <MdDelete className="h-6 w-6" />
            Delete
          </button>
          <button onClick={handleReload()}
            className="flex text-gray-900 dark:text-gray-300 dark:text-gray-600">
            <IoMdRefresh className="h-6 w-6" />
            Reload
          </button>
        </div>
        <br />
        <div className="ml-4 flex flex-wrap items-center space-x-5">
          <label
            htmlFor="search"
            className=" text-gray-700    dark:text-gray-300">
            Numero série:
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            onChange={(e) => setSCNQuery(e.target.value)}
          />
          <label
            htmlFor="search"
            className=" text-gray-700    dark:text-gray-300">
            Client:
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            onChange={(e) => setClientQuery(e.target.value)}
          />
          <label
            htmlFor="search"
            className=" text-gray-700    dark:text-gray-300">
            Agence:
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            onChange={(e) => setAgenceQuery(e.target.value)}
          />
        </div>

        <div className="border-b border-gray-900/10 pb-6"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-900  sm:table lg:table">
            <thead className="overflow-x-auto bg-gray-50 text-xs uppercase dark:bg-gray-900 ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900   dark:text-gray-300">
                  Numero serie
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                  Equipement Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300">
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300">
                  Agence
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                  Modéle
                </th>
              </tr>
            </thead>
            <tbody>
              {/*Array.isArray(equipementData) && equipementData
                .filter((equipement) =>
                  Object.values(equipement)
                    .filter((value) => typeof value === "string")
                    .some((value) =>
                      value.toLowerCase().includes(scnquery.toLowerCase()),
               
                    )
                )
                .map((equipement, index) => (*/}
                              {currentEquipements.map((equipement, index) => (

                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                          checked={selectedEquipementIds.includes(
                            equipement._id
                          )}
                          onChange={() => handleCheckboxChange(equipement._id)} />
                        <label
                          htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {equipement.numero_serie}
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" >
                      {equipement.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {equipement?.client?.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {equipement?.agence?.agence}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {equipement?.modele?.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <nav className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row" aria-label="Table navigation">
        <span className="mb-4 block w-full text-sm font-normal text-gray-900 dark:text-gray-300 md:mb-0 md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, equipementData.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {equipementData.length}
          </span>{" "}
          items
        </span>
        <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
          <li>
            <button
              className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-900 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                href="#"
                className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-900 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManagementEquipement;
