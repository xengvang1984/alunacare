import { Locator, Page } from "@playwright/test";
import { BasePage } from '../pages/basePage'

export class SearchPage extends BasePage {
    SEARCH_INPUT_PLACE_HOLDER_TEXT = "Enter patient identifier";

    readonly searchInput: Locator;
    readonly findPatientBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByPlaceholder(this.SEARCH_INPUT_PLACE_HOLDER_TEXT);
        this.findPatientBtn = page.locator("[data-find-patient-btn]");
    }

    async fillSearchInput(patientIdentifier: string) {
        await this.searchInput.fill(patientIdentifier);
    }

    async clickFindPatientBtn() {
        await this.findPatientBtn.click();
    }

    async goToSearchPage() {
        this.goToUrl(this.BASE_URL + '/search-patient')
    }

}