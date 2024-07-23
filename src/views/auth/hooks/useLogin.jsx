import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'; // Add this import
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();


  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${backendUrl}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })
      switch (json.role) {
        case 'COORDINATRICE':
          navigate('/admin/default');
          break;
        case 'MANAGER':
          navigate('/control/default');
          break;
        case 'TECHNICIEN':
          navigate('/tech/default');
          break;
        case 'HELPDESK':
          navigate('/helpdesk/default');
          break;
        case 'CLIENT':
          navigate('/client/default');
          break;
        case 'ADMIN':
          navigate('/manager/default');
          break;
        default:
          navigate('/noacces');
          break;
      }
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}