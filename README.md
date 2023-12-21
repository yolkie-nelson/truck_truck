# CarCar

CarCar is a software application designed to oversee various operations within an automobile dealership, including inventory management, sales of automobiles, and handling automobile services.

Team:

Lily Salzman - Automobile Sales

Hannah Nelly - Automobile Service


## Getting Started

**Make sure you have Docker, Git, and Django 4.0.3 or above**

1. Fork this repository:

2. Clone the forked repository onto your local computer:
git clone <<https://gitlab.com/lilysalz/project-beta.git>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/images/CarCarWebsite.png)


## Design

CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**

![Img](/images/CarCarDiagram.png)

## Integration

Our Service and Sales domains collaborate with our Inventory domain to facilitate the functionality of CarCar.

Our Inventory domain holds the record of available vehicles for purchase. The Sales and Service microservices use a **poller** to regularly fetch updated information from the Inventory domain. This ensures our Service and Sales teams have current inventory details at all times.


## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/<int:pk>/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/<int:pk>/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers<int:pk>/


JSON body to send data:

Create and Update a manufacturer (SEND THIS JSON BODY):
- You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/<int:pk>/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/<int:pk>/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/<int:pk>/

Create and update a vehicle model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or picture URL:
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
}
```
Return value of creating or updating a vehicle model:
- This returns the manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a List of Vehicle Models Return Value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

### Automobiles:
- The **vin** mentioned at the end of the detail URLs denotes the Vehicle Identification Number (VIN) specific to the automobile you intend to access. It's essential to note that this is not an integer ID but a string value, allowing for the use of both numbers and letters in the VIN representation.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/<str:vin>/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/<str:vin>/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/<str:vin>/


Create an automobile (SEND THIS JSON BODY):
- You cannot make two automobiles with the same vin
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Return Value of Creating an Automobile:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "777",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "image.yourpictureurl.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	}
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```

## Service microservice

Our Service microservice is an extension of the dealership, focusing on providing vehicle repair services.

Upon purchasing an automobile, we track its VIN number. As a VIP member, you'll enjoy exclusive benefits.

This section will outline the different API endpoints (web address URLs) for service, along with the required data formats for each component. The fundamental aspects of our service include:
1. Our technician staff
2. Service Appointments


### Technicians

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:id>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:id>/


LIST TECHNICIANS: Following this endpoint will give you a list of all technicians that are currently employed.
Since this is a GET request, you do not need to provide any data.
```
Example:
{
	"technicians": [
		{
			"first_name": "Hannah",
			"last_name": "Nelly",
			"employee_id": "hnelly",
			"id": 1
		},
```

TECHNICIAN DETAIL: This is a GET request as well, so no data needs to be provided here either. When you list technicians, you will
see that they are assigned a value of "id". This is the value that will replace "<int:id>. For example, if you wanted to see the technician
details related to our technician "Donald", you would input the following address: http://localhost:8080/api/technicians/1/
This would then lead to this:

```
{
	"technician": [
		{
			"first_name": "Hannah",
			"last_name": "Nelly",
			"employee_id": "hnelly",
			"id": 1
		},
```

Here is how the technician's details are presented. To update the displayed technician, simply modify the value at the end to correspond to the desired "id" of the technician you wish to display.

CREATE TECHNICIAN - In the event of hiring a new technician, the process involves submitting a POST request using the following format to input the necessary data.
```
{
	"first_name": "Liz",
	"last_name": "Salz",
	"employee_id": "lsalz"
}
```
The data maintains a consistent format. In this example, we've altered the "name" field from "Hannah" to "Liz" and assigned her the "employee_id" value of "2" instead of "1".

Once the data is entered into your request, simply click "Send" to create the technician "Liz". To confirm its success, follow the "LIST TECHNICIAN" step from above to display all technicians. Ideally, both Hannah and Liz will be listed.

Upon selecting "LIST TECHNICIAN" after "CREATE TECHNICIAN" with Liz added, you should observe the following output:
```
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		},
		{
			"name": "Liz",
			"employee_number": 1,
			"id": 2
		},
```

DELETE TECHNICIAN - To remove a technician from the system, change the request type from "POST" to "DELETE." Fetch the corresponding "id" value, similar to the process in "TECHNICIAN DETAIL," ensuring the deletion of the correct technician. They will no longer appear on our page listing all technicians.


And that concludes the process! You can view all technicians, access individual technician details, and create new technicians.

Remember, the "id" field is automatically generated by the program, so you don't need to input that information. Simply follow the steps in CREATE TECHNICIAN, and the "id" field will be filled automatically for you.

If you encounter an error, ensure that your server is operational and that you are providing the requested data. If you input the following:
```
{
	"name": "Liz",
	"employee_number": 3,
	"favorite_food": "Tacos",
	"employee_id": 1,
}

An error will occur because the system isn't designed to handle "employee_number" or "favorite_food" as they're not properties, and integer 1 is not a data point requested by the JSON structure for "employee_id". The system only accepts data that adheres to the expected JSON format. Sending in unexpected data might cause errors as the system won't recognize or know how to process it.

```


### Appointments

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List appointments | GET | http://localhost:8080/api/appointments/
| Create appointment | POST | http://localhost:8080/api/appointments/
| Delete appointment | DELETE | http://localhost:8080/api/appointments/<int:id>
| Update appointment Status | PUT |  http://localhost:8080/api/appointments/<str:action>


