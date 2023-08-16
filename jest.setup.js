// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Required to fix an error message. Reference used for the fix:
// https://github.com/inrupt/solid-client-authn-js/issues/1676
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof global.fetch === "undefined") {
  const fetchMock = require("jest-fetch-mock");
  fetchMock.enableMocks();
  fetchMock.dontMock();
}
