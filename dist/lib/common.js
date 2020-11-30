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
exports.fixCase = exports.getSdkHeaders = void 0;
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
// add camelCase clones of all snake case fields (applies to outer elements only)
function fixCase(orig) {
    if (typeof orig !== 'object') {
        return orig;
    }
    else {
        var ret = JSON.parse(JSON.stringify(orig)); // clone
        if (Array.isArray(orig)) { // if its an array, return as is
            return orig;
        }
        else {
            for (var key in orig) {
                var parts = key.split('_');
                var formatted = []; // ts won't let me overwrite parts
                for (var i in parts) {
                    if (Number(i) === 0) {
                        formatted.push(parts[i]); // first word is already good
                    }
                    else {
                        formatted.push(parts[i][0].toUpperCase() + parts[i].substring(1)); // convert first letter to uppercase
                    }
                }
                if (formatted.length > 0) {
                    var newKey = formatted.join('');
                    ret[newKey] = orig[key];
                }
            }
        }
        return ret;
    }
}
exports.fixCase = fixCase;
