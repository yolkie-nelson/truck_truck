import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TechniciansList() {
  const [technicians, setTechnicians] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/technicians/');

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians)
    }
  }

  useEffect(()=>{
    getData()
  }, [])


  return (
    <>
    <h1>Technicians</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
        </tr>
      </thead>
      <tbody>
        {technicians.map(technician => {
          return (
            <tr key={technician.id}>
                <td>{ technician.first_name }</td>
                <td>{ technician.last_name }</td>
                <td>{ technician.employee_id }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <Link to="/technicians/create/">
        <button className="btn btn-primary btn-lg">Add a technician</button>
      </Link>
    </div>
    </>
  );
}

export default TechniciansList;
