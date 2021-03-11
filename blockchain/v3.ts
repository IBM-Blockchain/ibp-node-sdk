/**
 * (C) Copyright IBM Corp. 2021.
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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.22.0-937b9a1c-20201211-223043
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * This doc lists APIs that you can use to interact with your IBM Blockchain Platform console (IBP console)
 */

class BlockchainV3 extends BaseService {

	static DEFAULT_SERVICE_NAME: string = 'blockchain';

	/*************************
	 * Factory method
	 ************************/

	/**
	 * Constructs an instance of BlockchainV3 with passed in options and external configuration.
	 *
	 * @param {UserOptions} [options] - The parameters to send to the service.
	 * @param {string} [options.serviceName] - The name of the service to configure
	 * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
	 * @param {string} [options.serviceUrl] - The URL for the service
	 * @returns {BlockchainV3}
	 */

	public static newInstance(options: UserOptions): BlockchainV3 {
		options = options || {};

		if (!options.serviceName) {
			options.serviceName = this.DEFAULT_SERVICE_NAME;
		}
		if (!options.authenticator) {
			options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
		}
		const service = new BlockchainV3(options);
		service.configureService(options.serviceName);
		if (options.serviceUrl) {
			service.setServiceUrl(options.serviceUrl);
		}
		return service;
	}


	/**
	 * Construct a BlockchainV3 object.
	 *
	 * @param {Object} options - Options for the service.
	 * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
	 * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
	 * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
	 * @constructor
	 * @returns {BlockchainV3}
	 */
	constructor(options: UserOptions) {
		options = options || {};

		super(options);
		if (options.serviceUrl) {
			this.setServiceUrl(options.serviceUrl);
		}
	}

	/*************************
	 * manageComponent
	 ************************/

