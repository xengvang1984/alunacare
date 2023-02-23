import os

import requests
from requests import Response

from exercise_1_and_2.src.helper.patient_identity import PatientIdentity

BASE_API_URL = os.getenv('BASE_API_URL') or 'https://alunacare.com/api'


def get_patient_identifier(patient_identity: PatientIdentity) -> Response:
    patient_identifier_api = f'/patients/identifier?{patient_identity.name}=&dob={patient_identity.dob}&gender={patient_identity.gender}'
    return requests.get(BASE_API_URL + patient_identifier_api)


def save_patient_identifier(patient_identifier: str) -> Response:
    data = {
        'identifier': patient_identifier
    }
    return requests.post(BASE_API_URL + '/identity', json=data)


def get_patient_identity(patient_identifier: str) -> Response:
    patient_identity_api = f'/identity?identifier={patient_identifier}'
    return requests.get(BASE_API_URL + patient_identity_api)
