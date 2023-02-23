// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    launchOptions: {
      slowMo: 80,
    },
    viewport: { width: 1460, height: 800 },
    // ignoreHTTPSErrors: false,
    video: "retain-on-failure", // 'on'
    screenshot: "only-on-failure",
    browserName: "chromium",
    baseURL: process.env.URL === undefined ? "" : process.env.URL,
  },
  timeout: 1 * 60 * 1000,
  retries: 0,
  testMatch: /.*\.spec\.ts/,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/report/test-results.json" }],
  ],
  workers: process.env.CI ? 2 : undefined,
};
export default config;
