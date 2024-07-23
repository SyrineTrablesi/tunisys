/*import { createContext, useReducer } from 'react'

export const NotificationsContext = createContext()

export const notificationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return { 
        notification: action.payload 
      }
    /*case 'CREATE_REC':
      return { 
        reclamations: [action.payload, ...state.reclamations] 
      }
      case 'UPDATE_REC':
      const updatedReclamations = state.reclamations.map(reclamation => {
        if (reclamation._id === action.payload._id) {
          return action.payload;
        } else {
          return reclamation;
        }
      });
      return { 
        reclamations: updatedReclamations
      }
    case 'DELETE_REC':
      return { 
        reclamations: state.reclamations.filter(r => r._id !== action.payload._id) 
      }
    *//*
    default:
      return state
  }
}

export const NotificationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationsReducer, { 
    notification: null
  })
  
  return (
    <NotificationsContext.Provider value={{...state, dispatch }}>
      { children }
    </NotificationsContext.Provider>
  )
}*/