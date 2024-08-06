// filename: features/step_definitions/mkhulu_response_steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

Given('the server is running', async function () {
  try {
    // Check if the server is responding by making a simple request
    await axios.get('http://localhost:3000/healthcheck'); // Assuming you have this endpoint
  } catch (error) {
    throw new Error('Server is not running');
  }
});

When('I ask {string}', async function (question) {
  try {
    response = await axios.post('http://localhost:3000/generate-response', { prompt: question });
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
});

Then('I should get a response that includes {string}', function (expectedAnswer) {
  const actualAnswer = response.data.response;
  assert(actualAnswer.includes(expectedAnswer), `Expected response to include "${expectedAnswer}" but got "${actualAnswer}"`);
});