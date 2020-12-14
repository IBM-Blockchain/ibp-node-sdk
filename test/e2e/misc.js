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

//------------------------------------------------------------
// misc.js - Misc Library functions
//------------------------------------------------------------
module.exports = function () {
	const exports = {};
	const fs = require('fs');
	const url = require('url');
	const report_name = './test/real_responses.json';
	let report = {};

	// load the existing report if it already exists.
	// doing this b/c each test is a separate node process, but I want 1 report.
	// so each test suite will load the file and then append to the apis array.
	function read_report() {
		try {
			const existing_data = fs.readFileSync(report_name);
			if (existing_data) {
				return JSON.parse(existing_data);
			}
		} catch (e) {
			return exports.init_report();
		}
	}

	// ------------------------------------------
	// clear the report - only call this once in a test suite (need this else it will re-use last runs report)
	// ------------------------------------------
	exports.init_report = function () {
		report = {
			timestamp: Date.now(),
			version: 'v3',
			tag: '',
			apis: []
		};
		fs.writeFileSync(report_name, JSON.stringify(report, null, '\t'));
		return report;
	};

	// ------------------------------------------
	// record output of the api - dsh i'm using this report to check that the actual responses match our openapi yaml doc.
	// ------------------------------------------
	/*
		opts: {
			name: 'name of api',
			input: {},
			response: {
				status: '',
				statusText: '',
				headers: '',
				result: {}
			},
		}
	*/
	exports.record_api = function (opts) {
		if (opts && opts.response) {
			delete opts.response.headers;							// too noisy, remove
		}
		report = read_report();										// load existing report if applicable
		report.apis.push(opts);										// add the details of this api to the report

		if (opts && opts.name === 'getSettings') {
			if (opts.response && opts.response.result && opts.response.result.VERSIONS) {
				report.tag = opts.response.result.VERSIONS.tag;		// remember the build that generated this report
			}
		}

		fs.writeFileSync(report_name, JSON.stringify(report, null, '\t'));
	};

	// ------------------------------------------
	// break up url in proto, hostname, port, etc
	// ------------------------------------------
	exports.break_up_url = function (url_str) {
		if (url && typeof url_str === 'string' && !url_str.includes('://')) {	// if no protocol, assume https
			url_str = 'https://' + url_str;										// append https so we can parse it
		}

		const parts = typeof url_str === 'string' ? url.parse(url_str) : null;
		if (!parts || !parts.hostname) {
			console.error('cannot parse url_str:', url_str);
			return null;
		} else {
			const protocol = parts.protocol ? parts.protocol : 'https:';		// default protocol is https
			if (parts.port === null) {
				parts.port = protocol === 'https:' ? '443' : '80';				// match default ports to protocol
			}
			parts.port = Number(parts.port);
			return parts;
		}
	}

	// ------------------------------------------
	// format SDK error response like the success response
	// ------------------------------------------
	exports.format_error = function (e_obj) {
		try {
			return {
				"status": e_obj.status,
				"result": JSON.parse(e_obj.body)
			}
		} catch (e) {
			return null;
		}
	}

	return exports;
};
