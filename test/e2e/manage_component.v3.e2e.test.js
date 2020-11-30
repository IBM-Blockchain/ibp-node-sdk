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
	try {
		await client.deleteAllComponents();
	} catch (e) {
		console.log('tear down error:', e);
	}
});

let imported_ca_id = '';
let created_ca_id = '';
let imported_os_id = '';
let imported_peer_id = '';

describe('BlockchainV3', () => {
	describe('the newInstance method', () => {
		/*test('should use not find component', async () => {
			try {
				const resp = await client.getComponent({ id: 'DoesNotExist' });
			} catch (e) {
				expect(e.status).toBe(404);
				expect(JSON.parse(e.body)).toMatchObject({ "msg": "no components by this id exist", "reason": "missing", "statusCode": 404 });
			}
		});*/

		// ---- First reset the service ----- //
		test('should clear all components to start fresh', async () => {
			try {
				const resp = await client.deleteAllComponents();
				expect(resp.status).toBe(200);
				expect(resp.result).toHaveProperty('deleted');
			} catch (e) {
				console.log(e);
				expect(e.status).toBe(0);			// should not enter here
			}
		});
		test('should clear all notifications to start fresh', async () => {
			try {
				const resp = await client.deleteAllNotifications();
				expect(resp.status).toBe(200);
				expect(resp.result).toHaveProperty('message');
				expect(resp.result).toHaveProperty('details');
			} catch (e) {
				console.log(e);
				expect(e.status).toBe(0);			// should not enter here
			}
		});

		// ---- Create a CA ----- //
		test('should create a CA', async () => {
			const opts = {
				"displayName": "My CA",
				"configOverride": {
					"ca": {
						"registry": {
							"maxenrollments": -1,
							"identities": [
								{
									"name": "admin",
									"pass": "password",
									"type": "client",
									"affiliation": "",
									"attrs": {
										"hf.Registrar.Roles": "*",
										"hf.Registrar.DelegateRoles": "*",
										"hf.Revoker": true,
										"hf.IntermediateCA": true,
										"hf.GenCRL": true,
										"hf.Registrar.Attributes": "*",
										"hf.AffiliationMgr": true
									}
								}
							]
						}
					}
				}
			};
			const resp = await client.createCa(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('dep_component_id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('resources');
			expect(resp.result).toHaveProperty('scheme_version');
			expect(resp.result).toHaveProperty('storage');
			expect(resp.result).toHaveProperty('tags');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result).toHaveProperty('version');
			expect(resp.result).toHaveProperty('zone');
			expect(resp.result.display_name).toBe('My CA');
			created_ca_id = resp.result.id;
		});

		// ---- Update a CA ----- //
		test('should update CA k8s resources', async () => {
			const opts = {
				id: created_ca_id,
				resources: {
					ca: {
						requests: {
							cpu: '200m',
							memory: '256Mi'
						}
					}
				}
			};
			const resp = await client.editCa(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('dep_component_id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('resources');
			expect(resp.result).toHaveProperty('scheme_version');
			expect(resp.result).toHaveProperty('storage');
			expect(resp.result).toHaveProperty('tags');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result).toHaveProperty('version');
			expect(resp.result).toHaveProperty('zone');
			expect(resp.result.resources).toHaveProperty('ca');
			expect(resp.result.resources.ca).toHaveProperty('requests');
			//expect(resp.result.resources.ca.requests).toMatchObject({
			//	cpu: '200m',
			//	memory: '256Mi'
			//}); // dsh todo fix this
		});

		// ---- Restart a CA ----- //
		test('should restart CA', async () => {
			const opts = {
				id: created_ca_id,
				restart: true
			};
			try {
				const resp = await client.caAction(opts);
				expect(resp.status).toBe(202);
				expect(resp.result).toMatchObject({
					"message": "accepted",
					"id": "myca",
					"actions": [
						"restart"
					]
				});
			} catch (e) {
				console.log(e);
				throw e;
			}
		});

		// ---- Get CA ----- //
		test('should get CA data', async () => {
			const opts = {
				id: created_ca_id,
				deploymentAttrs: 'included',
				cache: 'skip'
			};
			const resp = await client.getComponent(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('config_override');
			expect(resp.result).toHaveProperty('dep_component_id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('location');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('region');
			expect(resp.result).toHaveProperty('resources');
			expect(resp.result).toHaveProperty('scheme_version');
			expect(resp.result).toHaveProperty('storage');
			expect(resp.result).toHaveProperty('tags');
			expect(resp.result).toHaveProperty('type');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result).toHaveProperty('version');
			expect(resp.result).toHaveProperty('zone');
			expect(resp.result.tags).toMatchObject(['fabric-ca', 'ibm_saas']);
			expect(resp.result.id).toBe(created_ca_id);
			expect(resp.result.location).toBe('ibm_saas');
		});

		// ---- Get all Components ----- //
		test('should get all component data', async () => {
			const opts = {
				id: created_ca_id,
				deploymentAttrs: 'included',
				cache: 'skip'
			};
			const resp = await client.listComponents(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('components');

			resp.result = resp.result.components[0];
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('config_override');
			expect(resp.result).toHaveProperty('dep_component_id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('location');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('region');
			expect(resp.result).toHaveProperty('resources');
			expect(resp.result).toHaveProperty('scheme_version');
			expect(resp.result).toHaveProperty('storage');
			expect(resp.result).toHaveProperty('tags');
			expect(resp.result).toHaveProperty('type');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result).toHaveProperty('version');
			expect(resp.result).toHaveProperty('zone');
			expect(resp.result.tags).toMatchObject(['fabric-ca', 'ibm_saas']);
			expect(resp.result.id).toBe(created_ca_id);
			expect(resp.result.location).toBe('ibm_saas');
		});

		// ---- Get all CAs ----- //
		test('should get all CAs', async () => {
			const opts = {
				componentType: 'fabric-ca',
				deploymentAttrs: 'included'
			};
			const resp = await client.getComponentsByType(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('components');

			resp.result = resp.result.components[0];
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('config_override');
			expect(resp.result).toHaveProperty('dep_component_id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('location');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('region');
			expect(resp.result).toHaveProperty('resources');
			expect(resp.result).toHaveProperty('scheme_version');
			expect(resp.result).toHaveProperty('storage');
			expect(resp.result).toHaveProperty('tags');
			expect(resp.result).toHaveProperty('type');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result).toHaveProperty('version');
			expect(resp.result).toHaveProperty('zone');
			expect(resp.result.tags).toMatchObject(['fabric-ca', 'ibm_saas']);
			expect(resp.result.id).toBe(created_ca_id);
			expect(resp.result.location).toBe('ibm_saas');
		});

		// ---- Get all saas components ----- //
		test('should get all saas components', async () => {
			const opts = {
				tag: 'ibm_saas',
				deploymentAttrs: 'included'
			};
			const resp = await client.getComponentsByTag(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('components');

			resp.result = resp.result.components[0];
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('config_override');
			expect(resp.result).toHaveProperty('dep_component_id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('location');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('region');
			expect(resp.result).toHaveProperty('resources');
			expect(resp.result).toHaveProperty('scheme_version');
			expect(resp.result).toHaveProperty('storage');
			expect(resp.result).toHaveProperty('tags');
			expect(resp.result).toHaveProperty('type');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result).toHaveProperty('version');
			expect(resp.result).toHaveProperty('zone');
			expect(resp.result.tags).toMatchObject(['fabric-ca', 'ibm_saas']);
			expect(resp.result.id).toBe(created_ca_id);
			expect(resp.result.location).toBe('ibm_saas');
		});

		// ---- Delete a CA ----- //
		test('should delete a created CA', async () => {
			const opts = {
				id: created_ca_id,
			};
			const resp = await client.deleteComponent(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toMatchObject({
				"message": "deleted",
				"type": "fabric-ca",
				"id": created_ca_id,
				"display_name": "My CA"
			});
		});

		// ---- Import a CA ----- //
		test('should import a fake CA', async () => {
			const opts = {
				displayName: 'My Imported CA',
				apiUrl: 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:7054',
				operationsUrl: 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:9443',
				location: 'ibmcloud',
				msp: {
					ca: {
						name: 'ca'
					},
					tlsca: {
						name: 'tlsca'
					},
					component: {
						tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURxVENDQTArZ0F3SUJBZ0lSQUwxQ2lORks1SkxIZGNraGh1bjFETFV3Q2dZSUtvWkl6ajBFQXdJd2dkVXgKQ3pBSkJnTlZCQVlUQWxWVE1SY3dGUVlEVlFRSUV3NU9iM0owYUNCRFlYSnZiR2x1WVRFUE1BMEdBMVVFQnhNRwpSSFZ5YUdGdE1Rd3dDZ1lEVlFRS0V3TkpRazB4RXpBUkJnTlZCQXNUQ2tKc2IyTnJZMmhoYVc0eGVUQjNCZ05WCkJBTVRjR05sYkdSbGNuUmxjM1F4TFc5eVp6RmpZUzFqWVM1alpXeGtaWEl4TFdJell5MDBlREUyTFRNek5HVXgKT1dJMU5qTTBOMlE1WTJVek1tSTJaRFpoT0Rjd1pERTBaak0zTFRBd01EQXVkWE10YzI5MWRHZ3VZMjl1ZEdGcApibVZ5Y3k1aGNIQmtiMjFoYVc0dVkyeHZkV1F3SGhjTk1qQXhNREU0TURFMU5URTNXaGNOTXpBeE1ERTJNREUxCk5URTNXakNCMVRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1ROHcKRFFZRFZRUUhFd1pFZFhKb1lXMHhEREFLQmdOVkJBb1RBMGxDVFRFVE1CRUdBMVVFQ3hNS1FteHZZMnRqYUdGcApiakY1TUhjR0ExVUVBeE53WTJWc1pHVnlkR1Z6ZERFdGIzSm5NV05oTFdOaExtTmxiR1JsY2pFdFlqTmpMVFI0Ck1UWXRNek0wWlRFNVlqVTJNelEzWkRsalpUTXlZalprTm1FNE56QmtNVFJtTXpjdE1EQXdNQzUxY3kxemIzVjAKYUM1amIyNTBZV2x1WlhKekxtRndjR1J2YldGcGJpNWpiRzkxWkRCWk1CTUdCeXFHU000OUFnRUdDQ3FHU000OQpBd0VIQTBJQUJOYTQxRzRYZGJtT09tY000L2FxaExlYUlPdjZZSHdTOEJqRitFd2lmQW5TYis3U0pma3NmYWNRCmhKS3RvQXRXK2F2SE1vcDFmbVpYS1pQT3lpL2NuWFdqZ2Ywd2dmb3dnZmNHQTFVZEVRU0I3ekNCN0lKd1kyVnMKWkdWeWRHVnpkREV0YjNKbk1XTmhMV05oTG1ObGJHUmxjakV0WWpOakxUUjRNVFl0TXpNMFpURTVZalUyTXpRMwpaRGxqWlRNeVlqWmtObUU0TnpCa01UUm1NemN0TURBd01DNTFjeTF6YjNWMGFDNWpiMjUwWVdsdVpYSnpMbUZ3CmNHUnZiV0ZwYmk1amJHOTFaSUo0WTJWc1pHVnlkR1Z6ZERFdGIzSm5NV05oTFc5d1pYSmhkR2x2Ym5NdVkyVnMKWkdWeU1TMWlNMk10TkhneE5pMHpNelJsTVRsaU5UWXpORGRrT1dObE16SmlObVEyWVRnM01HUXhOR1l6TnkwdwpNREF3TG5WekxYTnZkWFJvTG1OdmJuUmhhVzVsY25NdVlYQndaRzl0WVdsdUxtTnNiM1ZrTUFvR0NDcUdTTTQ5CkJBTUNBMGdBTUVVQ0lFSzZCSWtvamptNm1rbmt0aDgxenIxbU0yM0QzTWhaS2M2QVRRUnZwK3ZHQWlFQXRvcFgKNkJnWlV4NlV0SE5MR3dWKzhDNmwxaEFNQ2YzUnhjRDlQU1ErbUUwPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
					}
				}
			};
			const resp = await client.importCa(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result.display_name).toBe('My Imported CA');
			imported_ca_id = resp.result.id;
		});

		// ---- Edit data on a CA ----- //
		test('should edit metadata on a CA', async () => {
			const opts = {
				id: imported_ca_id,
				displayName: 'My Other CA',
				tags: [
					'fabric-ca',
					'ibm_saas',
					'blue_team',
					'dev'
				]
			};
			const resp = await client.editCa(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result.display_name).toBe('My Other CA');
			expect(resp.result.tags).toMatchObject([		// its alpha sorted
				'blue_team',
				'dev',
				'fabric-ca',
				'ibm_saas',
			]);
		});

		// ---- Remove imported CA ----- //
		test('should remove an imported CA', async () => {
			const opts = {
				id: imported_ca_id,
			};
			const resp = await client.removeComponent(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toMatchObject({
				"message": "deleted",
				"type": "fabric-ca",
				"id": imported_ca_id,
				"display_name": "My Other CA"
			});
		});

		// ---- Remove component via tag----- //
		test('should remove ca by tag', async () => {

			// first import a ca, then delete it
			const opts = {
				displayName: 'My Second Imported CA',
				apiUrl: 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:7054',
				operationsUrl: 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:9443',
				location: 'ibmcloud',
				msp: {
					ca: {
						name: 'ca'
					},
					tlsca: {
						name: 'tlsca'
					},
					component: {
						tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURxVENDQTArZ0F3SUJBZ0lSQUwxQ2lORks1SkxIZGNraGh1bjFETFV3Q2dZSUtvWkl6ajBFQXdJd2dkVXgKQ3pBSkJnTlZCQVlUQWxWVE1SY3dGUVlEVlFRSUV3NU9iM0owYUNCRFlYSnZiR2x1WVRFUE1BMEdBMVVFQnhNRwpSSFZ5YUdGdE1Rd3dDZ1lEVlFRS0V3TkpRazB4RXpBUkJnTlZCQXNUQ2tKc2IyTnJZMmhoYVc0eGVUQjNCZ05WCkJBTVRjR05sYkdSbGNuUmxjM1F4TFc5eVp6RmpZUzFqWVM1alpXeGtaWEl4TFdJell5MDBlREUyTFRNek5HVXgKT1dJMU5qTTBOMlE1WTJVek1tSTJaRFpoT0Rjd1pERTBaak0zTFRBd01EQXVkWE10YzI5MWRHZ3VZMjl1ZEdGcApibVZ5Y3k1aGNIQmtiMjFoYVc0dVkyeHZkV1F3SGhjTk1qQXhNREU0TURFMU5URTNXaGNOTXpBeE1ERTJNREUxCk5URTNXakNCMVRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1ROHcKRFFZRFZRUUhFd1pFZFhKb1lXMHhEREFLQmdOVkJBb1RBMGxDVFRFVE1CRUdBMVVFQ3hNS1FteHZZMnRqYUdGcApiakY1TUhjR0ExVUVBeE53WTJWc1pHVnlkR1Z6ZERFdGIzSm5NV05oTFdOaExtTmxiR1JsY2pFdFlqTmpMVFI0Ck1UWXRNek0wWlRFNVlqVTJNelEzWkRsalpUTXlZalprTm1FNE56QmtNVFJtTXpjdE1EQXdNQzUxY3kxemIzVjAKYUM1amIyNTBZV2x1WlhKekxtRndjR1J2YldGcGJpNWpiRzkxWkRCWk1CTUdCeXFHU000OUFnRUdDQ3FHU000OQpBd0VIQTBJQUJOYTQxRzRYZGJtT09tY000L2FxaExlYUlPdjZZSHdTOEJqRitFd2lmQW5TYis3U0pma3NmYWNRCmhKS3RvQXRXK2F2SE1vcDFmbVpYS1pQT3lpL2NuWFdqZ2Ywd2dmb3dnZmNHQTFVZEVRU0I3ekNCN0lKd1kyVnMKWkdWeWRHVnpkREV0YjNKbk1XTmhMV05oTG1ObGJHUmxjakV0WWpOakxUUjRNVFl0TXpNMFpURTVZalUyTXpRMwpaRGxqWlRNeVlqWmtObUU0TnpCa01UUm1NemN0TURBd01DNTFjeTF6YjNWMGFDNWpiMjUwWVdsdVpYSnpMbUZ3CmNHUnZiV0ZwYmk1amJHOTFaSUo0WTJWc1pHVnlkR1Z6ZERFdGIzSm5NV05oTFc5d1pYSmhkR2x2Ym5NdVkyVnMKWkdWeU1TMWlNMk10TkhneE5pMHpNelJsTVRsaU5UWXpORGRrT1dObE16SmlObVEyWVRnM01HUXhOR1l6TnkwdwpNREF3TG5WekxYTnZkWFJvTG1OdmJuUmhhVzVsY25NdVlYQndaRzl0WVdsdUxtTnNiM1ZrTUFvR0NDcUdTTTQ5CkJBTUNBMGdBTUVVQ0lFSzZCSWtvamptNm1rbmt0aDgxenIxbU0yM0QzTWhaS2M2QVRRUnZwK3ZHQWlFQXRvcFgKNkJnWlV4NlV0SE5MR3dWKzhDNmwxaEFNQ2YzUnhjRDlQU1ErbUUwPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
					}
				},
				tags: ['my_tag'],
			};
			const resp = await client.importCa(opts);
			imported_ca_id = resp.result.id;

			// now delete it
			const opts2 = {
				tag: 'my_tag'
			};
			const resp2 = await client.removeComponentsByTag(opts2);
			expect(resp2.status).toBe(200);
			expect(resp2.result).toHaveProperty('removed');

			const firstComp = resp2.result.removed[0];
			expect(firstComp).toMatchObject({
				"message": "deleted",
				"type": "fabric-ca",
				"id": imported_ca_id,
				"display_name": "My Second Imported CA"
			});
		});

		// ---- Import a Peer ----- //
		test('should import a fake Peer', async () => {
			const opts = {
				displayName: 'My Imported Peer',
				location: 'ibm cloud',
				apiUrl: 'grpcs://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:7051',
				mspId: 'PeerOrg1',
				operationsUrl: 'https://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:9443',
				grpcwpUrl: 'https://n3a3ec3-mypeer-proxy.ibp.us-south.containers.appdomain.cloud:8084',
				msp: {
					component: {
						tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K',
						ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K',
						admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K']
					},
					tlsca: {
						root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUIvakNDQWFTZ0F3SUJBZ0lVVThuZXFoeWtPQWZaNkN2amhPU2x5Q25XU09rd0NnWUlLb1pJemowRUF3SXcKWFRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVE0d0RBWURWUVFERXdWMGJITmpZVEFlCkZ3MHlNREF6TVRFeE5qUXpNREJhRncwek5UQXpNRGd4TmpRek1EQmFNRjB4Q3pBSkJnTlZCQVlUQWxWVE1SY3cKRlFZRFZRUUlFdzVPYjNKMGFDQkRZWEp2YkdsdVlURVVNQklHQTFVRUNoTUxTSGx3WlhKc1pXUm5aWEl4RHpBTgpCZ05WQkFzVEJrWmhZbkpwWXpFT01Bd0dBMVVFQXhNRmRHeHpZMkV3V1RBVEJnY3Foa2pPUFFJQkJnZ3Foa2pPClBRTUJCd05DQUFUT1dBUEE2N2w1NmFWeW9DRXIyVk00eDBNRW9qNzF0SHJtYjhjTDE1WklJUGdOREIrQzd5NzYKeDBVLzdPNlJta3d0b2d4SnFFU2dWUnJGM1FqalZERTZvMEl3UURBT0JnTlZIUThCQWY4RUJBTUNBUVl3RHdZRApWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVVU5Zk94dW1xakhPMTd2VkR6MnIxcHhHeVJYc3dDZ1lJCktvWkl6ajBFQXdJRFNBQXdSUUloQVBNNVV2STl3MDhhdjRWUG5CckhDbFh3OWJqejEwRTJaOHN1ckZoWnhoY2wKQWlCNm9CWVhPejZWSTl0NVBSekJTV3JMRmZtbUxvQ1p5cXZWMFJ0enNYdi9PZz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K']
					},
					ca: {
						root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K']
					}
				}
			};
			const resp = await client.importPeer(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result.display_name).toBe('My Imported Peer');
			imported_peer_id = resp.result.id;
		});

		// ---- Edit a Peer ----- //
		test('should edit name of a fake Peer', async () => {
			const opts = {
				id: imported_peer_id,
				displayName: 'My Other Imported Peer',
			};
			const resp = await client.editPeer(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result.display_name).toBe('My Other Imported Peer');
		});

		// ---- Import a Orderer ----- //
		test('should import a fake Orderer', async () => {
			const opts = {
				displayName: 'My Imported Orderer Node',
				clusterId: 'abcde',
				clusterName: 'My Raft OS',
				grpcwpUrl: 'https://n3a3ec3-myorderer-proxy.ibp.us-south.containers.appdomain.cloud:443',
				apiUrl: 'grpcs://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:7050',
				operationsUrl: 'https://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:8443',
				mspId: 'OrdererOrg1',
				systemChannelId: 'testchainid',
				msp: {
					component: {
						tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K',
						ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K',
						admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K']
					},
					tlsca: {
						root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUIvakNDQWFTZ0F3SUJBZ0lVVThuZXFoeWtPQWZaNkN2amhPU2x5Q25XU09rd0NnWUlLb1pJemowRUF3SXcKWFRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVE0d0RBWURWUVFERXdWMGJITmpZVEFlCkZ3MHlNREF6TVRFeE5qUXpNREJhRncwek5UQXpNRGd4TmpRek1EQmFNRjB4Q3pBSkJnTlZCQVlUQWxWVE1SY3cKRlFZRFZRUUlFdzVPYjNKMGFDQkRZWEp2YkdsdVlURVVNQklHQTFVRUNoTUxTSGx3WlhKc1pXUm5aWEl4RHpBTgpCZ05WQkFzVEJrWmhZbkpwWXpFT01Bd0dBMVVFQXhNRmRHeHpZMkV3V1RBVEJnY3Foa2pPUFFJQkJnZ3Foa2pPClBRTUJCd05DQUFUT1dBUEE2N2w1NmFWeW9DRXIyVk00eDBNRW9qNzF0SHJtYjhjTDE1WklJUGdOREIrQzd5NzYKeDBVLzdPNlJta3d0b2d4SnFFU2dWUnJGM1FqalZERTZvMEl3UURBT0JnTlZIUThCQWY4RUJBTUNBUVl3RHdZRApWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVVU5Zk94dW1xakhPMTd2VkR6MnIxcHhHeVJYc3dDZ1lJCktvWkl6ajBFQXdJRFNBQXdSUUloQVBNNVV2STl3MDhhdjRWUG5CckhDbFh3OWJqejEwRTJaOHN1ckZoWnhoY2wKQWlCNm9CWVhPejZWSTl0NVBSekJTV3JMRmZtbUxvQ1p5cXZWMFJ0enNYdi9PZz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K']
					},
					ca: {
						root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHRENDQWI2Z0F3SUJBZ0lVSENXMzFhSWtxYVkxcFFSbmxPNldNNCtNb2t3d0NnWUlLb1pJemowRUF3SXcKWURFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJFd0R3WURWUVFERXdoTmVVTkJMWFJzCmN6QWVGdzB4T1RFd01qRXlNREV4TURCYUZ3MHpOREV3TVRjeU1ERXhNREJhTUdBeEN6QUpCZ05WQkFZVEFsVlQKTVJjd0ZRWURWUVFJRXc1T2IzSjBhQ0JEWVhKdmJHbHVZVEVVTUJJR0ExVUVDaE1MU0hsd1pYSnNaV1JuWlhJeApEekFOQmdOVkJBc1RCa1poWW5KcFl6RVJNQThHQTFVRUF4TUlUWGxEUVMxMGJITXdXVEFUQmdjcWhrak9QUUlCCkJnZ3Foa2pPUFFNQkJ3TkNBQVFXYXc3M2FPV3dkMm1zMWxkQ0dBNEVpU212aHFlWTZzYi9RZWxQb0lZMVcwd3QKZ2RCUHFQQkVPN1lvRmdNandndmN1SjZjT3U4YWw0K0pVR0xFcW4wOW8xWXdWREFPQmdOVkhROEJBZjhFQkFNQwpBUVl3RWdZRFZSMFRBUUgvQkFnd0JnRUIvd0lCQVRBZEJnTlZIUTRFRmdRVUJhKzhpRUFFeEVHZXUzMzZEV0VLCmZ3ZmtBcFF3RHdZRFZSMFJCQWd3Qm9jRUNsNVRHVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBdXozcWs0NEgKMHgrUWNFWk9CVk9pd2pManVFYXZVUEFDZU5CWmVhVkVHM1VDSUZLMjM1bUlwQTF5Q09OTXF2bE40RzI2TnZuWApvUFk4TDJGeWY3aTg0bm9lCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K']
					}
				}
			};;
			const resp = await client.importOrderer(opts);
			expect(resp.status).toBe(200);
			expect(resp.result).toHaveProperty('id');
			expect(resp.result).toHaveProperty('display_name');
			expect(resp.result).toHaveProperty('api_url');
			expect(resp.result).toHaveProperty('operations_url');
			expect(resp.result).toHaveProperty('msp');
			expect(resp.result).toHaveProperty('timestamp');
			expect(resp.result.display_name).toBe('My Imported Orderer Node');
			imported_os_id = resp.result.id;
		});
	});

	// ---- Edit a Orderer ----- //
	test('should edit name of a fake Orderer', async () => {
		const opts = {
			id: imported_os_id,
			displayName: 'My Other Imported Orderer Node',
		};
		const resp = await client.editOrderer(opts);
		expect(resp.status).toBe(200);
		expect(resp.result).toHaveProperty('id');
		expect(resp.result).toHaveProperty('display_name');
		expect(resp.result).toHaveProperty('api_url');
		expect(resp.result).toHaveProperty('operations_url');
		expect(resp.result).toHaveProperty('msp');
		expect(resp.result).toHaveProperty('timestamp');
		expect(resp.result.display_name).toBe('My Other Imported Orderer Node');
	});
});
