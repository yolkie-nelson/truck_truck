import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments)
        }
    };


    const fetchData = async () => {
        const fetch_auto = await fetch('http://localhost:8100/api/automobiles/');
        if (fetch_auto.ok) {
            const data = await fetch_auto.json();
            setAutomobiles(data.autos)
        }
    };


    const cancelAppointment = async (id) => {
        const cancel = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        });

        if (cancel.ok) {
            getData();
        }
    };


    const finishAppointment = async (id) => {
        const finish = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
        });

        if (finish.ok) {
            getData();
        }
    };


  useEffect(()=>{
    getData()
    fetchData()
  }, [])

  return (
    <div className="mt-4">
    <h1>Service Appointments</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments.filter(allAppointment => allAppointment.status === "created").map(appointment => {
            const isVinInAutomobiles = automobiles.some(auto => auto.vin === appointment.vin);
            const isVip = isVinInAutomobiles ?  'Yes' : 'No';
            return (
            <tr key={appointment.id}>
                <td>{ appointment.vin }</td>
                <td>{ isVip }</td>
                <td>{ appointment.customer }</td>
                <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                <td>{ appointment.reason }</td>
                <td>
                    <button onClick={() => cancelAppointment(appointment.id)} className="btn btn-danger">
                        Cancel
                    </button>
                    <button onClick={() => finishAppointment(appointment.id)} className="btn btn-success">
                        Finish
                    </button>
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default AppointmentsList;
