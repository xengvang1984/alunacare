import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from '../pages/basePage'

export class SearchResultsPage extends BasePage {
    SEARCH_INPUT_PLACE_HOLDER_TEXT = "Enter patient identifier";
    PATIENT_FOUND_RESULTS_MSG_TEXT = "Patient found";
    NO_PATIENT_FOUND_RESULTS_MSG_TEXT = "No patient matches the identifier";

    readonly backBtn: Locator;
    readonly resultsMsg: Locator;
    readonly patientName: Locator;
    readonly patientDob: Locator;
    readonly patientGender: Locator;
    readonly patientIdentifier: Locator;

    constructor(page: Page) {
        super(page);
        this.backBtn = page.locator("[data-back-btn]");
        this.resultsMsg = page.locator("[data-result-msg]");
        this.patientName = page.locator("[data-patient-name]");
        this.patientDob = page.locator("[data-patient-dob]");
        this.patientGender = page.locator("[data-patient-gender]");
        this.patientIdentifier = page.locator("[data-patient-identifier]");
        
    }

    async validatePatientResult(expectedPatient: Patient) {
        expect(await this.resultsMsg.textContent()).toEqual(this.PATIENT_FOUND_RESULTS_MSG_TEXT);
        expect(await this.patientName.textContent()).toEqual(expectedPatient.name);
        expect(await this.patientDob.textContent()).toEqual(expectedPatient.dob);
        expect(await this.patientGender.textContent()).toEqual(expectedPatient.gender);
    }

    async validateNoPatientMatchResult(expectedIdentifier: string) {
        expect(await this.resultsMsg.textContent()).toEqual(this.NO_PATIENT_FOUND_RESULTS_MSG_TEXT);
        expect(await this.patientIdentifier.textContent()).toEqual(expectedIdentifier);
    }

}