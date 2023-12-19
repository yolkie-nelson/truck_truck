from django.db import models

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.employee_id}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"VIN: {self.vin} - Sold: {self.sold}"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default="Created")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=255)
    technician = models.ForeignKey(
        Technician,
        related_name ="technician",
        on_delete=models.CASCADE)

    def __str__(self):
        return f"Appointment for VIN: {self.vin} - Technician: {self.technician.first_name} - {self.date_time}"
