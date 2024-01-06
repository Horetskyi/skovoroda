const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  viewportWidth: 1400,
  viewportHeight: 900,
});
