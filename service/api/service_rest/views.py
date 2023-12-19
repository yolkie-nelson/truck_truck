from django.shortcuts import render
from django.http import JsonResponse
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "id",
        "technician"
    ]
    encoders = {"technician": TechnicianDetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == 'GET':
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.JSONDecodeError:
            return JsonResponse(
                {"message": "Invalid JSON data"},
                status=400
            )




@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technician(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "employee_id" in content:
                employee_id = Technician.objects.get(id=content["employee_id"])
                content["employee_id"] = employee_id
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status=400
            )
    Technician.objects.filter(id=id).update(**content)
    technician = Technician.objects.get(id=id)
    return JsonResponse(
        technician,
        encoder=TechnicianDetailEncoder,
        safe=False
    )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentEncoder,
            )

    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400)

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, id):
    if request.method == 'GET':
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            {"appointment": appointment},
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    # request.method == "DELETE":

    # else:
    #     content = json.loads(request.body)
    #     try:
    #         if "technician" in content:
    #             technician = Technician.objects.get(id=content["technician"])
    #             content["technician"] = technician
    #     except Technician.DoesNotExist:
    #         return JsonResponse(
    #             {'message': "Invalid technician id"},
    #             status=400
    #         )
    #     Appointment.objects.filter(id=id).update(**content)
    #     appointment = Appointment.objects.get(id=id)
    #     return JsonResponse(
    #         appointment,
    #         encoder=AppointmentEncoder,
    #         safe=False,
    #     )


@require_http_methods(["PUT"])
def update_appointment_status(request, id, action):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment not found"},
            status=404)

    if action == "cancel":
        appointment.status = "canceled"
    elif action == "finish":
        appointment.status = "finished"
    else:
        return JsonResponse(
            {"message": "Invalid action"},
            status=400)

    appointment.save()
    return JsonResponse(
        {"message": f"Appointment {action}led successfully"},
        status=200)
