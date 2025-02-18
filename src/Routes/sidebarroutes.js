import React from "react";
import Dashboard from "views/admin/default";
import Profile from "views/admin/profile";

import {
  MdEscalator,
  MdHome,
  MdPerson,
  MdEventAvailable,
  MdHistory,
  MdOutlinePersonSearch,
  MdAirplaneTicket,
  MdSettings,
} from "react-icons/md";
import Calandar from "views/admin/calandar";
import { IoMdAlert, IoMdPerson, IoMdSettings, IoMdTv } from "react-icons/io";
import ManageReclamation from "views/admin/Reclamation";
import History from "views/admin/History";
import RecRep from "views/admin/RecReporte";
import { IoAlert } from "react-icons/io5";
import Dropdown from "components/dropdown";
import TicketMangement from "views/admin/ticket/TicketMangement";
import ManagementEquipement from "views/admin/EquipementManagement/equipement";
import ClientManagement from "views/admin/ClientManagement/clientManagement";
import AlertComponent from "views/admin/alerts/alert";
import Clients from "views/admin/client";
import ConfigurationManagement from "views/admin/configuration/configurationManagement";

const routes = [
  {
    name: "Acceuil",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Tickets Management",
    layout: "/admin",
    path: "ticket",
    icon: <MdAirplaneTicket className="h-6 w-6" />,
    component: <TicketMangement />,
    allowedRoles: ["COORDINATRICE"], 
  },
  {
    name: "Configurations",
    layout: "/admin",
    path: "configuration",
    icon: <IoMdSettings className="h-6 w-6" />,
    component: <ConfigurationManagement/>,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Equipements",
    layout: "/admin",
    path: "manage/equipement",
    icon: <IoMdTv className="h-6 w-6" />,
    component: <ManagementEquipement />,
    allowedRoles: ['COORDINATRICE']
  },
  {
    name: "calendrier",
    layout: "/admin",
    path: "calendrier",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <Calandar />,
    allowedRoles: ["COORDINATRICE"], 
    
  },
  {
    name: "Client",
    layout: "/admin",
    path: "clients",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Clients />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Clients",
    layout: "/admin",
    path: "client/management",
    icon: <IoMdPerson className="h-6 w-6" />,
    component: <ClientManagement />,
    allowedRoles: ['COORDINATRICE']
  },
  {/*
    name: "clients",
    layout: "/admin",
    path: "client",
    icon: <MdOutlinePersonSearch className="h-6 w-6" />,
    component: <Client />,
    allowedRoles: ["COORDINATRICE"],
*/},
{
  name: "Alerts",
  layout: "/admin",
  path: "alert",
  icon: <IoAlert className="h-6 w-6" />,
  component: <AlertComponent />,
  allowedRoles: ["COORDINATRICE"], 
},
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profile />,
    allowedRoles: ["COORDINATRICE"],
  },


];
export default routes;
