import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "b3xom9",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
