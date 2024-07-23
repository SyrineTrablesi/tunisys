import { IoMdAlert, IoMdPerson } from "react-icons/io";
import { MdAirplaneTicket, MdHistory, MdHome } from "react-icons/md";
import TicketAssigned from "views/helpdesk/TicketAssigned/TicketAssignedPhone";
import AlertComponent from "views/helpdesk/alerts/alert";
import Home from "views/helpdesk/home";
import Profil from "views/helpdesk/profile";
import History from "views/technicien/historique";

const hdroutes = [
    {
        name: "Acceuil",
        layout: "/helpdesk",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <Home />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
   
      {
        name: "Tickets",
        layout: "/helpdesk",
        path: "phone",
        icon: <MdAirplaneTicket className="h-6 w-6" />,
        component: <TicketAssigned />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "History",
        layout: "/helpdesk",
        path: "history",
        icon: <MdHistory className="h-6 w-6" />,
        component: <History />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Alerts",
        layout: "/helpdesk",
        path: "alert",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <AlertComponent />,
        allowedRoles: ["HELPDESK"], // Liste des rôles autorisés pour accéder à cette route
      },
      {
        name: "Profil",
        layout: "/helpdesk",
        path: "profil",
        icon: <IoMdPerson className="h-6 w-6" />,
        component: <Profil />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
     
];
export default hdroutes;
