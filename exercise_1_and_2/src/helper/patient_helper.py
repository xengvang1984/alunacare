from .gender import Gender
from .patient_identity import PatientIdentity


def generate_expected_patient_id(patient_identity: PatientIdentity) -> str:
    patient_name_splits = split_patient_name(patient_identity.name)
    id_first_part = patient_name_splits[0][:2] + patient_name_splits[-1][:2]
    id_second_part = split_patient_dob(patient_identity.dob)[0][:4]
    id_last_part = Gender(patient_identity.gender.strip().lower()).value.upper()[:1]
    return id_first_part.upper() + id_second_part + id_last_part


def split_patient_name(full_name: str) -> list[str]:
    full_name = full_name.strip()
    if full_name is None or full_name == '':
        raise Exception('Name must be set and cannot be empty')
    return full_name.split()


def split_patient_dob(dob: str):
    dob = dob.strip()
    if dob is None or dob == '':
        raise Exception('DOB must be set and cannot be empty')
    return dob.split('-')
