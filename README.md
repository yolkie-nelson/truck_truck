# CarCar

Team:

Lily Salzman - Automobile Sales
Hannah Nelly - Automobile Service

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The sales microservice has 4 models:
1. A salesperson model containing first_name, last_name, and employee_id fields
2. A customer model containing first_name, last_name, address, and phone_number fields
3. A sale model containing automobile, salesperson, customer, and price fields (all fields but price are fks)
4. An automobileVO model containing vin and sold fields

API endpoints
1. Action: list salespeople
    Method: GET
    URL: http://localhost:8090/api/salespeople/
2. Action: create a salesperson
    Method: POST
    URL: http://localhost:8090/api/salespeople/
3. Action: delete a specific salesperson
    Method: DELETE
    URL: http://localhost:8090/api/salespeople/:id/
4. Action: list customers
    Method: GET
    URL: http://localhost:8090/api/customers/
5. Action: create a customer
    Method: POST
    URL: http://localhost:8090/api/customers/
6. Action: delete a specific customer
    Method: DELETE
    URL: http://localhost:8090/api/customers/:id/
7. Action: list sales
    Method: GET
    URL: http://localhost:8090/api/sales/
2. Action: create a sale
    Method: POST
    URL: http://localhost:8090/api/sales/
3. Action: delete a specific sale
    Method: DELETE
    URL: http://localhost:8090/api/sales/:id/

Integration with the inventory microservice:
    This microservice has an automobile poller. It updates the AutomobileVO every minute with updated VINs from the inventory service.