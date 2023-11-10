// @ts-ignore
import process from 'process';
import { defineConfig, devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
    {
      name: process.env.PREFER_FIREFOX ? 'firefox' : 'chromium',
      use: { ...devices[process.env.PREFER_FIREFOX ? 'Desktop Firefox' : 'Desktop Chrome'] }
    }
  ]
});
