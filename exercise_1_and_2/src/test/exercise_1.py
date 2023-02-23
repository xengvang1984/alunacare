import json

from ..helper.api_helper import get_patient_identifier
from ..helper.patient_helper import generate_expected_patient_id
from ..helper.patient_identity import PatientIdentity


def test_get_patient_identifier():
    patient_identity = PatientIdentity(name='Juan Gomez', dob='1940-12-01', gender='Male')
    patient_expected_id = generate_expected_patient_id(patient_identity)

    response = get_patient_identifier(patient_identity)
    assert response.ok
    data: json = response.json()
    assert patient_expected_id == data['identifier']
