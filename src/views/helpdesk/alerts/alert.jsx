import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Card from 'components/card';
import { useAuthContext } from "views/auth/hooks/useAuthContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);
const { user } = useAuthContext();
useEffect(() => {
  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/alert/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
      setAlerts(data); // Update alerts state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setLoading(false);
    }
  };

  fetchAlerts();
}, []);


  const [loading, setLoading] = useState(true);
  console.log(alerts)

  return (
    <div>
      <h2 className="p-3 text-[35px] font-semibold text-center text-tunisys-100 ml-7">Alerts</h2>
      {loading ? (
        <p className="text-center text-gray-500 mt-5">Loading...</p>
      ) : (
        alerts && alerts.length > 0 ? (
          <ul className="alert-list">
            {alerts.map(alert => (
              <li key={alert._id} className="mt-3 bg-white relative">
                <Card className="p-5">
                  <p>Reference Ticket: {alert.ticketId.reference}</p>
                  <p>Localisation: {alert.ticketId.service_station}</p>
                  <p>Alert: {alert.message}</p>
                  <p>Created At: {format(new Date(alert.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-5">No alerts found for the user ID</p>
        )
      )}
    </div>
  );
};

export default AlertComponent;
