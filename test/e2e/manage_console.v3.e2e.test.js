/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
NOTE: running this requires setting up a living IBP Console on IBM Cloud Staging
- pass the IAM api key to use via GitHub secret "IAM_API_KEY"
- pass the IBP Console url to use via GitHub secret "IBP_SERVICE_INSTANCE_URL"
*/
const ibp = require('../../dist/index.js');
const authenticator = new ibp.IamAuthenticator({
	apikey: process.env.IAM_API_KEY,
	//apikey: require('./davids_secrets.json').apikey,
	url: 'https://identity-1.us-south.iam.test.cloud.ibm.com/identity/token'	// use IBM Cloud's STAGING IAM endpoint
});
const client = ibp.BlockchainV3.newInstance({
	authenticator: authenticator,
	url: process.env.IBP_SERVICE_INSTANCE_URL
	//url: require('./davids_secrets.json').url,
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
jest.setTimeout(1000 * 60 * 2); // 2 minutes

afterEach(() => {

});

// tear down - clean up after tests are done
afterAll(async () => {

});

let notifications = [];

describe('BlockchainV3', () => {
	describe('the newInstance method', () => {

		// ---- Get settings ----- //
		test('should get IBP settings', async () => {
			const resp = await client.getSettings();
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('ACTIVITY_TRACKER_PATH');
			expect(resp.result).toHaveProperty('ATHENA_ID');
			expect(resp.result).toHaveProperty('AUTH_SCHEME');
			expect(resp.result).toHaveProperty('CALLBACK_URI');
			expect(resp.result).toHaveProperty('CLUSTER_DATA');
			expect(resp.result).toHaveProperty('CONFIGTXLATOR_URL');
			expect(resp.result).toHaveProperty('CRN');
			expect(resp.result).toHaveProperty('CRN_STRING');
			expect(resp.result).toHaveProperty('CSP_HEADER_VALUES');
			expect(resp.result).toHaveProperty('DB_SYSTEM');
			expect(resp.result).toHaveProperty('DEPLOYER_URL');
			expect(resp.result).toHaveProperty('DOMAIN');
			expect(resp.result).toHaveProperty('ENVIRONMENT');
			expect(resp.result).toHaveProperty('FABRIC_CAPABILITIES');
			expect(resp.result).toHaveProperty('FEATURE_FLAGS');
			expect(resp.result).toHaveProperty('FILE_LOGGING');
			expect(resp.result).toHaveProperty('HOST_URL');
			expect(resp.result).toHaveProperty('IAM_CACHE_ENABLED');
			expect(resp.result).toHaveProperty('IAM_URL');
			expect(resp.result).toHaveProperty('IBM_ID_CALLBACK_URL');
			expect(resp.result).toHaveProperty('IGNORE_CONFIG_FILE');
			expect(resp.result).toHaveProperty('INACTIVITY_TIMEOUTS');
			expect(resp.result).toHaveProperty('INFRASTRUCTURE');
			expect(resp.result).toHaveProperty('LANDING_URL');
			expect(resp.result).toHaveProperty('LOGIN_URI');
			expect(resp.result).toHaveProperty('LOGOUT_URI');
			expect(resp.result).toHaveProperty('MAX_REQ_PER_MIN');
			expect(resp.result).toHaveProperty('MAX_REQ_PER_MIN_AK');
			expect(resp.result).toHaveProperty('MEMORY_CACHE_ENABLED');
			expect(resp.result).toHaveProperty('PORT');
			expect(resp.result).toHaveProperty('PROXY_CACHE_ENABLED');
			expect(resp.result).toHaveProperty('PROXY_TLS_FABRIC_REQS');
			expect(resp.result).toHaveProperty('PROXY_TLS_HTTP_URL');
			expect(resp.result).toHaveProperty('PROXY_TLS_WS_URL');
			expect(resp.result).toHaveProperty('REGION');
			expect(resp.result).toHaveProperty('SESSION_CACHE_ENABLED');
			expect(resp.result).toHaveProperty('TIMEOUTS');
			expect(resp.result).toHaveProperty('TIMESTAMPS');
			expect(resp.result).toHaveProperty('TRANSACTION_VISIBILITY');
			expect(resp.result).toHaveProperty('TRUST_PROXY');
			expect(resp.result).toHaveProperty('TRUST_UNKNOWN_CERTS');
			expect(resp.result).toHaveProperty('VERSIONS');
			expect(resp.result.VERSIONS).toHaveProperty('apollo');
			expect(resp.result.VERSIONS).toHaveProperty('athena');
			expect(resp.result.VERSIONS).toHaveProperty('stitch');
			expect(resp.result.VERSIONS).toHaveProperty('tag');
		});

		// ---- Edit settings ----- //
		/* commented out b/c this restarts IBP and screws up other tests
		test('should edit IBP settings', async () => {
			const opts = {
				maxReqPerMinAk: Number((Math.random() * 25).toFixed(0)),
			};
			const resp = await client.editSettings(opts);
			expect(resp.status).toBe(200);
		});
		*/

		// ---- Get supported Fabric versions ----- //
		test('should get supported fabric versions', async () => {
			const resp = await client.getFabVersions();
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('versions');
			expect(resp.result.versions).toHaveProperty('ca');
			expect(resp.result.versions).toHaveProperty('peer');
			expect(resp.result.versions).toHaveProperty('orderer');
		});

		// ---- Get IBP console health ----- //
		test('should console health', async () => {
			const resp = await client.getHealth();
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('OPTOOLS');
			expect(resp.result).toHaveProperty('OS');
		});

		// ---- Get all IBP console notifications ----- //
		test('should list IBP notifications', async () => {
			const resp = await client.listNotifications({ limit: 3, skip: 1 });
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('total');
			expect(resp.result).toHaveProperty('returning');
			expect(resp.result).toHaveProperty('notifications');
			notifications = resp.result.notifications;
		});

		// ---- Delete signature collection ----- //
		/* commented out b/c create api not exposed yet
		test('should delete a signature collection', async () => {
			const resp = await client.deleteSigTx({ id: 'asdf' });
			expect(resp.status).toBe(200);
		});
		*/

		// ---- Archive IBP console notifications ----- //
		test('should archive IBP notifications', async () => {
			const opts = {
				notificationIds: []
			};
			for (let i in notifications) {
				opts.notificationIds.push(notifications[i].id);
			}
			const resp = await client.archiveNotifications(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('message');
			expect(resp.result).toHaveProperty('details');
		});

		// ---- Restart the IBP console ----- //
		/* commented out b/c this restarts IBP and screws up other tests
		test('should restart the IBP console', async () => {
			const resp = await client.restart();
			expect(resp.status).toBe(200);
			expect(resp.result).toMatchObject({
				"message": "restarting - give me 5-30 seconds"
			});
		});
		*/

		// ---- Delete all IBP console sessions ----- //
		test('should delete IBP sessions', async () => {
			const resp = await client.deleteAllSessions();
			expect(resp.status).toBe(202);
			expect(resp.result).toHaveProperty('message');
			expect(resp.result.message).toBe('delete submitted');
		});

		// ---- Delete all IBP console notifications ----- //
		test('should clear all notifications', async () => {
			const resp = await client.deleteAllNotifications();
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('message');
			expect(resp.result).toHaveProperty('details');
		});

		// ---- Delete all IBP console caches ----- //
		test('should delete all IBP caches', async () => {
			const resp = await client.clearCaches();
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('message');
			expect(resp.result).toHaveProperty('flushed');
		});

		// ---- Get Postman collection ----- //
		test('should get the v3 postman collection', async () => {
			try {
				const opts = {
					authType: 'api_key',
					apiKey: 'dummyKeyHere'
				};
				const resp = await client.getPostman(opts);
				expect(resp.status).toBe(200);
			} catch (e) {
				console.log(e);
				throw e;
			}
		});

		// ---- Get Postman collection ----- //
		test('should get the v3 swagger/openapi file', async () => {
			const resp = await client.getSwagger();
			expect(resp.status).toBe(200);
		});
	});
});
