import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Card from 'components/card';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/alerts/get`);
        if (!response.ok) {
          throw new Error('Error fetching alerts');
        }
        const data = await response.json();
        setAlerts(data.alerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);
  console.log(alerts)
  const deleteAlert = async (alertId) => {
    try {
      const response = await fetch(`${backendUrl}/api/alerts/delete/${alertId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete alert');
      }
      setAlerts(alerts.filter(alert => alert._id !== alertId));
    } catch (error) {
      console.error('Error deleting alert:', error.message);
    }
  };

  return (
    <div>
      <h2 className="p-3 text-[35px] font-semibold  text-center text-tunisys-100 ml-7">Alerts</h2>
      <ul className="alert-list">
        {alerts.map(alert => (
          <li key={alert._id} className="mt-3 bg-white relative">
            <Card className="p-5">
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                onClick={() => deleteAlert(alert._id)}
              >
                Delete
              </button>
              <p>{alert.userId.firstname} {alert.userId.lastname}</p>
              <p>Reference Ticket: {alert.ticketId.reference}</p>
              <p>Localisation: {alert.ticketId.service_station}</p>
              <p>Alert: {alert.message}</p>
              <p>Created At: {format(new Date(alert.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
            </Card>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AlertComponent;
