from django.db import models


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = models.CharField(max_length=25)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salespeople",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField(default=0)
