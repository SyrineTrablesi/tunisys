import { MdCalendarToday, MdFormatAlignRight, MdHistory, MdHome, MdPerson} from "react-icons/md";
import Profil from "views/admin/profile";
import Home from "views/client/home";
import CongesForm from "views/client/Demande/Demande";
import Historique from "views/client/historique/historique";
  import Calendrier from "views/client/calendrier/calendrier";
import Archive from "views/client/archive/archive";
//import { Form } from "react-router-dom";
  const clroutes = [
    {
      name: "Acceuil",
      layout: "/client",
      path: "default",
      icon: <MdHome className="h-6 w-6" />,
      component: <Home />,
      allowedRoles: ['EMPLOYEE'] // Liste des rôles autorisés pour accéder à cette route
    },
    {
      name: "Profile",
      layout: "/client",
      path: "profile",
      icon: <MdPerson className="h-6 w-6" />,
      component: <Profil />,
      allowedRoles: ['EMPLOYEE'] // Liste des rôles autorisés pour accéder à cette route
  
    },
    {
      name: "Calendrier",
      layout: "/client",
      path: "calendrier",
      icon: <MdCalendarToday className="h-6 w-6" />,
      component: <Calendrier />,
      allowedRoles: ['EMPLOYEE'] // Liste des rôles autorisés pour accéder à cette route
  
    },
    {
      name: "Demande",
      layout: "/client",
      path: "Demande",
      icon: <MdFormatAlignRight className="h-6 w-6" />,
      component: <CongesForm />,
      allowedRoles: ['EMPLOYEE'] // Liste des rôles autorisés pour accéder à cette route
  
    },
    {
      name: "Liste des Demandes",
      layout: "/client",
      path: "historique",
      icon: <MdHistory className="h-6 w-6" />,
      component: <Historique />,
      allowedRoles: ['EMPLOYEE'] // Liste des rôles autorisés pour accéder à cette route
  
    },
    {
      name: "Historique",
      layout: "/client",
      path: "archive",
      icon: <MdHistory className="h-6 w-6" />,
      component: <Archive/>,
      allowedRoles: ['EMPLOYEE'] // Liste des rôles autorisés pour accéder à cette route
  
    },
  ];
  
  export default clroutes;
  