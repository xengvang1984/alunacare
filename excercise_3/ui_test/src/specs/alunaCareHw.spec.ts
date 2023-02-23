import { test } from '@playwright/test';
import { SearchPage } from './pages/searchPage'
import { SearchResultsPage } from './pages/searchResultsPage';


test.describe("Alunacare excercise 3 homework test", () => {
  let searchPage: SearchPage;
  let searchResultsPage: SearchResultsPage;
  const PATIENT_IDENTIFIER = 'JUGO1940M';

  test.beforeAll(async ( {page} ) => {
    searchPage = new SearchPage(page);
    searchResultsPage = new SearchResultsPage(page);
    
  });

  test.beforeEach(async () => {
    await searchPage.goToSearchPage();
  });

  test("Go to search patient search page and search for patient by patient identifier", async () => {
    const expectedPatient: Patient = {
      'name': 'Juan Gomez',
      'dob': '1940-12-01',
      'gender': 'Male'
    }
    
    await searchPage.fillSearchInput(PATIENT_IDENTIFIER);
    await searchPage.clickFindPatientBtn();
    await searchResultsPage.validatePatientResult(expectedPatient);
  });

  test("Go to search patient search page and search for patient by patient identifier", async () => {
    const invalidPatientIdentifier = '$%^&%RFTYJ';
    await searchPage.fillSearchInput(invalidPatientIdentifier);
    await searchPage.clickFindPatientBtn();
    await searchResultsPage.validateNoPatientMatchResult(invalidPatientIdentifier);
  });
});

