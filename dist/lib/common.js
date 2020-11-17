"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdkHeaders = void 0;
var os = require("os");
// tslint:disable-next-line:no-var-requires
var pkg = require(__dirname + '/../../package.json');
/**
 * Get the request headers to be sent in requests by the SDK.
 */
function getSdkHeaders(serviceName, serviceVersion, operationId) {
    var sdkName = 'cloudant-node-sdk';
    var sdkVersion = pkg.version;
    var osName = os.platform();
    var osVersion = os.release();
    var nodeVersion = process.version;
    var headers = {
        'User-Agent': sdkName + "-" + sdkVersion + " " + osName + " " + osVersion + " " + nodeVersion,
        'X-IBMCloud-SDK-Analytics': "service_name=" + serviceName + ";service_version=" + serviceVersion + ";operation_id=" + operationId,
    };
    return headers;
}
exports.getSdkHeaders = getSdkHeaders;
