/**
 * © Copyright IBM Corporation 2020.
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

import * as os from "os";
// tslint:disable-next-line:no-var-requires
const pkg = require(__dirname + '/../../package.json');

export type SdkHeaders = {
	'User-Agent': string;
	'X-IBMCloud-SDK-Analytics': string;
}

/**
 * Get the request headers to be sent in requests by the SDK.
 */
export function getSdkHeaders(serviceName: string, serviceVersion: string, operationId: string): SdkHeaders | {} {
	const sdkName = 'cloudant-node-sdk';
	const sdkVersion = pkg.version;
	const osName = os.platform();
	const osVersion = os.release();
	const nodeVersion = process.version;

	const headers = {
		'User-Agent': `${sdkName}-${sdkVersion} ${osName} ${osVersion} ${nodeVersion}`,
		'X-IBMCloud-SDK-Analytics': `service_name=${serviceName};service_version=${serviceVersion};operation_id=${operationId}`,
	};

	return headers;
}


// add camelCase clones of all snake case fields (applies to outer elements only)
export function fixCase(orig: any): any {
	if (typeof orig !== 'object') {
		return orig;
	} else {
		const ret: any = JSON.parse(JSON.stringify(orig));									// clone

		if (Array.isArray(orig)) {															// if its an array, return as is
			return orig;
		} else {
			for (let key in orig) {
				const parts = key.split('_');
				const formatted = [];														// ts won't let me overwrite parts
				for (let i in parts) {
					if (Number(i) === 0) {
						formatted.push(parts[i]);											// first word is already good
					} else {
						formatted.push(parts[i][0].toUpperCase() + parts[i].substring(1));	// convert first letter to uppercase
					}
				}

				if (formatted.length > 0) {
					const newKey = formatted.join('');
					ret[newKey] = orig[key];
				}
			}
		}
		return ret;
	}
}
