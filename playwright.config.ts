import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 0,
 reporter:[['html'],['allure-playwright']],

  use: {
    headless: false,
    screenshot: "on",
    video: "on",
  },

  projects: [
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"] },
    },
  ],
});