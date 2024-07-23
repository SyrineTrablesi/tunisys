import { IoMdAlert } from "react-icons/io";
import { MdAirplaneTicket, MdHistory, MdHome, MdList, MdPerson } from "react-icons/md";
import Home from "views/technicien/home";
import History from "views/technicien/historique";
import Profil from "views/technicien/profile";
import TicketAssigned from "views/technicien/TicketAssigned/TicketAssignedPhone";
import Intervention from "views/technicien/intervention/intervention";
import AlertComponent from "views/technicien/alerts/alert";
//import Intervention from "views/technicien/reclamation/components/intervention";

const techsideroutes = [
    {
        name: "default",
        layout: "/tech",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <Home />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Tickets",
        layout: "/tech",
        path: "ticket",
        icon: <MdAirplaneTicket className="h-6 w-6" />,
        component: <TicketAssigned />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
    
      {
        name: "historique",
        layout: "/tech",
        path: "historique",
        icon: <MdHistory className="h-6 w-6" />,
        component: <History />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Alerts",
        layout: "/tech",
        path: "alert",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <AlertComponent />,
        allowedRoles: ["TECHNICIEN"], 
      },
    
      {
        name: "profil",
        layout: "/tech",
        path: "profil",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profil />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route
      }
    ,
];
export default techsideroutes;
