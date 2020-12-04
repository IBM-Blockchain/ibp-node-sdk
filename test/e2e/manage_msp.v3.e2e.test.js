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
try{
	apikey = require('./davids_secrets.json').apikey
	siid_url = require('./davids_secrets.json').url
} catch (e) {}


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

let imported_msp_id = '';

describe('BlockchainV3', () => {
	describe('the newInstance method', () => {

		// ---- Import MSP ----- //
		test('should import a MSP', async () => {
			const opts = {
				mspId: 'org1',
				displayName: 'My First Org',
				rootCerts: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHVENDQWIrZ0F3SUJBZ0lVY1NLNjBlUE9CNGI1MUIzekZsSnkrYkUzbnlnd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRFd01Gb1hEVE0xTVRBeE1ERTBOVEV3TUZvd1lqRUxNQWtHQTFVRUJoTUMKVlZNeEZ6QVZCZ05WQkFnVERrNXZjblJvSUVOaGNtOXNhVzVoTVJRd0VnWURWUVFLRXd0SWVYQmxjbXhsWkdkbApjakVQTUEwR0ExVUVDeE1HUm1GaWNtbGpNUk13RVFZRFZRUURFd3B2Y21jeFkyRXhMV05oTUZrd0V3WUhLb1pJCnpqMENBUVlJS29aSXpqMERBUWNEUWdBRXpHRmZMdWV6SmxYdDlBa1A3VmNBb0RVeGJvVDBpYUxTTWl4bDRkVi8Kay9sUm5XUUpSdFVZdGk0cWxOQVFqd2JNTlRmWVc2TjQwWG1rdEkxMzRrKyt6cU5UTUZFd0RnWURWUjBQQVFILwpCQVFEQWdFR01BOEdBMVVkRXdFQi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZMbkRDWFNiZXFCc3plYy84Yi9FCmxFcG9hTVhITUE4R0ExVWRFUVFJTUFhSEJIOEFBQUV3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQU16T2pBelIKR1lKL3F3eVh5Wm5EVXo2eU53S2VtTFVkendISEwyTU9FZXZ2QWlCd3VMZEZ6VlhubzY0ZEJSMG43czBMdk1XbQo0bTdNRFBZQzJzQlg4K3hIRXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
				],
				admins: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUI0ekNDQVlxZ0F3SUJBZ0lVV0J3NHcxMXNVVm9oU0N6WGZ4dWxQVzFRTDFRd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRVd01Gb1hEVEl4TVRBeE16RTFNREF3TUZvd0lERU9NQXdHQTFVRUN4TUYKWVdSdGFXNHhEakFNQmdOVkJBTVRCV0ZrYldsdU1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRQo5bVZlM0ZzUlNsTjhKemhDVlhmUHdkci9yc0dyZnlSNzJjUjFGdVRPNnhqVE1TNko5M0hsdUZ2YXdrWUFMUk13CmJFNHZLYXpDVWE0bjkyeDNNVDc5eWFOZ01GNHdEZ1lEVlIwUEFRSC9CQVFEQWdlQU1Bd0dBMVVkRXdFQi93UUMKTUFBd0hRWURWUjBPQkJZRUZFY1lLUTcwU1cvVkZLM210d0M0R3JFUFUzUjlNQjhHQTFVZEl3UVlNQmFBRkxuRApDWFNiZXFCc3plYy84Yi9FbEVwb2FNWEhNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJRnZQWWhNNVNIMmEwSUpoClloem1lN1lrOWlSSDNDOStlNmMrbjkwcHE2bW5BaUJBQlJGSzlPUmJlc2hJb1QrOWxwbENUbVhWelJsenJDR1gKUVE4NS94Ykdudz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
				],
				tlsRootCerts: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNEVENDQWJTZ0F3SUJBZ0lVVGJwSVdaUlRCcFV3SVhqZW9xQzlKSk56T2NFd0NnWUlLb1pJemowRUF3SXcKWlRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4CkxYUnNjMk5oTUI0WERUSXdNVEF4TXpFME5URXdNRm9YRFRNMU1UQXhNREUwTlRFd01Gb3daVEVMTUFrR0ExVUUKQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRS0V3dEllWEJsY214bApaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4TFhSc2MyTmhNRmt3CkV3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFVS9LZTFMNTdxQlNycTcrK0d3eU5oTTR2eEc2WWtEUVoKNHFMR25yOTBYNTBJYjlOTUhyWVpXam5kNXpoZE5JTlJYZnowOTJDZkYvYlRGM3BuMnRvK3RxTkNNRUF3RGdZRApWUjBQQVFIL0JBUURBZ0VHTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME9CQllFRkRzY2lSL3Z1TGcyCmZzQ05jU0dQc1RoUTY5WEFNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJREd4MG5ZVmtRK2Y4T0RmL3lyQUdvSEkKSGhQbU42OUtCL3djRzM2RG5tRWxBaUI3dHczT3pYNldLVmFiSm9XelpRNExWNlJhRnJtMFpPVGhxWk5CbVVSdAo4Zz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
				]
			};
			const resp = await client.importMsp(opts);
			expect(resp.status).toBe(200);
			delete resp.result.timestamp;
			expect(resp.result).toMatchObject({
				admins: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUI0ekNDQVlxZ0F3SUJBZ0lVV0J3NHcxMXNVVm9oU0N6WGZ4dWxQVzFRTDFRd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRVd01Gb1hEVEl4TVRBeE16RTFNREF3TUZvd0lERU9NQXdHQTFVRUN4TUYKWVdSdGFXNHhEakFNQmdOVkJBTVRCV0ZrYldsdU1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRQo5bVZlM0ZzUlNsTjhKemhDVlhmUHdkci9yc0dyZnlSNzJjUjFGdVRPNnhqVE1TNko5M0hsdUZ2YXdrWUFMUk13CmJFNHZLYXpDVWE0bjkyeDNNVDc5eWFOZ01GNHdEZ1lEVlIwUEFRSC9CQVFEQWdlQU1Bd0dBMVVkRXdFQi93UUMKTUFBd0hRWURWUjBPQkJZRUZFY1lLUTcwU1cvVkZLM210d0M0R3JFUFUzUjlNQjhHQTFVZEl3UVlNQmFBRkxuRApDWFNiZXFCc3plYy84Yi9FbEVwb2FNWEhNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJRnZQWWhNNVNIMmEwSUpoClloem1lN1lrOWlSSDNDOStlNmMrbjkwcHE2bW5BaUJBQlJGSzlPUmJlc2hJb1QrOWxwbENUbVhWelJsenJDR1gKUVE4NS94Ykdudz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
				],
				display_name: 'My First Org',
				id: 'myfirstorg',
				location: '-',
				msp_id: 'org1',
				root_certs: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHVENDQWIrZ0F3SUJBZ0lVY1NLNjBlUE9CNGI1MUIzekZsSnkrYkUzbnlnd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRFd01Gb1hEVE0xTVRBeE1ERTBOVEV3TUZvd1lqRUxNQWtHQTFVRUJoTUMKVlZNeEZ6QVZCZ05WQkFnVERrNXZjblJvSUVOaGNtOXNhVzVoTVJRd0VnWURWUVFLRXd0SWVYQmxjbXhsWkdkbApjakVQTUEwR0ExVUVDeE1HUm1GaWNtbGpNUk13RVFZRFZRUURFd3B2Y21jeFkyRXhMV05oTUZrd0V3WUhLb1pJCnpqMENBUVlJS29aSXpqMERBUWNEUWdBRXpHRmZMdWV6SmxYdDlBa1A3VmNBb0RVeGJvVDBpYUxTTWl4bDRkVi8Kay9sUm5XUUpSdFVZdGk0cWxOQVFqd2JNTlRmWVc2TjQwWG1rdEkxMzRrKyt6cU5UTUZFd0RnWURWUjBQQVFILwpCQVFEQWdFR01BOEdBMVVkRXdFQi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZMbkRDWFNiZXFCc3plYy84Yi9FCmxFcG9hTVhITUE4R0ExVWRFUVFJTUFhSEJIOEFBQUV3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQU16T2pBelIKR1lKL3F3eVh5Wm5EVXo2eU53S2VtTFVkendISEwyTU9FZXZ2QWlCd3VMZEZ6VlhubzY0ZEJSMG43czBMdk1XbQo0bTdNRFBZQzJzQlg4K3hIRXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
				],
				scheme_version: 'v1',
				tags: ['msp'],
				//timestamp: 1606166972646,
				tls_root_certs: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNEVENDQWJTZ0F3SUJBZ0lVVGJwSVdaUlRCcFV3SVhqZW9xQzlKSk56T2NFd0NnWUlLb1pJemowRUF3SXcKWlRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4CkxYUnNjMk5oTUI0WERUSXdNVEF4TXpFME5URXdNRm9YRFRNMU1UQXhNREUwTlRFd01Gb3daVEVMTUFrR0ExVUUKQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRS0V3dEllWEJsY214bApaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4TFhSc2MyTmhNRmt3CkV3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFVS9LZTFMNTdxQlNycTcrK0d3eU5oTTR2eEc2WWtEUVoKNHFMR25yOTBYNTBJYjlOTUhyWVpXam5kNXpoZE5JTlJYZnowOTJDZkYvYlRGM3BuMnRvK3RxTkNNRUF3RGdZRApWUjBQQVFIL0JBUURBZ0VHTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME9CQllFRkRzY2lSL3Z1TGcyCmZzQ05jU0dQc1RoUTY5WEFNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJREd4MG5ZVmtRK2Y4T0RmL3lyQUdvSEkKSGhQbU42OUtCL3djRzM2RG5tRWxBaUI3dHczT3pYNldLVmFiSm9XelpRNExWNlJhRnJtMFpPVGhxWk5CbVVSdAo4Zz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
				],
				type: 'msp'
			});
			imported_msp_id = resp.result.id;
		});

		// ---- Edit MSP ----- //
		test('should edit an imported MSP', async () => {
			const opts = {
				id: imported_msp_id,
				displayName: 'My Other Org',
			};
			const resp = await client.editMsp(opts);
			expect(resp.status).toBe(200);
			delete resp.result.timestamp;
			delete resp.result.edited_timestamp;
			expect(resp.result).toMatchObject({
				admins: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUI0ekNDQVlxZ0F3SUJBZ0lVV0J3NHcxMXNVVm9oU0N6WGZ4dWxQVzFRTDFRd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRVd01Gb1hEVEl4TVRBeE16RTFNREF3TUZvd0lERU9NQXdHQTFVRUN4TUYKWVdSdGFXNHhEakFNQmdOVkJBTVRCV0ZrYldsdU1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRQo5bVZlM0ZzUlNsTjhKemhDVlhmUHdkci9yc0dyZnlSNzJjUjFGdVRPNnhqVE1TNko5M0hsdUZ2YXdrWUFMUk13CmJFNHZLYXpDVWE0bjkyeDNNVDc5eWFOZ01GNHdEZ1lEVlIwUEFRSC9CQVFEQWdlQU1Bd0dBMVVkRXdFQi93UUMKTUFBd0hRWURWUjBPQkJZRUZFY1lLUTcwU1cvVkZLM210d0M0R3JFUFUzUjlNQjhHQTFVZEl3UVlNQmFBRkxuRApDWFNiZXFCc3plYy84Yi9FbEVwb2FNWEhNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJRnZQWWhNNVNIMmEwSUpoClloem1lN1lrOWlSSDNDOStlNmMrbjkwcHE2bW5BaUJBQlJGSzlPUmJlc2hJb1QrOWxwbENUbVhWelJsenJDR1gKUVE4NS94Ykdudz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
				],
				display_name: 'My Other Org',
				//edited_timestamp: 1606167075878,
				id: imported_msp_id,
				location: '-',
				message: 'ok',
				msp_id: 'org1',
				root_certs: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHVENDQWIrZ0F3SUJBZ0lVY1NLNjBlUE9CNGI1MUIzekZsSnkrYkUzbnlnd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRFd01Gb1hEVE0xTVRBeE1ERTBOVEV3TUZvd1lqRUxNQWtHQTFVRUJoTUMKVlZNeEZ6QVZCZ05WQkFnVERrNXZjblJvSUVOaGNtOXNhVzVoTVJRd0VnWURWUVFLRXd0SWVYQmxjbXhsWkdkbApjakVQTUEwR0ExVUVDeE1HUm1GaWNtbGpNUk13RVFZRFZRUURFd3B2Y21jeFkyRXhMV05oTUZrd0V3WUhLb1pJCnpqMENBUVlJS29aSXpqMERBUWNEUWdBRXpHRmZMdWV6SmxYdDlBa1A3VmNBb0RVeGJvVDBpYUxTTWl4bDRkVi8Kay9sUm5XUUpSdFVZdGk0cWxOQVFqd2JNTlRmWVc2TjQwWG1rdEkxMzRrKyt6cU5UTUZFd0RnWURWUjBQQVFILwpCQVFEQWdFR01BOEdBMVVkRXdFQi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZMbkRDWFNiZXFCc3plYy84Yi9FCmxFcG9hTVhITUE4R0ExVWRFUVFJTUFhSEJIOEFBQUV3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQU16T2pBelIKR1lKL3F3eVh5Wm5EVXo2eU53S2VtTFVkendISEwyTU9FZXZ2QWlCd3VMZEZ6VlhubzY0ZEJSMG43czBMdk1XbQo0bTdNRFBZQzJzQlg4K3hIRXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
				],
				scheme_version: 'v1',
				tags: ['msp'],
				//timestamp: 1606167075010,
				tls_root_certs: [
					'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNEVENDQWJTZ0F3SUJBZ0lVVGJwSVdaUlRCcFV3SVhqZW9xQzlKSk56T2NFd0NnWUlLb1pJemowRUF3SXcKWlRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4CkxYUnNjMk5oTUI0WERUSXdNVEF4TXpFME5URXdNRm9YRFRNMU1UQXhNREUwTlRFd01Gb3daVEVMTUFrR0ExVUUKQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRS0V3dEllWEJsY214bApaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4TFhSc2MyTmhNRmt3CkV3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFVS9LZTFMNTdxQlNycTcrK0d3eU5oTTR2eEc2WWtEUVoKNHFMR25yOTBYNTBJYjlOTUhyWVpXam5kNXpoZE5JTlJYZnowOTJDZkYvYlRGM3BuMnRvK3RxTkNNRUF3RGdZRApWUjBQQVFIL0JBUURBZ0VHTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME9CQllFRkRzY2lSL3Z1TGcyCmZzQ05jU0dQc1RoUTY5WEFNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJREd4MG5ZVmtRK2Y4T0RmL3lyQUdvSEkKSGhQbU42OUtCL3djRzM2RG5tRWxBaUI3dHczT3pYNldLVmFiSm9XelpRNExWNlJhRnJtMFpPVGhxWk5CbVVSdAo4Zz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
				],
				type: 'msp'
			});
		});

		// ---- Get MSP ----- //
		test('should get imported MSP cert', async () => {
			const opts = {
				mspId: 'org1',
			};
			try {
				const resp = await client.getMspCertificate(opts);
				expect(resp.status).toBe(200);
				expect(resp.result).toMatchObject({
					msps: [
						{
							msp_id: 'org1',
							root_certs: [
								'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNHVENDQWIrZ0F3SUJBZ0lVY1NLNjBlUE9CNGI1MUIzekZsSnkrYkUzbnlnd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRFd01Gb1hEVE0xTVRBeE1ERTBOVEV3TUZvd1lqRUxNQWtHQTFVRUJoTUMKVlZNeEZ6QVZCZ05WQkFnVERrNXZjblJvSUVOaGNtOXNhVzVoTVJRd0VnWURWUVFLRXd0SWVYQmxjbXhsWkdkbApjakVQTUEwR0ExVUVDeE1HUm1GaWNtbGpNUk13RVFZRFZRUURFd3B2Y21jeFkyRXhMV05oTUZrd0V3WUhLb1pJCnpqMENBUVlJS29aSXpqMERBUWNEUWdBRXpHRmZMdWV6SmxYdDlBa1A3VmNBb0RVeGJvVDBpYUxTTWl4bDRkVi8Kay9sUm5XUUpSdFVZdGk0cWxOQVFqd2JNTlRmWVc2TjQwWG1rdEkxMzRrKyt6cU5UTUZFd0RnWURWUjBQQVFILwpCQVFEQWdFR01BOEdBMVVkRXdFQi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZMbkRDWFNiZXFCc3plYy84Yi9FCmxFcG9hTVhITUE4R0ExVWRFUVFJTUFhSEJIOEFBQUV3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQU16T2pBelIKR1lKL3F3eVh5Wm5EVXo2eU53S2VtTFVkendISEwyTU9FZXZ2QWlCd3VMZEZ6VlhubzY0ZEJSMG43czBMdk1XbQo0bTdNRFBZQzJzQlg4K3hIRXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
							],
							admins: [
								'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUI0ekNDQVlxZ0F3SUJBZ0lVV0J3NHcxMXNVVm9oU0N6WGZ4dWxQVzFRTDFRd0NnWUlLb1pJemowRUF3SXcKWWpFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJNd0VRWURWUVFERXdwdmNtY3hZMkV4CkxXTmhNQjRYRFRJd01UQXhNekUwTlRVd01Gb1hEVEl4TVRBeE16RTFNREF3TUZvd0lERU9NQXdHQTFVRUN4TUYKWVdSdGFXNHhEakFNQmdOVkJBTVRCV0ZrYldsdU1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRQo5bVZlM0ZzUlNsTjhKemhDVlhmUHdkci9yc0dyZnlSNzJjUjFGdVRPNnhqVE1TNko5M0hsdUZ2YXdrWUFMUk13CmJFNHZLYXpDVWE0bjkyeDNNVDc5eWFOZ01GNHdEZ1lEVlIwUEFRSC9CQVFEQWdlQU1Bd0dBMVVkRXdFQi93UUMKTUFBd0hRWURWUjBPQkJZRUZFY1lLUTcwU1cvVkZLM210d0M0R3JFUFUzUjlNQjhHQTFVZEl3UVlNQmFBRkxuRApDWFNiZXFCc3plYy84Yi9FbEVwb2FNWEhNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJRnZQWWhNNVNIMmEwSUpoClloem1lN1lrOWlSSDNDOStlNmMrbjkwcHE2bW5BaUJBQlJGSzlPUmJlc2hJb1QrOWxwbENUbVhWelJsenJDR1gKUVE4NS94Ykdudz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
							],
							tls_root_certs: [
								'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNEVENDQWJTZ0F3SUJBZ0lVVGJwSVdaUlRCcFV3SVhqZW9xQzlKSk56T2NFd0NnWUlLb1pJemowRUF3SXcKWlRFTE1Ba0dBMVVFQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRSwpFd3RJZVhCbGNteGxaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4CkxYUnNjMk5oTUI0WERUSXdNVEF4TXpFME5URXdNRm9YRFRNMU1UQXhNREUwTlRFd01Gb3daVEVMTUFrR0ExVUUKQmhNQ1ZWTXhGekFWQmdOVkJBZ1REazV2Y25Sb0lFTmhjbTlzYVc1aE1SUXdFZ1lEVlFRS0V3dEllWEJsY214bApaR2RsY2pFUE1BMEdBMVVFQ3hNR1JtRmljbWxqTVJZd0ZBWURWUVFERXcxdmNtY3hZMkV4TFhSc2MyTmhNRmt3CkV3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFVS9LZTFMNTdxQlNycTcrK0d3eU5oTTR2eEc2WWtEUVoKNHFMR25yOTBYNTBJYjlOTUhyWVpXam5kNXpoZE5JTlJYZnowOTJDZkYvYlRGM3BuMnRvK3RxTkNNRUF3RGdZRApWUjBQQVFIL0JBUURBZ0VHTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME9CQllFRkRzY2lSL3Z1TGcyCmZzQ05jU0dQc1RoUTY5WEFNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJREd4MG5ZVmtRK2Y4T0RmL3lyQUdvSEkKSGhQbU42OUtCL3djRzM2RG5tRWxBaUI3dHczT3pYNldLVmFiSm9XelpRNExWNlJhRnJtMFpPVGhxWk5CbVVSdAo4Zz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'
							]
						}
					]
				});
			} catch (e) {
				console.log('e', e);
				throw e;
			}
		});

		// ---- Remove MSP ----- //
		test('should remove an imported MSP', async () => {
			const opts = {
				id: imported_msp_id,
			};
			try {
				const resp = await client.removeComponent(opts);
				expect(resp.status).toBe(200);
				expect(resp.result).toMatchObject({
					"message": "deleted",
					"type": "msp",
					"id": imported_msp_id,
					"display_name": "My Other Org"
				});
			} catch (e) {
				console.log('e', e);
				throw e;
			}
		});
	});
});
