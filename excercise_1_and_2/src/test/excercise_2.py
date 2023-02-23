import json
import os

import pytest as pytest

from ..helper.api_helper import get_patient_identifier, save_patient_identifier, get_patient_identity
from ..helper.patient_identity import PatientIdentity

BASE_API_URL = os.getenv('BASE_API_URL') or 'https://alunacare.com/api'
SAVE_IDENTITY_API_URL = BASE_API_URL + "/identity"

PATIENT_NAME = 'Juan Gomez'
PATIENT_DOB = '1940-12-01'
PATIENT_GENDER = 'Male'

IDENTIFIER = None


@pytest.fixture
def generate_patient_identity():
    return PatientIdentity(name=PATIENT_NAME, dob=PATIENT_DOB, gender=PATIENT_GENDER)


@pytest.mark.dependency(name="save_identity")
def test_save_identity(generate_patient_identity):
    get_response = get_patient_identifier(generate_patient_identity)
    assert get_response.ok
    data: json = get_response.json()
    IDENTIFIER == data['identifier']

    post_response = save_patient_identifier(IDENTIFIER)
    assert post_response.ok
    data: json = post_response.json()
    assert data == {}


@pytest.mark.dependency(name="save_existing_identity", depends=["save_identity"])
def test_save_existing_identity(generate_patient_identity):
    # Created an error message we will be returning to the caller so we can check against it
    expected_error_msg = 'You are trying to save an identifier that already exists '
    post_response = save_patient_identifier(IDENTIFIER)
    assert not post_response.ok
    assert post_response.status_code == 409
    assert post_response.content == expected_error_msg


@pytest.mark.dependency(depends=["save_existing_identity"])
def test_save_identity_failure(generate_patient_identity):
    # Created an error message we will be returning to the caller so we can check against it
    expected_error_msg = 'Unable to save to data. Please contact support.'
    # Hoping this will cause an error on saving due to special characters
    post_response = save_patient_identifier("&^%$^*&#@*&^#(%&^@#~!%$#@$&!~*)&T@&^!@$%@!$^%^%@^@#*&~``''<>?")
    assert not post_response.ok
    assert post_response.status_code == 500
    assert post_response.content == expected_error_msg


@pytest.mark.dependency(depends=["save_identity"])
def test_get_patient_identity():
    expected_data = {
        'name': PATIENT_NAME,
        'dob': PATIENT_DOB,
        'gender': PATIENT_GENDER
    }
    response = get_patient_identity(IDENTIFIER)
    assert response.ok
    data: json = response.json()
    assert data == json.load(expected_data)
        