import React, {useState, useEffect} from 'react';


function TechnicianForm () {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
  })


  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = 'http://localhost:8080/api/technicians/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        first_name: '',
        last_name: '',
        employee_id: '',
      });
      document.getElementById('success-message').classList.remove('d-none');
    } else {
      document.getElementById('success-message').classList.add('d-none');

    }
  }


  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add technician</h1>
          <form onSubmit={handleSubmit} id="add-technician-form">
            <div className="form-floating mb-3">
              <input value={formData.first_name} onChange={handleFormChange} placeholder="Last name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.last_name} onChange={handleFormChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={formData.employee_id} onChange={handleFormChange} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
          <div className="alert alert-success mt-3 d-none" id="success-message">
                Success!
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
