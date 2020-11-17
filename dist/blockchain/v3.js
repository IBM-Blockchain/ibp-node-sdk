"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * IBM OpenAPI SDK Code Generator Version: 3.19.0-be3b4618-20201113-200858
 */
var extend = require("extend");
var ibm_cloud_sdk_core_1 = require("ibm-cloud-sdk-core");
var common_1 = require("../lib/common");
/**
 * This doc lists APIs that you can use to interact with your IBM Blockchain Platform console (IBP console)
 */
var BlockchainV3 = /** @class */ (function (_super) {
    __extends(BlockchainV3, _super);
    /**
     * Construct a BlockchainV3 object.
     *
     * @param {Object} options - Options for the service.
     * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
     * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
     * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
     * @constructor
     * @returns {BlockchainV3}
     */
    function BlockchainV3(options) {
        var _this = this;
        options = options || {};
        _this = _super.call(this, options) || this;
        if (options.serviceUrl) {
            _this.setServiceUrl(options.serviceUrl);
        }
        return _this;
    }
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
    BlockchainV3.newInstance = function (options) {
        options = options || {};
        if (!options.serviceName) {
            options.serviceName = this.DEFAULT_SERVICE_NAME;
        }
        if (!options.authenticator) {
            options.authenticator = ibm_cloud_sdk_core_1.getAuthenticatorFromEnvironment(options.serviceName);
        }
        var service = new BlockchainV3(options);
        service.configureService(options.serviceName);
        if (options.serviceUrl) {
            service.setServiceUrl(options.serviceUrl);
        }
        return service;
    };
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
    BlockchainV3.prototype.getComponent = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var query = {
            'deployment_attrs': _params.deploymentAttrs,
            'parsed_certs': _params.parsedCerts,
            'cache': _params.cache,
            'ca_attrs': _params.caAttrs
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getComponent');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/{id}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.removeComponent = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'removeComponent');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/{id}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.deleteComponent = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteComponent');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/{id}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
     * *The field **names** below are not case-sensitive.*.
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
    BlockchainV3.prototype.createCa = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['displayName', 'configOverride'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'display_name': _params.displayName,
            'config_override': _params.configOverride,
            'resources': _params.resources,
            'storage': _params.storage,
            'zone': _params.zone,
            'replicas': _params.replicas,
            'tags': _params.tags,
            'hsm': _params.hsm,
            'region': _params.region,
            'version': _params.version
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'createCa');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-ca',
                method: 'POST',
                body: body,
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
    ;
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
     * @param {string} [params.location] - Indicates where the component is running.
     * @param {string} [params.operationsUrl] - The operations URL for the CA. Include the protocol, hostname/ip and port.
     * @param {string[]} [params.tags] -
     * @param {string} [params.tlsCert] - The TLS certificate as base 64 encoded PEM. Certificate is used to
     * secure/validate a TLS connection with this component.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<BlockchainV3.Response<BlockchainV3.CaResponse>>}
     */
    BlockchainV3.prototype.importCa = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['displayName', 'apiUrl', 'msp'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'display_name': _params.displayName,
            'api_url': _params.apiUrl,
            'msp': _params.msp,
            'location': _params.location,
            'operations_url': _params.operationsUrl,
            'tags': _params.tags,
            'tls_cert': _params.tlsCert
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importCa');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/fabric-ca',
                method: 'POST',
                body: body,
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
    ;
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
     * *The field **names** below are not case-sensitive.*.
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
    BlockchainV3.prototype.updateCa = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'config_override': _params.configOverride,
            'replicas': _params.replicas,
            'resources': _params.resources,
            'version': _params.version,
            'zone': _params.zone
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'updateCa');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-ca/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.editCa = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'display_name': _params.displayName,
            'api_url': _params.apiUrl,
            'operations_url': _params.operationsUrl,
            'ca_name': _params.caName,
            'location': _params.location,
            'tags': _params.tags
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editCa');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/fabric-ca/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.caAction = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'restart': _params.restart,
            'renew': _params.renew
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'caAction');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-ca/{id}/actions',
                method: 'POST',
                body: body,
                path: path,
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
    ;
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
     * @param {ConfigPeerCreate} [params.configOverride] - Override the [Fabric Peer configuration
     * file](https://github.com/hyperledger/fabric/blob/release-1.4/sampleconfig/core.yaml) if you want use custom
     * attributes to configure the Peer. Omit if not.
     *
     * *The field **names** below are not case-sensitive.*.
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
    BlockchainV3.prototype.createPeer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['mspId', 'displayName', 'crypto'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'msp_id': _params.mspId,
            'display_name': _params.displayName,
            'crypto': _params.crypto,
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
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'createPeer');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-peer',
                method: 'POST',
                body: body,
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
    ;
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
    BlockchainV3.prototype.importPeer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['displayName', 'grpcwpUrl', 'msp', 'mspId'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'display_name': _params.displayName,
            'grpcwp_url': _params.grpcwpUrl,
            'msp': _params.msp,
            'msp_id': _params.mspId,
            'api_url': _params.apiUrl,
            'location': _params.location,
            'operations_url': _params.operationsUrl,
            'tags': _params.tags
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importPeer');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/fabric-peer',
                method: 'POST',
                body: body,
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
    ;
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
    BlockchainV3.prototype.editPeer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'display_name': _params.displayName,
            'api_url': _params.apiUrl,
            'operations_url': _params.operationsUrl,
            'grpcwp_url': _params.grpcwpUrl,
            'msp_id': _params.mspId,
            'location': _params.location,
            'tags': _params.tags
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editPeer');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/fabric-peer/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.peerAction = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'restart': _params.restart,
            'reenroll': _params.reenroll,
            'enroll': _params.enroll,
            'upgrade_dbs': _params.upgradeDbs
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'peerAction');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-peer/{id}/actions',
                method: 'POST',
                body: body,
                path: path,
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
    ;
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
     * *The field **names** below are not case-sensitive.*.
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
    BlockchainV3.prototype.updatePeer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'admin_certs': _params.adminCerts,
            'config_override': _params.configOverride,
            'crypto': _params.crypto,
            'node_ou': _params.nodeOu,
            'replicas': _params.replicas,
            'resources': _params.resources,
            'version': _params.version,
            'zone': _params.zone
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'updatePeer');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-peer/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
     * @param {string} [params.externalAppend] - Set to `true` only if you are appending to an unknown (external) OS
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
     * @returns {Promise<BlockchainV3.Response<BlockchainV3.OrdererResponse>>}
     */
    BlockchainV3.prototype.createOrderer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['ordererType', 'mspId', 'displayName', 'crypto'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'orderer_type': _params.ordererType,
            'msp_id': _params.mspId,
            'display_name': _params.displayName,
            'crypto': _params.crypto,
            'cluster_name': _params.clusterName,
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
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'createOrderer');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-orderer',
                method: 'POST',
                body: body,
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
    ;
    /**
     * Import an ordering service.
     *
     * Import an existing Ordering Service (OS) to your IBP console. It is recommended to only import components that were
     * created by this or another IBP console.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.clusterName - A descriptive name for an ordering service. The parent IBP console tile
     * displays this name.
     * @param {string} params.displayName - A descriptive base name for each ordering node. One or more child IBP console
     * tiles display this name.
     * @param {string} params.grpcwpUrl - The gRPC web proxy URL in front of the orderer. Include the protocol,
     * hostname/ip and port.
     * @param {MspCryptoField} params.msp - The msp crypto data.
     * @param {string} params.mspId - The MSP id that is related to this component.
     * @param {string} [params.apiUrl] - The gRPC URL for the orderer. Typically, client applications would send requests
     * to this URL. Include the protocol, hostname/ip and port.
     * @param {string} [params.clusterId] - A unique id to identify this rafter cluster. Generated if not provided.
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
    BlockchainV3.prototype.importOrderer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['clusterName', 'displayName', 'grpcwpUrl', 'msp', 'mspId'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'cluster_name': _params.clusterName,
            'display_name': _params.displayName,
            'grpcwp_url': _params.grpcwpUrl,
            'msp': _params.msp,
            'msp_id': _params.mspId,
            'api_url': _params.apiUrl,
            'cluster_id': _params.clusterId,
            'location': _params.location,
            'operations_url': _params.operationsUrl,
            'system_channel_id': _params.systemChannelId,
            'tags': _params.tags
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importOrderer');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/fabric-orderer',
                method: 'POST',
                body: body,
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
    ;
    /**
     * Edit data about an orderer.
     *
     * Modify local metadata fields of a single node in an Ordering Service (OS). For example, the "display_name" field.
     * This API will **not** change any Kubernetes deployment attributes for the node.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.id - The `id` of the component to modify. Use the [Get all components](#list_components) API
     * to determine the component id.
     * @param {string} [params.clusterName] - A descriptive name for an ordering service. The parent IBP console tile
     * displays this name.
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
    BlockchainV3.prototype.editOrderer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
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
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editOrderer');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/fabric-orderer/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.ordererAction = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'restart': _params.restart,
            'reenroll': _params.reenroll,
            'enroll': _params.enroll
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'ordererAction');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-orderer/{id}/actions',
                method: 'POST',
                body: body,
                path: path,
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
    ;
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
     * *The field **names** below are not case-sensitive.*.
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
    BlockchainV3.prototype.updateOrderer = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'admin_certs': _params.adminCerts,
            'config_override': _params.configOverride,
            'crypto': _params.crypto,
            'node_ou': _params.nodeOu,
            'replicas': _params.replicas,
            'resources': _params.resources,
            'version': _params.version,
            'zone': _params.zone
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'updateOrderer');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/fabric-orderer/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.submitBlock = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'b64_block': _params.b64Block
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'submitBlock');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/{id}/config',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.importMsp = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['mspId', 'displayName', 'rootCerts'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'msp_id': _params.mspId,
            'display_name': _params.displayName,
            'root_certs': _params.rootCerts,
            'intermediate_certs': _params.intermediateCerts,
            'admins': _params.admins,
            'tls_root_certs': _params.tlsRootCerts
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'importMsp');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/msp',
                method: 'POST',
                body: body,
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
    ;
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
    BlockchainV3.prototype.editMsp = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'msp_id': _params.mspId,
            'display_name': _params.displayName,
            'root_certs': _params.rootCerts,
            'intermediate_certs': _params.intermediateCerts,
            'admins': _params.admins,
            'tls_root_certs': _params.tlsRootCerts
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editMsp');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/msp/{id}',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.getMspCertificate = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['mspId'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var query = {
            'cache': _params.cache
        };
        var path = {
            'msp_id': _params.mspId
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getMspCertificate');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/msps/{msp_id}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.editAdminCerts = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'append_admin_certs': _params.appendAdminCerts,
            'remove_admin_certs': _params.removeAdminCerts
        };
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editAdminCerts');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/{id}/certs',
                method: 'PUT',
                body: body,
                path: path,
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
    ;
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
    BlockchainV3.prototype.listComponents = function (params) {
        var _params = Object.assign({}, params);
        var query = {
            'deployment_attrs': _params.deploymentAttrs,
            'parsed_certs': _params.parsedCerts,
            'cache': _params.cache,
            'ca_attrs': _params.caAttrs
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'listComponents');
        var parameters = {
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
    ;
    /**
     * Get components of a type.
     *
     * Get the IBP console's data on components that are a specific type. The component might be imported or created.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.componentType - The type to filter components on.
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
    BlockchainV3.prototype.getComponentsByType = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['componentType'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var query = {
            'deployment_attrs': _params.deploymentAttrs,
            'parsed_certs': _params.parsedCerts,
            'cache': _params.cache
        };
        var path = {
            'component-type': _params.componentType
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getComponentsByType');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/types/{component-type}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.getComponentByTag = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['tag'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var query = {
            'deployment_attrs': _params.deploymentAttrs,
            'parsed_certs': _params.parsedCerts,
            'cache': _params.cache
        };
        var path = {
            'tag': _params.tag
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getComponentByTag');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/tags/{tag}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.removeComponentsByTag = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['tag'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'tag': _params.tag
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'removeComponentsByTag');
        var parameters = {
            options: {
                url: '/ak/api/v3/components/tags/{tag}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.deleteComponentsByTag = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['tag'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'tag': _params.tag
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteComponentsByTag');
        var parameters = {
            options: {
                url: '/ak/api/v3/kubernetes/components/tags/{tag}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.deleteAllComponents = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteAllComponents');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.getSettings = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getSettings');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.editSettings = function (params) {
        var _params = Object.assign({}, params);
        var body = {
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
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'editSettings');
        var parameters = {
            options: {
                url: '/ak/api/v3/settings',
                method: 'PUT',
                body: body,
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
    ;
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
    BlockchainV3.prototype.getFabVersions = function (params) {
        var _params = Object.assign({}, params);
        var query = {
            'cache': _params.cache
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getFabVersions');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.getHealth = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getHealth');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.listNotifications = function (params) {
        var _params = Object.assign({}, params);
        var query = {
            'limit': _params.limit,
            'skip': _params.skip,
            'component_id': _params.componentId
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'listNotifications');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.deleteSigTx = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['id'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'id': _params.id
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteSigTx');
        var parameters = {
            options: {
                url: '/ak/api/v3/signature_collections/{id}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    ;
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
    BlockchainV3.prototype.archiveNotifications = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['notificationIds'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'notification_ids': _params.notificationIds
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'archiveNotifications');
        var parameters = {
            options: {
                url: '/ak/api/v3/notifications/bulk',
                method: 'POST',
                body: body,
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
    ;
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
    BlockchainV3.prototype.restart = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'restart');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.deleteAllSessions = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteAllSessions');
        var parameters = {
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
    ;
    /**
     * Delete all notifications.
     *
     * Delete all notifications. This API is intended for administration.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<BlockchainV3.Response<BlockchainV3.DeleteAllNotificationsResponse>>}
     */
    BlockchainV3.prototype.deleteAllNotifications = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteAllNotifications');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.clearCaches = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'clearCaches');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.getPostman = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['authType'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var query = {
            'auth_type': _params.authType,
            'token': _params.token,
            'api_key': _params.apiKey,
            'username': _params.username,
            'password': _params.password
        };
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getPostman');
        var parameters = {
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
    ;
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
    BlockchainV3.prototype.getSwagger = function (params) {
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(BlockchainV3.DEFAULT_SERVICE_NAME, 'v3', 'getSwagger');
        var parameters = {
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
    ;
    BlockchainV3.DEFAULT_SERVICE_NAME = 'blockchain';
    return BlockchainV3;
}(ibm_cloud_sdk_core_1.BaseService));
/*************************
 * interfaces
 ************************/
(function (BlockchainV3) {
    /** Constants for the `getComponent` operation. */
    var GetComponentConstants;
    (function (GetComponentConstants) {
        /** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
        var DeploymentAttrs;
        (function (DeploymentAttrs) {
            DeploymentAttrs["INCLUDED"] = "included";
            DeploymentAttrs["OMITTED"] = "omitted";
        })(DeploymentAttrs = GetComponentConstants.DeploymentAttrs || (GetComponentConstants.DeploymentAttrs = {}));
        /** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
        var ParsedCerts;
        (function (ParsedCerts) {
            ParsedCerts["INCLUDED"] = "included";
            ParsedCerts["OMITTED"] = "omitted";
        })(ParsedCerts = GetComponentConstants.ParsedCerts || (GetComponentConstants.ParsedCerts = {}));
        /** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
        var Cache;
        (function (Cache) {
            Cache["SKIP"] = "skip";
            Cache["USE"] = "use";
        })(Cache = GetComponentConstants.Cache || (GetComponentConstants.Cache = {}));
        /** Set to 'included' if the response should fetch CA attributes, inspect certificates, and append extra fields to CA and MSP component responses. - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA, such as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not include these fields. - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console CA that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported/created CAs are checked. Default responses will not include these fields. */
        var CaAttrs;
        (function (CaAttrs) {
            CaAttrs["INCLUDED"] = "included";
            CaAttrs["OMITTED"] = "omitted";
        })(CaAttrs = GetComponentConstants.CaAttrs || (GetComponentConstants.CaAttrs = {}));
    })(GetComponentConstants = BlockchainV3.GetComponentConstants || (BlockchainV3.GetComponentConstants = {}));
    /** Constants for the `createPeer` operation. */
    var CreatePeerConstants;
    (function (CreatePeerConstants) {
        /** Select the state database for the peer. Can be either "couchdb" or "leveldb". The default is "couchdb". */
        var StateDb;
        (function (StateDb) {
            StateDb["COUCHDB"] = "couchdb";
            StateDb["LEVELDB"] = "leveldb";
        })(StateDb = CreatePeerConstants.StateDb || (CreatePeerConstants.StateDb = {}));
    })(CreatePeerConstants = BlockchainV3.CreatePeerConstants || (BlockchainV3.CreatePeerConstants = {}));
    /** Constants for the `createOrderer` operation. */
    var CreateOrdererConstants;
    (function (CreateOrdererConstants) {
        /** The type of Fabric orderer. Currently, only the type `"raft"` is supported. [etcd/raft](/docs/blockchain?topic=blockchain-ibp-console-build-network#ibp-console-build-network-ordering-console). */
        var OrdererType;
        (function (OrdererType) {
            OrdererType["RAFT"] = "raft";
        })(OrdererType = CreateOrdererConstants.OrdererType || (CreateOrdererConstants.OrdererType = {}));
    })(CreateOrdererConstants = BlockchainV3.CreateOrdererConstants || (BlockchainV3.CreateOrdererConstants = {}));
    /** Constants for the `getMspCertificate` operation. */
    var GetMspCertificateConstants;
    (function (GetMspCertificateConstants) {
        /** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
        var Cache;
        (function (Cache) {
            Cache["SKIP"] = "skip";
            Cache["USE"] = "use";
        })(Cache = GetMspCertificateConstants.Cache || (GetMspCertificateConstants.Cache = {}));
    })(GetMspCertificateConstants = BlockchainV3.GetMspCertificateConstants || (BlockchainV3.GetMspCertificateConstants = {}));
    /** Constants for the `listComponents` operation. */
    var ListComponentsConstants;
    (function (ListComponentsConstants) {
        /** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
        var DeploymentAttrs;
        (function (DeploymentAttrs) {
            DeploymentAttrs["INCLUDED"] = "included";
            DeploymentAttrs["OMITTED"] = "omitted";
        })(DeploymentAttrs = ListComponentsConstants.DeploymentAttrs || (ListComponentsConstants.DeploymentAttrs = {}));
        /** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
        var ParsedCerts;
        (function (ParsedCerts) {
            ParsedCerts["INCLUDED"] = "included";
            ParsedCerts["OMITTED"] = "omitted";
        })(ParsedCerts = ListComponentsConstants.ParsedCerts || (ListComponentsConstants.ParsedCerts = {}));
        /** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
        var Cache;
        (function (Cache) {
            Cache["SKIP"] = "skip";
            Cache["USE"] = "use";
        })(Cache = ListComponentsConstants.Cache || (ListComponentsConstants.Cache = {}));
        /** Set to 'included' if the response should fetch CA attributes, inspect certificates, and append extra fields to CA and MSP component responses. - CA components will have fields appended/updated with data fetched from the `/cainfo?ca=ca` endpoint of a CA, such as: `ca_name`, `root_cert`, `fabric_version`, `issuer_public_key` and `issued_known_msps`. The field `issued_known_msps` indicates imported IBP MSPs that this CA has issued. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported MSPs are checked. Default responses will not include these fields. - MSP components will have the field `issued_by_ca_id` appended. This field indicates the id of an IBP console CA that issued this MSP. Meaning the MSP's root cert contains a signature that is derived from this CA's root cert. Only imported/created CAs are checked. Default responses will not include these fields. */
        var CaAttrs;
        (function (CaAttrs) {
            CaAttrs["INCLUDED"] = "included";
            CaAttrs["OMITTED"] = "omitted";
        })(CaAttrs = ListComponentsConstants.CaAttrs || (ListComponentsConstants.CaAttrs = {}));
    })(ListComponentsConstants = BlockchainV3.ListComponentsConstants || (BlockchainV3.ListComponentsConstants = {}));
    /** Constants for the `getComponentsByType` operation. */
    var GetComponentsByTypeConstants;
    (function (GetComponentsByTypeConstants) {
        /** The type to filter components on. */
        var ComponentType;
        (function (ComponentType) {
            ComponentType["FABRIC_PEER"] = "fabric-peer";
            ComponentType["FABRIC_ORDERER"] = "fabric-orderer";
            ComponentType["FABRIC_CA"] = "fabric-ca";
            ComponentType["MSP"] = "msp";
        })(ComponentType = GetComponentsByTypeConstants.ComponentType || (GetComponentsByTypeConstants.ComponentType = {}));
        /** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
        var DeploymentAttrs;
        (function (DeploymentAttrs) {
            DeploymentAttrs["INCLUDED"] = "included";
            DeploymentAttrs["OMITTED"] = "omitted";
        })(DeploymentAttrs = GetComponentsByTypeConstants.DeploymentAttrs || (GetComponentsByTypeConstants.DeploymentAttrs = {}));
        /** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
        var ParsedCerts;
        (function (ParsedCerts) {
            ParsedCerts["INCLUDED"] = "included";
            ParsedCerts["OMITTED"] = "omitted";
        })(ParsedCerts = GetComponentsByTypeConstants.ParsedCerts || (GetComponentsByTypeConstants.ParsedCerts = {}));
        /** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
        var Cache;
        (function (Cache) {
            Cache["SKIP"] = "skip";
            Cache["USE"] = "use";
        })(Cache = GetComponentsByTypeConstants.Cache || (GetComponentsByTypeConstants.Cache = {}));
    })(GetComponentsByTypeConstants = BlockchainV3.GetComponentsByTypeConstants || (BlockchainV3.GetComponentsByTypeConstants = {}));
    /** Constants for the `getComponentByTag` operation. */
    var GetComponentByTagConstants;
    (function (GetComponentByTagConstants) {
        /** Set to 'included' if the response should include Kubernetes deployment attributes such as 'resources', 'storage', 'zone', 'region', 'admin_certs', etc. Default responses will not include these fields. **This parameter will not work on *imported* components.** It's recommended to use `cache=skip` as well if up-to-date deployment data is needed. */
        var DeploymentAttrs;
        (function (DeploymentAttrs) {
            DeploymentAttrs["INCLUDED"] = "included";
            DeploymentAttrs["OMITTED"] = "omitted";
        })(DeploymentAttrs = GetComponentByTagConstants.DeploymentAttrs || (GetComponentByTagConstants.DeploymentAttrs = {}));
        /** Set to 'included' if the response should include parsed PEM data along with base 64 encoded PEM string. Parsed certificate data will include fields such as the serial number, issuer, expiration, subject, subject alt names, etc. Default responses will not include these fields. */
        var ParsedCerts;
        (function (ParsedCerts) {
            ParsedCerts["INCLUDED"] = "included";
            ParsedCerts["OMITTED"] = "omitted";
        })(ParsedCerts = GetComponentByTagConstants.ParsedCerts || (GetComponentByTagConstants.ParsedCerts = {}));
        /** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
        var Cache;
        (function (Cache) {
            Cache["SKIP"] = "skip";
            Cache["USE"] = "use";
        })(Cache = GetComponentByTagConstants.Cache || (GetComponentByTagConstants.Cache = {}));
    })(GetComponentByTagConstants = BlockchainV3.GetComponentByTagConstants || (BlockchainV3.GetComponentByTagConstants = {}));
    /** Constants for the `getFabVersions` operation. */
    var GetFabVersionsConstants;
    (function (GetFabVersionsConstants) {
        /** Set to 'skip' if the response should skip local data and fetch live data wherever possible. Expect longer response times if the cache is skipped. Default responses will use the cache. */
        var Cache;
        (function (Cache) {
            Cache["SKIP"] = "skip";
            Cache["USE"] = "use";
        })(Cache = GetFabVersionsConstants.Cache || (GetFabVersionsConstants.Cache = {}));
    })(GetFabVersionsConstants = BlockchainV3.GetFabVersionsConstants || (BlockchainV3.GetFabVersionsConstants = {}));
    /** Constants for the `getPostman` operation. */
    var GetPostmanConstants;
    (function (GetPostmanConstants) {
        /** - **bearer** - IAM Bearer Auth - *[Available on IBM Cloud]* - The same bearer token used to authenticate this request will be copied into the Postman collection examples. The query parameter `token` must also be set with your IAM bearer/access token value. - **api_key** - IAM Api Key Auth - *[Available on IBM Cloud]* - The IAM api key will be copied into the Postman collection examples. The query parameter `api_key` must also be set with your IAM API Key value. - **basic** - Basic Auth - *[Available on OpenShift & IBM Cloud Private]* - A basic auth username and password will be copied into the Postman collection examples. The query parameters `username` & `password` must also be set with your IBP api key credentials. The IBP api key is the username and the api secret is the password. */
        var AuthType;
        (function (AuthType) {
            AuthType["BEARER"] = "bearer";
            AuthType["API_KEY"] = "api_key";
            AuthType["BASIC"] = "basic";
        })(AuthType = GetPostmanConstants.AuthType || (GetPostmanConstants.AuthType = {}));
    })(GetPostmanConstants = BlockchainV3.GetPostmanConstants || (BlockchainV3.GetPostmanConstants = {}));
})(BlockchainV3 || (BlockchainV3 = {}));
module.exports = BlockchainV3;
