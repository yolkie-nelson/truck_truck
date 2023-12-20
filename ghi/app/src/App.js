import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomersList';
import SaleForm from './SaleForm';
import SalesList from './SalesList';
import SalesHistory from './SalesHistory'
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechniciansList';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import AppointmentsHistory from './AppointmentsHistory';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import ModelsForm from './ModelsForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="create" element={<SalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomersList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="create" element={<SaleForm />} />
            <Route path="history" element={<SalesHistory />} />
          </Route>
          <Route path="technicians">
            <Route path="" element={<TechniciansList />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<AppointmentsList />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentsHistory />} />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelsList />} />
            <Route path="create" element={<ModelsForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
