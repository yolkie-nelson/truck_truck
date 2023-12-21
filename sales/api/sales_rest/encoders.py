from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "salesperson",
        "customer",
        "price",
        "id"
    ]

    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}

    encoders = {
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
        }
