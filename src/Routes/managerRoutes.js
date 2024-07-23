import React from "react";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/Signup";
import { IoMdAlert, IoMdPerson } from "react-icons/io";
import UserForm from "views/manager/tables/Components/addUser";
import ControllerTables from "views/manager/tables";
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLogout,
  MdHelp,
  MdSettings,
  MdAdd
} from "react-icons/md";
import Profil from "views/manager/profile";
import Dashboard from "views/manager/default";
import AlertComponent from "views/manager/alerts/alert";
const managerroutes = [
  {
    name: "Acceuil",
    layout: "/control",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
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
    name: "ajouter utilisateur",
    layout: "/control",
    path: "add",
    icon: <MdAdd className="h-6 w-6" />,
    component: <UserForm/>,
    allowedRoles: ['MANAGER'] // Liste des rôles autorisés pour accéder à cette route
  },

  {
    name: "Utilisateurs",
    layout: "/control",
    icon: <MdPerson className="h-6 w-6" />,
    path: "utilisateurs",
    component: <ControllerTables />,
    allowedRoles: ['MANAGER'] // Liste des rôles autorisés pour accéder à cette route

  },
  {
    name: "Profile",
    layout: "/control",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profil />,
    allowedRoles: ['MANAGER'] 
  },
  {
    name: "Log out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
  },
  
 
  {
    name: "sign up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignUp />,
    allowedRoles: ['MANAGER'] 
  },
 
];
export default managerroutes;
