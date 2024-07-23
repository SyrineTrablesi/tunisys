import React, { useState } from 'react';
import Card from 'components/card';

const FicheClientForm = () => {
    const [successPopupVisible, setSuccessPopupVisible] = useState(false);
    const handleButtonClick = async () => {
        try {
            const response = await fetch('/api/fclient/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle success
            console.log('Client added successfully');
            setSuccessPopupVisible(true);
        } catch (error) {
            // Handle error
            console.error('Error adding client:', error.message);
        }
    };

    const cardStyle = {
        width: '650px',
        height: '570px',
    };

    // Use state to manage form data
    const [formData, setFormData] = useState({
        numero_appel_offre: '',
        delai_execution_projet: '',
        date_reception_quantitative: '',
        date_reception_provisoire: '',
        date_debut_garantie: '',
        date_fin_garantie: '',
        date_debut_contrat_maintenance: '',
        date_fin_contrat_maintenance: '',
        delai_intervention_curative: '',
        nombre_intervention_preventive: '',
        delai_FicheClient_curative: '',
        adresse_client: '',
        telephone: '',
    });

    // Handle input changes
    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    return (
        <div className="mt-2 flex justify-center items-center">
            <Card extra="pb-7 p-[20px]" style={cardStyle}>
                <p className="text-[20px] text-center text-tunisys-100 font-bold dark:text-white">
                    Fiche Client
                </p>
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Left Column */}
                    <div className="flex flex-col w-full md:w-1/2">
                        {Object.keys(formData).slice(0, 6).map((fieldName) => (
                            <div key={fieldName} className="mb-2">
                                <label className="block text-sm text-gray-600 dark:text-white">
                                    {fieldName.replace(/_/g, ' ')}:
                                </label>
                                <input
                                    type="text"
                                    value={formData[fieldName]}
                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col w-full md:w-1/2">
                        {Object.keys(formData).slice(6).map((fieldName) => (
                            <div key={fieldName} className="mb-2">
                                <label className="block text-sm text-gray-600 dark:text-white">
                                    {fieldName.replace(/_/g, ' ')}:
                                </label>
                                <input
                                    type="text"
                                    value={formData[fieldName]}
                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={handleButtonClick}
                    className="mt-4 ml-40 p-2 bg-red-700 text-white rounded-md w-[200px]">

                    Ajouter client
                </button>   {/* Success Popup */}
                {successPopupVisible && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-green-500 text-white p-4 rounded-md">
                            Fiche Client ajouté avec succès!
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default FicheClientForm;