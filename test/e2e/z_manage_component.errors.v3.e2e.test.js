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

// default to pull secrets from env
let apikey = process.env.IAM_API_KEY;
let siid_url = process.env.IBP_SERVICE_INSTANCE_URL;

// try to pull secrets from local file, if not possible use env
try {
	apikey = require('./davids_secrets.json').apikey;
	siid_url = require('./davids_secrets.json').url;
} catch (e) { }

// internal record keeping (ignore me)
const misc = require('./misc.js')();

// ------------------------ start ------------------------ //
const ibp = require('../../dist/index.js');
const authenticator = new ibp.IamAuthenticator({
	apikey: apikey,
	url: 'https://identity-1.us-south.iam.test.cloud.ibm.com/identity/token'	// use IBM Cloud's STAGING IAM endpoint
});
const client = ibp.BlockchainV3.newInstance({
	authenticator: authenticator,
	url: siid_url
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
jest.setTimeout(1000 * 60 * 2); // 2 minutes

afterEach(() => {

});

// tear down - clean up after tests are done
afterAll(async () => {
	try {
		await client.deleteAllComponents();
	} catch (e) {
		console.log('tear down error:', e);
	}
});

// --------------------------------------------- Errors --------------------------------------------- //
describe('BlockchainV3', () => {
	describe('the newInstance method', () => {

		// ---- Create a CA ----- //
		test('should fail to create a CA', async () => {
			const opts = {
				"configOverride": {}
			};
			try {
				const resp = await client.createCa(opts);
			} catch (e) {
				expect(e.toString()).toBe('Error: Missing required parameters: displayName');
			}
		});

		// ---- Restart a CA ----- //
		test('should fail to restart CA', async () => {
			const opts = {
				id: 'fake' + Date.now(),
			};
			try {
				const resp = await client.caAction(opts);
			} catch (e) {
				//console.error('status code:', e.status);
				//console.error('response headers:', e.headers);
				//console.error('response:', JSON.parse(e.body));
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body).msg).toBe('no components by this id exist');
				misc.record_api({ name: 'caAction-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Get CA ----- //
		test('should fail to get CA data', async () => {
			const opts = {
				id: 'fake' + Date.now(),
				deploymentAttrs: 'included',
				cache: 'skip'
			};
			try {
				const resp = await client.getComponent(opts);
			} catch (e) {
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body).msg).toBe('no components by this id exist');
				misc.record_api({ name: 'getComponent-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Get all CAs ----- //
		test('should fail to get all CAs', async () => {
			const opts = {
				type: null,
				deploymentAttrs: 'included'
			};
			try {
				const resp = await client.getComponentsByType(opts);
			} catch (e) {
				expect(e.toString()).toBe('Error: Missing required parameters: type');
			}
		});

		// ---- Delete a CA ----- //
		test('should fail to delete a created CA', async () => {
			const opts = {
				id: 'fake' + Date.now(),
			};
			try {
				const resp = await client.deleteComponent(opts);
			} catch (e) {
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body).msg).toBe('no components by this id exist');
				misc.record_api({ name: 'deleteComponent-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Import a CA ----- //
		test('should fail to import a fake CA', async () => {
			const opts = {
				displayName: 'My Imported CA',
				apiUrl: 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:7054',
				operationsUrl: 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:9443',
				location: 'ibmcloud',
				msp: {}
			};
			try {
				const resp = await client.importCa(opts);
			} catch (e) {
				expect(e.status).toBe(400);
				expect(JSON.parse(e.body).msgs).toMatchObject([
					"Expected parameter 'msp.component' to exist.",
					"Expected parameter 'msp.tlsca' to exist.",
					"Expected parameter 'msp.ca' to exist."
				]);
				misc.record_api({ name: 'importCa-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Edit data on a CA ----- //
		test('should fail to edit metadata on a CA', async () => {
			const opts = {
				id: 'fake' + Date.now(),
				displayName: 'My Other CA',
			};
			try {
				const resp = await client.editCa(opts);
			} catch (e) {
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body).msg).toBe('no components by this id exist');
				misc.record_api({ name: 'editCa-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Import a Peer ----- //
		test('should fail to import a fake Peer', async () => {
			const opts = {
				displayName: 'My Imported Peer',
				location: 'ibm cloud',
				apiUrl: null,
				mspId: 'PeerOrg1',
				operationsUrl: 'https://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:9443',
				grpcwpUrl: 'https://n3a3ec3-mypeer-proxy.ibp.us-south.containers.appdomain.cloud:8084',
				msp: {}
			};
			try {
				const resp = await client.importPeer(opts);
			} catch (e) {
				expect(e.status).toBe(400);
				expect(JSON.parse(e.body).msgs).toMatchObject([
					"Expected parameter 'api_url' to be of type: 'string', but instead was: 'object'.",
					"The field 'api_url' must be a url including the protocol, hostname/ip and port.",
					"Expected parameter 'msp.component' to exist.",
					"Expected parameter 'msp.tlsca' to exist."
				]);
				misc.record_api({ name: 'importPeer-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Edit a Peer ----- //
		test('should fail to edit name of a fake Peer', async () => {
			const opts = {
				id: 'fake' + Date.now(),
				displayName: 'My Other Imported Peer',
			};
			try {
				const resp = await client.editPeer(opts);
			} catch (e) {
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body).msg).toBe('no components by this id exist');
				misc.record_api({ name: 'editPeer-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Import a Orderer ----- //
		test('should fail to import a fake Orderer', async () => {
			const opts = {
				displayName: 'My Imported Orderer Node',
				clusterId: 'abcde',
				clusterName: 'My Raft OS',
				grpcwpUrl: 'https://n3a3ec3-myorderer-proxy.ibp.us-south.containers.appdomain.cloud:443',
				apiUrl: null,
				operationsUrl: 'https://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:8443',
				mspId: 'OrdererOrg1',
				systemChannelId: 'testchainid',
				msp: {}
			};;
			try {
				const resp = await client.importOrderer(opts);
			} catch (e) {
				expect(e.status).toBe(400);
				expect(JSON.parse(e.body).msgs).toMatchObject([
					"Expected parameter 'api_url' to be of type: 'string', but instead was: 'object'.",
					"The field 'api_url' must be a url including the protocol, hostname/ip and port.",
					"Expected parameter 'msp.component' to exist.",
					"Expected parameter 'msp.tlsca' to exist."
				]);
				misc.record_api({ name: 'importOrderer-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Edit a Orderer ----- //
		test('should fail to edit name of a fake Orderer', async () => {
			const opts = {
				id: 'fake' + Date.now(),
				displayName: 'My Other Imported Orderer Node',
			};
			try {
				const resp = await client.editOrderer(opts);
			} catch (e) {
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body).msg).toBe('no components by this id exist');
				misc.record_api({ name: 'editOrderer-fail', input: opts, response: JSON.parse(e.body) });
			}
		});

		// ---- Create a Peer ----- //
		test('should fail to create a Peer', async () => {
			const opts = {
				displayName: 'My Peer',
				mspId: null,
				crypto: {},
				configOverride: {
					chaincode: {
						startuptimeout: '480s',
						executetimeout: '120s'
					}
				}
			};
			try {
				const resp = await client.createPeer(opts);
			} catch (e) {
				expect(e.toString()).toBe('Error: Missing required parameters: mspId');
			}
		});
	});

	// ---- Create a Orderer ----- //
	test('should fail to create a Orderer', async () => {
		const opts = {
			clusterName: 'My one Node Raft',
			displayName: 'ordering service node',
			mspId: null,
			ordererType: null,
			crypto: []
		};
		try {
			const resp = await client.createOrderer(opts);
		} catch (e) {
			expect(e.toString()).toBe('Error: Missing required parameters: ordererType, mspId');
		}
	});
});