LIST APPOINTMENT: This will display a list of all service appointments. The format displayed is how the data needs to be accepted.

Keep in mind that the data is returned in the same format that is expected for acceptance. The "id" is automatically generated, so manual input for it is unnecessary.

Additionally, note that the "date_time" field must adhere to this specific format for the system to accept it.
```
{
	"appointments": [
		{
			"date_time": "12:30:00T2021-07-14",
			"reason": "tires",
			"status": false,
			"vin": "1222",
			"customer": "Barry",
			"technician": "Liz"
		},


```
The "CREATE APPOINTMENT" feature enables the creation of a service appointment using the provided input data. It is crucial to adhere to the specified format. The "id" is automatically generated, so there's no need to fill it in manually.

To confirm the successful addition of the service appointment, simply check your service appointment list after creating a new service appointment, and it should appear in the list.
```
		{
			"date_time": "12:30:00T2021-07-14",
			"reason": "tires",
			"status": false,
			"vin": "1222",
			"customer": "Barry",
			"technician": "Liz"
		}

```
To delete a service appointment, input the specific "id" of the service appointment at the end of the URL. For instance, if there's a need to delete Barry's service history appointment due to an error in inputting his name as "Gary," the URL would look like this: 'http://localhost:8080/api/appointments/1'. Upon sending this request, a confirmation message will be received, indicating the successful deletion of the service appointment.

## Sales microservice

The sales microservice has the following models:
1. A salesperson model containing first_name, last_name, and employee_id fields
2. A customer model containing first_name, last_name, address, and phone_number fields
3. A sale model containing automobile, salesperson, customer, and price fields (all fields but price are fks)
4. An automobileVO model containing vin and sold fields

Integration with the inventory microservice:
    This microservice has an automobile poller. It updates the AutomobileVO every minute with updated VINs and sold statuses from the inventory service.


### Salesperson

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salespeople/:id/


LIST SALESPEOPLE: This will return a list of all current salespeople.
This is the format that will be displayed. Note: The "id" is automatically assigned.
```
"salespeople": [
		{
			"first_name": "John",
			"last_name": "Doe",
			"employee_id": "jdoe",
			"id": 2
		}
]
```
CREATE SALESPERSON - This will create a salesperson with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify that it was added, just look at your salespeople list after creating a salesperson and it should be there.
```
		{
      "first_name": "John",
      "last_name": "Doe",
      "employee_id": "jdoe"
    }

```
DELETE SALESPERSON- Just input the "id" of the salesperson you want to delete into 'http://localhost:8090/api/salespeople/:id/'. For example, if we wanted to delete John Doe we would enter 'http://localhost:8090/api/salespeople/2/' into the field and send the request.


### Customer

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Delete a customer | DELETE | http://localhost:8090/api/customers/:id/


LIST CUSTOMERS: This will return a list of all current customers.
This is the format that will be displayed. Note: The "id" is automatically assigned.
```
"customers": [
		{
			"first_name": "Ann",
			"last_name": "Dahl",
			"address": "323 Retta Corner Abagailhaven, DE 14354-9841",
			"phone_number": "098-765-4321",
			"id": 5
		}
]
```
CREATE CUSTOMER - This will create a customer with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify that it was added, just look at your customers list after creating a customer and it should be there.
```
		{
      "first_name": "Ann",
      "last_name": "Dahl",
      "address": "323 Retta Corner Abagailhaven, DE 14354-9841",
      "phone_number": "098-765-4321"
    }

```
DELETE CUSTOMER- Just input the "id" of the customer you want to delete into 'http://localhost:8090/api/customers/:id/'. For example, if we wanted to delete John Doe we would enter 'http://localhost:8090/api/customers/2/' into the field and send the request.

### Sale

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List sales | GET | http://localhost:8090/api/sales/
| Create a sale | POST | http://localhost:8090/api/sales/
| Delete a sale | DELETE | http://localhost:8090/api/sales/:id/


LIST SALES: This will return a list of all current sales.
This is the format that will be displayed. Note: The "id", the salesperson properties (first_name, last_name, and employee_id), and the customer properties (first_name, last_name, address, phone_number, and id) are automatically assigned.
```
"sales": [
		{
			"salesperson": {
				"first_name": "John",
				"last_name": "Doe",
				"employee_id": "jdoe"
			},
			"customer": {
				"first_name": "Ann",
				"last_name": "Dahl",
				"address": "323 Retta Corner Abagailhaven, DE 14354-9841",
				"phone_number": "098-765-4321",
				"id": 5
			},
			"price": 1500,
			"id": 27,
			"automobile": "1C3CC5FB2AN120174"
		},
]
```
CREATE SALE - This will create a sale with the data input. It must follow the format. Remember, the "id", salesperson properties, and customer properties are automatically generated, so don't fill that in. To pick a salesperson and customer, add them by their ids. So to add John and Ann you would set salesperson to 2 and customer to 5. To verify that it was added, just look at your sales list after creating a sale and it should be there.
```
		{
      "automobile": "1C3CC5FB2AN120174",
      "salesperson": 2,
      "customer": 5,
      "price": 1500
    }

```
DELETE SALE- Just input the "id" of the sale you want to delete into 'http://localhost:8090/api/sales/:id/'. For example, if we wanted to delete John Doe we would enter 'http://localhost:8090/api/sales/2/' into the field and send the request.
