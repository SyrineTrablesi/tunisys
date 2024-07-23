import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backendUrl from '../../../config';
import { format } from 'date-fns';

const EquipementDetails = () => {

  const { equipementId } = useParams();
  const [equipementDetails, setEquipementDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [dateLivraison, setDateLivraison] = useState([]);
  const [dateInstallationPhysique, setDateInstallationPhysique] = useState([]);
  const [dateMiseEnService, setDateMiseEnService] = useState([]);

  const [newLivraisonDate, setNewLivraisonDate] = useState('');
  const [newInstallationDate, setNewInstallationDate] = useState('');
  const [newMiseEnServiceDate, setNewMiseEnServiceDate] = useState('');
  const types = [
    "DAB Interne", "DAB Externe", "DAB Hors site", "GAB Interne", "GAB Externe", "GAB Hors site"
  ];
  const type_camera = ["USB", "Analogique"];

  useEffect(() => {
    if (equipementId) {
      fetch(`${backendUrl}/api/equi/${equipementId}`)
        .then((response) => response.json())
        .then((data) => {
          setEquipementDetails(data);
          setDateLivraison(data.date_livraison || []);
          setDateInstallationPhysique(data.date_installation_physique || []);
          setDateMiseEnService(data.date_mise_enservice || []);
        })
        .catch((error) => {
          console.error("Error fetching equipment details:", error);
        });
    }
  }, [equipementId]);

  if (!equipementDetails) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Save button clicked");

    const updatedEquipement = {
      ...equipementDetails,
      date_livraison: dateLivraison,
      date_installation_physique: dateInstallationPhysique,
      date_mise_enservice: dateMiseEnService,
    };

    try {
      const response = await fetch(`${backendUrl}/api/equi/${equipementDetails._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedEquipement),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error) {
          console.error("Error:", errorData.error);
        } else {
          throw new Error(errorData.error || "Error modifying equipment");
        }
      } else {
        const responseData = await response.json();
        console.log("Updated equipment data:", responseData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDateLivraison(equipementDetails.date_livraison || []);
    setDateInstallationPhysique(equipementDetails.date_installation_physique || []);
    setDateMiseEnService(equipementDetails.date_mise_enservice || []);
  };

  const handleDateChange = (index, dateType, value) => {
    switch (dateType) {
      case 'date_livraison':
        const updatedLivraisonDates = [...dateLivraison];
        updatedLivraisonDates[index] = value;
        setDateLivraison(updatedLivraisonDates);
        break;
      case 'date_installation_physique':
        const updatedInstallationDates = [...dateInstallationPhysique];
        updatedInstallationDates[index] = value;
        setDateInstallationPhysique(updatedInstallationDates);
        break;
      case 'date_mise_enservice':
        const updatedMiseEnServiceDates = [...dateMiseEnService];
        updatedMiseEnServiceDates[index] = value;
        setDateMiseEnService(updatedMiseEnServiceDates);
        break;
      default:
        break;
    }
  };

  const handleNewDateChange = (dateType, value) => {
    switch (dateType) {
      case 'date_livraison':
        setNewLivraisonDate(value);
        break;
      case 'date_installation_physique':
        setNewInstallationDate(value);
        break;
      case 'date_mise_enservice':
        setNewMiseEnServiceDate(value);
        break;
      default:
        break;
    }
  };

  const addNewDate = (dateType) => {
    switch (dateType) {
      case 'date_livraison':
        setNewLivraisonDate('');
        setDateLivraison([...dateLivraison, newLivraisonDate]);
        break;
      case 'date_installation_physique':
        setNewInstallationDate('');
        setDateInstallationPhysique([...dateInstallationPhysique, newInstallationDate]);
        break;
      case 'date_mise_enservice':
        setNewMiseEnServiceDate('');
        setDateMiseEnService([...dateMiseEnService, newMiseEnServiceDate]);
        break;
      default:
        break;
    }
  };

  const removeDate = (index, dateType) => {
    switch (dateType) {
      case 'date_livraison':
        const updatedLivraisonDates = dateLivraison.filter((_, idx) => idx !== index);
        setDateLivraison(updatedLivraisonDates);
        break;
      case 'date_installation_physique':
        const updatedInstallationDates = dateInstallationPhysique.filter((_, idx) => idx !== index);
        setDateInstallationPhysique(updatedInstallationDates);
        break;
      case 'date_mise_enservice':
        const updatedMiseEnServiceDates = dateMiseEnService.filter((_, idx) => idx !== index);
        setDateMiseEnService(updatedMiseEnServiceDates);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <h1 className="text-navy-700 mx-0 mb-2.5 text-center text-[1.7em] font-semibold dark:text-white">
        Numero Serie : {equipementDetails.numero_serie}
      </h1>
      <div className="min-w-screen dark:bg-navy-900 relative mx-auto my-5 rounded-2xl bg-white p-5 py-10 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Client  : </strong>
            <p className={`mb-1 text-navy-900 dark:text-white`}>
              {equipementDetails.client.name || "Non rempli"} Bank
            </p>
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Agence  : </strong>
            <p className={`mb-1 text-navy-900 dark:text-white`}>
              {equipementDetails.agence.agence || "Non rempli"}
            </p>
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Agence adresse : </strong>
            <p className={`mb-1 text-navy-900 dark:text-white`}>
              {equipementDetails.agence.adresse || "Non rempli"}
            </p>
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Agence Localisation : </strong>
            <p className={`mb-1 text-navy-900 dark:text-white`}>
              {equipementDetails.agence.localisation || "Non rempli"}
            </p>
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Modele : </strong>
            <p className={`mb-1 text-navy-900 dark:text-white`}>
              {equipementDetails.modele.name || "Non rempli"}
            </p>
          </div>
          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Modéle écran :</label>
            {equipementDetails.modele.modele_ecran || "Non rempli"}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Equipement Type : </strong>
            {isEditing ? (
              <select
                id="type-equipement"
                className={`block text-navy-900 appearance-none w-full border rounded box-border mb-2 p-2.5 border-solid  'border-red-500' : 'border-[#ddd]'}`}
                value={equipementDetails.type || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, type: e.target.value })}
              >
                <option value="" disabled>Sélectionnez un type</option>
                {types.map((type) => (
                  <option value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`mb-1 text-${equipementDetails.type ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.type || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Numero  Serie : </strong>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.numero_serie || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, numero_serie: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.numero_serie ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.numero_serie || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Date Livraison :</strong>
            {isEditing ? (
              <div>
                {dateLivraison.map((date, index) => (
                  <div key={index}>
                    <input
                      className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                      type="date"
                      value={date}
                      onChange={(e) => handleDateChange(index, 'date_livraison', e.target.value)}
                    />
                    <button onClick={() => removeDate(index, 'date_livraison')} className="text-white bg-red-600 p-1 ml-3 rounded">Remove</button>
                  </div>
                ))}
                <input
                  className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                  type="date"
                  value={newLivraisonDate}
                  onChange={(e) => handleNewDateChange('date_livraison', e.target.value)}
                />
                <button onClick={() => addNewDate('date_livraison')} className="text-white bg-green-600 p-1 ml-3 rounded">Add Date</button>
              </div>
            ) : (
              <p className={`mb-1 text-${dateLivraison.length > 0 ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {dateLivraison.length > 0 ?
                  dateLivraison.map((date, index) => (
                    <span key={index}>{format(new Date(date), 'yyyy-MM-dd')}{index < dateLivraison.length - 1 ? ', ' : ''}</span>
                  ))
                  : "Non rempli"
                }
              </p>
            )}
          </div>

          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Date installation physique :</strong>
            {isEditing ? (
              <div>
                {dateInstallationPhysique.map((date, index) => (
                  <div key={index}>
                    <input
                      className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                      type="date"
                      value={date}
                      onChange={(e) => handleDateChange(index, 'date_installation_physique', e.target.value)}
                    />
                    <button onClick={() => removeDate(index, 'date_installation_physique')} className="text-white bg-red-600 p-1 ml-3 rounded">Remove</button>
                  </div>
                ))}
                <input
                  type="date"
                  className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                  value={newInstallationDate}
                  onChange={(e) => handleNewDateChange('date_installation_physique', e.target.value)}
                />
                <button onClick={() => addNewDate('date_installation_physique')} className="text-white bg-green-600 p-1 ml-3 rounded">Add Date</button>
              </div>
            ) : (
              <p className={`mb-1 text-${dateInstallationPhysique.length > 0 ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {dateInstallationPhysique.length > 0 ?
                  dateInstallationPhysique.map((date, index) => (
                    <span key={index}>{format(new Date(date), 'yyyy-MM-dd')}{index < dateInstallationPhysique.length - 1 ? ', ' : ''}</span>
                  ))
                  : "Non rempli"
                }
              </p>
            )}
          </div>

          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Date mise en service :</strong>
            {isEditing ? (
              <div>
                {dateMiseEnService.map((date, index) => (
                  <div key={index}>
                    <input
                      className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                      type="date"
                      value={date}
                      onChange={(e) => handleDateChange(index, 'date_mise_enservice', e.target.value)}
                    />
                    <button onClick={() => removeDate(index, 'date_mise_enservice')} className="text-white bg-red-600 p-1 ml-3 rounded">Remove</button>
                  </div>
                ))}
                <input
                  className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                  type="date"
                  value={newMiseEnServiceDate}
                  onChange={(e) => handleNewDateChange('date_mise_enservice', e.target.value)}
                />
                <button onClick={() => addNewDate('date_mise_enservice')} className="text-white bg-green-600 p-1 ml-3 rounded">Add Date</button>
              </div>
            ) : (
              <p className={`mb-1 text-${dateMiseEnService.length > 0 ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {dateMiseEnService.length > 0 ?
                  dateMiseEnService.map((date, index) => (
                    <span key={index}>{format(new Date(date), 'yyyy-MM-dd')}{index < dateMiseEnService.length - 1 ? ', ' : ''}</span>
                  ))
                  : "Non rempli"
                }
              </p>
            )}
          </div>
         
        </div>
        <br />
        <p className="text-tunisys-100 text-navy-700 mx-0 mb-2.5  text-[1.3em] font-semibold"
        > Autres  Données</p>
        <br />
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Nombre K7:</label>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.nb_casette || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, nb_casette: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.nb_casette ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.nb_casette || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Nombre caméra :</label>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.nb_camera || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, nb_camera: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.nb_camera ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.nb_camera || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Type caméra :</label>
            {isEditing ? (
              <select
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.type_camera || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, type_camera: e.target.value })}
              >
                {type_camera.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`mb-1 text-${equipementDetails.type_camera ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.type_camera || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Modéle pc :</label>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.modele_pc || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, modele_pc: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.modele_pc ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.modele_pc || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex  sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Version Application :</strong>
            {isEditing ? (
              <input
                type="text"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.version_application || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, version_application: e.target.value })}
              />
            ) : (
              <p className={`ml-2 mb-1 text-${equipementDetails.version_application ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.version_application || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex  sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Version OS  :</strong>
            {isEditing ? (
              <input
                type="text"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.version_os || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, version_os: e.target.value })}
              />
            ) : (
              <p className={`ml-2 mb-1 text-${equipementDetails.version_os ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.version_os || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex  sm:col-span-3 rounded-lg">

            <strong className="text-navy-900 dark:text-white flex-none w-40">Début garantie : </strong>
            {isEditing ? (
              <input
                type="date"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.garantie_start_date}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, garantie_start_date: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.garantie_start_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.garantie_start_date
                  ? new Date(equipementDetails.garantie_start_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
                  : "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex items-center sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Fin garantie : </strong>
            {isEditing ? (
              <input
                type="date"
                value={equipementDetails.garantie_end_date || ""}
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"

                onChange={(e) => setEquipementDetails({ ...equipementDetails, garantie_end_date: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.garantie_end_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.garantie_end_date
                  ? new Date(equipementDetails.garantie_end_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
                  : "Non rempli"}
              </p>

            )}
          </div>
          <div className="flex  sm:col-span-3 rounded-lg">

<strong className="text-navy-900 dark:text-white flex-none w-40">Début maintenance </strong>
{isEditing ? (
  <input
    type="date"
    className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
    value={equipementDetails.garantie_start_date}
    onChange={(e) => setEquipementDetails({ ...equipementDetails, garantie_start_date: e.target.value })}
  />
) : (
  <p className={`mb-1 text-${equipementDetails.garantie_start_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
    {equipementDetails.garantie_start_date
      ? new Date(equipementDetails.garantie_start_date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
      : "Non rempli"}
  </p>
)}
</div>
<div className="flex items-center sm:col-span-3">
<strong className="text-navy-900 dark:text-white flex-none w-40">Fin maintenance  </strong>
{isEditing ? (
  <input
    type="date"
    value={equipementDetails.garantie_end_date || ""}
    className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"

    onChange={(e) => setEquipementDetails({ ...equipementDetails, garantie_end_date: e.target.value })}
  />
) : (
  <p className={`mb-1 text-${equipementDetails.garantie_end_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
    {equipementDetails.garantie_end_date
      ? new Date(equipementDetails.garantie_end_date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
      : "Non rempli"}
  </p>

)}
</div>
          <div className="flex items-center sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Geolocalisation :</strong>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.geolocalisation || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, geolocalisation: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.garantie_end_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.geolocalisation || "Non rempli"}
              </p>
            )}

          </div>
        


          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Sous adressse :</strong>

            {isEditing ? (
              <input
                type="text"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.sous_adresse || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, sous_adresse: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.sous_adresse ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.sous_adresse || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Type Branche :</strong>

            {isEditing ? (
              <input
                type="text"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.branch_type || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, branch_type: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.branch_type ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.branch_type || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Code à barre :</strong>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.code_barre || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, code_barre: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.code_barre ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.code_barre || "Non rempli"}
              </p>
            )}

          </div>
        </div>
        <br />
        <p className="text-tunisys-100 text-navy-700 mx-0 mb-2.5  text-[1.3em] font-semibold"
        > Paramétres réseau</p>
        <br />
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">code terminal :</label>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.code_terminal || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, code_terminal: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.code_terminal ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.code_terminal || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Adresse IP :</label>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.adresse_ip || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, adresse_ip: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.adresse_ip ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.adresse_ip || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex items-center sm:col-span-3">
            <label className="text-navy-900 dark:text-white flex-none w-40">Masque de sous réseaux :</label>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.masque_sous_reseau || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, masque_sous_reseau: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.masque_sous_reseau ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.masque_sous_reseau || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex  sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Getway :</strong>
            {isEditing ? (
              <input
                type="text"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.getway || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, getway: e.target.value })}
              />
            ) : (
              <p className={`ml-2 mb-1 text-${equipementDetails.getway ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.getway || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex  sm:col-span-3 rounded-lg">

            <strong className="text-navy-900 dark:text-white flex-none w-40">Adresse IP serveur monétique : </strong>
            {isEditing ? (
              <input
                type="text"
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                value={equipementDetails.adresse_ip_serveur_monetique || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, adresse_ip_serveur_monetique: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.adresse_ip_serveur_monetique ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.adresse_ip_serveur_monetique || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex items-center sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">Port : </strong>
            {isEditing ? (
              <input
                type="number"
                value={equipementDetails.port || ""}
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"

                onChange={(e) => setEquipementDetails({ ...equipementDetails, port: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.port ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.port || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex items-center sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">TMK I :</strong>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.tmk || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, tmk: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.tmk ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.tmk || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex items-center sm:col-span-3">
            <strong className="text-navy-900 dark:text-white flex-none w-40">TMK II:</strong>
            {isEditing ? (
              <input
                className="border border-navy-900 rounded ml-2 px-2 py-1 flex-grow"
                type="text"
                value={equipementDetails.tmk || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, tmk: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.tmk ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.tmk || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex sm:col-span-3">

            <strong className="text-navy-900 dark:text-white flex-none w-40">Configuration des cassettes :</strong>
            <div className="config-section ml-5">
              <h2>Type A</h2>
              <select value={equipementDetails.typeA}>
                <option value="">Sélectionnez</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="config-section ml-5">
              <h2>Type B</h2>
              <select value={equipementDetails.typeA}>
                <option value="">Sélectionnez</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="config-section ml-5">
              <h2>Type C</h2>
              <select value={equipementDetails.typeA}>
                <option value="">Sélectionnez</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="config-section ml-5">
              <h2>Type D</h2>
              <select value={equipementDetails.typeA}>
                <option value="">Sélectionnez</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>


        </div>
        {isEditing ? (
          <>
            <button className="bg-tunisys-100 p-3 rounded-xl text-white" onClick={handleSave}>
              Save
            </button>
            <button className="bg-red-500 p-3 rounded-xl text-white" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="bg-tunisys-100 p-3 rounded-xl text-white" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default EquipementDetails;
