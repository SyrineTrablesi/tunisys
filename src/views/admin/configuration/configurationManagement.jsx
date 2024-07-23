import React from 'react'
import Card from 'components/card';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ConfigurationManagement = () => {
    return (
        <div>
            <div className="mt-9 grid grid-cols-1 gap-5 w-full h-full rounded-[20px]">

                <Card
                    extra="pb-7 p-[20px] h-[100px] hover:bg-gray-200">

                    <a href="./configuration/client/gestionClient" className="text-[30px] text-center   text-tunisys-100 font-bold dark:text-white">
                    Partie Client
                    </a>
                    <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
                    </div>
                </Card>
                <Card
                    extra="pb-7 p-[20px] h-[100px] hover:bg-gray-200">
                    <a href="configuration/equipement" className="text-[30px] text-center text-tunisys-100 font-bold dark:text-white">
                      Partie Equipement 
                    </a>
                    <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
                    </div>
                </Card>
                <Card
                    extra="pb-7 p-[20px] h-[100px] hover:bg-gray-200">
                    <a href="./service" className="text-[30px] text-center text-tunisys-100 font-bold dark:text-white">
                        Partie Contrat 
                    </a>
                    <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
                    </div>
                </Card>

            </div>
        </div>)
}

export default ConfigurationManagement