	/**
	 * Get component data.
	 *
	 * Get the IBP console's data on a component (peer, CA, orderer, or MSP). The component might be imported or created.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to retrieve. Use the [Get all components](#list_components)
	 * API to determine the component id.
	 * @param {string} [params.deploymentAttrs] - Set to 'included' if the response should include Kubernetes deployment
	 * attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include
	 * these fields.
	 *
	 * **This parameter will not work on *imported* components.**
	 *
	 * It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
	 * @param {string} [params.parsedCerts] - Set to 'included' if the response should include parsed PEM data along with
	 * base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer,
	 * expiration, subject, subject alt names, etc. Default responses will not include these fields.
	 * @param {string} [params.cache] - Set to 'skip' if the response should skip local data and fetch live data wherever
	 * possible. Expect longer response times if the cache is skipped. Default responses will use the cache.
	 * @param {string} [params.caAttrs] - Set to 'included' if the response should fetch CA attributes, inspect
	 * certificates, and append extra fields to CA and MSP component responses.
	 * - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA, such
	 * as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field
	 * `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a
	 * signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not
	 * include these fields.
	 * - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console CA
	 * that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert.
	 * Only imported/created CAs are checked. Default responses will not include these fields.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GenericComponentResponse>>}
	 */
	public getComponent(params: BlockchainV3.GetComponentParams): Promise<BlockchainV3.Response<BlockchainV3.GenericComponentResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const query = {
			'deployment_attrs': _params.deploymentAttrs,
			'parsed_certs': _params.parsedCerts,
			'cache': _params.cache,
			'ca_attrs': _params.caAttrs
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getComponent');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/{id}',
				method: 'GET',
				qs: query,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Remove imported component.
	 *
	 * Remove a single component from the IBP console.
	 * - Using this api on an **imported** component removes it from the IBP console.
	 * - Using this api on a **created** component removes it from the IBP console **but** it will **not** delete the
	 * component from the Kubernetes cluster where it resides. Thus it orphans the Kubernetes deployment (if it exists).
	 * Instead use the [Delete component](#delete-component) API to delete the Kubernetes deployment and the IBP console
	 * data at once.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the imported component to remove. Use the [Get all
	 * components](#list-components) API to determine the component id.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteComponentResponse>>}
	 */
	public removeComponent(params: BlockchainV3.RemoveComponentParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteComponentResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'removeComponent');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/{id}',
				method: 'DELETE',
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Delete component.
	 *
	 * Removes a single component from the IBP console **and** it deletes the Kubernetes deployment.
	 * - Using this api on an **imported** component will *error out* since its Kubernetes deployment is unknown and
	 * cannot be removed. Instead use the [Remove imported component](#remove-component) API to remove imported
	 * components.
	 * - Using this api on a **created** component removes it from the IBP console **and** it will delete the component
	 * from the Kubernetes cluster where it resides. The Kubernetes delete must succeed before the component will be
	 * removed from the IBP console.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to delete. Use the [Get all components](#list_components) API
	 * to determine the id of the component to be deleted.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteComponentResponse>>}
	 */
	public deleteComponent(params: BlockchainV3.DeleteComponentParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteComponentResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteComponent');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/{id}',
				method: 'DELETE',
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Create a CA.
	 *
	 * Create a Hyperledger Fabric Certificate Authority (CA) in your Kubernetes cluster.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.displayName - A descriptive name for this CA. The IBP console tile displays this name.
	 * @param {CreateCaBodyConfigOverride} params.configOverride - Set `config_override` to create the root/initial enroll
	 * id and enroll secret as well as enabling custom CA configurations (such as using postgres). See the [Fabric CA
	 * configuration file](https://hyperledger-fabric-ca.readthedocs.io/en/release-1.4/serverconfig.html) for more
	 * information about each parameter.
	 *
	 * The field `tlsca` is optional. The IBP console will copy the value of `config_override.ca` into
	 * `config_override.tlsca` if `config_override.tlsca` is omitted (which is recommended).
	 *
	 * *The nested field **names** below are not case-sensitive.*.
	 * @param {string} [params.id] - The unique identifier of this component. Must start with a letter, be lowercase and
	 * only contain letters and numbers. If `id` is not provide a component id will be generated using the field
	 * `display_name` as the base.
	 * @param {CreateCaBodyResources} [params.resources] - CPU and memory properties. This feature is not available if
	 * using a free Kubernetes cluster.
	 * @param {CreateCaBodyStorage} [params.storage] - Disk space properties. This feature is not available if using a
	 * free Kubernetes cluster.
	 * @param {string} [params.zone] - Specify the Kubernetes zone for the deployment. The deployment will use a k8s node
	 * in this zone. Find the list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes
	 * --show-labels`. [More information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {number} [params.replicas] - The number of replica pods running at any given time.
	 * @param {string[]} [params.tags] -
	 * @param {Hsm} [params.hsm] - The connection details of the HSM (Hardware Security Module).
	 * @param {string} [params.region] - Specify the Kubernetes region for the deployment. The deployment will use a k8s
	 * node in this region. Find the list of possible regions by retrieving your Kubernetes node labels: `kubectl get
	 * nodes --show-labels`. [More info](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {string} [params.version] - The Hyperledger Fabric release version to use.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.CaResponse>>}
	 */
	public createCa(params: BlockchainV3.CreateCaParams): Promise<BlockchainV3.Response<BlockchainV3.CaResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['displayName', 'configOverride'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'display_name': _params.displayName,
			'config_override': _params.configOverride,
			'id': _params.id,
			'resources': _params.resources,
			'storage': _params.storage,
			'zone': _params.zone,
			'replicas': _params.replicas,
			'tags': _params.tags,
			'hsm': _params.hsm,
			'region': _params.region,
			'version': _params.version
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'createCa');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-ca',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Import a CA.
	 *
	 * Import an existing Certificate Authority (CA) to your IBP console. It is recommended to only import components that
	 * were created by this or another IBP console.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.displayName - A descriptive name for this component.
	 * @param {string} params.apiUrl - The URL for the CA. Typically, client applications would send requests to this URL.
	 * Include the protocol, hostname/ip and port.
	 * @param {ImportCaBodyMsp} params.msp -
	 * @param {string} [params.id] - The unique identifier of this component. Must start with a letter, be lowercase and
	 * only contain letters and numbers. If `id` is not provide a component id will be generated using the field
	 * `display_name` as the base.
	 * @param {string} [params.location] - Indicates where the component is running.
	 * @param {string} [params.operationsUrl] - The operations URL for the CA. Include the protocol, hostname/ip and port.
	 * @param {string[]} [params.tags] -
	 * @param {string} [params.tlsCert] - The TLS certificate as base 64 encoded PEM. Certificate is used to
	 * secure/validate a TLS connection with this component.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.CaResponse>>}
	 */
	public importCa(params: BlockchainV3.ImportCaParams): Promise<BlockchainV3.Response<BlockchainV3.CaResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['displayName', 'apiUrl', 'msp'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'display_name': _params.displayName,
			'api_url': _params.apiUrl,
			'msp': _params.msp,
			'id': _params.id,
			'location': _params.location,
			'operations_url': _params.operationsUrl,
			'tags': _params.tags,
			'tls_cert': _params.tlsCert
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importCa');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/fabric-ca',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Update a CA.
	 *
	 * Update Kubernetes deployment attributes of a Hyperledger Fabric Certificate Authority (CA) in your cluster.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {UpdateCaBodyConfigOverride} [params.configOverride] - Update the [Fabric CA configuration
	 * file](https://hyperledger-fabric-ca.readthedocs.io/en/release-1.4/serverconfig.html) if you want use custom
	 * attributes to configure advanced CA features. Omit if not.
	 *
	 * *The nested field **names** below are not case-sensitive.*
	 * *The nested fields sent will be merged with the existing settings.*.
	 * @param {number} [params.replicas] - The number of replica pods running at any given time.
	 * @param {UpdateCaBodyResources} [params.resources] - CPU and memory properties. This feature is not available if
	 * using a free Kubernetes cluster.
	 * @param {string} [params.version] - The Hyperledger Fabric release version to update to.
	 * @param {string} [params.zone] - Specify the Kubernetes zone for the deployment. The deployment will use a k8s node
	 * in this zone. Find the list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes
	 * --show-labels`. [More information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.CaResponse>>}
	 */
	public updateCa(params: BlockchainV3.UpdateCaParams): Promise<BlockchainV3.Response<BlockchainV3.CaResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'config_override': _params.configOverride,
			'replicas': _params.replicas,
			'resources': _params.resources,
			'version': _params.version,
			'zone': _params.zone
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'updateCa');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-ca/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Edit data about a CA.
	 *
	 * Modify local metadata fields of a Certificate Authority (CA). For example, the "display_name" field. This API will
	 * **not** change any Kubernetes deployment attributes for the CA.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string} [params.displayName] - A descriptive name for this CA. The IBP console tile displays this name.
	 * @param {string} [params.apiUrl] - The URL for the CA. Typically, client applications would send requests to this
	 * URL. Include the protocol, hostname/ip and port.
	 * @param {string} [params.operationsUrl] - The operations URL for the CA. Include the protocol, hostname/ip and port.
	 * @param {string} [params.caName] - The CA's "CAName" attribute. This name is used to distinguish this CA from the
	 * TLS CA.
	 * @param {string} [params.location] - Indicates where the component is running.
	 * @param {string[]} [params.tags] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.CaResponse>>}
	 */
	public editCa(params: BlockchainV3.EditCaParams): Promise<BlockchainV3.Response<BlockchainV3.CaResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'display_name': _params.displayName,
			'api_url': _params.apiUrl,
			'operations_url': _params.operationsUrl,
			'ca_name': _params.caName,
			'location': _params.location,
			'tags': _params.tags
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editCa');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/fabric-ca/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Submit action to a CA.
	 *
	 * Submit an action to a Fabric CA component. Actions such as restarting the component or certificate operations.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {boolean} [params.restart] - Set to `true` to restart the component.
	 * @param {ActionRenew} [params.renew] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.ActionsResponse>>}
	 */
	public caAction(params: BlockchainV3.CaActionParams): Promise<BlockchainV3.Response<BlockchainV3.ActionsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'restart': _params.restart,
			'renew': _params.renew
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'caAction');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-ca/{id}/actions',
				method: 'POST',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Create a peer.
	 *
	 * Create a Hyperledger Fabric peer in your Kubernetes cluster.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.mspId - The MSP id that is related to this component.
	 * @param {string} params.displayName - A descriptive name for this peer. The IBP console tile displays this name.
	 * @param {CryptoObject} params.crypto - See this
	 * [topic](/docs/blockchain?topic=blockchain-ibp-v2-apis#ibp-v2-apis-config) for instructions on how to build a crypto
	 * object.
	 * @param {string} [params.id] - The unique identifier of this component. Must start with a letter, be lowercase and
	 * only contain letters and numbers. If `id` is not provide a component id will be generated using the field
	 * `display_name` as the base.
	 * @param {ConfigPeerCreate} [params.configOverride] - Override the [Fabric Peer configuration
	 * file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom
	 * attributes to configure the Peer. Omit if not.
	 *
	 * *The nested field **names** below are not case-sensitive.*.
	 * @param {PeerResources} [params.resources] - CPU and memory properties. This feature is not available if using a
	 * free Kubernetes cluster.
	 * @param {CreatePeerBodyStorage} [params.storage] - Disk space properties. This feature is not available if using a
	 * free Kubernetes cluster.
	 * @param {string} [params.zone] - Specify the Kubernetes zone for the deployment. The deployment will use a k8s node
	 * in this zone. Find the list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes
	 * --show-labels`. [More information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {string} [params.stateDb] - Select the state database for the peer. Can be either "couchdb" or "leveldb".
	 * The default is "couchdb".
	 * @param {string[]} [params.tags] -
	 * @param {Hsm} [params.hsm] - The connection details of the HSM (Hardware Security Module).
	 * @param {string} [params.region] - Specify the Kubernetes region for the deployment. The deployment will use a k8s
	 * node in this region. Find the list of possible regions by retrieving your Kubernetes node labels: `kubectl get
	 * nodes --show-labels`. [More info](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {string} [params.version] - The Hyperledger Fabric release version to use.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>>}
	 */
	public createPeer(params: BlockchainV3.CreatePeerParams): Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['mspId', 'displayName', 'crypto'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'msp_id': _params.mspId,
			'display_name': _params.displayName,
			'crypto': _params.crypto,
			'id': _params.id,
			'config_override': _params.configOverride,
			'resources': _params.resources,
			'storage': _params.storage,
			'zone': _params.zone,
			'state_db': _params.stateDb,
			'tags': _params.tags,
			'hsm': _params.hsm,
			'region': _params.region,
			'version': _params.version
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'createPeer');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-peer',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Import a peer.
	 *
	 * Import an existing peer into your IBP console. It is recommended to only import components that were created by
	 * this or another IBP console.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.displayName - A descriptive name for this peer. The IBP console tile displays this name.
	 * @param {string} params.grpcwpUrl - The gRPC web proxy URL in front of the peer. Include the protocol, hostname/ip
	 * and port.
	 * @param {MspCryptoField} params.msp - The msp crypto data.
	 * @param {string} params.mspId - The MSP id that is related to this component.
	 * @param {string} [params.id] - The unique identifier of this component. Must start with a letter, be lowercase and
	 * only contain letters and numbers. If `id` is not provide a component id will be generated using the field
	 * `display_name` as the base.
	 * @param {string} [params.apiUrl] - The gRPC URL for the peer. Typically, client applications would send requests to
	 * this URL. Include the protocol, hostname/ip and port.
	 * @param {string} [params.location] - Indicates where the component is running.
	 * @param {string} [params.operationsUrl] - Used by Fabric health checker to monitor the health status of this peer.
	 * For more information, see [Fabric
	 * documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
	 * protocol, hostname/ip and port.
	 * @param {string[]} [params.tags] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>>}
	 */
	public importPeer(params: BlockchainV3.ImportPeerParams): Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['displayName', 'grpcwpUrl', 'msp', 'mspId'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'display_name': _params.displayName,
			'grpcwp_url': _params.grpcwpUrl,
			'msp': _params.msp,
			'msp_id': _params.mspId,
			'id': _params.id,
			'api_url': _params.apiUrl,
			'location': _params.location,
			'operations_url': _params.operationsUrl,
			'tags': _params.tags
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importPeer');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/fabric-peer',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Edit data about a peer.
	 *
	 * Modify local metadata fields of a peer. For example, the "display_name" field. This API will **not** change any
	 * Kubernetes deployment attributes for the peer.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string} [params.displayName] - A descriptive name for this peer. The IBP console tile displays this name.
	 * @param {string} [params.apiUrl] - The gRPC URL for the peer. Typically, client applications would send requests to
	 * this URL. Include the protocol, hostname/ip and port.
	 * @param {string} [params.operationsUrl] - Used by Fabric health checker to monitor the health status of this peer.
	 * For more information, see [Fabric
	 * documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
	 * protocol, hostname/ip and port.
	 * @param {string} [params.grpcwpUrl] - The gRPC web proxy URL in front of the peer. Include the protocol, hostname/ip
	 * and port.
	 * @param {string} [params.mspId] - The MSP id that is related to this component.
	 * @param {string} [params.location] - Indicates where the component is running.
	 * @param {string[]} [params.tags] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>>}
	 */
	public editPeer(params: BlockchainV3.EditPeerParams): Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'display_name': _params.displayName,
			'api_url': _params.apiUrl,
			'operations_url': _params.operationsUrl,
			'grpcwp_url': _params.grpcwpUrl,
			'msp_id': _params.mspId,
			'location': _params.location,
			'tags': _params.tags
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editPeer');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/fabric-peer/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Submit action to a peer.
	 *
	 * Submit an action to a Fabric Peer component. Actions such as restarting the component or certificate operations.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {boolean} [params.restart] - Set to `true` to restart the component.
	 * @param {ActionReenroll} [params.reenroll] -
	 * @param {ActionEnroll} [params.enroll] -
	 * @param {boolean} [params.upgradeDbs] - Set to `true` to start the peer's db migration.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.ActionsResponse>>}
	 */
	public peerAction(params: BlockchainV3.PeerActionParams): Promise<BlockchainV3.Response<BlockchainV3.ActionsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'restart': _params.restart,
			'reenroll': _params.reenroll,
			'enroll': _params.enroll,
			'upgrade_dbs': _params.upgradeDbs
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'peerAction');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-peer/{id}/actions',
				method: 'POST',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Update a peer.
	 *
	 * Update Kubernetes deployment attributes of a Hyperledger Fabric Peer node.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string[]} [params.adminCerts] - An array that contains *all* the base 64 encoded PEM identity certificates
	 * for administrators of this component. Also known as signing certificates of an organization administrator.
	 * @param {ConfigPeerUpdate} [params.configOverride] - Update the [Fabric Peer configuration
	 * file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom
	 * attributes to configure the Peer. Omit if not.
	 *
	 * *The nested field **names** below are not case-sensitive.*
	 * *The nested fields sent will be merged with the existing settings.*.
	 * @param {UpdatePeerBodyCrypto} [params.crypto] -
	 * @param {NodeOu} [params.nodeOu] -
	 * @param {number} [params.replicas] - The number of replica pods running at any given time.
	 * @param {PeerResources} [params.resources] - CPU and memory properties. This feature is not available if using a
	 * free Kubernetes cluster.
	 * @param {string} [params.version] - The Hyperledger Fabric release version to update to.
	 * @param {string} [params.zone] - Specify the Kubernetes zone for the deployment. The deployment will use a k8s node
	 * in this zone. Find the list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes
	 * --show-labels`. [More information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>>}
	 */
	public updatePeer(params: BlockchainV3.UpdatePeerParams): Promise<BlockchainV3.Response<BlockchainV3.PeerResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'admin_certs': _params.adminCerts,
			'config_override': _params.configOverride,
			'crypto': _params.crypto,
			'node_ou': _params.nodeOu,
			'replicas': _params.replicas,
			'resources': _params.resources,
			'version': _params.version,
			'zone': _params.zone
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'updatePeer');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-peer/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Create an ordering service.
	 *
	 * Create a Hyperledger Ordering Service (OS) in your Kubernetes cluster. Currently, only raft ordering nodes are
	 * supported.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.ordererType - The type of Fabric orderer. Currently, only the type `"raft"` is supported.
	 * [etcd/raft](/docs/blockchain?topic=blockchain-ibp-console-build-network#ibp-console-build-network-ordering-console).
	 * @param {string} params.mspId - The MSP id that is related to this component.
	 * @param {string} params.displayName - A descriptive base name for each ordering node. One or more child IBP console
	 * tiles display this name.
	 * @param {CryptoObject[]} params.crypto - An array of config objects. When creating a new OS (Ordering Service) the
	 * array must have one object per desired raft node. 1 or 5 nodes are recommended.
	 *
	 * **When appending to an existing OS only an array of size 1 is supported.**
	 *
	 * See this [topic](/docs/blockchain?topic=blockchain-ibp-v2-apis#ibp-v2-apis-config) for instructions on how to build
	 * a config object.
	 * @param {string} [params.clusterName] - A descriptive name for an ordering service. The parent IBP console tile
	 * displays this name.
	 *
	 * This field should only be set if you are creating a new OS cluster or when appending to an unknown (external) OS
	 * cluster. An unknown/external cluster is one that this IBP console has not imported or created.
	 * @param {string} [params.id] - The unique identifier of this component. Must start with a letter, be lowercase and
	 * only contain letters and numbers. If `id` is not provide a component id will be generated using the field
	 * `display_name` as the base.
	 * @param {string} [params.clusterId] - This field should only be set if you are appending a new raft node to an
	 * **existing** raft cluster. When appending to a known (internal) OS cluster set `cluster_id` to the same value used
	 * by the OS cluster. When appending to an unknown (external) OS cluster set `cluster_id` to a unique string.
	 *
	 * Setting this field means the `config` array should be of length 1, since it is not possible to add multiple raft
	 * nodes at the same time in Fabric.
	 *
	 * If this field is set the orderer will be "pre-created" and start without a genesis block. It is effectively dead
	 * until it is configured. This is the first step to **append** a node to a raft cluster. The next step is to add this
	 * node as a consenter to the system-channel by using Fabric-APIs. Then, init this node by sending the updated
	 * system-channel config-block with the [Submit config block to orderer](#submit-block) API. The node will not be
	 * usable until these steps are completed.
	 * @param {boolean} [params.externalAppend] - Set to `true` only if you are appending to an unknown (external) OS
	 * cluster. Else set it to `false` or omit the field. An unknown/external cluster is one that this IBP console has not
	 * imported or created.
	 * @param {ConfigOrdererCreate[]} [params.configOverride] - An array of configuration override objects. 1 object per
	 * component. Must be the same size as the `config` array.
	 * @param {CreateOrdererRaftBodyResources} [params.resources] - CPU and memory properties. This feature is not
	 * available if using a free Kubernetes cluster.
	 * @param {CreateOrdererRaftBodyStorage} [params.storage] - Disk space properties. This feature is not available if
	 * using a free Kubernetes cluster.
	 * @param {string} [params.systemChannelId] - The name of the system channel. Defaults to `testchainid`.
	 * @param {string[]} [params.zone] - An array of Kubernetes zones for the deployment. 1 zone per component. Must be
	 * the same size as the `config` array.
	 * @param {string[]} [params.tags] -
	 * @param {string[]} [params.region] - An array of Kubernetes regions for the deployment. One region per component.
	 * Must be the same size as the `config` array.
	 * @param {Hsm} [params.hsm] - The connection details of the HSM (Hardware Security Module).
	 * @param {string} [params.version] - The Hyperledger Fabric release version to use.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.CreateOrdererResponse>>}
	 */
	public createOrderer(params: BlockchainV3.CreateOrdererParams): Promise<BlockchainV3.Response<BlockchainV3.CreateOrdererResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['ordererType', 'mspId', 'displayName', 'crypto'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'orderer_type': _params.ordererType,
			'msp_id': _params.mspId,
			'display_name': _params.displayName,
			'crypto': _params.crypto,
			'cluster_name': _params.clusterName,
			'id': _params.id,
			'cluster_id': _params.clusterId,
			'external_append': _params.externalAppend,
			'config_override': _params.configOverride,
			'resources': _params.resources,
			'storage': _params.storage,
			'system_channel_id': _params.systemChannelId,
			'zone': _params.zone,
			'tags': _params.tags,
			'region': _params.region,
			'hsm': _params.hsm,
			'version': _params.version
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'createOrderer');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-orderer',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Import an ordering service.
	 *
	 * Import an existing Ordering Service (OS) to your IBP console. It is recommended to only import components that were
	 * created by this or another IBP console.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.clusterName - A descriptive name for the ordering service. The parent IBP console orderer
	 * tile displays this name.
	 * @param {string} params.displayName - A descriptive base name for each ordering node. One or more child IBP console
	 * tiles display this name.
	 * @param {string} params.grpcwpUrl - The gRPC web proxy URL in front of the orderer. Include the protocol,
	 * hostname/ip and port.
	 * @param {MspCryptoField} params.msp - The msp crypto data.
	 * @param {string} params.mspId - The MSP id that is related to this component.
	 * @param {string} [params.apiUrl] - The gRPC URL for the orderer. Typically, client applications would send requests
	 * to this URL. Include the protocol, hostname/ip and port.
	 * @param {string} [params.clusterId] - A unique id to identify this ordering service cluster.
	 * @param {string} [params.id] - The unique identifier of this component. Must start with a letter, be lowercase and
	 * only contain letters and numbers. If `id` is not provide a component id will be generated using the field
	 * `display_name` as the base.
	 * @param {string} [params.location] - Indicates where the component is running.
	 * @param {string} [params.operationsUrl] - Used by Fabric health checker to monitor the health status of this orderer
	 * node. For more information, see [Fabric
	 * documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
	 * protocol, hostname/ip and port.
	 * @param {string} [params.systemChannelId] - The name of the system channel. Defaults to `testchainid`.
	 * @param {string[]} [params.tags] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>>}
	 */
	public importOrderer(params: BlockchainV3.ImportOrdererParams): Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['clusterName', 'displayName', 'grpcwpUrl', 'msp', 'mspId'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'cluster_name': _params.clusterName,
			'display_name': _params.displayName,
			'grpcwp_url': _params.grpcwpUrl,
			'msp': _params.msp,
			'msp_id': _params.mspId,
			'api_url': _params.apiUrl,
			'cluster_id': _params.clusterId,
			'id': _params.id,
			'location': _params.location,
			'operations_url': _params.operationsUrl,
			'system_channel_id': _params.systemChannelId,
			'tags': _params.tags
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importOrderer');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/fabric-orderer',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Edit data about an orderer.
	 *
	 * Modify local metadata fields of a single node in an Ordering Service (OS). For example, the "display_name" field.
	 * This API will **not** change any Kubernetes deployment attributes for the node.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string} [params.clusterName] - A descriptive name for the ordering service. The parent IBP console orderer
	 * tile displays this name.
	 * @param {string} [params.displayName] - A descriptive base name for each ordering node. One or more child IBP
	 * console tiles display this name.
	 * @param {string} [params.apiUrl] - The gRPC URL for the orderer. Typically, client applications would send requests
	 * to this URL. Include the protocol, hostname/ip and port.
	 * @param {string} [params.operationsUrl] - Used by Fabric health checker to monitor the health status of this orderer
	 * node. For more information, see [Fabric
	 * documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
	 * protocol, hostname/ip and port.
	 * @param {string} [params.grpcwpUrl] - The gRPC web proxy URL in front of the orderer. Include the protocol,
	 * hostname/ip and port.
	 * @param {string} [params.mspId] - The MSP id that is related to this component.
	 * @param {boolean} [params.consenterProposalFin] - The state of a pre-created orderer node. A value of `true` means
	 * that the orderer node was added as a system channel consenter. This is a manual field. Set it yourself after
	 * finishing the raft append flow to indicate that this node is ready for use. See the [Submit config block to
	 * orderer](#submit-block) API description for more details about appending raft nodes.
	 * @param {string} [params.location] - Indicates where the component is running.
	 * @param {string} [params.systemChannelId] - The name of the system channel. Defaults to `testchainid`.
	 * @param {string[]} [params.tags] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>>}
	 */
	public editOrderer(params: BlockchainV3.EditOrdererParams): Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'cluster_name': _params.clusterName,
			'display_name': _params.displayName,
			'api_url': _params.apiUrl,
			'operations_url': _params.operationsUrl,
			'grpcwp_url': _params.grpcwpUrl,
			'msp_id': _params.mspId,
			'consenter_proposal_fin': _params.consenterProposalFin,
			'location': _params.location,
			'system_channel_id': _params.systemChannelId,
			'tags': _params.tags
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editOrderer');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/fabric-orderer/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Submit action to an orderer.
	 *
	 * Submit an action to a Fabric Orderer component. Actions such as restarting the component or certificate operations.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {boolean} [params.restart] - Set to `true` to restart the component.
	 * @param {ActionReenroll} [params.reenroll] -
	 * @param {ActionEnroll} [params.enroll] -
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.ActionsResponse>>}
	 */
	public ordererAction(params: BlockchainV3.OrdererActionParams): Promise<BlockchainV3.Response<BlockchainV3.ActionsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'restart': _params.restart,
			'reenroll': _params.reenroll,
			'enroll': _params.enroll
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'ordererAction');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-orderer/{id}/actions',
				method: 'POST',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Update an orderer node.
	 *
	 * Update Kubernetes deployment attributes of a Hyperledger Fabric Ordering node.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string[]} [params.adminCerts] - An array that contains *all* the base 64 encoded PEM identity certificates
	 * for administrators of this component. Also known as signing certificates of an organization administrator.
	 * @param {ConfigOrdererUpdate} [params.configOverride] - Update the [Fabric Orderer configuration
	 * file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/orderer.yaml) if you want use custom
	 * attributes to configure the Orderer. Omit if not.
	 *
	 * *The nested field **names** below are not case-sensitive.*
	 * *The nested fields sent will be merged with the existing settings.*.
	 * @param {UpdateOrdererBodyCrypto} [params.crypto] -
	 * @param {NodeOu} [params.nodeOu] -
	 * @param {number} [params.replicas] - The number of replica pods running at any given time.
	 * @param {UpdateOrdererBodyResources} [params.resources] - CPU and memory properties. This feature is not available
	 * if using a free Kubernetes cluster.
	 * @param {string} [params.version] - The Hyperledger Fabric release version to update to.
	 * @param {string} [params.zone] - Specify the Kubernetes zone for the deployment. The deployment will use a k8s node
	 * in this zone. Find the list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes
	 * --show-labels`. [More information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>>}
	 */
	public updateOrderer(params: BlockchainV3.UpdateOrdererParams): Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'admin_certs': _params.adminCerts,
			'config_override': _params.configOverride,
			'crypto': _params.crypto,
			'node_ou': _params.nodeOu,
			'replicas': _params.replicas,
			'resources': _params.resources,
			'version': _params.version,
			'zone': _params.zone
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'updateOrderer');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/fabric-orderer/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Submit config block to orderer.
	 *
	 * Send a config block (or genesis block) to a pre-created raft orderer node. Use this api to finish the raft-append
	 * flow and finalize a pre-created orderer. This is the final step to append a node to a raft cluster. The orderer
	 * will restart, load this block, and connect to the other orderers listed in said block.
	 *
	 * The full flow to append a raft node:
	 *   1. Pre-create the orderer with the [Create an ordering service](#create-orderer) API (setting `cluster_id` is how
	 * you turn the normal create-orderer api into a pre-create-orderer api).
	 *   2. Retrieve the pre-created node's tls cert with the [Get component data](#get-component) API (set the
	 * `deployment_attrs=included` parameter).
	 *   3. Get the latest config block for the system-channel by using the Fabric API (use a Fabric CLI or another Fabric
	 * tool).
	 *   4. Edit the config block for the system-channel and add the pre-created orderer's tls cert and api url as a
	 * consenter.
	 *   5. Create and marshal a Fabric
	 * [ConfigUpdate](https://github.com/hyperledger/fabric/blob/release-1.4/protos/common/configtx.proto#L78) proposal
	 * with
	 * [configtxlator](https://hyperledger-fabric.readthedocs.io/en/release-1.4/commands/configtxlator.html#configtxlator-compute-update)
	 * using the old and new block.
	 *   6. Sign the `ConfigUpdate` proposal and create a
	 * [ConfigSignature](https://github.com/hyperledger/fabric/blob/release-1.4/protos/common/configtx.proto#L111). Create
	 * a set of signatures that will satisfy the system channel's update policy.
	 *   7. Build a
	 * [SignedProposal](https://github.com/hyperledger/fabric/blob/release-1.4/protos/peer/proposal.proto#L105) out of the
	 * `ConfigUpdate` & `ConfigSignature`. Submit the `SignedProposal` to an existing ordering node (do not use the
	 * pre-created node).
	 *   8. After the `SignedProposal` transaction is committed to a block, pull the latest config block (for the
	 * system-channel) from an existing ordering node (use a Fabric CLI or another Fabric tool).
	 *   9. Submit the latest config block to your pre-created node with the 'Submit config block to orderer' API (which
	 * is this api!)
	 *   10. Use the [Edit data about an orderer](#edit-orderer) API to change the pre-created node's field
	 * `consenter_proposal_fin` to `true`. This changes the status icon on the IBP console.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string} [params.b64Block] - The latest config block of the system channel. Base 64 encoded. To obtain this
	 * block, you must use a **Fabric API**. This config block should list this ordering node as a valid consenter on the
	 * system-channel.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GenericComponentResponse>>}
	 */
	public submitBlock(params: BlockchainV3.SubmitBlockParams): Promise<BlockchainV3.Response<BlockchainV3.GenericComponentResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'b64_block': _params.b64Block
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'submitBlock');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/{id}/config',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Import an MSP.
	 *
	 * Create or import a Membership Service Provider (MSP) definition into your IBP console. This definition represents
	 * an organization that controls a peer or OS (Ordering Service).
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.mspId - The MSP id that is related to this component.
	 * @param {string} params.displayName - A descriptive name for this MSP. The IBP console tile displays this name.
	 * @param {string[]} params.rootCerts - An array that contains one or more base 64 encoded PEM root certificates for
	 * the MSP.
	 * @param {string[]} [params.intermediateCerts] - An array that contains base 64 encoded PEM intermediate
	 * certificates.
	 * @param {string[]} [params.admins] - An array that contains base 64 encoded PEM identity certificates for
	 * administrators. Also known as signing certificates of an organization administrator.
	 * @param {string[]} [params.tlsRootCerts] - An array that contains one or more base 64 encoded PEM TLS root
	 * certificates.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.MspResponse>>}
	 */
	public importMsp(params: BlockchainV3.ImportMspParams): Promise<BlockchainV3.Response<BlockchainV3.MspResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['mspId', 'displayName', 'rootCerts'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'msp_id': _params.mspId,
			'display_name': _params.displayName,
			'root_certs': _params.rootCerts,
			'intermediate_certs': _params.intermediateCerts,
			'admins': _params.admins,
			'tls_root_certs': _params.tlsRootCerts
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importMsp');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/msp',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Edit an MSP.
	 *
	 * Modify local metadata fields of a Membership Service Provider (MSP) definition. For example, the "display_name"
	 * property.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
	 * to determine the component id.
	 * @param {string} [params.mspId] - The MSP id that is related to this component.
	 * @param {string} [params.displayName] - A descriptive name for this MSP. The IBP console tile displays this name.
	 * @param {string[]} [params.rootCerts] - An array that contains one or more base 64 encoded PEM root certificates for
	 * the MSP.
	 * @param {string[]} [params.intermediateCerts] - An array that contains base 64 encoded PEM intermediate
	 * certificates.
	 * @param {string[]} [params.admins] - An array that contains base 64 encoded PEM identity certificates for
	 * administrators. Also known as signing certificates of an organization administrator.
	 * @param {string[]} [params.tlsRootCerts] - An array that contains one or more base 64 encoded PEM TLS root
	 * certificates.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.MspResponse>>}
	 */
	public editMsp(params: BlockchainV3.EditMspParams): Promise<BlockchainV3.Response<BlockchainV3.MspResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'msp_id': _params.mspId,
			'display_name': _params.displayName,
			'root_certs': _params.rootCerts,
			'intermediate_certs': _params.intermediateCerts,
			'admins': _params.admins,
			'tls_root_certs': _params.tlsRootCerts
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editMsp');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/msp/{id}',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Get MSP's public certificates.
	 *
	 * External IBP consoles can use this API to get the public certificate for your given MSP id.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.mspId - The `msp_id` to fetch.
	 * @param {string} [params.cache] - Set to 'skip' if the response should skip local data and fetch live data wherever
	 * possible. Expect longer response times if the cache is skipped. Default responses will use the cache.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetMSPCertificateResponse>>}
	 */
	public getMspCertificate(params: BlockchainV3.GetMspCertificateParams): Promise<BlockchainV3.Response<BlockchainV3.GetMSPCertificateResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['mspId'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const query = {
			'cache': _params.cache
		};

		const path = {
			'msp_id': _params.mspId
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getMspCertificate');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/msps/{msp_id}',
				method: 'GET',
				qs: query,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Edit admin certs on a component.
	 *
	 * This api will append or remove admin certs to the components' file system. Certificates will be parsed. If invalid
	 * they will be skipped. Duplicate certificates will also be skipped. To view existing admin certificate use the [Get
	 * component data](#get-component) API with the query parameters: `?deployment_attrs=included&cache=skip`.
	 *
	 * **This API will not work on *imported* components.**.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The `id` of the component to edit. Use the [Get all components](#list_components) API
	 * to determine the id of the component.
	 * @param {string[]} [params.appendAdminCerts] - The admin certificates to add to the file system.
	 * @param {string[]} [params.removeAdminCerts] - The admin certificates to remove from the file system. To see the
	 * current list run the [Get a component](#get-component) API with the `deployment_attrs=included` parameter.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.EditAdminCertsResponse>>}
	 */
	public editAdminCerts(params: BlockchainV3.EditAdminCertsParams): Promise<BlockchainV3.Response<BlockchainV3.EditAdminCertsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'append_admin_certs': _params.appendAdminCerts,
			'remove_admin_certs': _params.removeAdminCerts
		};

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editAdminCerts');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/{id}/certs',
				method: 'PUT',
				body,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/*************************
	 * manageMultipleComponents
	 ************************/

	/**
	 * Get all components.
	 *
	 * Get the IBP console's data on all components (peers, CAs, orderers, and MSPs). The component might be imported or
	 * created.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {string} [params.deploymentAttrs] - Set to 'included' if the response should include Kubernetes deployment
	 * attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include
	 * these fields.
	 *
	 * **This parameter will not work on *imported* components.**
	 *
	 * It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
	 * @param {string} [params.parsedCerts] - Set to 'included' if the response should include parsed PEM data along with
	 * base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer,
	 * expiration, subject, subject alt names, etc. Default responses will not include these fields.
	 * @param {string} [params.cache] - Set to 'skip' if the response should skip local data and fetch live data wherever
	 * possible. Expect longer response times if the cache is skipped. Default responses will use the cache.
	 * @param {string} [params.caAttrs] - Set to 'included' if the response should fetch CA attributes, inspect
	 * certificates, and append extra fields to CA and MSP component responses.
	 * - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA, such
	 * as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field
	 * `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a
	 * signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not
	 * include these fields.
	 * - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console CA
	 * that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert.
	 * Only imported/created CAs are checked. Default responses will not include these fields.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetMultiComponentsResponse>>}
	 */
	public listComponents(params?: BlockchainV3.ListComponentsParams): Promise<BlockchainV3.Response<BlockchainV3.GetMultiComponentsResponse>> {
		const _params = Object.assign({}, params);

		const query = {
			'deployment_attrs': _params.deploymentAttrs,
			'parsed_certs': _params.parsedCerts,
			'cache': _params.cache,
			'ca_attrs': _params.caAttrs
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'listComponents');

		const parameters = {
			options: {
				url: '/ak/api/v3/components',
				method: 'GET',
				qs: query,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Get components of a type.
	 *
	 * Get the IBP console's data on components that are a specific type. The component might be imported or created.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.type - The type of component to filter components on.
	 * @param {string} [params.deploymentAttrs] - Set to 'included' if the response should include Kubernetes deployment
	 * attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include
	 * these fields.
	 *
	 * **This parameter will not work on *imported* components.**
	 *
	 * It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
	 * @param {string} [params.parsedCerts] - Set to 'included' if the response should include parsed PEM data along with
	 * base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer,
	 * expiration, subject, subject alt names, etc. Default responses will not include these fields.
	 * @param {string} [params.cache] - Set to 'skip' if the response should skip local data and fetch live data wherever
	 * possible. Expect longer response times if the cache is skipped. Default responses will use the cache.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetMultiComponentsResponse>>}
	 */
	public getComponentsByType(params: BlockchainV3.GetComponentsByTypeParams): Promise<BlockchainV3.Response<BlockchainV3.GetMultiComponentsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['type'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const query = {
			'deployment_attrs': _params.deploymentAttrs,
			'parsed_certs': _params.parsedCerts,
			'cache': _params.cache
		};

		const path = {
			'type': _params.type
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getComponentsByType');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/types/{type}',
				method: 'GET',
				qs: query,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Get components with tag.
	 *
	 * Get the IBP console's data on components that have a specific tag. The component might be imported or created. Tags
	 * are not case-sensitive.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.tag - The tag to filter components on. Not case-sensitive.
	 * @param {string} [params.deploymentAttrs] - Set to 'included' if the response should include Kubernetes deployment
	 * attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include
	 * these fields.
	 *
	 * **This parameter will not work on *imported* components.**
	 *
	 * It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
	 * @param {string} [params.parsedCerts] - Set to 'included' if the response should include parsed PEM data along with
	 * base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer,
	 * expiration, subject, subject alt names, etc. Default responses will not include these fields.
	 * @param {string} [params.cache] - Set to 'skip' if the response should skip local data and fetch live data wherever
	 * possible. Expect longer response times if the cache is skipped. Default responses will use the cache.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetMultiComponentsResponse>>}
	 */
	public getComponentsByTag(params: BlockchainV3.GetComponentsByTagParams): Promise<BlockchainV3.Response<BlockchainV3.GetMultiComponentsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['tag'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const query = {
			'deployment_attrs': _params.deploymentAttrs,
			'parsed_certs': _params.parsedCerts,
			'cache': _params.cache
		};

		const path = {
			'tag': _params.tag
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getComponentsByTag');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/tags/{tag}',
				method: 'GET',
				qs: query,
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Remove components with tag.
	 *
	 * Removes components with the matching tag from the IBP console. Tags are not case-sensitive.
	 * - Using this api on **imported** components removes them from the IBP console.
	 * - Using this api on **created** components removes them from the IBP console **but** it will **not** delete the
	 * components from the Kubernetes cluster where they reside. Thus it orphans the Kubernetes deployments (if it
	 * exists). Instead use the [Delete components with tag](#delete_components_by_tag) API to delete the Kubernetes
	 * deployment and the IBP console data at once.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.tag - The tag to filter components on. Not case-sensitive.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.RemoveMultiComponentsResponse>>}
	 */
	public removeComponentsByTag(params: BlockchainV3.RemoveComponentsByTagParams): Promise<BlockchainV3.Response<BlockchainV3.RemoveMultiComponentsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['tag'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const path = {
			'tag': _params.tag
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'removeComponentsByTag');

		const parameters = {
			options: {
				url: '/ak/api/v3/components/tags/{tag}',
				method: 'DELETE',
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Delete components with tag.
	 *
	 * Removes components with the matching tag from the IBP console **and** it deletes the Kubernetes deployment. Tags
	 * are not case-sensitive.
	 * - Using this api on **imported** components will be skipped over since their Kubernetes deployment is unknown and
	 * cannot be removed. Instead use the [Remove components with tag](#remove_components_by_tag) API to remove imported
	 * components with a tag.
	 * - Using this api on **created** components removes them from the IBP console **and** it will delete the components
	 * from the Kubernetes cluster where they reside. The Kubernetes delete must succeed before the component will be
	 * removed from the IBP console.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.tag - The tag to filter components on. Not case-sensitive.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteMultiComponentsResponse>>}
	 */
	public deleteComponentsByTag(params: BlockchainV3.DeleteComponentsByTagParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteMultiComponentsResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['tag'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const path = {
			'tag': _params.tag
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteComponentsByTag');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/tags/{tag}',
				method: 'DELETE',
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Delete all components.
	 *
	 * Removes all components from the IBP console **and** their Kubernetes deployments (if applicable). Works on imported
	 * and created components (peers, CAs, orderers, MSPs, and signature collection transactions). This api attempts to
	 * effectively reset the IBP console to its initial (empty) state (except for logs & notifications, those will
	 * remain).
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteMultiComponentsResponse>>}
	 */
	public deleteAllComponents(params?: BlockchainV3.DeleteAllComponentsParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteMultiComponentsResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteAllComponents');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/components/purge',
				method: 'DELETE',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/*************************
	 * administerTheIBPConsole
	 ************************/

	/**
	 * Get public IBP console settings.
	 *
	 * Retrieve all public (non-sensitive) settings for the IBP console. Use this API for debugging purposes. It shows
	 * what behavior to expect and confirms whether the desired settings are active.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetPublicSettingsResponse>>}
	 */
	public getSettings(params?: BlockchainV3.GetSettingsParams): Promise<BlockchainV3.Response<BlockchainV3.GetPublicSettingsResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getSettings');

		const parameters = {
			options: {
				url: '/ak/api/v3/settings',
				method: 'GET',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Change IBP console settings.
	 *
	 * Edit a few IBP console settings (such as the rate limit and timeout settings). **Some edits will trigger an
	 * automatic server restart.**.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {EditSettingsBodyInactivityTimeouts} [params.inactivityTimeouts] -
	 * @param {EditLogSettingsBody} [params.fileLogging] - File system logging settings. All body fields are optional
	 * (only send the fields that you want to change). _Changes to this field will restart the IBP console server(s)_.
	 * @param {number} [params.maxReqPerMin] - The base limit for the maximum number of `/api/_*` API requests (aka UI
	 * requests) in 1 minute. Defaults `25`. [Rate Limits](#rate-limits). _Changes to this field will restart the IBP
	 * console server(s)_.
	 * @param {number} [params.maxReqPerMinAk] - The base limit for the maximum number of `/ak/api/_*` API requests (aka
	 * external api key requests) in 1 minute. Defaults `25`. [Rate Limits](#rate-limits). _Changes to this field will
	 * restart the IBP console server(s)_.
	 * @param {number} [params.fabricGetBlockTimeoutMs] - Maximum time in milliseconds to wait for a get-block
	 * transaction. Defaults to `10000` ms (10 seconds). _Refresh browser after changes_.
	 * @param {number} [params.fabricInstantiateTimeoutMs] - Maximum time in milliseconds to wait for a instantiate
	 * chaincode transaction. Defaults to `300000` ms (5 minutes). _Refresh browser after changes_.
	 * @param {number} [params.fabricJoinChannelTimeoutMs] - Maximum time in milliseconds to wait for a join-channel
	 * transaction. Defaults to `25000` ms (25 seconds). _Refresh browser after changes_.
	 * @param {number} [params.fabricInstallCcTimeoutMs] - Maximum time in milliseconds to wait for a install chaincode
	 * transaction (Fabric v1.x). Defaults to `300000` ms (5 minutes). _Refresh browser after changes_.
	 * @param {number} [params.fabricLcInstallCcTimeoutMs] - Maximum time in milliseconds to wait for a install chaincode
	 * transaction (Fabric v2.x). Defaults to `300000` ms (5 minutes). _Refresh browser after changes_.
	 * @param {number} [params.fabricLcGetCcTimeoutMs] - Maximum time in milliseconds to wait for a get-chaincode
	 * transaction (Fabric v2.x). Defaults to `180000` ms (3 minutes). _Refresh browser after changes_.
	 * @param {number} [params.fabricGeneralTimeoutMs] - Default maximum time in milliseconds to wait for a Fabric
	 * transaction. Defaults to `10000` ms (10 seconds). _Refresh browser after changes_.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetPublicSettingsResponse>>}
	 */
	public editSettings(params?: BlockchainV3.EditSettingsParams): Promise<BlockchainV3.Response<BlockchainV3.GetPublicSettingsResponse>> {
		const _params = Object.assign({}, params);

		const body = {
			'inactivity_timeouts': _params.inactivityTimeouts,
			'file_logging': _params.fileLogging,
			'max_req_per_min': _params.maxReqPerMin,
			'max_req_per_min_ak': _params.maxReqPerMinAk,
			'fabric_get_block_timeout_ms': _params.fabricGetBlockTimeoutMs,
			'fabric_instantiate_timeout_ms': _params.fabricInstantiateTimeoutMs,
			'fabric_join_channel_timeout_ms': _params.fabricJoinChannelTimeoutMs,
			'fabric_install_cc_timeout_ms': _params.fabricInstallCcTimeoutMs,
			'fabric_lc_install_cc_timeout_ms': _params.fabricLcInstallCcTimeoutMs,
			'fabric_lc_get_cc_timeout_ms': _params.fabricLcGetCcTimeoutMs,
			'fabric_general_timeout_ms': _params.fabricGeneralTimeoutMs
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editSettings');

		const parameters = {
			options: {
				url: '/ak/api/v3/settings',
				method: 'PUT',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Get supported Fabric versions.
	 *
	 * Get list of supported Fabric versions by each component type. These are the Fabric versions your IBP console can
	 * use when creating or upgrading components.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {string} [params.cache] - Set to 'skip' if the response should skip local data and fetch live data wherever
	 * possible. Expect longer response times if the cache is skipped. Default responses will use the cache.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetFabricVersionsResponse>>}
	 */
	public getFabVersions(params?: BlockchainV3.GetFabVersionsParams): Promise<BlockchainV3.Response<BlockchainV3.GetFabricVersionsResponse>> {
		const _params = Object.assign({}, params);

		const query = {
			'cache': _params.cache
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getFabVersions');

		const parameters = {
			options: {
				url: '/ak/api/v3/kubernetes/fabric/versions',
				method: 'GET',
				qs: query,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Get IBP console health stats.
	 *
	 * See statistics of the IBP console process such as memory usage, CPU usage, up time, cache, and operating system
	 * stats.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetAthenaHealthStatsResponse>>}
	 */
	public getHealth(params?: BlockchainV3.GetHealthParams): Promise<BlockchainV3.Response<BlockchainV3.GetAthenaHealthStatsResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getHealth');

		const parameters = {
			options: {
				url: '/ak/api/v3/health',
				method: 'GET',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Get all notifications.
	 *
	 * Retrieve all notifications. This API supports pagination through the query parameters. Notifications are generated
	 * from actions such as creating a component, deleting a component, server restart, and so on.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {number} [params.limit] - The number of notifications to return. The default value is 100.
	 * @param {number} [params.skip] - `skip` is used to paginate through a long list of sorted entries. For example, if
	 * there are 100 notifications, you can issue the API with limit=10 and skip=0 to get the first 1-10. To get the next
	 * 10, you can set limit=10 and skip=10 so that the values of entries 11-20 are returned.
	 * @param {string} [params.componentId] - Filter response to only contain notifications for a particular component id.
	 * The default response will include all notifications.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.GetNotificationsResponse>>}
	 */
	public listNotifications(params?: BlockchainV3.ListNotificationsParams): Promise<BlockchainV3.Response<BlockchainV3.GetNotificationsResponse>> {
		const _params = Object.assign({}, params);

		const query = {
			'limit': _params.limit,
			'skip': _params.skip,
			'component_id': _params.componentId
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'listNotifications');

		const parameters = {
			options: {
				url: '/ak/api/v3/notifications',
				method: 'GET',
				qs: query,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Delete a signature collection tx.
	 *
	 * Delete a signature collection transaction. These transactions involve creating or editing Fabric channels &
	 * chaincode approvals. This request is not distributed to external IBP consoles, thus the signature collection
	 * transaction is only deleted locally.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.id - The unique transaction ID of this signature collection.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteSignatureCollectionResponse>>}
	 */
	public deleteSigTx(params: BlockchainV3.DeleteSigTxParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteSignatureCollectionResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['id'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const path = {
			'id': _params.id
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteSigTx');

		const parameters = {
			options: {
				url: '/ak/api/v3/signature_collections/{id}',
				method: 'DELETE',
				path,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Archive notifications.
	 *
	 * Archive 1 or more notifications. Archived notifications will no longer appear in the default [Get all
	 * notifications](#list-notifications) API.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string[]} params.notificationIds - Array of notification IDs to archive.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.ArchiveResponse>>}
	 */
	public archiveNotifications(params: BlockchainV3.ArchiveNotificationsParams): Promise<BlockchainV3.Response<BlockchainV3.ArchiveResponse>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['notificationIds'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const body = {
			'notification_ids': _params.notificationIds
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'archiveNotifications');

		const parameters = {
			options: {
				url: '/ak/api/v3/notifications/bulk',
				method: 'POST',
				body,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Restart the IBP console.
	 *
	 * Restart IBP console processes. This causes a small outage (10 - 30 seconds) which is possibly disruptive to active
	 * user sessions.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.RestartAthenaResponse>>}
	 */
	public restart(params?: BlockchainV3.RestartParams): Promise<BlockchainV3.Response<BlockchainV3.RestartAthenaResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'restart');

		const parameters = {
			options: {
				url: '/ak/api/v3/restart',
				method: 'POST',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Delete all IBP console sessions.
	 *
	 * Delete all client sessions in IBP console. Use this API to clear any active logins and force everyone to log in
	 * again. This API is useful for debugging purposes and when changing roles of a user. It forces any role changes to
	 * take effect immediately. Otherwise, permission or role changes will take effect during the user's next login or
	 * session expiration.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteAllSessionsResponse>>}
	 */
	public deleteAllSessions(params?: BlockchainV3.DeleteAllSessionsParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteAllSessionsResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteAllSessions');

		const parameters = {
			options: {
				url: '/ak/api/v3/sessions',
				method: 'DELETE',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Delete all notifications.
	 *
	 * Delete all notifications. This API is intended for administration.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteAllNotificationsResponse>>}
	 */
	public deleteAllNotifications(params?: BlockchainV3.DeleteAllNotificationsParams): Promise<BlockchainV3.Response<BlockchainV3.DeleteAllNotificationsResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteAllNotifications');

		const parameters = {
			options: {
				url: '/ak/api/v3/notifications/purge',
				method: 'DELETE',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Clear IBP console caches.
	 *
	 * Clear the in-memory caches across all IBP console server processes. No effect on caches that are currently
	 * disabled.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.CacheFlushResponse>>}
	 */
	public clearCaches(params?: BlockchainV3.ClearCachesParams): Promise<BlockchainV3.Response<BlockchainV3.CacheFlushResponse>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'clearCaches');

		const parameters = {
			options: {
				url: '/ak/api/v3/cache',
				method: 'DELETE',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/*************************
	 * downloadExamples
	 ************************/

	/**
	 * Generate Postman collection.
	 *
	 * Generate and download a Postman API Collection. The JSON contains all the APIs available in the IBP console. It can
	 * be imported to the [Postman](https://www.postman.com/downloads) desktop application. **The examples in the
	 * collection will be pre-populated with authorization credentials.** The authorization credentials to use must be
	 * provided to this API. See the query parameters for available options.
	 *
	 * Choose an auth strategy that matches your environment & concerns:
	 *
	 * - **IAM Bearer Auth** - *[Available on IBM Cloud]* - This is the recommended auth strategy. The same bearer token
	 * used to authenticate this request will be copied into the Postman collection examples. Since the bearer token
	 * expires the auth embedded in the collection will also expire. At that point the collection might be deleted &
	 * regenerated, or manually edited to refresh the authorization header values. To use this strategy set `auth_type` to
	 * `bearer`.
	 * - **IAM Api Key Auth** - *[Available on IBM Cloud]* - The IAM api key will be copied into the Postman collection
	 * examples. This means the auth embedded in the collection will never expire. To use this strategy set `auth_type` to
	 * `api_key`.
	 * - **Basic Auth** - *[Available on OpenShift & IBM Cloud Private]* - A basic auth username and password will be
	 * copied into the Postman collection examples. This is **not** available for an IBP SaaS instance on IBM Cloud. To
	 * use this strategy set `auth_type` to `basic`.
	 *
	 * @param {Object} params - The parameters to send to the service.
	 * @param {string} params.authType - - **bearer** - IAM Bearer Auth - *[Available on IBM Cloud]* - The same bearer
	 * token used to authenticate this request will be copied into the Postman collection examples. The query parameter
	 * `token` must also be set with your IAM bearer/access token value.
	 * - **api_key** - IAM Api Key Auth - *[Available on IBM Cloud]* - The IAM api key will be copied into the Postman
	 * collection examples. The query parameter `api_key` must also be set with your IAM API Key value.
	 * - **basic** - Basic Auth - *[Available on OpenShift & IBM Cloud Private]* - A basic auth username and password will
	 * be copied into the Postman collection examples. The query parameters `username` & `password` must also be set with
	 * your IBP api key credentials. The IBP api key is the username and the api secret is the password.
	 * @param {string} [params.token] - The IAM access/bearer token to use for auth in the collection.
	 * @param {string} [params.apiKey] - The IAM api key to use for auth in the collection.
	 * @param {string} [params.username] - The basic auth username to use for auth in the collection.
	 * @param {string} [params.password] - The basic auth password to use for auth in the collection.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<BlockchainV3.Empty>>}
	 */
	public getPostman(params: BlockchainV3.GetPostmanParams): Promise<BlockchainV3.Response<BlockchainV3.Empty>> {
		const _params = Object.assign({}, params);
		const requiredParams = ['authType'];

		const missingParams = getMissingParams(_params, requiredParams);
		if (missingParams) {
			return Promise.reject(missingParams);
		}

		const query = {
			'auth_type': _params.authType,
			'token': _params.token,
			'api_key': _params.apiKey,
			'username': _params.username,
			'password': _params.password
		};

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getPostman');

		const parameters = {
			options: {
				url: '/ak/api/v3/postman',
				method: 'GET',
				qs: query,
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'application/json',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

	/**
	 * Download OpenAPI file.
	 *
	 * Download the [OpenAPI](https://swagger.io/specification/) specification YAML file (aka swagger file) for the IBP
	 * console. This is the same file that was used to generate the APIs on this page. This file documents APIs offered by
	 * the IBP console.
	 *
	 * @param {Object} [params] - The parameters to send to the service.
	 * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
	 * @returns {Promise<BlockchainV3.Response<string>>}
	 */
	public getSwagger(params?: BlockchainV3.GetSwaggerParams): Promise<BlockchainV3.Response<string>> {
		const _params = Object.assign({}, params);

		const sdkHeaders = getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getSwagger');

		const parameters = {
			options: {
				url: '/ak/api/v3/openapi',
				method: 'GET',
			},
			defaultOptions: extend(true, {}, this.baseOptions, {
				headers: extend(true, sdkHeaders, {
					'Accept': 'text/plain',
				}, _params.headers),
			}),
		};

		return this.createRequest(parameters);
	};

}

/*************************
 * interfaces
 ************************/

namespace BlockchainV3 {

	/** An operation response. */
	export interface Response<T = any> {
		result: T;
		status: number;
		statusText: string;
		headers: IncomingHttpHeaders;
	}

	/** The callback for a service request. */
	export type Callback<T> = (error: any, response?: Response<T>) => void;

	/** The body of a service request that returns no response data. */
	export interface Empty { }

	/** A standard JS object, defined to avoid the limitations of `Object` and `object` */
	export interface JsonObject {
		[key: string]: any;
	}

	/*************************
	 * request interfaces
	 ************************/

	/** Parameters for the `getComponent` operation. */
	export interface GetComponentParams {
		/** The `id` of the component to retrieve. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources',
		 *  'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields.
		 *
		 *  **This parameter will not work on *imported* components.**
		 *
		 *  It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
		 */
		deploymentAttrs?: GetComponentConstants.DeploymentAttrs | string;
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string.
		 *  Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt
		 *  names, etc. Default responses will not include these fields.
		 */
		parsedCerts?: GetComponentConstants.ParsedCerts | string;
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer
		 *  response times if the cache is skipped. Default responses will use the cache.
		 */
		cache?: GetComponentConstants.Cache | string;
		/** Set to 'included' if the response should fetch CA attributes, inspect certificates, and append extra fields
		 *  to CA and MSP component responses.
		 *  - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA,
		 *  such as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field
		 *  `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a
		 *  signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not
		 *  include these fields.
		 *  - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console
		 *  CA that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root
		 *  cert. Only imported/created CAs are checked. Default responses will not include these fields.
		 */
		caAttrs?: GetComponentConstants.CaAttrs | string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `getComponent` operation. */
	export namespace GetComponentConstants {
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
		export enum DeploymentAttrs {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
		export enum ParsedCerts {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
		export enum Cache {
			SKIP = 'skip',
			USE = 'use',
		}
		/** Set to 'included' if the response should fetch CA attributes, inspect certificates, and append extra fields to CA and MSP component responses. - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA, such as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not include these fields. - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console CA that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported/created CAs are checked. Default responses will not include these fields. */
		export enum CaAttrs {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
	}

	/** Parameters for the `removeComponent` operation. */
	export interface RemoveComponentParams {
		/** The `id` of the imported component to remove. Use the [Get all components](#list-components) API to
		 *  determine the component id.
		 */
		id: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `deleteComponent` operation. */
	export interface DeleteComponentParams {
		/** The `id` of the component to delete. Use the [Get all components](#list_components) API to determine the id
		 *  of the component to be deleted.
		 */
		id: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `createCa` operation. */
	export interface CreateCaParams {
		/** A descriptive name for this CA. The IBP console tile displays this name. */
		displayName: string;
		/** Set `config_override` to create the root/initial enroll id and enroll secret as well as enabling custom CA
		 *  configurations (such as using postgres). See the [Fabric CA configuration
		 *  file](https://hyperledger-fabric-ca.readthedocs.io/en/release-1.4/serverconfig.html) for more information about
		 *  each parameter.
		 *
		 *  The field `tlsca` is optional. The IBP console will copy the value of `config_override.ca` into
		 *  `config_override.tlsca` if `config_override.tlsca` is omitted (which is recommended).
		 *
		 *  *The nested field **names** below are not case-sensitive.*.
		 */
		configOverride: CreateCaBodyConfigOverride;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
		resources?: CreateCaBodyResources;
		/** Disk space properties. This feature is not available if using a free Kubernetes cluster. */
		storage?: CreateCaBodyStorage;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
		/** The number of replica pods running at any given time. */
		replicas?: number;
		tags?: string[];
		/** The connection details of the HSM (Hardware Security Module). */
		hsm?: Hsm;
		/** Specify the Kubernetes region for the deployment. The deployment will use a k8s node in this region. Find
		 *  the list of possible regions by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  info](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		region?: string;
		/** The Hyperledger Fabric release version to use. */
		version?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `importCa` operation. */
	export interface ImportCaParams {
		/** A descriptive name for this component. */
		displayName: string;
		/** The URL for the CA. Typically, client applications would send requests to this URL. Include the protocol,
		 *  hostname/ip and port.
		 */
		apiUrl: string;
		msp: ImportCaBodyMsp;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** Indicates where the component is running. */
		location?: string;
		/** The operations URL for the CA. Include the protocol, hostname/ip and port. */
		operationsUrl?: string;
		tags?: string[];
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tlsCert?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `updateCa` operation. */
	export interface UpdateCaParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** Update the [Fabric CA configuration
		 *  file](https://hyperledger-fabric-ca.readthedocs.io/en/release-1.4/serverconfig.html) if you want use custom
		 *  attributes to configure advanced CA features. Omit if not.
		 *
		 *  *The nested field **names** below are not case-sensitive.*
		 *  *The nested fields sent will be merged with the existing settings.*.
		 */
		configOverride?: UpdateCaBodyConfigOverride;
		/** The number of replica pods running at any given time. */
		replicas?: number;
		/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
		resources?: UpdateCaBodyResources;
		/** The Hyperledger Fabric release version to update to. */
		version?: string;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `editCa` operation. */
	export interface EditCaParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** A descriptive name for this CA. The IBP console tile displays this name. */
		displayName?: string;
		/** The URL for the CA. Typically, client applications would send requests to this URL. Include the protocol,
		 *  hostname/ip and port.
		 */
		apiUrl?: string;
		/** The operations URL for the CA. Include the protocol, hostname/ip and port. */
		operationsUrl?: string;
		/** The CA's "CAName" attribute. This name is used to distinguish this CA from the TLS CA. */
		caName?: string;
		/** Indicates where the component is running. */
		location?: string;
		tags?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `caAction` operation. */
	export interface CaActionParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** Set to `true` to restart the component. */
		restart?: boolean;
		renew?: ActionRenew;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `createPeer` operation. */
	export interface CreatePeerParams {
		/** The MSP id that is related to this component. */
		mspId: string;
		/** A descriptive name for this peer. The IBP console tile displays this name. */
		displayName: string;
		/** See this [topic](/docs/blockchain?topic=blockchain-ibp-v2-apis#ibp-v2-apis-config) for instructions on how
		 *  to build a crypto object.
		 */
		crypto: CryptoObject;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** Override the [Fabric Peer configuration
		 *  file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom
		 *  attributes to configure the Peer. Omit if not.
		 *
		 *  *The nested field **names** below are not case-sensitive.*.
		 */
		configOverride?: ConfigPeerCreate;
		/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
		resources?: PeerResources;
		/** Disk space properties. This feature is not available if using a free Kubernetes cluster. */
		storage?: CreatePeerBodyStorage;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
		/** Select the state database for the peer. Can be either "couchdb" or "leveldb". The default is "couchdb". */
		stateDb?: CreatePeerConstants.StateDb | string;
		tags?: string[];
		/** The connection details of the HSM (Hardware Security Module). */
		hsm?: Hsm;
		/** Specify the Kubernetes region for the deployment. The deployment will use a k8s node in this region. Find
		 *  the list of possible regions by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  info](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		region?: string;
		/** The Hyperledger Fabric release version to use. */
		version?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `createPeer` operation. */
	export namespace CreatePeerConstants {
		/** Select the state database for the peer. Can be either "couchdb" or "leveldb". The default is "couchdb". */
		export enum StateDb {
			COUCHDB = 'couchdb',
			LEVELDB = 'leveldb',
		}
	}

	/** Parameters for the `importPeer` operation. */
	export interface ImportPeerParams {
		/** A descriptive name for this peer. The IBP console tile displays this name. */
		displayName: string;
		/** The gRPC web proxy URL in front of the peer. Include the protocol, hostname/ip and port. */
		grpcwpUrl: string;
		/** The msp crypto data. */
		msp: MspCryptoField;
		/** The MSP id that is related to this component. */
		mspId: string;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** The gRPC URL for the peer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		apiUrl?: string;
		/** Indicates where the component is running. */
		location?: string;
		/** Used by Fabric health checker to monitor the health status of this peer. For more information, see [Fabric
		 *  documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
		 *  protocol, hostname/ip and port.
		 */
		operationsUrl?: string;
		tags?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `editPeer` operation. */
	export interface EditPeerParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** A descriptive name for this peer. The IBP console tile displays this name. */
		displayName?: string;
		/** The gRPC URL for the peer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		apiUrl?: string;
		/** Used by Fabric health checker to monitor the health status of this peer. For more information, see [Fabric
		 *  documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
		 *  protocol, hostname/ip and port.
		 */
		operationsUrl?: string;
		/** The gRPC web proxy URL in front of the peer. Include the protocol, hostname/ip and port. */
		grpcwpUrl?: string;
		/** The MSP id that is related to this component. */
		mspId?: string;
		/** Indicates where the component is running. */
		location?: string;
		tags?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `peerAction` operation. */
	export interface PeerActionParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** Set to `true` to restart the component. */
		restart?: boolean;
		reenroll?: ActionReenroll;
		enroll?: ActionEnroll;
		/** Set to `true` to start the peer's db migration. */
		upgradeDbs?: boolean;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `updatePeer` operation. */
	export interface UpdatePeerParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** An array that contains *all* the base 64 encoded PEM identity certificates for administrators of this
		 *  component. Also known as signing certificates of an organization administrator.
		 */
		adminCerts?: string[];
		/** Update the [Fabric Peer configuration
		 *  file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom
		 *  attributes to configure the Peer. Omit if not.
		 *
		 *  *The nested field **names** below are not case-sensitive.*
		 *  *The nested fields sent will be merged with the existing settings.*.
		 */
		configOverride?: ConfigPeerUpdate;
		crypto?: UpdatePeerBodyCrypto;
		nodeOu?: NodeOu;
		/** The number of replica pods running at any given time. */
		replicas?: number;
		/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
		resources?: PeerResources;
		/** The Hyperledger Fabric release version to update to. */
		version?: string;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `createOrderer` operation. */
	export interface CreateOrdererParams {
		/** The type of Fabric orderer. Currently, only the type `"raft"` is supported.
		 *  [etcd/raft](/docs/blockchain?topic=blockchain-ibp-console-build-network#ibp-console-build-network-ordering-console).
		 */
		ordererType: CreateOrdererConstants.OrdererType | string;
		/** The MSP id that is related to this component. */
		mspId: string;
		/** A descriptive base name for each ordering node. One or more child IBP console tiles display this name. */
		displayName: string;
		/** An array of config objects. When creating a new OS (Ordering Service) the array must have one object per
		 *  desired raft node. 1 or 5 nodes are recommended.
		 *
		 *  **When appending to an existing OS only an array of size 1 is supported.**
		 *
		 *  See this [topic](/docs/blockchain?topic=blockchain-ibp-v2-apis#ibp-v2-apis-config) for instructions on how to
		 *  build a config object.
		 */
		crypto: CryptoObject[];
		/** A descriptive name for an ordering service. The parent IBP console tile displays this name.
		 *
		 *  This field should only be set if you are creating a new OS cluster or when appending to an unknown (external) OS
		 *  cluster. An unknown/external cluster is one that this IBP console has not imported or created.
		 */
		clusterName?: string;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** This field should only be set if you are appending a new raft node to an **existing** raft cluster. When
		 *  appending to a known (internal) OS cluster set `cluster_id` to the same value used by the OS cluster. When
		 *  appending to an unknown (external) OS cluster set `cluster_id` to a unique string.
		 *
		 *  Setting this field means the `config` array should be of length 1, since it is not possible to add multiple raft
		 *  nodes at the same time in Fabric.
		 *
		 *  If this field is set the orderer will be "pre-created" and start without a genesis block. It is effectively dead
		 *  until it is configured. This is the first step to **append** a node to a raft cluster. The next step is to add
		 *  this node as a consenter to the system-channel by using Fabric-APIs. Then, init this node by sending the updated
		 *  system-channel config-block with the [Submit config block to orderer](#submit-block) API. The node will not be
		 *  usable until these steps are completed.
		 */
		clusterId?: string;
		/** Set to `true` only if you are appending to an unknown (external) OS cluster. Else set it to `false` or omit
		 *  the field. An unknown/external cluster is one that this IBP console has not imported or created.
		 */
		externalAppend?: boolean;
		/** An array of configuration override objects. 1 object per component. Must be the same size as the `config`
		 *  array.
		 */
		configOverride?: ConfigOrdererCreate[];
		/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
		resources?: CreateOrdererRaftBodyResources;
		/** Disk space properties. This feature is not available if using a free Kubernetes cluster. */
		storage?: CreateOrdererRaftBodyStorage;
		/** The name of the system channel. Defaults to `testchainid`. */
		systemChannelId?: string;
		/** An array of Kubernetes zones for the deployment. 1 zone per component. Must be the same size as the `config`
		 *  array.
		 */
		zone?: string[];
		tags?: string[];
		/** An array of Kubernetes regions for the deployment. One region per component. Must be the same size as the
		 *  `config` array.
		 */
		region?: string[];
		/** The connection details of the HSM (Hardware Security Module). */
		hsm?: Hsm;
		/** The Hyperledger Fabric release version to use. */
		version?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `createOrderer` operation. */
	export namespace CreateOrdererConstants {
		/** The type of Fabric orderer. Currently, only the type `"raft"` is supported. [etcd/raft](/docs/blockchain?topic=blockchain-ibp-console-build-network#ibp-console-build-network-ordering-console). */
		export enum OrdererType {
			RAFT = 'raft',
		}
	}

	/** Parameters for the `importOrderer` operation. */
	export interface ImportOrdererParams {
		/** A descriptive name for the ordering service. The parent IBP console orderer tile displays this name. */
		clusterName: string;
		/** A descriptive base name for each ordering node. One or more child IBP console tiles display this name. */
		displayName: string;
		/** The gRPC web proxy URL in front of the orderer. Include the protocol, hostname/ip and port. */
		grpcwpUrl: string;
		/** The msp crypto data. */
		msp: MspCryptoField;
		/** The MSP id that is related to this component. */
		mspId: string;
		/** The gRPC URL for the orderer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		apiUrl?: string;
		/** A unique id to identify this ordering service cluster. */
		clusterId?: string;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** Indicates where the component is running. */
		location?: string;
		/** Used by Fabric health checker to monitor the health status of this orderer node. For more information, see
		 *  [Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html).
		 *  Include the protocol, hostname/ip and port.
		 */
		operationsUrl?: string;
		/** The name of the system channel. Defaults to `testchainid`. */
		systemChannelId?: string;
		tags?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `editOrderer` operation. */
	export interface EditOrdererParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** A descriptive name for the ordering service. The parent IBP console orderer tile displays this name. */
		clusterName?: string;
		/** A descriptive base name for each ordering node. One or more child IBP console tiles display this name. */
		displayName?: string;
		/** The gRPC URL for the orderer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		apiUrl?: string;
		/** Used by Fabric health checker to monitor the health status of this orderer node. For more information, see
		 *  [Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html).
		 *  Include the protocol, hostname/ip and port.
		 */
		operationsUrl?: string;
		/** The gRPC web proxy URL in front of the orderer. Include the protocol, hostname/ip and port. */
		grpcwpUrl?: string;
		/** The MSP id that is related to this component. */
		mspId?: string;
		/** The state of a pre-created orderer node. A value of `true` means that the orderer node was added as a system
		 *  channel consenter. This is a manual field. Set it yourself after finishing the raft append flow to indicate that
		 *  this node is ready for use. See the [Submit config block to orderer](#submit-block) API description for more
		 *  details about appending raft nodes.
		 */
		consenterProposalFin?: boolean;
		/** Indicates where the component is running. */
		location?: string;
		/** The name of the system channel. Defaults to `testchainid`. */
		systemChannelId?: string;
		tags?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `ordererAction` operation. */
	export interface OrdererActionParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** Set to `true` to restart the component. */
		restart?: boolean;
		reenroll?: ActionReenroll;
		enroll?: ActionEnroll;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `updateOrderer` operation. */
	export interface UpdateOrdererParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** An array that contains *all* the base 64 encoded PEM identity certificates for administrators of this
		 *  component. Also known as signing certificates of an organization administrator.
		 */
		adminCerts?: string[];
		/** Update the [Fabric Orderer configuration
		 *  file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/orderer.yaml) if you want use custom
		 *  attributes to configure the Orderer. Omit if not.
		 *
		 *  *The nested field **names** below are not case-sensitive.*
		 *  *The nested fields sent will be merged with the existing settings.*.
		 */
		configOverride?: ConfigOrdererUpdate;
		crypto?: UpdateOrdererBodyCrypto;
		nodeOu?: NodeOu;
		/** The number of replica pods running at any given time. */
		replicas?: number;
		/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
		resources?: UpdateOrdererBodyResources;
		/** The Hyperledger Fabric release version to update to. */
		version?: string;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `submitBlock` operation. */
	export interface SubmitBlockParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** The latest config block of the system channel. Base 64 encoded. To obtain this block, you must use a
		 *  **Fabric API**. This config block should list this ordering node as a valid consenter on the system-channel.
		 */
		b64Block?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `importMsp` operation. */
	export interface ImportMspParams {
		/** The MSP id that is related to this component. */
		mspId: string;
		/** A descriptive name for this MSP. The IBP console tile displays this name. */
		displayName: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the MSP. */
		rootCerts: string[];
		/** An array that contains base 64 encoded PEM intermediate certificates. */
		intermediateCerts?: string[];
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admins?: string[];
		/** An array that contains one or more base 64 encoded PEM TLS root certificates. */
		tlsRootCerts?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `editMsp` operation. */
	export interface EditMspParams {
		/** The `id` of the component to modify. Use the [Get all components](#list_components) API to determine the
		 *  component id.
		 */
		id: string;
		/** The MSP id that is related to this component. */
		mspId?: string;
		/** A descriptive name for this MSP. The IBP console tile displays this name. */
		displayName?: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the MSP. */
		rootCerts?: string[];
		/** An array that contains base 64 encoded PEM intermediate certificates. */
		intermediateCerts?: string[];
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admins?: string[];
		/** An array that contains one or more base 64 encoded PEM TLS root certificates. */
		tlsRootCerts?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `getMspCertificate` operation. */
	export interface GetMspCertificateParams {
		/** The `msp_id` to fetch. */
		mspId: string;
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer
		 *  response times if the cache is skipped. Default responses will use the cache.
		 */
		cache?: GetMspCertificateConstants.Cache | string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `getMspCertificate` operation. */
	export namespace GetMspCertificateConstants {
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
		export enum Cache {
			SKIP = 'skip',
			USE = 'use',
		}
	}

	/** Parameters for the `editAdminCerts` operation. */
	export interface EditAdminCertsParams {
		/** The `id` of the component to edit. Use the [Get all components](#list_components) API to determine the id of
		 *  the component.
		 */
		id: string;
		/** The admin certificates to add to the file system. */
		appendAdminCerts?: string[];
		/** The admin certificates to remove from the file system. To see the current list run the [Get a
		 *  component](#get-component) API with the `deployment_attrs=included` parameter.
		 */
		removeAdminCerts?: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `listComponents` operation. */
	export interface ListComponentsParams {
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources',
		 *  'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields.
		 *
		 *  **This parameter will not work on *imported* components.**
		 *
		 *  It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
		 */
		deploymentAttrs?: ListComponentsConstants.DeploymentAttrs | string;
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string.
		 *  Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt
		 *  names, etc. Default responses will not include these fields.
		 */
		parsedCerts?: ListComponentsConstants.ParsedCerts | string;
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer
		 *  response times if the cache is skipped. Default responses will use the cache.
		 */
		cache?: ListComponentsConstants.Cache | string;
		/** Set to 'included' if the response should fetch CA attributes, inspect certificates, and append extra fields
		 *  to CA and MSP component responses.
		 *  - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA,
		 *  such as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field
		 *  `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a
		 *  signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not
		 *  include these fields.
		 *  - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console
		 *  CA that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root
		 *  cert. Only imported/created CAs are checked. Default responses will not include these fields.
		 */
		caAttrs?: ListComponentsConstants.CaAttrs | string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `listComponents` operation. */
	export namespace ListComponentsConstants {
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
		export enum DeploymentAttrs {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
		export enum ParsedCerts {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
		export enum Cache {
			SKIP = 'skip',
			USE = 'use',
		}
		/** Set to 'included' if the response should fetch CA attributes, inspect certificates, and append extra fields to CA and MSP component responses. - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA, such as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not include these fields. - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console CA that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported/created CAs are checked. Default responses will not include these fields. */
		export enum CaAttrs {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
	}

	/** Parameters for the `getComponentsByType` operation. */
	export interface GetComponentsByTypeParams {
		/** The type of component to filter components on. */
		type: GetComponentsByTypeConstants.Type | string;
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources',
		 *  'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields.
		 *
		 *  **This parameter will not work on *imported* components.**
		 *
		 *  It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
		 */
		deploymentAttrs?: GetComponentsByTypeConstants.DeploymentAttrs | string;
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string.
		 *  Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt
		 *  names, etc. Default responses will not include these fields.
		 */
		parsedCerts?: GetComponentsByTypeConstants.ParsedCerts | string;
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer
		 *  response times if the cache is skipped. Default responses will use the cache.
		 */
		cache?: GetComponentsByTypeConstants.Cache | string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `getComponentsByType` operation. */
	export namespace GetComponentsByTypeConstants {
		/** The type of component to filter components on. */
		export enum Type {
			FABRIC_PEER = 'fabric-peer',
			FABRIC_ORDERER = 'fabric-orderer',
			FABRIC_CA = 'fabric-ca',
			MSP = 'msp',
		}
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
		export enum DeploymentAttrs {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
		export enum ParsedCerts {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
		export enum Cache {
			SKIP = 'skip',
			USE = 'use',
		}
	}

	/** Parameters for the `getComponentsByTag` operation. */
	export interface GetComponentsByTagParams {
		/** The tag to filter components on. Not case-sensitive. */
		tag: string;
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources',
		 *  'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields.
		 *
		 *  **This parameter will not work on *imported* components.**
		 *
		 *  It's recommended to use `cache=skip` as well if up-to-date deployment data is needed.
		 */
		deploymentAttrs?: GetComponentsByTagConstants.DeploymentAttrs | string;
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string.
		 *  Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt
		 *  names, etc. Default responses will not include these fields.
		 */
		parsedCerts?: GetComponentsByTagConstants.ParsedCerts | string;
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer
		 *  response times if the cache is skipped. Default responses will use the cache.
		 */
		cache?: GetComponentsByTagConstants.Cache | string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `getComponentsByTag` operation. */
	export namespace GetComponentsByTagConstants {
		/** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
		export enum DeploymentAttrs {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
		export enum ParsedCerts {
			INCLUDED = 'included',
			OMITTED = 'omitted',
		}
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
		export enum Cache {
			SKIP = 'skip',
			USE = 'use',
		}
	}

	/** Parameters for the `removeComponentsByTag` operation. */
	export interface RemoveComponentsByTagParams {
		/** The tag to filter components on. Not case-sensitive. */
		tag: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `deleteComponentsByTag` operation. */
	export interface DeleteComponentsByTagParams {
		/** The tag to filter components on. Not case-sensitive. */
		tag: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `deleteAllComponents` operation. */
	export interface DeleteAllComponentsParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `getSettings` operation. */
	export interface GetSettingsParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `editSettings` operation. */
	export interface EditSettingsParams {
		inactivityTimeouts?: EditSettingsBodyInactivityTimeouts;
		/** File system logging settings. All body fields are optional (only send the fields that you want to change).
		 *  _Changes to this field will restart the IBP console server(s)_.
		 */
		fileLogging?: EditLogSettingsBody;
		/** The base limit for the maximum number of `/api/_*` API requests (aka UI requests) in 1 minute. Defaults
		 *  `25`. [Rate Limits](#rate-limits). _Changes to this field will restart the IBP console server(s)_.
		 */
		maxReqPerMin?: number;
		/** The base limit for the maximum number of `/ak/api/_*` API requests (aka external api key requests) in 1
		 *  minute. Defaults `25`. [Rate Limits](#rate-limits). _Changes to this field will restart the IBP console
		 *  server(s)_.
		 */
		maxReqPerMinAk?: number;
		/** Maximum time in milliseconds to wait for a get-block transaction. Defaults to `10000` ms (10 seconds).
		 *  _Refresh browser after changes_.
		 */
		fabricGetBlockTimeoutMs?: number;
		/** Maximum time in milliseconds to wait for a instantiate chaincode transaction. Defaults to `300000` ms (5
		 *  minutes). _Refresh browser after changes_.
		 */
		fabricInstantiateTimeoutMs?: number;
		/** Maximum time in milliseconds to wait for a join-channel transaction. Defaults to `25000` ms (25 seconds).
		 *  _Refresh browser after changes_.
		 */
		fabricJoinChannelTimeoutMs?: number;
		/** Maximum time in milliseconds to wait for a install chaincode transaction (Fabric v1.x). Defaults to `300000`
		 *  ms (5 minutes). _Refresh browser after changes_.
		 */
		fabricInstallCcTimeoutMs?: number;
		/** Maximum time in milliseconds to wait for a install chaincode transaction (Fabric v2.x). Defaults to `300000`
		 *  ms (5 minutes). _Refresh browser after changes_.
		 */
		fabricLcInstallCcTimeoutMs?: number;
		/** Maximum time in milliseconds to wait for a get-chaincode transaction (Fabric v2.x). Defaults to `180000` ms
		 *  (3 minutes). _Refresh browser after changes_.
		 */
		fabricLcGetCcTimeoutMs?: number;
		/** Default maximum time in milliseconds to wait for a Fabric transaction. Defaults to `10000` ms (10 seconds).
		 *  _Refresh browser after changes_.
		 */
		fabricGeneralTimeoutMs?: number;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `getFabVersions` operation. */
	export interface GetFabVersionsParams {
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer
		 *  response times if the cache is skipped. Default responses will use the cache.
		 */
		cache?: GetFabVersionsConstants.Cache | string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `getFabVersions` operation. */
	export namespace GetFabVersionsConstants {
		/** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
		export enum Cache {
			SKIP = 'skip',
			USE = 'use',
		}
	}

	/** Parameters for the `getHealth` operation. */
	export interface GetHealthParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `listNotifications` operation. */
	export interface ListNotificationsParams {
		/** The number of notifications to return. The default value is 100. */
		limit?: number;
		/** `skip` is used to paginate through a long list of sorted entries. For example, if there are 100
		 *  notifications, you can issue the API with limit=10 and skip=0 to get the first 1-10. To get the next 10, you can
		 *  set limit=10 and skip=10 so that the values of entries 11-20 are returned.
		 */
		skip?: number;
		/** Filter response to only contain notifications for a particular component id. The default response will
		 *  include all notifications.
		 */
		componentId?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `deleteSigTx` operation. */
	export interface DeleteSigTxParams {
		/** The unique transaction ID of this signature collection. */
		id: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `archiveNotifications` operation. */
	export interface ArchiveNotificationsParams {
		/** Array of notification IDs to archive. */
		notificationIds: string[];
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `restart` operation. */
	export interface RestartParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `deleteAllSessions` operation. */
	export interface DeleteAllSessionsParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `deleteAllNotifications` operation. */
	export interface DeleteAllNotificationsParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `clearCaches` operation. */
	export interface ClearCachesParams {
		headers?: OutgoingHttpHeaders;
	}

	/** Parameters for the `getPostman` operation. */
	export interface GetPostmanParams {
		/** - **bearer** - IAM Bearer Auth - *[Available on IBM Cloud]* - The same bearer token used to authenticate
		 *  this request will be copied into the Postman collection examples. The query parameter `token` must also be set
		 *  with your IAM bearer/access token value.
		 *  - **api_key** - IAM Api Key Auth - *[Available on IBM Cloud]* - The IAM api key will be copied into the Postman
		 *  collection examples. The query parameter `api_key` must also be set with your IAM API Key value.
		 *  - **basic** - Basic Auth - *[Available on OpenShift & IBM Cloud Private]* - A basic auth username and password
		 *  will be copied into the Postman collection examples. The query parameters `username` & `password` must also be
		 *  set with your IBP api key credentials. The IBP api key is the username and the api secret is the password.
		 */
		authType: GetPostmanConstants.AuthType | string;
		/** The IAM access/bearer token to use for auth in the collection. */
		token?: string;
		/** The IAM api key to use for auth in the collection. */
		apiKey?: string;
		/** The basic auth username to use for auth in the collection. */
		username?: string;
		/** The basic auth password to use for auth in the collection. */
		password?: string;
		headers?: OutgoingHttpHeaders;
	}

	/** Constants for the `getPostman` operation. */
	export namespace GetPostmanConstants {
		/** - **bearer** - IAM Bearer Auth - *[Available on IBM Cloud]* - The same bearer token used to authenticate this request will be copied into the Postman collection examples. The query parameter `token` must also be set with your IAM bearer/access token value. - **api_key** - IAM Api Key Auth - *[Available on IBM Cloud]* - The IAM api key will be copied into the Postman collection examples. The query parameter `api_key` must also be set with your IAM API Key value. - **basic** - Basic Auth - *[Available on OpenShift & IBM Cloud Private]* - A basic auth username and password will be copied into the Postman collection examples. The query parameters `username` & `password` must also be set with your IBP api key credentials. The IBP api key is the username and the api secret is the password. */
		export enum AuthType {
			BEARER = 'bearer',
			API_KEY = 'api_key',
			BASIC = 'basic',
		}
	}

	/** Parameters for the `getSwagger` operation. */
	export interface GetSwaggerParams {
		headers?: OutgoingHttpHeaders;
	}

	/*************************
	 * model interfaces
	 ************************/

	/** ActionsResponse. */
	export interface ActionsResponse {
		message?: string;
		/** The id of the component. */
		id?: string;
		actions?: string[];
	}

	/** ArchiveResponse. */
	export interface ArchiveResponse {
		/** Response message. "ok" indicates the api completed successfully. */
		message?: string;
		/** Text with the number of notifications that were archived. */
		details?: string;
	}

	/** Configures the Blockchain Crypto Service Providers (bccsp). */
	export interface Bccsp {
		/** The name of the crypto library implementation to use for the BlockChain Crypto Service Provider (bccsp).
		 *  Defaults to `SW`.
		 */
		Default?: string;
		/** Software based blockchain crypto provider. */
		SW?: BccspSW;
		/** Hardware-based blockchain crypto provider. */
		PKCS11?: BccspPKCS11;
	}

	/** Hardware-based blockchain crypto provider. */
	export interface BccspPKCS11 {
		/** Token Label. */
		Label: string;
		/** The user PIN. */
		Pin: string;
		/** The hash family to use for the BlockChain Crypto Service Provider (bccsp). */
		Hash?: string;
		/** The length of hash to use for the BlockChain Crypto Service Provider (bccsp). */
		Security?: number;
	}

	/** Software based blockchain crypto provider. */
	export interface BccspSW {
		/** The hash family to use for the BlockChain Crypto Service Provider (bccsp). */
		Hash: string;
		/** The length of hash to use for the BlockChain Crypto Service Provider (bccsp). */
		Security: number;
	}

	/** Contains the details of a CA. */
	export interface CaResponse {
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** The unique id for the component in Kubernetes. Not available if component was imported. */
		dep_component_id?: string;
		/** A descriptive name for this CA. The IBP console tile displays this name. */
		display_name?: string;
		/** The gRPC URL for the peer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		api_url?: string;
		/** The operations URL for the CA. Include the protocol, hostname/ip and port. */
		operations_url?: string;
		/** The **cached** configuration override that was set for the Kubernetes deployment. Field does not exist if an
		 *  override was not set of if the component was imported.
		 */
		config_override?: JsonObject;
		/** Indicates where the component is running. */
		location?: string;
		/** The msp crypto data. */
		msp?: MspCryptoField;
		/** The **cached** Kubernetes resource attributes for this component. Not available if CA was imported. */
		resources?: CaResponseResources;
		/** The versioning of the IBP console format of this JSON. */
		scheme_version?: string;
		/** The **cached** Kubernetes storage attributes for this component. Not available if CA was imported. */
		storage?: CaResponseStorage;
		tags?: string[];
		/** UTC UNIX timestamp of component onboarding to the UI. In milliseconds. */
		timestamp?: number;
		/** The cached Hyperledger Fabric release version. */
		version?: string;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
	}

	/** The **cached** Kubernetes resource attributes for this component. Not available if CA was imported. */
	export interface CaResponseResources {
		ca?: GenericResources;
	}

	/** The **cached** Kubernetes storage attributes for this component. Not available if CA was imported. */
	export interface CaResponseStorage {
		ca?: StorageObject;
	}

	/** CacheData. */
	export interface CacheData {
		/** Number of cache hits. */
		hits?: number;
		/** Number of cache misses. */
		misses?: number;
		/** Number of entries in the cache. */
		keys?: number;
		/** Approximate size of the in memory cache. */
		cache_size?: string;
	}

	/** CacheFlushResponse. */
	export interface CacheFlushResponse {
		/** Response message. "ok" indicates the api completed successfully. */
		message?: string;
		/** The name of the caches that were cleared. */
		flushed?: string[];
	}

	/** ConfigCACfgIdentities. */
	export interface ConfigCACfgIdentities {
		/** The maximum number of incorrect password attempts allowed per identity. */
		passwordattempts: number;
		/** Set to `true` to allow deletion of identities. Defaults `false`. */
		allowremove?: boolean;
	}

	/** ConfigCACreate. */
	export interface ConfigCACreate {
		cors?: ConfigCACors;
		/** Enable debug to debug the CA. */
		debug?: boolean;
		/** Max size of an acceptable CRL in bytes. */
		crlsizelimit?: number;
		tls?: ConfigCATls;
		ca?: ConfigCACa;
		crl?: ConfigCACrl;
		registry: ConfigCARegistry;
		db?: ConfigCADb;
		/** Set the keys to the desired affiliation parent names. The keys 'org1' and 'org2' are examples. */
		affiliations?: ConfigCAAffiliations;
		csr?: ConfigCACsr;
		idemix?: ConfigCAIdemix;
		/** Configures the Blockchain Crypto Service Providers (bccsp). */
		BCCSP?: Bccsp;
		intermediate?: ConfigCAIntermediate;
		cfg?: ConfigCACfg;
		metrics?: Metrics;
		signing?: ConfigCASigning;
	}

	/** ConfigCACsrCa. */
	export interface ConfigCACsrCa {
		/** The expiration for the root CA certificate. */
		expiry?: string;
		/** The pathlength field is used to limit CA certificate hierarchy. 0 means that the CA cannot issue CA certs,
		 *  only entity certificates. 1 means that the CA can issue both.
		 */
		pathlength?: number;
	}

	/** ConfigCACsrKeyrequest. */
	export interface ConfigCACsrKeyrequest {
		/** The algorithm to use for CSRs. */
		algo: string;
		/** The size of the key for CSRs. */
		size: number;
	}

	/** ConfigCACsrNamesItem. */
	export interface ConfigCACsrNamesItem {
		C: string;
		ST: string;
		L?: string;
		O: string;
		OU?: string;
	}

	/** ConfigCADbTls. */
	export interface ConfigCADbTls {
		certfiles?: string[];
		client?: ConfigCADbTlsClient;
		/** Set to true if TLS is to be used between the CA and its database, else false. */
		enabled?: boolean;
	}

	/** ConfigCADbTlsClient. */
	export interface ConfigCADbTlsClient {
		/** The TLS certificate for client TLS as base 64 encoded PEM. */
		certfile: string;
		/** The TLS private key for client TLS as base 64 encoded PEM. */
		keyfile: string;
	}

	/** ConfigCAIntermediateEnrollment. */
	export interface ConfigCAIntermediateEnrollment {
		/** Hosts to set when issuing the certificate. */
		hosts: string;
		/** Name of the signing profile to use when issuing the certificate. */
		profile: string;
		/** Label to use in HSM operations. */
		label: string;
	}

	/** ConfigCAIntermediateParentserver. */
	export interface ConfigCAIntermediateParentserver {
		/** The url of the parent server. Include the protocol, hostname/ip and port. */
		url: string;
		/** The name of the CA to enroll within the server. */
		caname: string;
	}

	/** ConfigCAIntermediateTls. */
	export interface ConfigCAIntermediateTls {
		certfiles: string[];
		client?: ConfigCAIntermediateTlsClient;
	}

	/** ConfigCAIntermediateTlsClient. */
	export interface ConfigCAIntermediateTlsClient {
		/** The TLS certificate for client TLS as base 64 encoded PEM. */
		certfile: string;
		/** The TLS private key for client TLS as base 64 encoded PEM. */
		keyfile: string;
	}

	/** ConfigCARegistryIdentitiesItem. */
	export interface ConfigCARegistryIdentitiesItem {
		/** The ID for the identity, aka enroll id. */
		name: string;
		/** The password for the identity, aka enroll secret. */
		pass: string;
		/** The type of identity. */
		type: string;
		/** Maximum number of enrollments for id. Set -1 for infinite. */
		maxenrollments?: number;
		/** The affiliation data for the identity. */
		affiliation?: string;
		attrs?: IdentityAttrs;
	}

	/** ConfigCASigningDefault. */
	export interface ConfigCASigningDefault {
		usage?: string[];
		/** Controls the default expiration for signed certificates. */
		expiry?: string;
	}

	/** ConfigCASigningProfiles. */
	export interface ConfigCASigningProfiles {
		/** Controls attributes of intermediate CA certificates. */
		ca?: ConfigCASigningProfilesCa;
		/** Controls attributes of intermediate tls CA certificates. */
		tls?: ConfigCASigningProfilesTls;
	}

	/** Controls attributes of intermediate CA certificates. */
	export interface ConfigCASigningProfilesCa {
		usage?: string[];
		/** Controls the expiration for signed intermediate CA certificates. */
		expiry?: string;
		caconstraint?: ConfigCASigningProfilesCaCaconstraint;
	}

	/** ConfigCASigningProfilesCaCaconstraint. */
	export interface ConfigCASigningProfilesCaCaconstraint {
		/** Indicates if this certificate is for a CA. */
		isca?: boolean;
		/** A value of 0 indicates that this intermediate CA cannot issue other intermediate CA certificates. */
		maxpathlen?: number;
		/** To enforce a `maxpathlen` of 0, this field must be `true`. If `maxpathlen` should be ignored or if it is
		 *  greater than 0 set this to `false`.
		 */
		maxpathlenzero?: boolean;
	}

	/** Controls attributes of intermediate tls CA certificates. */
	export interface ConfigCASigningProfilesTls {
		usage?: string[];
		/** Controls the expiration for signed tls intermediate CA certificates. */
		expiry?: string;
	}

	/** ConfigCATlsClientauth. */
	export interface ConfigCATlsClientauth {
		type: string;
		certfiles: string[];
	}

	/** ConfigCAUpdate. */
	export interface ConfigCAUpdate {
		cors?: ConfigCACors;
		/** Enable debug to debug the CA. */
		debug?: boolean;
		/** Max size of an acceptable CRL in bytes. */
		crlsizelimit?: number;
		tls?: ConfigCATls;
		ca?: ConfigCACa;
		crl?: ConfigCACrl;
		registry?: ConfigCARegistry;
		db?: ConfigCADb;
		/** Set the keys to the desired affiliation parent names. The keys 'org1' and 'org2' are examples. */
		affiliations?: ConfigCAAffiliations;
		csr?: ConfigCACsr;
		idemix?: ConfigCAIdemix;
		/** Configures the Blockchain Crypto Service Providers (bccsp). */
		BCCSP?: Bccsp;
		intermediate?: ConfigCAIntermediate;
		cfg?: ConfigCACfg;
		metrics?: Metrics;
	}

	/** Set the keys to the desired affiliation parent names. The keys 'org1' and 'org2' are examples. */
	export interface ConfigCAAffiliations {
		org1?: string[];
		org2?: string[];
		/** ConfigCAAffiliations accepts additional properties. */
		[propName: string]: any;
	}

	/** ConfigCACa. */
	export interface ConfigCACa {
		/** The CA's private key as base 64 encoded PEM. */
		keyfile?: string;
		/** The CA's certificate as base 64 encoded PEM. */
		certfile?: string;
		/** The CA's certificate chain as base 64 encoded PEM. */
		chainfile?: string;
	}

	/** ConfigCACfg. */
	export interface ConfigCACfg {
		identities: ConfigCACfgIdentities;
	}

	/** ConfigCACors. */
	export interface ConfigCACors {
		enabled: boolean;
		origins: string[];
	}

	/** ConfigCACrl. */
	export interface ConfigCACrl {
		/** Expiration of the CRL (Certificate Revocation List) generated by the 'gencrl' requests. */
		expiry: string;
	}

	/** ConfigCACsr. */
	export interface ConfigCACsr {
		/** The Common Name for the CSRs. */
		cn: string;
		keyrequest?: ConfigCACsrKeyrequest;
		names: ConfigCACsrNamesItem[];
		hosts?: string[];
		ca: ConfigCACsrCa;
	}

	/** ConfigCADb. */
	export interface ConfigCADb {
		/** The type of database. Either 'sqlite3', 'postgres', 'mysql'. Defaults 'sqlite3'. */
		type: string;
		/** Build this string - "host=\<hostname> port=\<port> user=\<username> password=\<password> dbname=ibmclouddb
		 *  sslmode=verify-full".
		 */
		datasource: string;
		tls?: ConfigCADbTls;
	}

	/** ConfigCAIdemix. */
	export interface ConfigCAIdemix {
		/** Specifies the revocation pool size. */
		rhpoolsize: number;
		/** Specifies the expiration for the nonces. */
		nonceexpiration: string;
		/** Specifies frequency at which expired nonces are removed from data store. */
		noncesweepinterval: string;
	}

	/** ConfigCAIntermediate. */
	export interface ConfigCAIntermediate {
		parentserver: ConfigCAIntermediateParentserver;
		enrollment?: ConfigCAIntermediateEnrollment;
		tls?: ConfigCAIntermediateTls;
	}

	/** ConfigCARegistry. */
	export interface ConfigCARegistry {
		/** Default maximum number of enrollments per id. Set -1 for infinite. */
		maxenrollments: number;
		identities: ConfigCARegistryIdentitiesItem[];
	}

	/** ConfigCASigning. */
	export interface ConfigCASigning {
		default?: ConfigCASigningDefault;
		profiles?: ConfigCASigningProfiles;
	}

	/** ConfigCATls. */
	export interface ConfigCATls {
		/** The CA's private key as base 64 encoded PEM. */
		keyfile: string;
		/** The CA's certificate as base 64 encoded PEM. */
		certfile: string;
		clientauth?: ConfigCATlsClientauth;
	}

	/** Override the [Fabric Orderer configuration file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/orderer.yaml) if you want use custom attributes to configure the Orderer. Omit if not. *The nested field **names** below are not case-sensitive.*. */
	export interface ConfigOrdererCreate {
		General?: ConfigOrdererGeneral;
		/** Controls the debugging options for the orderer. */
		Debug?: ConfigOrdererDebug;
		Metrics?: ConfigOrdererMetrics;
	}

	/** The statsd configuration. */
	export interface ConfigOrdererMetricsStatsd {
		/** Network protocol to use. */
		Network?: string;
		/** The address of the statsd server. Include hostname/ip and port. */
		Address?: string;
		/** The frequency at which locally cached counters and gauges are pushed to statsd. */
		WriteInterval?: string;
		/** The string that is prepended to all emitted statsd metrics. */
		Prefix?: string;
	}

	/** Update the [Fabric Orderer configuration file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/orderer.yaml) if you want use custom attributes to configure the Orderer. Omit if not. *The nested field **names** below are not case-sensitive.* *The nested fields sent will be merged with the existing settings.*. */
	export interface ConfigOrdererUpdate {
		General?: ConfigOrdererGeneralUpdate;
		/** Controls the debugging options for the orderer. */
		Debug?: ConfigOrdererDebug;
		Metrics?: ConfigOrdererMetrics;
	}

	/** Contains configuration parameters that are related to authenticating client messages. */
	export interface ConfigOrdererAuthentication {
		/** The maximum acceptable difference between the current server time and the client's time. */
		TimeWindow?: string;
		/** Indicates if the orderer should ignore expired identities. Should only be used temporarily to recover from
		 *  an extreme event such as the expiration of administrators. Defaults `false`.
		 */
		NoExpirationChecks?: boolean;
	}

	/** Controls the debugging options for the orderer. */
	export interface ConfigOrdererDebug {
		/** Path to directory. If set will cause each request to the Broadcast service to be written to a file in this
		 *  directory.
		 */
		BroadcastTraceDir?: string;
		/** Path to directory. If set will cause each request to the Deliver service to be written to a file in this
		 *  directory.
		 */
		DeliverTraceDir?: string;
	}

	/** ConfigOrdererGeneral. */
	export interface ConfigOrdererGeneral {
		/** Keep alive settings for the GRPC server. */
		Keepalive?: ConfigOrdererKeepalive;
		/** Configures the Blockchain Crypto Service Providers (bccsp). */
		BCCSP?: Bccsp;
		/** Contains configuration parameters that are related to authenticating client messages. */
		Authentication?: ConfigOrdererAuthentication;
	}

	/** ConfigOrdererGeneralUpdate. */
	export interface ConfigOrdererGeneralUpdate {
		/** Keep alive settings for the GRPC server. */
		Keepalive?: ConfigOrdererKeepalive;
		/** Contains configuration parameters that are related to authenticating client messages. */
		Authentication?: ConfigOrdererAuthentication;
	}

	/** Keep alive settings for the GRPC server. */
	export interface ConfigOrdererKeepalive {
		/** The minimum time between client pings. If a client sends pings more frequently the server will disconnect
		 *  from the client.
		 */
		ServerMinInterval?: string;
		/** The time between pings to clients. */
		ServerInterval?: string;
		/** The duration the server will wait for a response from a client before closing the connection. */
		ServerTimeout?: string;
	}

	/** ConfigOrdererMetrics. */
	export interface ConfigOrdererMetrics {
		/** The metrics provider to use. */
		Provider?: string;
		/** The statsd configuration. */
		Statsd?: ConfigOrdererMetricsStatsd;
	}

	/** ConfigPeerChaincodeExternalBuildersItem. */
	export interface ConfigPeerChaincodeExternalBuildersItem {
		/** The path to a build directory. */
		path?: string;
		/** The name of this builder. */
		name?: string;
		environmentWhitelist?: string[];
	}

	/** ConfigPeerChaincodeGolang. */
	export interface ConfigPeerChaincodeGolang {
		/** Controls if golang chaincode should be built with dynamic linking or static linking. Defaults `false`
		 *  (static).
		 */
		dynamicLink?: boolean;
	}

	/** ConfigPeerChaincodeLogging. */
	export interface ConfigPeerChaincodeLogging {
		/** Default logging level for loggers within chaincode containers. */
		level?: string;
		/** Override default level for the 'shim' logger. */
		shim?: string;
		/** Override the default log format for chaincode container logs. */
		format?: string;
	}

	/** The complete whitelist for system chaincodes. To append a new chaincode add the new id to the default list. */
	export interface ConfigPeerChaincodeSystem {
		/** Adds the system chaincode `cscc` to the whitelist. */
		cscc?: boolean;
		/** Adds the system chaincode `lscc` to the whitelist. */
		lscc?: boolean;
		/** Adds the system chaincode `escc` to the whitelist. */
		escc?: boolean;
		/** Adds the system chaincode `vscc` to the whitelist. */
		vscc?: boolean;
		/** Adds the system chaincode `qscc` to the whitelist. */
		qscc?: boolean;
	}

	/** Override the [Fabric Peer configuration file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom attributes to configure the Peer. Omit if not. *The nested field **names** below are not case-sensitive.*. */
	export interface ConfigPeerCreate {
		peer?: ConfigPeerCreatePeer;
		chaincode?: ConfigPeerChaincode;
		metrics?: Metrics;
	}

	/** ConfigPeerCreatePeer. */
	export interface ConfigPeerCreatePeer {
		/** A unique id used to identify this instance. */
		id?: string;
		/** The ID to logically separate one network from another. */
		networkId?: string;
		/** Keep alive settings between the peer server and clients. */
		keepalive?: ConfigPeerKeepalive;
		gossip?: ConfigPeerGossip;
		authentication?: ConfigPeerAuthentication;
		/** Configures the Blockchain Crypto Service Providers (bccsp). */
		BCCSP?: Bccsp;
		client?: ConfigPeerClient;
		deliveryclient?: ConfigPeerDeliveryclient;
		/** Used for administrative operations such as control over logger levels. Only peer administrators can use the
		 *  service.
		 */
		adminService?: ConfigPeerAdminService;
		/** Number of go-routines that will execute transaction validation in parallel. By default, the peer chooses the
		 *  number of CPUs on the machine. It is recommended to use the default values and not set this field.
		 */
		validatorPoolSize?: number;
		/** The discovery service is used by clients to query information about peers. Such as - which peers have joined
		 *  a channel, what is the latest channel config, and what possible sets of peers satisfy the endorsement policy
		 *  (given a smart contract and a channel).
		 */
		discovery?: ConfigPeerDiscovery;
		limits?: ConfigPeerLimits;
		gateway?: ConfigPeerGateway;
	}

	/** ConfigPeerDeliveryclientAddressOverridesItem. */
	export interface ConfigPeerDeliveryclientAddressOverridesItem {
		/** The address in the channel configuration that will be overridden. */
		from?: string;
		/** The address to use. */
		to?: string;
		/** The path to the CA's cert file. */
		caCertsFile?: string;
	}

	/** Leader election service configuration. */
	export interface ConfigPeerGossipElection {
		/** Longest time the peer will wait for stable membership during leader election startup. */
		startupGracePeriod?: string;
		/** Frequency that gossip membership samples to check its stability. */
		membershipSampleInterval?: string;
		/** Amount of time after the last declaration message for the peer to perform another leader election. */
		leaderAliveThreshold?: string;
		/** Amount of time between the peer sending a propose message and it declaring itself as a leader. */
		leaderElectionDuration?: string;
	}

	/** ConfigPeerGossipPvtData. */
	export interface ConfigPeerGossipPvtData {
		/** Determines the maximum time to attempt to pull private data for a block before that block is committed
		 *  without the private data.
		 */
		pullRetryThreshold?: string;
		/** As private data enters the transient store, it is associated with the peer's current ledger's height. This
		 *  field defines the maximum difference between the current ledger's height on commit, and the private data
		 *  residing inside the transient store. Private data outside this range is not guaranteed to exist and will be
		 *  purged periodically.
		 */
		transientstoreMaxBlockRetention?: number;
		/** Maximum time to wait for an acknowledgment from each peer's private data push. */
		pushAckTimeout?: string;
		/** Block to live pulling margin. Used as a buffer to prevent peers from trying to pull private data from others
		 *  peers that are soon to be purged. "Soon" defined as blocks that will be purged in the next N blocks. This helps
		 *  a newly joined peer catch up quicker.
		 */
		btlPullMargin?: number;
		/** Determines the maximum batch size of missing private data that will be reconciled in a single iteration. The
		 *  process of reconciliation is done in an endless loop. The "reconciler" in each iteration tries to pull from the
		 *  other peers with the most recent missing blocks and this maximum batch size limitation.
		 */
		reconcileBatchSize?: number;
		/** Determines the time "reconciler" sleeps from the end of an iteration until the beginning of the next
		 *  iteration.
		 */
		reconcileSleepInterval?: string;
		/** Determines whether private data reconciliation is enabled or not. */
		reconciliationEnabled?: boolean;
		/** Controls whether pulling invalid transaction's private data from other peers need to be skipped during the
		 *  commit time. If `true` it will be pulled through "reconciler".
		 */
		skipPullingInvalidTransactionsDuringCommit?: boolean;
		implicitCollectionDisseminationPolicy?: ConfigPeerGossipPvtDataImplicitCollectionDisseminationPolicy;
	}

	/** ConfigPeerGossipPvtDataImplicitCollectionDisseminationPolicy. */
	export interface ConfigPeerGossipPvtDataImplicitCollectionDisseminationPolicy {
		/** Defines the minimum number of peers to successfully disseminate private data during endorsement. */
		requiredPeerCount?: number;
		/** Defines the maximum number of peers to attempt to disseminate private data during endorsement. */
		maxPeerCount?: number;
	}

	/** Gossip state transfer related configuration. */
	export interface ConfigPeerGossipState {
		/** Controls if the state transfer is enabled or not. If state transfer is active, it syncs up missing blocks
		 *  and allows lagging peers to catch up with the rest of the network.
		 */
		enabled?: boolean;
		/** The frequency to check whether a peer is lagging behind enough to request blocks by using state transfer
		 *  from another peer.
		 */
		checkInterval?: string;
		/** Amount of time to wait for state transfer responses from other peers. */
		responseTimeout?: string;
		/** Number of blocks to request by using state transfer from another peer. */
		batchSize?: number;
		/** Maximum difference between the lowest and highest block sequence number. In order to ensure that there are
		 *  no holes the actual buffer size is twice this distance.
		 */
		blockBufferSize?: number;
		/** Maximum number of retries of a single state transfer request. */
		maxRetries?: number;
	}

	/** ConfigPeerKeepaliveClient. */
	export interface ConfigPeerKeepaliveClient {
		/** The time between pings to other peer nodes. Must greater than or equal to the minInterval. */
		interval?: string;
		/** The duration a client waits for a peer's response before it closes the connection. */
		timeout?: string;
	}

	/** ConfigPeerKeepaliveDeliveryClient. */
	export interface ConfigPeerKeepaliveDeliveryClient {
		/** The time between pings to ordering nodes. Must greater than or equal to the minInterval. */
		interval?: string;
		/** The duration a client waits for an orderer's response before it closes the connection. */
		timeout?: string;
	}

	/** ConfigPeerLimitsConcurrency. */
	export interface ConfigPeerLimitsConcurrency {
		/** Limits the number of concurrent requests to the endorser service. The endorser service handles application
		 *  and system chaincode deployment and invocations (including queries).
		 */
		endorserService?: number;
		/** Limits the number of concurrent requests to the deliver service. The deliver service handles block and
		 *  transaction events.
		 */
		deliverService?: number;
	}

	/** Update the [Fabric Peer configuration file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom attributes to configure the Peer. Omit if not. *The nested field **names** below are not case-sensitive.* *The nested fields sent will be merged with the existing settings.*. */
	export interface ConfigPeerUpdate {
		peer?: ConfigPeerUpdatePeer;
		chaincode?: ConfigPeerChaincode;
		metrics?: Metrics;
	}

	/** ConfigPeerUpdatePeer. */
	export interface ConfigPeerUpdatePeer {
		/** A unique id used to identify this instance. */
		id?: string;
		/** The ID to logically separate one network from another. */
		networkId?: string;
		/** Keep alive settings between the peer server and clients. */
		keepalive?: ConfigPeerKeepalive;
		gossip?: ConfigPeerGossip;
		authentication?: ConfigPeerAuthentication;
		client?: ConfigPeerClient;
		deliveryclient?: ConfigPeerDeliveryclient;
		/** Used for administrative operations such as control over logger levels. Only peer administrators can use the
		 *  service.
		 */
		adminService?: ConfigPeerAdminService;
		/** Number of go-routines that will execute transaction validation in parallel. By default, the peer chooses the
		 *  number of CPUs on the machine. It is recommended to use the default values and not set this field.
		 */
		validatorPoolSize?: number;
		/** The discovery service is used by clients to query information about peers. Such as - which peers have joined
		 *  a channel, what is the latest channel config, and what possible sets of peers satisfy the endorsement policy
		 *  (given a smart contract and a channel).
		 */
		discovery?: ConfigPeerDiscovery;
		limits?: ConfigPeerLimits;
		gateway?: ConfigPeerGateway;
	}

	/** Used for administrative operations such as control over logger levels. Only peer administrators can use the service. */
	export interface ConfigPeerAdminService {
		/** The interface and port on which the admin server will listen on. Defaults to the same address as the peer's
		 *  listen address and port 7051.
		 */
		listenAddress: string;
	}

	/** ConfigPeerAuthentication. */
	export interface ConfigPeerAuthentication {
		/** The maximum acceptable difference between the current server time and the client's time. */
		timewindow: string;
	}

	/** ConfigPeerChaincode. */
	export interface ConfigPeerChaincode {
		golang?: ConfigPeerChaincodeGolang;
		/** List of directories to treat as external builders/launches of chaincode. */
		externalBuilders?: ConfigPeerChaincodeExternalBuildersItem[];
		/** Maximum duration to wait for the chaincode build and install process to complete. */
		installTimeout?: string;
		/** Time for starting up a container and waiting for Register to come through. */
		startuptimeout?: string;
		/** Time for Invoke and Init calls to return. This timeout is used by all chaincodes in all the channels,
		 *  including system chaincodes. Note that if the image is not available the peer needs to build the image, which
		 *  will take additional time.
		 */
		executetimeout?: string;
		/** The complete whitelist for system chaincodes. To append a new chaincode add the new id to the default list. */
		system?: ConfigPeerChaincodeSystem;
		logging?: ConfigPeerChaincodeLogging;
	}

	/** ConfigPeerClient. */
	export interface ConfigPeerClient {
		/** The timeout for a network connection. */
		connTimeout: string;
	}

	/** ConfigPeerDeliveryclient. */
	export interface ConfigPeerDeliveryclient {
		/** Total time to spend retrying connections to ordering nodes before giving up and returning an error. */
		reconnectTotalTimeThreshold?: string;
		/** The timeout for a network connection. */
		connTimeout?: string;
		/** Maximum delay between consecutive connection retry attempts to ordering nodes. */
		reConnectBackoffThreshold?: string;
		/** A list of orderer endpoint addresses in channel configurations that should be overridden. Typically used
		 *  when the original orderer addresses no longer exist.
		 */
		addressOverrides?: ConfigPeerDeliveryclientAddressOverridesItem[];
	}

	/** The discovery service is used by clients to query information about peers. Such as - which peers have joined a channel, what is the latest channel config, and what possible sets of peers satisfy the endorsement policy (given a smart contract and a channel). */
	export interface ConfigPeerDiscovery {
		/** Determines whether the discover service is available or not. */
		enabled?: boolean;
		/** Determines whether the authentication cache is enabled or not. */
		authCacheEnabled?: boolean;
		/** Maximum size of the cache. If exceeded a purge takes place. */
		authCacheMaxSize?: number;
		/** The proportion (0 - 1) of entries that remain in the cache after the cache is purged due to overpopulation. */
		authCachePurgeRetentionRatio?: number;
		/** Whether to allow non-admins to perform non-channel scoped queries. When `false`, it means that only peer
		 *  admins can perform non-channel scoped queries.
		 */
		orgMembersAllowedAccess?: boolean;
	}

	/** ConfigPeerGateway. */
	export interface ConfigPeerGateway {
		/** Enable or disable the 'Fabric Gateway' on the peer. */
		enabled?: boolean;
	}

	/** ConfigPeerGossip. */
	export interface ConfigPeerGossip {
		/** Decides whether a peer will use a dynamic algorithm for "leader" selection (instead of a static leader). The
		 *  leader is the peer that establishes a connection with the ordering service (OS). The leader pulls ledger blocks
		 *  from the OS. It is recommended to use leader election for large networks of peers.
		 */
		useLeaderElection?: boolean;
		/** Decides whether this peer should be an organization "leader". It maintains a connection with the ordering
		 *  service and disseminate blocks to peers in its own organization.
		 */
		orgLeader?: boolean;
		/** The frequency to poll on membershipTracker. */
		membershipTrackerInterval?: string;
		/** Maximum number of blocks that can be stored in memory. */
		maxBlockCountToStore?: number;
		/** Maximum time between consecutive message pushes. */
		maxPropagationBurstLatency?: string;
		/** Maximum number of messages that are stored until a push to remote peers is triggered. */
		maxPropagationBurstSize?: number;
		/** Number of times a message is pushed to remote peers. */
		propagateIterations?: number;
		/** Determines the frequency of pull phases. */
		pullInterval?: string;
		/** Number of peers to pull from. */
		pullPeerNum?: number;
		/** Determines the frequency of pulling stateInfo messages from peers. */
		requestStateInfoInterval?: string;
		/** Determines the frequency of pushing stateInfo messages to peers. */
		publishStateInfoInterval?: string;
		/** Maximum time a stateInfo message is kept. */
		stateInfoRetentionInterval?: string;
		/** Time after startup to start including certificates in Alive messages. */
		publishCertPeriod?: string;
		/** Decides whether the peer should skip the verification of block messages. */
		skipBlockVerification?: boolean;
		/** The timeout for dialing a network request. */
		dialTimeout?: string;
		/** The timeout for a network connection. */
		connTimeout?: string;
		/** Number of received messages to hold in buffer. */
		recvBuffSize?: number;
		/** Number of sent messages to hold in buffer. */
		sendBuffSize?: number;
		/** Time to wait before the pull-engine processes incoming digests. Should be slightly smaller than
		 *  requestWaitTime.
		 */
		digestWaitTime?: string;
		/** Time to wait before pull-engine removes the incoming nonce. Should be slightly bigger than digestWaitTime. */
		requestWaitTime?: string;
		/** Time to wait before the pull-engine ends. */
		responseWaitTime?: string;
		/** Alive check frequency. */
		aliveTimeInterval?: string;
		/** Alive expiration timeout. */
		aliveExpirationTimeout?: string;
		/** Reconnect frequency. */
		reconnectInterval?: string;
		/** Leader election service configuration. */
		election?: ConfigPeerGossipElection;
		pvtData?: ConfigPeerGossipPvtData;
		/** Gossip state transfer related configuration. */
		state?: ConfigPeerGossipState;
	}

	/** Keep alive settings between the peer server and clients. */
	export interface ConfigPeerKeepalive {
		/** The minimum time between client pings. If a client sends pings more frequently the server disconnects from
		 *  the client.
		 */
		minInterval?: string;
		client?: ConfigPeerKeepaliveClient;
		deliveryClient?: ConfigPeerKeepaliveDeliveryClient;
	}

	/** ConfigPeerLimits. */
	export interface ConfigPeerLimits {
		concurrency?: ConfigPeerLimitsConcurrency;
	}

	/** CpuHealthStats. */
	export interface CpuHealthStats {
		/** Model of CPU core. */
		model?: string;
		/** Speed of core in MHz. */
		speed?: number;
		times?: CpuHealthStatsTimes;
	}

	/** CpuHealthStatsTimes. */
	export interface CpuHealthStatsTimes {
		/** ms CPU is in idle. */
		idle?: number;
		/** ms CPU is in irq. */
		irq?: number;
		/** ms CPU is in nice. */
		nice?: number;
		/** ms CPU is in sys. */
		sys?: number;
		/** ms CPU is in user. */
		user?: number;
	}

	/** Set `config_override` to create the root/initial enroll id and enroll secret as well as enabling custom CA configurations (such as using postgres). See the [Fabric CA configuration file](https://hyperledger-fabric-ca.readthedocs.io/en/release-1.4/serverconfig.html) for more information about each parameter. The field `tlsca` is optional. The IBP console will copy the value of `config_override.ca` into `config_override.tlsca` if `config_override.tlsca` is omitted (which is recommended). *The nested field **names** below are not case-sensitive.*. */
	export interface CreateCaBodyConfigOverride {
		ca: ConfigCACreate;
		tlsca?: ConfigCACreate;
	}

	/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
	export interface CreateCaBodyResources {
		/** This field requires the use of Fabric v1.4.* and higher. */
		ca: ResourceObject;
	}

	/** Disk space properties. This feature is not available if using a free Kubernetes cluster. */
	export interface CreateCaBodyStorage {
		ca: StorageObject;
	}

	/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
	export interface CreateOrdererRaftBodyResources {
		/** This field requires the use of Fabric v1.4.* and higher. */
		orderer: ResourceObject;
		/** This field requires the use of Fabric v1.4.* and higher. */
		proxy?: ResourceObject;
	}

	/** Disk space properties. This feature is not available if using a free Kubernetes cluster. */
	export interface CreateOrdererRaftBodyStorage {
		orderer: StorageObject;
	}

	/** CreateOrdererResponse. */
	export interface CreateOrdererResponse {
		/** Contains array of ordering nodes. */
		created?: OrdererResponse[];
	}

	/** Disk space properties. This feature is not available if using a free Kubernetes cluster. */
	export interface CreatePeerBodyStorage {
		peer: StorageObject;
		statedb?: StorageObject;
	}

	/** CryptoEnrollmentComponent. */
	export interface CryptoEnrollmentComponent {
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admincerts?: string[];
	}

	/** See this [topic](/docs/blockchain?topic=blockchain-ibp-v2-apis#ibp-v2-apis-config) for instructions on how to build a crypto object. */
	export interface CryptoObject {
		/** This `enrollment` field contains data that allows a component to enroll an identity for itself. Use
		 *  `enrollment` or `msp`, not both.
		 */
		enrollment?: CryptoObjectEnrollment;
		/** The `msp` field contains data to allow a component to configure its MSP with an already enrolled identity.
		 *  Use `msp` or `enrollment`, not both.
		 */
		msp?: CryptoObjectMsp;
	}

	/** This `enrollment` field contains data that allows a component to enroll an identity for itself. Use `enrollment` or `msp`, not both. */
	export interface CryptoObjectEnrollment {
		component: CryptoEnrollmentComponent;
		ca: CryptoObjectEnrollmentCa;
		tlsca: CryptoObjectEnrollmentTlsca;
	}

	/** CryptoObjectEnrollmentCa. */
	export interface CryptoObjectEnrollmentCa {
		/** The CA's hostname. Do not include protocol or port. */
		host: string;
		/** The CA's port. */
		port: number;
		/** The CA's "CAName" attribute. This name is used to distinguish this CA from the TLS CA. */
		name: string;
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert: string;
		/** The username of the enroll id. */
		enroll_id: string;
		/** The password of the enroll id. */
		enroll_secret: string;
	}

	/** CryptoObjectEnrollmentTlsca. */
	export interface CryptoObjectEnrollmentTlsca {
		/** The CA's hostname. Do not include protocol or port. */
		host: string;
		/** The CA's port. */
		port: number;
		/** The TLS CA's "CAName" attribute. This name is used to distinguish this TLS CA from the other CA. */
		name: string;
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert: string;
		/** The username of the enroll id. */
		enroll_id: string;
		/** The password of the enroll id. */
		enroll_secret: string;
		csr_hosts?: string[];
	}

	/** The `msp` field contains data to allow a component to configure its MSP with an already enrolled identity. Use `msp` or `enrollment`, not both. */
	export interface CryptoObjectMsp {
		component: MspCryptoComp;
		ca: MspCryptoCa;
		tlsca: MspCryptoCa;
	}

	/** DeleteAllNotificationsResponse. */
	export interface DeleteAllNotificationsResponse {
		/** Response message. "ok" indicates the api completed successfully. */
		message?: string;
		/** Text showing what was deleted. */
		details?: string;
	}

	/** DeleteAllSessionsResponse. */
	export interface DeleteAllSessionsResponse {
		/** Response message. Indicates the api completed successfully. */
		message?: string;
	}

	/** DeleteComponentResponse. */
	export interface DeleteComponentResponse {
		message?: string;
		/** The type of this component. Such as: "fabric-peer", "fabric-ca", "fabric-orderer", etc. */
		type?: string;
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** A descriptive name for this peer. The IBP console tile displays this name. */
		display_name?: string;
	}

	/** DeleteMultiComponentsResponse. */
	export interface DeleteMultiComponentsResponse {
		deleted?: DeleteComponentResponse[];
	}

	/** DeleteSignatureCollectionResponse. */
	export interface DeleteSignatureCollectionResponse {
		/** Response message. "ok" indicates the api completed successfully. */
		message?: string;
		/** The unique transaction ID of this signature collection. Must start with a letter. */
		tx_id?: string;
	}

	/** EditAdminCertsResponse. */
	export interface EditAdminCertsResponse {
		/** The total number of admin certificate additions and deletions. */
		changes_made?: number;
		/** Array of certs there were set. */
		set_admin_certs?: EditAdminCertsResponseSetAdminCertsItem[];
	}

	/** EditAdminCertsResponseSetAdminCertsItem. */
	export interface EditAdminCertsResponseSetAdminCertsItem {
		/** A certificate as base 64 encoded PEM. Also known as the signing certificate of an organization admin. */
		base_64_pem?: string;
		/** The issuer string in the certificate. */
		issuer?: string;
		/** UTC timestamp of the last ms the certificate is valid. */
		not_after_ts?: number;
		/** UTC timestamp of the earliest ms the certificate is valid. */
		not_before_ts?: number;
		/** The "unique" id of the certificates. */
		serial_number_hex?: string;
		/** The crypto algorithm that signed the public key in the certificate. */
		signature_algorithm?: string;
		/** The subject string in the certificate. */
		subject?: string;
		/** The X.509 version/format. */
		X509_version?: number;
		/** A friendly (human readable) duration until certificate expiration. */
		time_left?: string;
	}

	/** File system logging settings. All body fields are optional (only send the fields that you want to change). _Changes to this field will restart the IBP console server(s)_. */
	export interface EditLogSettingsBody {
		/** The client side (browser) logging settings. _Changes to this field will restart the IBP console server(s)_. */
		client?: LoggingSettingsClient;
		/** The server side logging settings. _Changes to this field will restart the IBP console server(s)_. */
		server?: LoggingSettingsServer;
	}

	/** EditSettingsBodyInactivityTimeouts. */
	export interface EditSettingsBodyInactivityTimeouts {
		/** Indicates if the auto log out logic is enabled or disabled. Defaults `false`. _Refresh browser after
		 *  changes_.
		 */
		enabled?: boolean;
		/** Maximum time in milliseconds for a browser client to be idle. Once exceeded the user is logged out. Defaults
		 *  to `90000` ms (1.5 minutes). _Refresh browser after changes_.
		 */
		max_idle_time?: number;
	}

	/** FabVersionObject. */
	export interface FabVersionObject {
		/** Indicates if this is the Fabric version that will be used if none is selected. */
		default?: boolean;
		/** The Fabric version. */
		version?: string;
		/** Detailed image information for this Fabric release. */
		image?: JsonObject;
	}

	/** A supported release of Fabric for this component type. */
	export interface FabricVersionDictionary {
		'1.4.6-2'?: FabVersionObject;
		'2.1.0-0'?: FabVersionObject;
		/** FabricVersionDictionary accepts additional properties. */
		[propName: string]: any;
	}

	/** Contains the details of a component. Not all components have the same fields, see description of each field for details. */
	export interface GenericComponentResponse {
		/** The unique identifier of this component. [Available on all component types]. */
		id?: string;
		/** The type of this component [Available on all component types]. */
		type?: string;
		/** The displayed name of this component. [Available on all component types]. */
		display_name?: string;
		/** A unique id to identify this ordering service cluster. [Available on orderer components]. */
		cluster_id?: string;
		/** A descriptive name for the ordering service. The parent IBP console orderer tile displays this name.
		 *  [Available on orderer components].
		 */
		cluster_name?: string;
		/** The URL for the grpc web proxy for this component. [Available on peer/orderer components]. */
		grpcwp_url?: string;
		/** The gRPC URL for the component. Typically, client applications would send requests to this URL. [Available
		 *  on ca/peer/orderer components].
		 */
		api_url?: string;
		/** Used by Fabric health checker to monitor health status of the node. For more information, see [Fabric
		 *  documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). [Available on
		 *  ca/peer/orderer components].
		 */
		operations_url?: string;
		msp?: GenericComponentResponseMsp;
		/** The MSP id that is related to this component. [Available on all components]. */
		msp_id?: string;
		/** Indicates where the component is running. */
		location?: string;
		node_ou?: NodeOuGeneral;
		/** The **cached** Kubernetes resource attributes for this component. [Available on ca/peer/orderer components
		 *  w/query parameter 'deployment_attrs'].
		 */
		resources?: GenericComponentResponseResources;
		/** The versioning of the IBP console format of this JSON. */
		scheme_version?: string;
		/** The type of ledger database for a peer. [Available on peer components w/query parameter 'deployment_attrs']. */
		state_db?: string;
		/** The **cached** Kubernetes storage attributes for this component. [Available on ca/peer/orderer components
		 *  w/query parameter 'deployment_attrs'].
		 */
		storage?: GenericComponentResponseStorage;
		/** UNIX timestamp of component creation, UTC, ms. [Available on all components]. */
		timestamp?: number;
		tags?: string[];
		/** The cached Hyperledger Fabric version for this component. [Available on ca/peer/orderer components w/query
		 *  parameter 'deployment_attrs'].
		 */
		version?: string;
		/** The Kubernetes zone of this component's deployment. [Available on ca/peer/orderer components w/query
		 *  parameter 'deployment_attrs'].
		 */
		zone?: string;
	}

	/** GenericComponentResponseMsp. */
	export interface GenericComponentResponseMsp {
		ca?: GenericComponentResponseMspCa;
		tlsca?: GenericComponentResponseMspTlsca;
		component?: GenericComponentResponseMspComponent;
	}

	/** GenericComponentResponseMspCa. */
	export interface GenericComponentResponseMspCa {
		/** The "name" to distinguish this CA from the TLS CA. [Available on ca components]. */
		name?: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the CA. [Available on
		 *  ca/peer/orderer components].
		 */
		root_certs?: string[];
	}

	/** GenericComponentResponseMspComponent. */
	export interface GenericComponentResponseMspComponent {
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert?: string;
		/** An identity certificate (base 64 encoded PEM) for this component that was signed by the CA (aka enrollment
		 *  certificate). [Available on peer/orderer components w/query parameter 'deployment_attrs'].
		 */
		ecert?: string;
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator. [Available on peer/orderer components w/query parameter
		 *  'deployment_attrs'].
		 */
		admin_certs?: string[];
	}

	/** GenericComponentResponseMspTlsca. */
	export interface GenericComponentResponseMspTlsca {
		/** The "name" to distinguish this CA from the other CA. [Available on ca components]. */
		name?: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the TLS CA. [Available on
		 *  ca/peer/orderer components].
		 */
		root_certs?: string[];
	}

	/** The **cached** Kubernetes resource attributes for this component. [Available on ca/peer/orderer components w/query parameter 'deployment_attrs']. */
	export interface GenericComponentResponseResources {
		ca?: GenericResources;
		peer?: GenericResources;
		orderer?: GenericResources;
		proxy?: GenericResources;
		statedb?: GenericResources;
	}

	/** The **cached** Kubernetes storage attributes for this component. [Available on ca/peer/orderer components w/query parameter 'deployment_attrs']. */
	export interface GenericComponentResponseStorage {
		ca?: StorageObject;
		peer?: StorageObject;
		orderer?: StorageObject;
		statedb?: StorageObject;
	}

	/** GenericResourceLimits. */
	export interface GenericResourceLimits {
		cpu?: string;
		memory?: string;
	}

	/** GenericResources. */
	export interface GenericResources {
		requests?: GenericResourcesRequests;
		limits?: GenericResourceLimits;
	}

	/** GenericResourcesRequests. */
	export interface GenericResourcesRequests {
		cpu?: string;
		memory?: string;
	}

	/** Contains various health statistics like up time and cache sizes. */
	export interface GetAthenaHealthStatsResponse {
		OPTOOLS?: GetAthenaHealthStatsResponseOPTOOLS;
		OS?: GetAthenaHealthStatsResponseOS;
	}

	/** GetAthenaHealthStatsResponseOPTOOLS. */
	export interface GetAthenaHealthStatsResponseOPTOOLS {
		/** Random/unique id for a process running IBP console. */
		instance_id?: string;
		/** UTC UNIX timestamp of the current time according to the server. In milliseconds. */
		now?: number;
		/** UTC UNIX timestamp of when the server started. In milliseconds. */
		born?: number;
		/** Total time the IBP console server has been running. */
		up_time?: string;
		memory_usage?: GetAthenaHealthStatsResponseOPTOOLSMemoryUsage;
		session_cache_stats?: CacheData;
		couch_cache_stats?: CacheData;
		iam_cache_stats?: CacheData;
		proxy_cache?: CacheData;
	}

	/** GetAthenaHealthStatsResponseOPTOOLSMemoryUsage. */
	export interface GetAthenaHealthStatsResponseOPTOOLSMemoryUsage {
		/** Resident set size - total memory allocated for the process. */
		rss?: string;
		/** Memory allocated for the heap of V8. */
		heapTotal?: string;
		/** Current heap used by V8. */
		heapUsed?: string;
		/** Memory used by bound C++ objects. */
		external?: string;
	}

	/** GetAthenaHealthStatsResponseOS. */
	export interface GetAthenaHealthStatsResponseOS {
		/** CPU architecture. */
		arch?: string;
		/** Operating system name. */
		type?: string;
		/** Endianness of the CPU. LE = Little Endian, BE = Big Endian. */
		endian?: string;
		/** CPU load in 1, 5, & 15 minute averages. n/a on windows. */
		loadavg?: number[];
		cpus?: CpuHealthStats[];
		/** Total memory known to the operating system. */
		total_memory?: string;
		/** Free memory on the operating system. */
		free_memory?: string;
		/** Time operating system has been running. */
		up_time?: string;
	}

	/** GetFabricVersionsResponse. */
	export interface GetFabricVersionsResponse {
		versions?: GetFabricVersionsResponseVersions;
	}

	/** GetFabricVersionsResponseVersions. */
	export interface GetFabricVersionsResponseVersions {
		/** A supported release of Fabric for this component type. */
		ca?: FabricVersionDictionary;
		/** A supported release of Fabric for this component type. */
		peer?: FabricVersionDictionary;
		/** A supported release of Fabric for this component type. */
		orderer?: FabricVersionDictionary;
	}

	/** GetMSPCertificateResponse. */
	export interface GetMSPCertificateResponse {
		msps?: MspPublicData[];
	}

	/** Contains the details of multiple components the UI has onboarded. */
	export interface GetMultiComponentsResponse {
		/** Array of components the UI has onboarded. */
		components?: GenericComponentResponse[];
	}

	/** GetNotificationsResponse. */
	export interface GetNotificationsResponse {
		/** Number of notifications in database. */
		total?: number;
		/** Number of notifications returned. */
		returning?: number;
		/** This array is ordered by creation date. */
		notifications?: NotificationData[];
	}

	/** Contains the details of all public settings for the UI. */
	export interface GetPublicSettingsResponse {
		/** The path to the activity tracker file. This file holds details of all activity. Defaults to '?' (disabled). */
		ACTIVITY_TRACKER_PATH?: string;
		/** Random/unique id for the process running the IBP console server. */
		ATHENA_ID?: string;
		/** The type of auth protecting the UI. */
		AUTH_SCHEME?: string;
		/** Route used for an SSO callback uri. Only used if AUTH_SCHEME is "iam". */
		CALLBACK_URI?: string;
		CLUSTER_DATA?: GetPublicSettingsResponseCLUSTERDATA;
		/** URL used for a configtxlator rest server. */
		CONFIGTXLATOR_URL?: string;
		/** metadata about the IBM Cloud service instance. [Only populated if using IBM Cloud]. */
		CRN?: GetPublicSettingsResponseCRN;
		CRN_STRING?: string;
		/** array of strings that define the Content Security Policy headers for the IBP console. */
		CSP_HEADER_VALUES?: string[];
		/** The id of the database for internal documents. */
		DB_SYSTEM?: string;
		/** URL of the companion application for the IBP console. */
		DEPLOYER_URL?: string;
		/** Browser cookies will use this value for their domain property. Thus it should match the URL's domain in the
		 *  browser. `null` is valid if serving over http.
		 */
		DOMAIN?: string;
		/** Either "dev" "staging" or "prod". Controls different security settings and minor things such as the amount
		 *  of time to cache content.
		 */
		ENVIRONMENT?: string;
		/** Contains the Hyperledger Fabric capabilities flags that should be used. */
		FABRIC_CAPABILITIES?: GetPublicSettingsResponseFABRICCAPABILITIES;
		/** Configures th IBP console to enable/disable features. */
		FEATURE_FLAGS?: JsonObject;
		/** File logging settings. */
		FILE_LOGGING?: GetPublicSettingsResponseFILELOGGING;
		/** The external URL to reach the IBP console. */
		HOST_URL?: string;
		/** If true an in memory cache will be used to interface with the IBM IAM (an authorization) service. [Only
		 *  applies if IBP is running in IBM Cloud].
		 */
		IAM_CACHE_ENABLED?: boolean;
		/** The URL to reach the IBM IAM service. [Only applies if IBP is running in IBM Cloud]. */
		IAM_URL?: string;
		/** The URL to use during SSO login with the IBM IAM service. [Only applies if IBP is running in IBM Cloud]. */
		IBM_ID_CALLBACK_URL?: string;
		/** If true the config file will not be loaded during startup. Thus settings in the config file will not take
		 *  effect.
		 */
		IGNORE_CONFIG_FILE?: boolean;
		INACTIVITY_TIMEOUTS?: GetPublicSettingsResponseINACTIVITYTIMEOUTS;
		/** What type of infrastructure is being used to run the IBP console. "ibmcloud", "azure", "other". */
		INFRASTRUCTURE?: string;
		LANDING_URL?: string;
		/** path for user login. */
		LOGIN_URI?: string;
		/** path for user logout. */
		LOGOUT_URI?: string;
		/** The number of `/api/_*` requests per minute to allow. Exceeding this limit results in 429 error responses. */
		MAX_REQ_PER_MIN?: number;
		/** The number of `/ak/api/_*` requests per minute to allow. Exceeding this limit results in 429 error
		 *  responses.
		 */
		MAX_REQ_PER_MIN_AK?: number;
		/** If true an in memory cache will be used against couchdb requests. */
		MEMORY_CACHE_ENABLED?: boolean;
		/** Internal port that IBP console is running on. */
		PORT?: number;
		/** If true an in memory cache will be used for internal proxy requests. */
		PROXY_CACHE_ENABLED?: boolean;
		/** If `"always"` requests to Fabric components will go through the IBP console server. If `true` requests to
		 *  Fabric components with IP based URLs will go through the IBP console server, while Fabric components with
		 *  hostname based URLs will go directly from the browser to the component. If `false` all requests to Fabric
		 *  components will go directly from the browser to the component.
		 */
		PROXY_TLS_FABRIC_REQS?: string;
		/** The URL to use to proxy an http request to a Fabric component. */
		PROXY_TLS_HTTP_URL?: string;
		/** The URL to use to proxy WebSocket request to a Fabric component. */
		PROXY_TLS_WS_URL?: string;
		/** If it's "local", things like https are disabled. */
		REGION?: string;
		/** If true an in memory cache will be used for browser session data. */
		SESSION_CACHE_ENABLED?: boolean;
		/** Various timeouts for different Fabric operations. */
		TIMEOUTS?: JsonObject;
		TIMESTAMPS?: SettingsTimestampData;
		/** Controls if Fabric transaction details are visible on the UI. */
		TRANSACTION_VISIBILITY?: JsonObject;
		/** Controls if proxy headers such as `X-Forwarded-*` should be parsed to gather data such as the client's IP. */
		TRUST_PROXY?: string;
		/** Controls if signatures in a signature collection APIs should skip verification or not. */
		TRUST_UNKNOWN_CERTS?: boolean;
		/** The various commit hashes of components powering this IBP console. */
		VERSIONS?: GetPublicSettingsResponseVERSIONS;
	}

	/** GetPublicSettingsResponseCLUSTERDATA. */
	export interface GetPublicSettingsResponseCLUSTERDATA {
		/** Indicates whether this is a paid or free IBP console. */
		type?: string;
	}

	/** metadata about the IBM Cloud service instance. [Only populated if using IBM Cloud]. */
	export interface GetPublicSettingsResponseCRN {
		account_id?: string;
		c_name?: string;
		c_type?: string;
		instance_id?: string;
		location?: string;
		resource_id?: string;
		resource_type?: string;
		service_name?: string;
		version?: string;
	}

	/** Contains the Hyperledger Fabric capabilities flags that should be used. */
	export interface GetPublicSettingsResponseFABRICCAPABILITIES {
		application?: string[];
		channel?: string[];
		orderer?: string[];
	}

	/** File logging settings. */
	export interface GetPublicSettingsResponseFILELOGGING {
		/** The logging settings for the client and server. */
		server?: LogSettingsResponse;
		/** The logging settings for the client and server. */
		client?: LogSettingsResponse;
	}

	/** GetPublicSettingsResponseINACTIVITYTIMEOUTS. */
	export interface GetPublicSettingsResponseINACTIVITYTIMEOUTS {
		enabled?: boolean;
		/** How long to wait before auto-logging out a user. In milliseconds. */
		max_idle_time?: number;
	}

	/** The various commit hashes of components powering this IBP console. */
	export interface GetPublicSettingsResponseVERSIONS {
		/** The commit hash of Apollo code (front-end). */
		apollo?: string;
		/** The commit hash of Athena code (back-end). */
		athena?: string;
		/** The commit hash of Stitch code (fabric-sdk). */
		stitch?: string;
		/** The tag of the build powering this IBP console. */
		tag?: string;
	}

	/** ImportCaBodyMsp. */
	export interface ImportCaBodyMsp {
		ca: ImportCaBodyMspCa;
		tlsca: ImportCaBodyMspTlsca;
		component: ImportCaBodyMspComponent;
	}

	/** ImportCaBodyMspCa. */
	export interface ImportCaBodyMspCa {
		/** The "name" to distinguish this CA from the TLS CA. */
		name: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the CA. */
		root_certs?: string[];
	}

	/** ImportCaBodyMspComponent. */
	export interface ImportCaBodyMspComponent {
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert: string;
	}

	/** ImportCaBodyMspTlsca. */
	export interface ImportCaBodyMspTlsca {
		/** The "name" to distinguish this CA from the other CA. */
		name: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the TLS CA. */
		root_certs?: string[];
	}

	/** The logging settings for the client and server. */
	export interface LogSettingsResponse {
		/** The client side (browser) logging settings. _Changes to this field will restart the IBP console server(s)_. */
		client?: LoggingSettingsClient;
		/** The server side logging settings. _Changes to this field will restart the IBP console server(s)_. */
		server?: LoggingSettingsServer;
	}

	/** The client side (browser) logging settings. _Changes to this field will restart the IBP console server(s)_. */
	export interface LoggingSettingsClient {
		/** If `true` logging will be stored to a file on the file system. */
		enabled?: boolean;
		/** Valid log levels: "error", "warn", "info", "verbose", "debug", or "silly". */
		level?: string;
		/** If `true` log file names will have a random suffix. */
		unique_name?: boolean;
	}

	/** The server side logging settings. _Changes to this field will restart the IBP console server(s)_. */
	export interface LoggingSettingsServer {
		/** If `true` logging will be stored to a file on the file system. */
		enabled?: boolean;
		/** Valid log levels: "error", "warn", "info", "verbose", "debug", or "silly". */
		level?: string;
		/** If `true` log file names will have a random suffix. */
		unique_name?: boolean;
	}

	/** Metrics. */
	export interface Metrics {
		/** Metrics provider to use. Can be either 'statsd', 'prometheus', or 'disabled'. */
		provider: string;
		statsd?: MetricsStatsd;
	}

	/** MetricsStatsd. */
	export interface MetricsStatsd {
		/** Either UDP or TCP. */
		network: string;
		/** The address of the statsd server. Include hostname/ip and port. */
		address: string;
		/** The frequency at which locally cached counters and gauges are pushed to statsd. */
		writeInterval: string;
		/** The string that is prepended to all emitted statsd metrics. */
		prefix: string;
	}

	/** MspCryptoCa. */
	export interface MspCryptoCa {
		/** An array that contains one or more base 64 encoded PEM CA root certificates. */
		root_certs: string[];
		/** An array that contains base 64 encoded PEM intermediate CA certificates. */
		ca_intermediate_certs?: string[];
	}

	/** MspCryptoComp. */
	export interface MspCryptoComp {
		/** An identity private key (base 64 encoded PEM) for this component (aka enrollment private key). */
		ekey: string;
		/** An identity certificate (base 64 encoded PEM) for this component that was signed by the CA (aka enrollment
		 *  certificate).
		 */
		ecert: string;
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admin_certs?: string[];
		/** A private key (base 64 encoded PEM) for this component's TLS. */
		tls_key: string;
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert: string;
		client_auth?: ClientAuth;
	}

	/** MspCryptoFieldCa. */
	export interface MspCryptoFieldCa {
		/** The CA's "CAName" attribute. This name is used to distinguish this CA from the TLS CA. */
		name?: string;
		/** An array that contains one or more base 64 encoded PEM CA root certificates. */
		root_certs?: string[];
	}

	/** MspCryptoFieldComponent. */
	export interface MspCryptoFieldComponent {
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert: string;
		/** An identity certificate (base 64 encoded PEM) for this component that was signed by the CA (aka enrollment
		 *  certificate).
		 */
		ecert?: string;
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admin_certs?: string[];
	}

	/** MspCryptoFieldTlsca. */
	export interface MspCryptoFieldTlsca {
		/** The TLS CA's "CAName" attribute. This name is used to distinguish this TLS CA from the other CA. */
		name?: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the TLS CA. */
		root_certs: string[];
	}

	/** MspPublicData. */
	export interface MspPublicData {
		/** The MSP id that is related to this component. */
		msp_id?: string;
		/** An array that contains one or more base 64 encoded PEM root certificates for the MSP. */
		root_certs?: string[];
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admins?: string[];
		/** An array that contains one or more base 64 encoded PEM TLS root certificates. */
		tls_root_certs?: string[];
	}

	/** Contains the details of an MSP (Membership Service Provider). */
	export interface MspResponse {
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** The type of this component. Such as: "fabric-peer", "fabric-ca", "fabric-orderer", etc. */
		type?: string;
		/** A descriptive name for this MSP. The IBP console tile displays this name. */
		display_name?: string;
		/** The MSP id that is related to this component. */
		msp_id?: string;
		/** UTC UNIX timestamp of component onboarding to the UI. In milliseconds. */
		timestamp?: number;
		tags?: string[];
		/** An array that contains one or more base 64 encoded PEM root certificates for the MSP. */
		root_certs?: string[];
		/** An array that contains base 64 encoded PEM intermediate certificates. */
		intermediate_certs?: string[];
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admins?: string[];
		/** The versioning of the IBP console format of this JSON. */
		scheme_version?: string;
		/** An array that contains one or more base 64 encoded PEM TLS root certificates. */
		tls_root_certs?: string[];
	}

	/** NotificationData. */
	export interface NotificationData {
		/** Unique id for the notification. */
		id?: string;
		/** Values can be "notification", "webhook_tx" or "other". */
		type?: string;
		/** Values can be "pending", "error", or "success". */
		status?: string;
		/** The end user who initiated the action for the notification. */
		by?: string;
		/** Text describing the outcome of the transaction. */
		message?: string;
		/** UTC UNIX timestamp of the notification's creation. In milliseconds. */
		ts_display?: number;
	}

	/** Contains the details of an ordering node. */
	export interface OrdererResponse {
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** The unique id for the component in Kubernetes. Not available if component was imported. */
		dep_component_id?: string;
		/** The gRPC URL for the orderer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		api_url?: string;
		/** A descriptive base name for each ordering node. One or more child IBP console tiles display this name. */
		display_name?: string;
		/** A unique id to identify this ordering service cluster. */
		cluster_id?: string;
		/** A descriptive name for the ordering service. The parent IBP console orderer tile displays this name. */
		cluster_name?: string;
		/** The gRPC web proxy URL in front of the orderer. Include the protocol, hostname/ip and port. */
		grpcwp_url?: string;
		/** Indicates where the component is running. */
		location?: string;
		/** Used by Fabric health checker to monitor the health status of this orderer node. For more information, see
		 *  [Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html).
		 *  Include the protocol, hostname/ip and port.
		 */
		operations_url?: string;
		/** The type of Fabric orderer. Currently, only the type `"raft"` is supported.
		 *  [etcd/raft](/docs/blockchain?topic=blockchain-ibp-console-build-network#ibp-console-build-network-ordering-console).
		 */
		orderer_type?: string;
		/** The **cached** configuration override that was set for the Kubernetes deployment. Field does not exist if an
		 *  override was not set of if the component was imported.
		 */
		config_override?: JsonObject;
		/** The state of a pre-created orderer node. A value of `true` means that the orderer node was added as a system
		 *  channel consenter. This is a manual field. Set it yourself after finishing the raft append flow to indicate that
		 *  this node is ready for use. See the [Submit config block to orderer](#submit-block) API description for more
		 *  details about appending raft nodes.
		 */
		consenter_proposal_fin?: boolean;
		node_ou?: NodeOu;
		/** The msp crypto data. */
		msp?: MspCryptoField;
		/** The MSP id that is related to this component. */
		msp_id?: string;
		/** The **cached** Kubernetes resource attributes for this component. Not available if orderer was imported. */
		resources?: OrdererResponseResources;
		/** The versioning of the IBP console format of this JSON. */
		scheme_version?: string;
		/** The **cached** Kubernetes storage attributes for this component. Not available if orderer was imported. */
		storage?: OrdererResponseStorage;
		/** The name of the system channel. Defaults to `testchainid`. */
		system_channel_id?: string;
		tags?: string[];
		/** UTC UNIX timestamp of component onboarding to the UI. In milliseconds. */
		timestamp?: number;
		/** The type of this component. Such as: "fabric-peer", "fabric-ca", "fabric-orderer", etc. */
		type?: string;
		/** The cached Hyperledger Fabric release version. */
		version?: string;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
	}

	/** The **cached** Kubernetes resource attributes for this component. Not available if orderer was imported. */
	export interface OrdererResponseResources {
		orderer?: GenericResources;
		proxy?: GenericResources;
	}

	/** The **cached** Kubernetes storage attributes for this component. Not available if orderer was imported. */
	export interface OrdererResponseStorage {
		orderer?: StorageObject;
	}

	/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
	export interface PeerResources {
		/** This field requires the use of Fabric v2.1.* and higher. */
		chaincodelauncher?: ResourceObjectFabV2;
		/** *Legacy field name* Use the field `statedb` instead. This field requires the use of Fabric v1.4.* and
		 *  higher.
		 */
		couchdb?: ResourceObjectCouchDb;
		/** This field requires the use of Fabric v1.4.* and higher. */
		statedb?: ResourceObject;
		/** This field requires the use of Fabric v1.4.* and **lower**. */
		dind?: ResourceObjectFabV1;
		/** This field requires the use of Fabric v1.4.* and **lower**. */
		fluentd?: ResourceObjectFabV1;
		/** This field requires the use of Fabric v1.4.* and higher. */
		peer?: ResourceObject;
		/** This field requires the use of Fabric v1.4.* and higher. */
		proxy?: ResourceObject;
	}

	/** Contains the details of a peer. */
	export interface PeerResponse {
		/** The unique identifier of this component. Must start with a letter, be lowercase and only contain letters and
		 *  numbers. If `id` is not provide a component id will be generated using the field `display_name` as the base.
		 */
		id?: string;
		/** The unique id for the component in Kubernetes. Not available if component was imported. */
		dep_component_id?: string;
		/** The gRPC URL for the peer. Typically, client applications would send requests to this URL. Include the
		 *  protocol, hostname/ip and port.
		 */
		api_url?: string;
		/** A descriptive name for this peer. The IBP console tile displays this name. */
		display_name?: string;
		/** The gRPC web proxy URL in front of the peer. Include the protocol, hostname/ip and port. */
		grpcwp_url?: string;
		/** Indicates where the component is running. */
		location?: string;
		/** Used by Fabric health checker to monitor the health status of this peer. For more information, see [Fabric
		 *  documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/operations_service.html). Include the
		 *  protocol, hostname/ip and port.
		 */
		operations_url?: string;
		/** The **cached** configuration override that was set for the Kubernetes deployment. Field does not exist if an
		 *  override was not set of if the component was imported.
		 */
		config_override?: JsonObject;
		node_ou?: NodeOu;
		/** The msp crypto data. */
		msp?: MspCryptoField;
		/** The MSP id that is related to this component. */
		msp_id?: string;
		/** The **cached** Kubernetes resource attributes for this component. Not available if peer was imported. */
		resources?: PeerResponseResources;
		/** The versioning of the IBP console format of this JSON. */
		scheme_version?: string;
		/** Select the state database for the peer. Can be either "couchdb" or "leveldb". The default is "couchdb". */
		state_db?: string;
		/** The **cached** Kubernetes storage attributes for this component. Not available if peer was imported. */
		storage?: PeerResponseStorage;
		tags?: string[];
		/** UTC UNIX timestamp of component onboarding to the UI. In milliseconds. */
		timestamp?: number;
		/** The type of this component. Such as: "fabric-peer", "fabric-ca", "fabric-orderer", etc. */
		type?: string;
		/** The cached Hyperledger Fabric release version. */
		version?: string;
		/** Specify the Kubernetes zone for the deployment. The deployment will use a k8s node in this zone. Find the
		 *  list of possible zones by retrieving your Kubernetes node labels: `kubectl get nodes --show-labels`. [More
		 *  information](https://kubernetes.io/docs/setup/best-practices/multiple-zones).
		 */
		zone?: string;
	}

	/** The **cached** Kubernetes resource attributes for this component. Not available if peer was imported. */
	export interface PeerResponseResources {
		peer?: GenericResources;
		proxy?: GenericResources;
		statedb?: GenericResources;
	}

	/** The **cached** Kubernetes storage attributes for this component. Not available if peer was imported. */
	export interface PeerResponseStorage {
		peer?: StorageObject;
		statedb?: StorageObject;
	}

	/** RemoveMultiComponentsResponse. */
	export interface RemoveMultiComponentsResponse {
		removed?: DeleteComponentResponse[];
	}

	/** ResourceLimits. */
	export interface ResourceLimits {
		/** Maximum CPU for subcomponent. Must be >= "requests.cpu". Defaults to the same value in "requests.cpu".
		 *  [Resource
		 *  details](/docs/blockchain?topic=blockchain-ibp-console-govern-components#ibp-console-govern-components-allocate-resources).
		 */
		cpu?: string;
		/** Maximum memory for subcomponent. Must be >= "requests.memory". Defaults to the same value in
		 *  "requests.memory". [Resource
		 *  details](/docs/blockchain?topic=blockchain-ibp-console-govern-components#ibp-console-govern-components-allocate-resources).
		 */
		memory?: string;
	}

	/** This field requires the use of Fabric v1.4.* and higher. */
	export interface ResourceObject {
		requests: ResourceRequests;
		limits?: ResourceLimits;
	}

	/** *Legacy field name* Use the field `statedb` instead. This field requires the use of Fabric v1.4.* and higher. */
	export interface ResourceObjectCouchDb {
		requests: ResourceRequests;
		limits?: ResourceLimits;
	}

	/** This field requires the use of Fabric v1.4.* and **lower**. */
	export interface ResourceObjectFabV1 {
		requests: ResourceRequests;
		limits?: ResourceLimits;
	}

	/** This field requires the use of Fabric v2.1.* and higher. */
	export interface ResourceObjectFabV2 {
		requests: ResourceRequests;
		limits?: ResourceLimits;
	}

	/** ResourceRequests. */
	export interface ResourceRequests {
		/** Desired CPU for subcomponent. [Resource
		 *  details](/docs/blockchain?topic=blockchain-ibp-console-govern-components#ibp-console-govern-components-allocate-resources).
		 */
		cpu?: string;
		/** Desired memory for subcomponent. [Resource
		 *  details](/docs/blockchain?topic=blockchain-ibp-console-govern-components#ibp-console-govern-components-allocate-resources).
		 */
		memory?: string;
	}

	/** RestartAthenaResponse. */
	export interface RestartAthenaResponse {
		/** Text describing the outcome of the api. */
		message?: string;
	}

	/** SettingsTimestampData. */
	export interface SettingsTimestampData {
		/** UTC UNIX timestamp of the current time according to the server. In milliseconds. */
		now?: number;
		/** UTC UNIX timestamp of when the server started. In milliseconds. */
		born?: number;
		/** Time remaining until the server performs a hard-refresh of its settings. */
		next_settings_update?: string;
		/** Total time the IBP console server has been running. */
		up_time?: string;
	}

	/** StorageObject. */
	export interface StorageObject {
		/** Maximum disk space for subcomponent. [Resource
		 *  details](/docs/blockchain?topic=blockchain-ibp-console-govern-components#ibp-console-govern-components-allocate-resources).
		 */
		size?: string;
		/** Kubernetes storage class for subcomponent's disk space. */
		class?: string;
	}

	/** Update the [Fabric CA configuration file](https://hyperledger-fabric-ca.readthedocs.io/en/release-1.4/serverconfig.html) if you want use custom attributes to configure advanced CA features. Omit if not. *The nested field **names** below are not case-sensitive.* *The nested fields sent will be merged with the existing settings.*. */
	export interface UpdateCaBodyConfigOverride {
		ca: ConfigCAUpdate;
	}

	/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
	export interface UpdateCaBodyResources {
		/** This field requires the use of Fabric v1.4.* and higher. */
		ca: ResourceObject;
	}

	/** Edit the `enrollment` crypto data of this component. Editing the `enrollment` field is only possible if this component was created using the `crypto.enrollment` field, else see the `crypto.msp` field. */
	export interface UpdateEnrollmentCryptoField {
		component?: CryptoEnrollmentComponent;
		ca?: UpdateEnrollmentCryptoFieldCa;
		tlsca?: UpdateEnrollmentCryptoFieldTlsca;
	}

	/** UpdateEnrollmentCryptoFieldCa. */
	export interface UpdateEnrollmentCryptoFieldCa {
		/** The CA's hostname. Do not include protocol or port. */
		host?: string;
		/** The CA's port. */
		port?: number;
		/** The CA's "CAName" attribute. This name is used to distinguish this CA from the TLS CA. */
		name?: string;
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert?: string;
		/** The username of the enroll id. */
		enroll_id?: string;
		/** The password of the enroll id. */
		enroll_secret?: string;
	}

	/** UpdateEnrollmentCryptoFieldTlsca. */
	export interface UpdateEnrollmentCryptoFieldTlsca {
		/** The CA's hostname. Do not include protocol or port. */
		host?: string;
		/** The CA's port. */
		port?: number;
		/** The TLS CA's "CAName" attribute. This name is used to distinguish this TLS CA from the other CA. */
		name?: string;
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert?: string;
		/** The username of the enroll id. */
		enroll_id?: string;
		/** The password of the enroll id. */
		enroll_secret?: string;
		csr_hosts?: string[];
	}

	/** Edit the `msp` crypto data of this component. Editing the `msp` field is only possible if this component was created using the `crypto.msp` field, else see the `crypto.enrollment` field. */
	export interface UpdateMspCryptoField {
		ca?: UpdateMspCryptoFieldCa;
		tlsca?: UpdateMspCryptoFieldTlsca;
		component?: UpdateMspCryptoFieldComponent;
	}

	/** UpdateMspCryptoFieldCa. */
	export interface UpdateMspCryptoFieldCa {
		/** An array that contains one or more base 64 encoded PEM CA root certificates. */
		root_certs?: string[];
		/** An array that contains base 64 encoded PEM intermediate CA certificates. */
		ca_intermediate_certs?: string[];
	}

	/** UpdateMspCryptoFieldComponent. */
	export interface UpdateMspCryptoFieldComponent {
		/** An identity private key (base 64 encoded PEM) for this component (aka enrollment private key). */
		ekey?: string;
		/** An identity certificate (base 64 encoded PEM) for this component that was signed by the CA (aka enrollment
		 *  certificate).
		 */
		ecert?: string;
		/** An array that contains base 64 encoded PEM identity certificates for administrators. Also known as signing
		 *  certificates of an organization administrator.
		 */
		admin_certs?: string[];
		/** A private key (base 64 encoded PEM) for this component's TLS. */
		tls_key?: string;
		/** The TLS certificate as base 64 encoded PEM. Certificate is used to secure/validate a TLS connection with
		 *  this component.
		 */
		tls_cert?: string;
		client_auth?: ClientAuth;
	}

	/** UpdateMspCryptoFieldTlsca. */
	export interface UpdateMspCryptoFieldTlsca {
		/** An array that contains one or more base 64 encoded PEM CA root certificates. */
		root_certs?: string[];
		/** An array that contains base 64 encoded PEM intermediate CA certificates. */
		ca_intermediate_certs?: string[];
	}

	/** UpdateOrdererBodyCrypto. */
	export interface UpdateOrdererBodyCrypto {
		/** Edit the `enrollment` crypto data of this component. Editing the `enrollment` field is only possible if this
		 *  component was created using the `crypto.enrollment` field, else see the `crypto.msp` field.
		 */
		enrollment?: UpdateEnrollmentCryptoField;
		/** Edit the `msp` crypto data of this component. Editing the `msp` field is only possible if this component was
		 *  created using the `crypto.msp` field, else see the `crypto.enrollment` field.
		 */
		msp?: UpdateMspCryptoField;
	}

	/** CPU and memory properties. This feature is not available if using a free Kubernetes cluster. */
	export interface UpdateOrdererBodyResources {
		/** This field requires the use of Fabric v1.4.* and higher. */
		orderer?: ResourceObject;
		/** This field requires the use of Fabric v1.4.* and higher. */
		proxy?: ResourceObject;
	}

	/** UpdatePeerBodyCrypto. */
	export interface UpdatePeerBodyCrypto {
		/** Edit the `enrollment` crypto data of this component. Editing the `enrollment` field is only possible if this
		 *  component was created using the `crypto.enrollment` field, else see the `crypto.msp` field.
		 */
		enrollment?: UpdateEnrollmentCryptoField;
		/** Edit the `msp` crypto data of this component. Editing the `msp` field is only possible if this component was
		 *  created using the `crypto.msp` field, else see the `crypto.enrollment` field.
		 */
		msp?: UpdateMspCryptoField;
	}

	/** ActionEnroll. */
	export interface ActionEnroll {
		/** Set to `true` to generate a new tls cert for this component via enrollment. */
		tls_cert?: boolean;
		/** Set to `true` to generate a new ecert for this component via enrollment. */
		ecert?: boolean;
	}

	/** ActionReenroll. */
	export interface ActionReenroll {
		/** Set to `true` to generate a new tls cert for this component via re-enrollment. */
		tls_cert?: boolean;
		/** Set to `true` to generate a new ecert for this component via re-enrollment. */
		ecert?: boolean;
	}

	/** ActionRenew. */
	export interface ActionRenew {
		/** Set to `true` to renew the tls cert for this component. */
		tls_cert?: boolean;
	}

	/** ClientAuth. */
	export interface ClientAuth {
		type?: string;
		tls_certs?: string[];
	}

	/** The connection details of the HSM (Hardware Security Module). */
	export interface Hsm {
		/** The url to the HSM. Include the protocol, hostname, and port. */
		pkcs11endpoint: string;
	}

	/** IdentityAttrs. */
	export interface IdentityAttrs {
		'hf.Registrar.Roles'?: string;
		'hf.Registrar.DelegateRoles'?: string;
		'hf.Revoker'?: boolean;
		/** If `true` the CA **can** be an intermediate CA. */
		'hf.IntermediateCA'?: boolean;
		'hf.GenCRL'?: boolean;
		'hf.Registrar.Attributes'?: string;
		'hf.AffiliationMgr'?: boolean;
	}

	/** The msp crypto data. */
	export interface MspCryptoField {
		ca?: MspCryptoFieldCa;
		tlsca: MspCryptoFieldTlsca;
		component: MspCryptoFieldComponent;
	}

	/** NodeOu. */
	export interface NodeOu {
		/** Indicates if node OUs are enabled or not. */
		enabled?: boolean;
	}

	/** NodeOuGeneral. */
	export interface NodeOuGeneral {
		/** Indicates if node OUs are enabled or not. [Available on peer/orderer components w/query parameter
		 *  'deployment_attrs'].
		 */
		enabled?: boolean;
	}

}

export = BlockchainV3;
