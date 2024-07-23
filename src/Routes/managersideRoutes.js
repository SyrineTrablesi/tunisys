import React from "react";
import Profil from "views/manager/profile";
import Dashboard from "views/manager/default";
import AlertComponent from "views/manager/alerts/alert";
import { IoMdAlert, IoMdPerson } from "react-icons/io";

import { MdHome, MdPerson, MdSettings,MdAdd } from "react-icons/md";
import UserForm from "views/manager/tables/Components/addUser";
import ControllerTables from "views/manager/tables";
const managersideroutes = [
  {
    name: "Acceuil",
    layout: "/control",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
    allowedRoles: ['MANAGER'] 
  },
  {
    name: "ajouter utilisateur",
    layout: "/control",
    path: "add",
    icon: <MdAdd className="h-6 w-6" />,
    component: <UserForm/>,
    allowedRoles: ['MANAGER'] 
  },

  {
    name: "Utilisateurs",
    layout: "/control",
    icon: <MdPerson className="h-6 w-6" />,
    path: "utilisateurs",
    component: <ControllerTables />,
    allowedRoles: ['MANAGER'] 

  },
  {
    name: "Alerts",
    layout: "/control",
    path: "alert",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <AlertComponent />,
    allowedRoles: ["MANAGER"],
  },
  {
    name: "Profile",
    layout: "/control",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profil />,
    allowedRoles: ['MANAGER']
  },
];
export default managersideroutes;


