import Card from "components/card";
import { useState } from "react"
//import { useUsersContext } from '../hooks/useUsersContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const UserForm = () => {
    
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [solde, setSolde] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);

  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const users = { firstname, lastname, email, password, role, solde };
          const response = await fetch('/api/user/add', {
            method: 'POST',
            body: JSON.stringify(users),
            headers: {
              'Content-type': 'application/json',
            },
          });
      
          const json = await response.json();
      
          if (!response.ok) {
            if (json && json.error) {
              setError(json.error);
            } else {
              setError('An error occurred during the request.');
            }
      
            if (json && json.emptyFields) {
              setEmptyFields(json.emptyFields);
            } else {
              setEmptyFields([]);
            }
      
            return; // Exit the function early on error
          }
      
          // Reset form fields on success
          setEmptyFields([]);
          setFirstname('');
          setLastname('');
          setEmail('');
          setPassword('');
          setRole('');
          setSolde('');
          setError(null);
      
          console.log('A new user has been added:', json);
          toast.success('Utilisateur ajouté avec succès');
        } catch (error) {
          console.error('An error occurred during the request:', error);
          setError('An unexpected error occurred. Please try again later.');
          setEmptyFields([]);
        }
      };
      
    return (
        <div>
            <ToastContainer />
            <h1 className=" ml-6  font-semibold text-[3rem]	dark:text-tunisys-100 text-tunisys-100 text-center mt-3">Ajout Employee </h1>
            <Card className=" p-8 h-full w-full  bg-gray-100 rounded-lg border">
                <label className="block  text-gray-700 text-lg font-bold mb-2" >Nom :</label>
                <input
                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields?.includes('firstname') ? 'border-red-500' : 'border-[#ddd]'}`}
                    type="text"
                    value={firstname}
                    autoComplete="firsttname"
                    onChange={(e) => setFirstname(e.target.value)}

                />
                <label className="block  text-gray-700 text-lg font-bold mb-2" >Prénom :</label>
                <input
                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields?.includes('lastname') ? 'border-red-500' : 'border-[#ddd]'}`}
                    type="text"
                    value={lastname}
                    autoComplete="lastname"
                    onChange={(e) => setLastname(e.target.value)}

                />

                <label className="block  text-gray-700 text-lg font-bold mb-2" >Adresse email:</label>
                <input
                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields?.includes('email') ? 'border-red-500' : 'border-[#ddd]'}`}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block  text-gray-700 text-lg font-bold mb-2" >Mot de passe :</label>
                <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields?.includes('password') ? 'border-red-500' : 'border-[#ddd]'}`}

                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="block  text-gray-700 text-lg font-bold mb-2" >Solde :</label>
                <input
                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields?.includes('solde') ? 'border-red-500' : 'border-[#ddd]'}`}
                    type="text"
                    autoComplete="current-password"
                    value={solde}
                    onChange={(e) => setSolde(e.target.value)}
                />
                <label className="block  text-gray-700 text-lg font-bold mb-2" >Rôle :</label>
                <select
                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields?.includes('role') ? 'border-red-500' : 'border-[#ddd]'}`}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">Null</option>

                    <option value="ADMIN">Administrateur</option>
                    <option value="EMPLOYEE">Employee</option>

                </select>
                <button className="text-white rounded cursor-pointer p-2.5 border-0 bg-tunisys-100 justify-center text-xl" onClick={handleSubmit}>
                    Ajouter utilisateur
                </button>
                {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
            </Card>
        </div>
    )
}
export default UserForm;
