import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SalesList() {
  const [sales, setSales] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');

    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  }

  useEffect(()=>{
    getData()
  }, [])
  
  return (
    <>
    <h1>Sales</h1>
    <table className="table table-striped">
      <thead>
        <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => {
          return (
            <tr key={sale.id}>
                <td>{ sale.salesperson.employee_id }</td>
                <td>{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                <td>{ `${sale.customer.first_name} ${sale.customer.last_name}` }</td>
                <td>{ sale.automobile }</td>
                <td>{ sale.price }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <Link to="/sales/create/">
        <button className="btn btn-primary btn-lg">Add a sale</button>
      </Link>
    </div>
    </>
  );
}

export default SalesList;
