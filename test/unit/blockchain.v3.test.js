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
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const BlockchainV3 = require('../../dist/blockchain/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'ibm.com/123456',
};

const blockchainService = new BlockchainV3(service);

// dont actually create a request
const createRequestMock = jest.spyOn(blockchainService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('BlockchainV3', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = BlockchainV3.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(BlockchainV3.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(BlockchainV3.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(BlockchainV3);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = BlockchainV3.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(BlockchainV3);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new BlockchainV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new BlockchainV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(BlockchainV3.DEFAULT_SERVICE_URL);
    });
  });
  describe('getComponent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getComponent
        const id = 'testString';
        const deploymentAttrs = 'included';
        const parsedCerts = 'included';
        const cache = 'skip';
        const caAttrs = 'included';
        const params = {
          id: id,
          deploymentAttrs: deploymentAttrs,
          parsedCerts: parsedCerts,
          cache: cache,
          caAttrs: caAttrs,
        };

        const getComponentResult = blockchainService.getComponent(params);

        // all methods should return a Promise
        expectToBePromise(getComponentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['deployment_attrs']).toEqual(deploymentAttrs);
        expect(options.qs['parsed_certs']).toEqual(parsedCerts);
        expect(options.qs['cache']).toEqual(cache);
        expect(options.qs['ca_attrs']).toEqual(caAttrs);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getComponent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.getComponent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getComponentPromise = blockchainService.getComponent();
        expectToBePromise(getComponentPromise);

        getComponentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeComponent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeComponent
        const id = 'testString';
        const params = {
          id: id,
        };

        const removeComponentResult = blockchainService.removeComponent(params);

        // all methods should return a Promise
        expectToBePromise(removeComponentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/{id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.removeComponent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.removeComponent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeComponentPromise = blockchainService.removeComponent();
        expectToBePromise(removeComponentPromise);

        removeComponentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteComponent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteComponent
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteComponentResult = blockchainService.deleteComponent(params);

        // all methods should return a Promise
        expectToBePromise(deleteComponentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/{id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.deleteComponent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.deleteComponent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteComponentPromise = blockchainService.deleteComponent();
        expectToBePromise(deleteComponentPromise);

        deleteComponentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCa', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigCACors
      const configCaCorsModel = {
        enabled: true,
        origins: ['*'],
      };

      // ConfigCATlsClientauth
      const configCaTlsClientauthModel = {
        type: 'noclientcert',
        certfiles: ['testString'],
      };

      // ConfigCATls
      const configCaTlsModel = {
        keyfile: 'testString',
        certfile: 'testString',
        clientauth: configCaTlsClientauthModel,
      };

      // ConfigCACa
      const configCaCaModel = {
        keyfile: 'testString',
        certfile: 'testString',
        chainfile: 'testString',
      };

      // ConfigCACrl
      const configCaCrlModel = {
        expiry: '24h',
      };

      // IdentityAttrs
      const identityAttrsModel = {
        'hf.Registrar.Roles': '*',
        'hf.Registrar.DelegateRoles': '*',
        'hf.Revoker': true,
        'hf.IntermediateCA': true,
        'hf.GenCRL': true,
        'hf.Registrar.Attributes': '*',
        'hf.AffiliationMgr': true,
      };

      // ConfigCARegistryIdentitiesItem
      const configCaRegistryIdentitiesItemModel = {
        name: 'admin',
        pass: 'password',
        type: 'client',
        maxenrollments: -1,
        affiliation: 'testString',
        attrs: identityAttrsModel,
      };

      // ConfigCARegistry
      const configCaRegistryModel = {
        maxenrollments: -1,
        identities: [configCaRegistryIdentitiesItemModel],
      };

      // ConfigCADbTlsClient
      const configCaDbTlsClientModel = {
        certfile: 'testString',
        keyfile: 'testString',
      };

      // ConfigCADbTls
      const configCaDbTlsModel = {
        certfiles: ['testString'],
        client: configCaDbTlsClientModel,
        enabled: false,
      };

      // ConfigCADb
      const configCaDbModel = {
        type: 'postgres',
        datasource: 'host=fake.databases.appdomain.cloud port=31941 user=ibm_cloud password=password dbname=ibmclouddb sslmode=verify-full',
        tls: configCaDbTlsModel,
      };

      // ConfigCAAffiliations
      const configCaAffiliationsModel = {
        org1: ['department1'],
        org2: ['department1'],
        foo: 'testString',
      };

      // ConfigCACsrKeyrequest
      const configCaCsrKeyrequestModel = {
        algo: 'ecdsa',
        size: 256,
      };

      // ConfigCACsrNamesItem
      const configCaCsrNamesItemModel = {
        C: 'US',
        ST: 'North Carolina',
        L: 'Raleigh',
        O: 'Hyperledger',
        OU: 'Fabric',
      };

      // ConfigCACsrCa
      const configCaCsrCaModel = {
        expiry: '131400h',
        pathlength: 0,
      };

      // ConfigCACsr
      const configCaCsrModel = {
        cn: 'ca',
        keyrequest: configCaCsrKeyrequestModel,
        names: [configCaCsrNamesItemModel],
        hosts: ['localhost'],
        ca: configCaCsrCaModel,
      };

      // ConfigCAIdemix
      const configCaIdemixModel = {
        rhpoolsize: 100,
        nonceexpiration: '15s',
        noncesweepinterval: '15m',
      };

      // BccspSW
      const bccspSwModel = {
        Hash: 'SHA2',
        Security: 256,
      };

      // BccspPKCS11
      const bccspPkcS11Model = {
        Label: 'testString',
        Pin: 'testString',
        Hash: 'SHA2',
        Security: 256,
      };

      // Bccsp
      const bccspModel = {
        Default: 'SW',
        SW: bccspSwModel,
        PKCS11: bccspPkcS11Model,
      };

      // ConfigCAIntermediateParentserver
      const configCaIntermediateParentserverModel = {
        url: 'testString',
        caname: 'testString',
      };

      // ConfigCAIntermediateEnrollment
      const configCaIntermediateEnrollmentModel = {
        hosts: 'localhost',
        profile: 'testString',
        label: 'testString',
      };

      // ConfigCAIntermediateTlsClient
      const configCaIntermediateTlsClientModel = {
        certfile: 'testString',
        keyfile: 'testString',
      };

      // ConfigCAIntermediateTls
      const configCaIntermediateTlsModel = {
        certfiles: ['testString'],
        client: configCaIntermediateTlsClientModel,
      };

      // ConfigCAIntermediate
      const configCaIntermediateModel = {
        parentserver: configCaIntermediateParentserverModel,
        enrollment: configCaIntermediateEnrollmentModel,
        tls: configCaIntermediateTlsModel,
      };

      // ConfigCACfgIdentities
      const configCaCfgIdentitiesModel = {
        passwordattempts: 10,
        allowremove: false,
      };

      // ConfigCACfg
      const configCaCfgModel = {
        identities: configCaCfgIdentitiesModel,
      };

      // MetricsStatsd
      const metricsStatsdModel = {
        network: 'udp',
        address: '127.0.0.1:8125',
        writeInterval: '10s',
        prefix: 'server',
      };

      // Metrics
      const metricsModel = {
        provider: 'prometheus',
        statsd: metricsStatsdModel,
      };

      // ConfigCASigningDefault
      const configCaSigningDefaultModel = {
        usage: ['cert sign'],
        expiry: '8760h',
      };

      // ConfigCASigningProfilesCaCaconstraint
      const configCaSigningProfilesCaCaconstraintModel = {
        isca: true,
        maxpathlen: 0,
        maxpathlenzero: true,
      };

      // ConfigCASigningProfilesCa
      const configCaSigningProfilesCaModel = {
        usage: ['cert sign'],
        expiry: '43800h',
        caconstraint: configCaSigningProfilesCaCaconstraintModel,
      };

      // ConfigCASigningProfilesTls
      const configCaSigningProfilesTlsModel = {
        usage: ['cert sign'],
        expiry: '43800h',
      };

      // ConfigCASigningProfiles
      const configCaSigningProfilesModel = {
        ca: configCaSigningProfilesCaModel,
        tls: configCaSigningProfilesTlsModel,
      };

      // ConfigCASigning
      const configCaSigningModel = {
        default: configCaSigningDefaultModel,
        profiles: configCaSigningProfilesModel,
      };

      // ConfigCACreate
      const configCaCreateModel = {
        cors: configCaCorsModel,
        debug: false,
        crlsizelimit: 512000,
        tls: configCaTlsModel,
        ca: configCaCaModel,
        crl: configCaCrlModel,
        registry: configCaRegistryModel,
        db: configCaDbModel,
        affiliations: configCaAffiliationsModel,
        csr: configCaCsrModel,
        idemix: configCaIdemixModel,
        BCCSP: bccspModel,
        intermediate: configCaIntermediateModel,
        cfg: configCaCfgModel,
        metrics: metricsModel,
        signing: configCaSigningModel,
      };

      // CreateCaBodyConfigOverride
      const createCaBodyConfigOverrideModel = {
        ca: configCaCreateModel,
        tlsca: configCaCreateModel,
      };

      // ResourceRequests
      const resourceRequestsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceLimits
      const resourceLimitsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceObject
      const resourceObjectModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // CreateCaBodyResources
      const createCaBodyResourcesModel = {
        ca: resourceObjectModel,
      };

      // StorageObject
      const storageObjectModel = {
        size: '4GiB',
        class: 'default',
      };

      // CreateCaBodyStorage
      const createCaBodyStorageModel = {
        ca: storageObjectModel,
      };

      // Hsm
      const hsmModel = {
        pkcs11endpoint: 'tcp://example.com:666',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCa
        const displayName = 'My CA';
        const configOverride = createCaBodyConfigOverrideModel;
        const resources = createCaBodyResourcesModel;
        const storage = createCaBodyStorageModel;
        const zone = '-';
        const replicas = 1;
        const tags = ['fabric-ca'];
        const hsm = hsmModel;
        const region = '-';
        const version = '1.4.6-1';
        const params = {
          displayName: displayName,
          configOverride: configOverride,
          resources: resources,
          storage: storage,
          zone: zone,
          replicas: replicas,
          tags: tags,
          hsm: hsm,
          region: region,
          version: version,
        };

        const createCaResult = blockchainService.createCa(params);

        // all methods should return a Promise
        expectToBePromise(createCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-ca', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['config_override']).toEqual(configOverride);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['storage']).toEqual(storage);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['replicas']).toEqual(replicas);
        expect(options.body['tags']).toEqual(tags);
        expect(options.body['hsm']).toEqual(hsm);
        expect(options.body['region']).toEqual(region);
        expect(options.body['version']).toEqual(version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const displayName = 'My CA';
        const configOverride = createCaBodyConfigOverrideModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          displayName,
          configOverride,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.createCa(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.createCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createCaPromise = blockchainService.createCa();
        expectToBePromise(createCaPromise);

        createCaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('importCa', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ImportCaBodyMspCa
      const importCaBodyMspCaModel = {
        name: 'org1CA',
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // ImportCaBodyMspTlsca
      const importCaBodyMspTlscaModel = {
        name: 'org1tlsCA',
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // ImportCaBodyMspComponent
      const importCaBodyMspComponentModel = {
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
      };

      // ImportCaBodyMsp
      const importCaBodyMspModel = {
        ca: importCaBodyMspCaModel,
        tlsca: importCaBodyMspTlscaModel,
        component: importCaBodyMspComponentModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation importCa
        const displayName = 'Sample CA';
        const apiUrl = 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:7054';
        const msp = importCaBodyMspModel;
        const location = 'ibmcloud';
        const operationsUrl = 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:9443';
        const tags = ['fabric-ca'];
        const tlsCert = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=';
        const params = {
          displayName: displayName,
          apiUrl: apiUrl,
          msp: msp,
          location: location,
          operationsUrl: operationsUrl,
          tags: tags,
          tlsCert: tlsCert,
        };

        const importCaResult = blockchainService.importCa(params);

        // all methods should return a Promise
        expectToBePromise(importCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/fabric-ca', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['api_url']).toEqual(apiUrl);
        expect(options.body['msp']).toEqual(msp);
        expect(options.body['location']).toEqual(location);
        expect(options.body['operations_url']).toEqual(operationsUrl);
        expect(options.body['tags']).toEqual(tags);
        expect(options.body['tls_cert']).toEqual(tlsCert);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const displayName = 'Sample CA';
        const apiUrl = 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:7054';
        const msp = importCaBodyMspModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          displayName,
          apiUrl,
          msp,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.importCa(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.importCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const importCaPromise = blockchainService.importCa();
        expectToBePromise(importCaPromise);

        importCaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCa', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigCACors
      const configCaCorsModel = {
        enabled: true,
        origins: ['*'],
      };

      // ConfigCATlsClientauth
      const configCaTlsClientauthModel = {
        type: 'noclientcert',
        certfiles: ['testString'],
      };

      // ConfigCATls
      const configCaTlsModel = {
        keyfile: 'testString',
        certfile: 'testString',
        clientauth: configCaTlsClientauthModel,
      };

      // ConfigCACa
      const configCaCaModel = {
        keyfile: 'testString',
        certfile: 'testString',
        chainfile: 'testString',
      };

      // ConfigCACrl
      const configCaCrlModel = {
        expiry: '24h',
      };

      // IdentityAttrs
      const identityAttrsModel = {
        'hf.Registrar.Roles': '*',
        'hf.Registrar.DelegateRoles': '*',
        'hf.Revoker': true,
        'hf.IntermediateCA': true,
        'hf.GenCRL': true,
        'hf.Registrar.Attributes': '*',
        'hf.AffiliationMgr': true,
      };

      // ConfigCARegistryIdentitiesItem
      const configCaRegistryIdentitiesItemModel = {
        name: 'admin',
        pass: 'password',
        type: 'client',
        maxenrollments: -1,
        affiliation: 'testString',
        attrs: identityAttrsModel,
      };

      // ConfigCARegistry
      const configCaRegistryModel = {
        maxenrollments: -1,
        identities: [configCaRegistryIdentitiesItemModel],
      };

      // ConfigCADbTlsClient
      const configCaDbTlsClientModel = {
        certfile: 'testString',
        keyfile: 'testString',
      };

      // ConfigCADbTls
      const configCaDbTlsModel = {
        certfiles: ['testString'],
        client: configCaDbTlsClientModel,
        enabled: false,
      };

      // ConfigCADb
      const configCaDbModel = {
        type: 'postgres',
        datasource: 'host=fake.databases.appdomain.cloud port=31941 user=ibm_cloud password=password dbname=ibmclouddb sslmode=verify-full',
        tls: configCaDbTlsModel,
      };

      // ConfigCAAffiliations
      const configCaAffiliationsModel = {
        org1: ['department1'],
        org2: ['department1'],
        foo: 'testString',
      };

      // ConfigCACsrKeyrequest
      const configCaCsrKeyrequestModel = {
        algo: 'ecdsa',
        size: 256,
      };

      // ConfigCACsrNamesItem
      const configCaCsrNamesItemModel = {
        C: 'US',
        ST: 'North Carolina',
        L: 'Raleigh',
        O: 'Hyperledger',
        OU: 'Fabric',
      };

      // ConfigCACsrCa
      const configCaCsrCaModel = {
        expiry: '131400h',
        pathlength: 0,
      };

      // ConfigCACsr
      const configCaCsrModel = {
        cn: 'ca',
        keyrequest: configCaCsrKeyrequestModel,
        names: [configCaCsrNamesItemModel],
        hosts: ['localhost'],
        ca: configCaCsrCaModel,
      };

      // ConfigCAIdemix
      const configCaIdemixModel = {
        rhpoolsize: 100,
        nonceexpiration: '15s',
        noncesweepinterval: '15m',
      };

      // BccspSW
      const bccspSwModel = {
        Hash: 'SHA2',
        Security: 256,
      };

      // BccspPKCS11
      const bccspPkcS11Model = {
        Label: 'testString',
        Pin: 'testString',
        Hash: 'SHA2',
        Security: 256,
      };

      // Bccsp
      const bccspModel = {
        Default: 'SW',
        SW: bccspSwModel,
        PKCS11: bccspPkcS11Model,
      };

      // ConfigCAIntermediateParentserver
      const configCaIntermediateParentserverModel = {
        url: 'testString',
        caname: 'testString',
      };

      // ConfigCAIntermediateEnrollment
      const configCaIntermediateEnrollmentModel = {
        hosts: 'localhost',
        profile: 'testString',
        label: 'testString',
      };

      // ConfigCAIntermediateTlsClient
      const configCaIntermediateTlsClientModel = {
        certfile: 'testString',
        keyfile: 'testString',
      };

      // ConfigCAIntermediateTls
      const configCaIntermediateTlsModel = {
        certfiles: ['testString'],
        client: configCaIntermediateTlsClientModel,
      };

      // ConfigCAIntermediate
      const configCaIntermediateModel = {
        parentserver: configCaIntermediateParentserverModel,
        enrollment: configCaIntermediateEnrollmentModel,
        tls: configCaIntermediateTlsModel,
      };

      // ConfigCACfgIdentities
      const configCaCfgIdentitiesModel = {
        passwordattempts: 10,
        allowremove: false,
      };

      // ConfigCACfg
      const configCaCfgModel = {
        identities: configCaCfgIdentitiesModel,
      };

      // MetricsStatsd
      const metricsStatsdModel = {
        network: 'udp',
        address: '127.0.0.1:8125',
        writeInterval: '10s',
        prefix: 'server',
      };

      // Metrics
      const metricsModel = {
        provider: 'prometheus',
        statsd: metricsStatsdModel,
      };

      // ConfigCAUpdate
      const configCaUpdateModel = {
        cors: configCaCorsModel,
        debug: false,
        crlsizelimit: 512000,
        tls: configCaTlsModel,
        ca: configCaCaModel,
        crl: configCaCrlModel,
        registry: configCaRegistryModel,
        db: configCaDbModel,
        affiliations: configCaAffiliationsModel,
        csr: configCaCsrModel,
        idemix: configCaIdemixModel,
        BCCSP: bccspModel,
        intermediate: configCaIntermediateModel,
        cfg: configCaCfgModel,
        metrics: metricsModel,
      };

      // UpdateCaBodyConfigOverride
      const updateCaBodyConfigOverrideModel = {
        ca: configCaUpdateModel,
      };

      // ResourceRequests
      const resourceRequestsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceLimits
      const resourceLimitsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceObject
      const resourceObjectModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // UpdateCaBodyResources
      const updateCaBodyResourcesModel = {
        ca: resourceObjectModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCa
        const id = 'testString';
        const configOverride = updateCaBodyConfigOverrideModel;
        const replicas = 1;
        const resources = updateCaBodyResourcesModel;
        const version = '1.4.6-1';
        const zone = '-';
        const params = {
          id: id,
          configOverride: configOverride,
          replicas: replicas,
          resources: resources,
          version: version,
          zone: zone,
        };

        const updateCaResult = blockchainService.updateCa(params);

        // all methods should return a Promise
        expectToBePromise(updateCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-ca/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['config_override']).toEqual(configOverride);
        expect(options.body['replicas']).toEqual(replicas);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['version']).toEqual(version);
        expect(options.body['zone']).toEqual(zone);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.updateCa(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.updateCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateCaPromise = blockchainService.updateCa();
        expectToBePromise(updateCaPromise);

        updateCaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('editCa', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editCa
        const id = 'testString';
        const displayName = 'My CA';
        const apiUrl = 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:7054';
        const operationsUrl = 'https://n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud:9443';
        const caName = 'ca';
        const location = 'ibmcloud';
        const tags = ['fabric-ca'];
        const params = {
          id: id,
          displayName: displayName,
          apiUrl: apiUrl,
          operationsUrl: operationsUrl,
          caName: caName,
          location: location,
          tags: tags,
        };

        const editCaResult = blockchainService.editCa(params);

        // all methods should return a Promise
        expectToBePromise(editCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/fabric-ca/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['api_url']).toEqual(apiUrl);
        expect(options.body['operations_url']).toEqual(operationsUrl);
        expect(options.body['ca_name']).toEqual(caName);
        expect(options.body['location']).toEqual(location);
        expect(options.body['tags']).toEqual(tags);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.editCa(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.editCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editCaPromise = blockchainService.editCa();
        expectToBePromise(editCaPromise);

        editCaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('caAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ActionRenew
      const actionRenewModel = {
        tls_cert: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation caAction
        const id = 'testString';
        const restart = true;
        const renew = actionRenewModel;
        const params = {
          id: id,
          restart: restart,
          renew: renew,
        };

        const caActionResult = blockchainService.caAction(params);

        // all methods should return a Promise
        expectToBePromise(caActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-ca/{id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['restart']).toEqual(restart);
        expect(options.body['renew']).toEqual(renew);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.caAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.caAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const caActionPromise = blockchainService.caAction();
        expectToBePromise(caActionPromise);

        caActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createPeer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CryptoEnrollmentComponent
      const cryptoEnrollmentComponentModel = {
        admincerts: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // CryptoObjectEnrollmentCa
      const cryptoObjectEnrollmentCaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'ca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
      };

      // CryptoObjectEnrollmentTlsca
      const cryptoObjectEnrollmentTlscaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'tlsca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
        csr_hosts: ['testString'],
      };

      // CryptoObjectEnrollment
      const cryptoObjectEnrollmentModel = {
        component: cryptoEnrollmentComponentModel,
        ca: cryptoObjectEnrollmentCaModel,
        tlsca: cryptoObjectEnrollmentTlscaModel,
      };

      // ClientAuth
      const clientAuthModel = {
        type: 'noclientcert',
        tls_certs: ['testString'],
      };

      // MspCryptoComp
      const mspCryptoCompModel = {
        ekey: 'testString',
        ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        tls_key: 'testString',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        client_auth: clientAuthModel,
      };

      // MspCryptoCa
      const mspCryptoCaModel = {
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        ca_intermediate_certs: ['testString'],
      };

      // CryptoObjectMsp
      const cryptoObjectMspModel = {
        component: mspCryptoCompModel,
        ca: mspCryptoCaModel,
        tlsca: mspCryptoCaModel,
      };

      // CryptoObject
      const cryptoObjectModel = {
        enrollment: cryptoObjectEnrollmentModel,
        msp: cryptoObjectMspModel,
      };

      // ConfigPeerKeepaliveClient
      const configPeerKeepaliveClientModel = {
        interval: '60s',
        timeout: '20s',
      };

      // ConfigPeerKeepaliveDeliveryClient
      const configPeerKeepaliveDeliveryClientModel = {
        interval: '60s',
        timeout: '20s',
      };

      // ConfigPeerKeepalive
      const configPeerKeepaliveModel = {
        minInterval: '60s',
        client: configPeerKeepaliveClientModel,
        deliveryClient: configPeerKeepaliveDeliveryClientModel,
      };

      // ConfigPeerGossipElection
      const configPeerGossipElectionModel = {
        startupGracePeriod: '15s',
        membershipSampleInterval: '1s',
        leaderAliveThreshold: '10s',
        leaderElectionDuration: '5s',
      };

      // ConfigPeerGossipPvtDataImplicitCollectionDisseminationPolicy
      const configPeerGossipPvtDataImplicitCollectionDisseminationPolicyModel = {
        requiredPeerCount: 0,
        maxPeerCount: 1,
      };

      // ConfigPeerGossipPvtData
      const configPeerGossipPvtDataModel = {
        pullRetryThreshold: '60s',
        transientstoreMaxBlockRetention: 1000,
        pushAckTimeout: '3s',
        btlPullMargin: 10,
        reconcileBatchSize: 10,
        reconcileSleepInterval: '1m',
        reconciliationEnabled: true,
        skipPullingInvalidTransactionsDuringCommit: false,
        implicitCollectionDisseminationPolicy: configPeerGossipPvtDataImplicitCollectionDisseminationPolicyModel,
      };

      // ConfigPeerGossipState
      const configPeerGossipStateModel = {
        enabled: true,
        checkInterval: '10s',
        responseTimeout: '3s',
        batchSize: 10,
        blockBufferSize: 100,
        maxRetries: 3,
      };

      // ConfigPeerGossip
      const configPeerGossipModel = {
        useLeaderElection: true,
        orgLeader: false,
        membershipTrackerInterval: '5s',
        maxBlockCountToStore: 100,
        maxPropagationBurstLatency: '10ms',
        maxPropagationBurstSize: 10,
        propagateIterations: 3,
        pullInterval: '4s',
        pullPeerNum: 3,
        requestStateInfoInterval: '4s',
        publishStateInfoInterval: '4s',
        stateInfoRetentionInterval: '0s',
        publishCertPeriod: '10s',
        skipBlockVerification: false,
        dialTimeout: '3s',
        connTimeout: '2s',
        recvBuffSize: 20,
        sendBuffSize: 200,
        digestWaitTime: '1s',
        requestWaitTime: '1500ms',
        responseWaitTime: '2s',
        aliveTimeInterval: '5s',
        aliveExpirationTimeout: '25s',
        reconnectInterval: '25s',
        election: configPeerGossipElectionModel,
        pvtData: configPeerGossipPvtDataModel,
        state: configPeerGossipStateModel,
      };

      // ConfigPeerAuthentication
      const configPeerAuthenticationModel = {
        timewindow: '15m',
      };

      // BccspSW
      const bccspSwModel = {
        Hash: 'SHA2',
        Security: 256,
      };

      // BccspPKCS11
      const bccspPkcS11Model = {
        Label: 'testString',
        Pin: 'testString',
        Hash: 'SHA2',
        Security: 256,
      };

      // Bccsp
      const bccspModel = {
        Default: 'SW',
        SW: bccspSwModel,
        PKCS11: bccspPkcS11Model,
      };

      // ConfigPeerClient
      const configPeerClientModel = {
        connTimeout: '2s',
      };

      // ConfigPeerDeliveryclientAddressOverridesItem
      const configPeerDeliveryclientAddressOverridesItemModel = {
        from: 'n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:7050',
        to: 'n3a3ec3-myorderer2.ibp.us-south.containers.appdomain.cloud:7050',
        caCertsFile: 'my-data/cert.pem',
      };

      // ConfigPeerDeliveryclient
      const configPeerDeliveryclientModel = {
        reconnectTotalTimeThreshold: '60m',
        connTimeout: '2s',
        reConnectBackoffThreshold: '60m',
        addressOverrides: [configPeerDeliveryclientAddressOverridesItemModel],
      };

      // ConfigPeerAdminService
      const configPeerAdminServiceModel = {
        listenAddress: '0.0.0.0:7051',
      };

      // ConfigPeerDiscovery
      const configPeerDiscoveryModel = {
        enabled: true,
        authCacheEnabled: true,
        authCacheMaxSize: 1000,
        authCachePurgeRetentionRatio: 0.75,
        orgMembersAllowedAccess: false,
      };

      // ConfigPeerLimitsConcurrency
      const configPeerLimitsConcurrencyModel = {
        endorserService: 2500,
        deliverService: 2500,
      };

      // ConfigPeerLimits
      const configPeerLimitsModel = {
        concurrency: configPeerLimitsConcurrencyModel,
      };

      // ConfigPeerCreatePeer
      const configPeerCreatePeerModel = {
        id: 'john-doe',
        networkId: 'dev',
        keepalive: configPeerKeepaliveModel,
        gossip: configPeerGossipModel,
        authentication: configPeerAuthenticationModel,
        BCCSP: bccspModel,
        client: configPeerClientModel,
        deliveryclient: configPeerDeliveryclientModel,
        adminService: configPeerAdminServiceModel,
        validatorPoolSize: 8,
        discovery: configPeerDiscoveryModel,
        limits: configPeerLimitsModel,
      };

      // ConfigPeerChaincodeGolang
      const configPeerChaincodeGolangModel = {
        dynamicLink: false,
      };

      // ConfigPeerChaincodeExternalBuildersItem
      const configPeerChaincodeExternalBuildersItemModel = {
        path: '/path/to/directory',
        name: 'descriptive-build-name',
        environmentWhitelist: ['GOPROXY'],
      };

      // ConfigPeerChaincodeSystem
      const configPeerChaincodeSystemModel = {
        cscc: true,
        lscc: true,
        escc: true,
        vscc: true,
        qscc: true,
      };

      // ConfigPeerChaincodeLogging
      const configPeerChaincodeLoggingModel = {
        level: 'info',
        shim: 'warning',
        format: '%{color}%{time:2006-01-02 15:04:05.000 MST} [%{module}] %{shortfunc} -> %{level:.4s} %{id:03x}%{color:reset} %{message}',
      };

      // ConfigPeerChaincode
      const configPeerChaincodeModel = {
        golang: configPeerChaincodeGolangModel,
        externalBuilders: [configPeerChaincodeExternalBuildersItemModel],
        installTimeout: '300s',
        startuptimeout: '300s',
        executetimeout: '30s',
        system: configPeerChaincodeSystemModel,
        logging: configPeerChaincodeLoggingModel,
      };

      // MetricsStatsd
      const metricsStatsdModel = {
        network: 'udp',
        address: '127.0.0.1:8125',
        writeInterval: '10s',
        prefix: 'server',
      };

      // Metrics
      const metricsModel = {
        provider: 'prometheus',
        statsd: metricsStatsdModel,
      };

      // ConfigPeerCreate
      const configPeerCreateModel = {
        peer: configPeerCreatePeerModel,
        chaincode: configPeerChaincodeModel,
        metrics: metricsModel,
      };

      // ResourceRequests
      const resourceRequestsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceLimits
      const resourceLimitsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceObjectFabV2
      const resourceObjectFabV2Model = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // ResourceObjectCouchDb
      const resourceObjectCouchDbModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // ResourceObject
      const resourceObjectModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // ResourceObjectFabV1
      const resourceObjectFabV1Model = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // PeerResources
      const peerResourcesModel = {
        chaincodelauncher: resourceObjectFabV2Model,
        couchdb: resourceObjectCouchDbModel,
        statedb: resourceObjectModel,
        dind: resourceObjectFabV1Model,
        fluentd: resourceObjectFabV1Model,
        peer: resourceObjectModel,
        proxy: resourceObjectModel,
      };

      // StorageObject
      const storageObjectModel = {
        size: '4GiB',
        class: 'default',
      };

      // CreatePeerBodyStorage
      const createPeerBodyStorageModel = {
        peer: storageObjectModel,
        statedb: storageObjectModel,
      };

      // Hsm
      const hsmModel = {
        pkcs11endpoint: 'tcp://example.com:666',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createPeer
        const mspId = 'Org1';
        const displayName = 'My Peer';
        const crypto = cryptoObjectModel;
        const configOverride = configPeerCreateModel;
        const resources = peerResourcesModel;
        const storage = createPeerBodyStorageModel;
        const zone = '-';
        const stateDb = 'couchdb';
        const tags = ['fabric-ca'];
        const hsm = hsmModel;
        const region = '-';
        const version = '1.4.6-1';
        const params = {
          mspId: mspId,
          displayName: displayName,
          crypto: crypto,
          configOverride: configOverride,
          resources: resources,
          storage: storage,
          zone: zone,
          stateDb: stateDb,
          tags: tags,
          hsm: hsm,
          region: region,
          version: version,
        };

        const createPeerResult = blockchainService.createPeer(params);

        // all methods should return a Promise
        expectToBePromise(createPeerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-peer', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['crypto']).toEqual(crypto);
        expect(options.body['config_override']).toEqual(configOverride);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['storage']).toEqual(storage);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['state_db']).toEqual(stateDb);
        expect(options.body['tags']).toEqual(tags);
        expect(options.body['hsm']).toEqual(hsm);
        expect(options.body['region']).toEqual(region);
        expect(options.body['version']).toEqual(version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const mspId = 'Org1';
        const displayName = 'My Peer';
        const crypto = cryptoObjectModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          mspId,
          displayName,
          crypto,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.createPeer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.createPeer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createPeerPromise = blockchainService.createPeer();
        expectToBePromise(createPeerPromise);

        createPeerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('importPeer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MspCryptoFieldCa
      const mspCryptoFieldCaModel = {
        name: 'ca',
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // MspCryptoFieldTlsca
      const mspCryptoFieldTlscaModel = {
        name: 'tlsca',
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // MspCryptoFieldComponent
      const mspCryptoFieldComponentModel = {
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // MspCryptoField
      const mspCryptoFieldModel = {
        ca: mspCryptoFieldCaModel,
        tlsca: mspCryptoFieldTlscaModel,
        component: mspCryptoFieldComponentModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation importPeer
        const displayName = 'My Peer';
        const grpcwpUrl = 'https://n3a3ec3-mypeer-proxy.ibp.us-south.containers.appdomain.cloud:8084';
        const msp = mspCryptoFieldModel;
        const mspId = 'Org1';
        const apiUrl = 'grpcs://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:7051';
        const location = 'ibmcloud';
        const operationsUrl = 'https://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:9443';
        const tags = ['fabric-ca'];
        const params = {
          displayName: displayName,
          grpcwpUrl: grpcwpUrl,
          msp: msp,
          mspId: mspId,
          apiUrl: apiUrl,
          location: location,
          operationsUrl: operationsUrl,
          tags: tags,
        };

        const importPeerResult = blockchainService.importPeer(params);

        // all methods should return a Promise
        expectToBePromise(importPeerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/fabric-peer', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['grpcwp_url']).toEqual(grpcwpUrl);
        expect(options.body['msp']).toEqual(msp);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['api_url']).toEqual(apiUrl);
        expect(options.body['location']).toEqual(location);
        expect(options.body['operations_url']).toEqual(operationsUrl);
        expect(options.body['tags']).toEqual(tags);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const displayName = 'My Peer';
        const grpcwpUrl = 'https://n3a3ec3-mypeer-proxy.ibp.us-south.containers.appdomain.cloud:8084';
        const msp = mspCryptoFieldModel;
        const mspId = 'Org1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          displayName,
          grpcwpUrl,
          msp,
          mspId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.importPeer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.importPeer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const importPeerPromise = blockchainService.importPeer();
        expectToBePromise(importPeerPromise);

        importPeerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('editPeer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editPeer
        const id = 'testString';
        const displayName = 'My Peer';
        const apiUrl = 'grpcs://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:7051';
        const operationsUrl = 'https://n3a3ec3-mypeer.ibp.us-south.containers.appdomain.cloud:9443';
        const grpcwpUrl = 'https://n3a3ec3-mypeer-proxy.ibp.us-south.containers.appdomain.cloud:8084';
        const mspId = 'Org1';
        const location = 'ibmcloud';
        const tags = ['fabric-ca'];
        const params = {
          id: id,
          displayName: displayName,
          apiUrl: apiUrl,
          operationsUrl: operationsUrl,
          grpcwpUrl: grpcwpUrl,
          mspId: mspId,
          location: location,
          tags: tags,
        };

        const editPeerResult = blockchainService.editPeer(params);

        // all methods should return a Promise
        expectToBePromise(editPeerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/fabric-peer/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['api_url']).toEqual(apiUrl);
        expect(options.body['operations_url']).toEqual(operationsUrl);
        expect(options.body['grpcwp_url']).toEqual(grpcwpUrl);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['location']).toEqual(location);
        expect(options.body['tags']).toEqual(tags);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.editPeer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.editPeer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editPeerPromise = blockchainService.editPeer();
        expectToBePromise(editPeerPromise);

        editPeerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('peerAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ActionReenroll
      const actionReenrollModel = {
        tls_cert: true,
        ecert: true,
      };

      // ActionEnroll
      const actionEnrollModel = {
        tls_cert: true,
        ecert: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation peerAction
        const id = 'testString';
        const restart = true;
        const reenroll = actionReenrollModel;
        const enroll = actionEnrollModel;
        const upgradeDbs = true;
        const params = {
          id: id,
          restart: restart,
          reenroll: reenroll,
          enroll: enroll,
          upgradeDbs: upgradeDbs,
        };

        const peerActionResult = blockchainService.peerAction(params);

        // all methods should return a Promise
        expectToBePromise(peerActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-peer/{id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['restart']).toEqual(restart);
        expect(options.body['reenroll']).toEqual(reenroll);
        expect(options.body['enroll']).toEqual(enroll);
        expect(options.body['upgrade_dbs']).toEqual(upgradeDbs);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.peerAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.peerAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const peerActionPromise = blockchainService.peerAction();
        expectToBePromise(peerActionPromise);

        peerActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updatePeer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigPeerKeepaliveClient
      const configPeerKeepaliveClientModel = {
        interval: '60s',
        timeout: '20s',
      };

      // ConfigPeerKeepaliveDeliveryClient
      const configPeerKeepaliveDeliveryClientModel = {
        interval: '60s',
        timeout: '20s',
      };

      // ConfigPeerKeepalive
      const configPeerKeepaliveModel = {
        minInterval: '60s',
        client: configPeerKeepaliveClientModel,
        deliveryClient: configPeerKeepaliveDeliveryClientModel,
      };

      // ConfigPeerGossipElection
      const configPeerGossipElectionModel = {
        startupGracePeriod: '15s',
        membershipSampleInterval: '1s',
        leaderAliveThreshold: '10s',
        leaderElectionDuration: '5s',
      };

      // ConfigPeerGossipPvtDataImplicitCollectionDisseminationPolicy
      const configPeerGossipPvtDataImplicitCollectionDisseminationPolicyModel = {
        requiredPeerCount: 0,
        maxPeerCount: 1,
      };

      // ConfigPeerGossipPvtData
      const configPeerGossipPvtDataModel = {
        pullRetryThreshold: '60s',
        transientstoreMaxBlockRetention: 1000,
        pushAckTimeout: '3s',
        btlPullMargin: 10,
        reconcileBatchSize: 10,
        reconcileSleepInterval: '1m',
        reconciliationEnabled: true,
        skipPullingInvalidTransactionsDuringCommit: false,
        implicitCollectionDisseminationPolicy: configPeerGossipPvtDataImplicitCollectionDisseminationPolicyModel,
      };

      // ConfigPeerGossipState
      const configPeerGossipStateModel = {
        enabled: true,
        checkInterval: '10s',
        responseTimeout: '3s',
        batchSize: 10,
        blockBufferSize: 100,
        maxRetries: 3,
      };

      // ConfigPeerGossip
      const configPeerGossipModel = {
        useLeaderElection: true,
        orgLeader: false,
        membershipTrackerInterval: '5s',
        maxBlockCountToStore: 100,
        maxPropagationBurstLatency: '10ms',
        maxPropagationBurstSize: 10,
        propagateIterations: 3,
        pullInterval: '4s',
        pullPeerNum: 3,
        requestStateInfoInterval: '4s',
        publishStateInfoInterval: '4s',
        stateInfoRetentionInterval: '0s',
        publishCertPeriod: '10s',
        skipBlockVerification: false,
        dialTimeout: '3s',
        connTimeout: '2s',
        recvBuffSize: 20,
        sendBuffSize: 200,
        digestWaitTime: '1s',
        requestWaitTime: '1500ms',
        responseWaitTime: '2s',
        aliveTimeInterval: '5s',
        aliveExpirationTimeout: '25s',
        reconnectInterval: '25s',
        election: configPeerGossipElectionModel,
        pvtData: configPeerGossipPvtDataModel,
        state: configPeerGossipStateModel,
      };

      // ConfigPeerAuthentication
      const configPeerAuthenticationModel = {
        timewindow: '15m',
      };

      // ConfigPeerClient
      const configPeerClientModel = {
        connTimeout: '2s',
      };

      // ConfigPeerDeliveryclientAddressOverridesItem
      const configPeerDeliveryclientAddressOverridesItemModel = {
        from: 'n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:7050',
        to: 'n3a3ec3-myorderer2.ibp.us-south.containers.appdomain.cloud:7050',
        caCertsFile: 'my-data/cert.pem',
      };

      // ConfigPeerDeliveryclient
      const configPeerDeliveryclientModel = {
        reconnectTotalTimeThreshold: '60m',
        connTimeout: '2s',
        reConnectBackoffThreshold: '60m',
        addressOverrides: [configPeerDeliveryclientAddressOverridesItemModel],
      };

      // ConfigPeerAdminService
      const configPeerAdminServiceModel = {
        listenAddress: '0.0.0.0:7051',
      };

      // ConfigPeerDiscovery
      const configPeerDiscoveryModel = {
        enabled: true,
        authCacheEnabled: true,
        authCacheMaxSize: 1000,
        authCachePurgeRetentionRatio: 0.75,
        orgMembersAllowedAccess: false,
      };

      // ConfigPeerLimitsConcurrency
      const configPeerLimitsConcurrencyModel = {
        endorserService: 2500,
        deliverService: 2500,
      };

      // ConfigPeerLimits
      const configPeerLimitsModel = {
        concurrency: configPeerLimitsConcurrencyModel,
      };

      // ConfigPeerUpdatePeer
      const configPeerUpdatePeerModel = {
        id: 'john-doe',
        networkId: 'dev',
        keepalive: configPeerKeepaliveModel,
        gossip: configPeerGossipModel,
        authentication: configPeerAuthenticationModel,
        client: configPeerClientModel,
        deliveryclient: configPeerDeliveryclientModel,
        adminService: configPeerAdminServiceModel,
        validatorPoolSize: 8,
        discovery: configPeerDiscoveryModel,
        limits: configPeerLimitsModel,
      };

      // ConfigPeerChaincodeGolang
      const configPeerChaincodeGolangModel = {
        dynamicLink: false,
      };

      // ConfigPeerChaincodeExternalBuildersItem
      const configPeerChaincodeExternalBuildersItemModel = {
        path: '/path/to/directory',
        name: 'descriptive-build-name',
        environmentWhitelist: ['GOPROXY'],
      };

      // ConfigPeerChaincodeSystem
      const configPeerChaincodeSystemModel = {
        cscc: true,
        lscc: true,
        escc: true,
        vscc: true,
        qscc: true,
      };

      // ConfigPeerChaincodeLogging
      const configPeerChaincodeLoggingModel = {
        level: 'info',
        shim: 'warning',
        format: '%{color}%{time:2006-01-02 15:04:05.000 MST} [%{module}] %{shortfunc} -> %{level:.4s} %{id:03x}%{color:reset} %{message}',
      };

      // ConfigPeerChaincode
      const configPeerChaincodeModel = {
        golang: configPeerChaincodeGolangModel,
        externalBuilders: [configPeerChaincodeExternalBuildersItemModel],
        installTimeout: '300s',
        startuptimeout: '300s',
        executetimeout: '30s',
        system: configPeerChaincodeSystemModel,
        logging: configPeerChaincodeLoggingModel,
      };

      // MetricsStatsd
      const metricsStatsdModel = {
        network: 'udp',
        address: '127.0.0.1:8125',
        writeInterval: '10s',
        prefix: 'server',
      };

      // Metrics
      const metricsModel = {
        provider: 'prometheus',
        statsd: metricsStatsdModel,
      };

      // ConfigPeerUpdate
      const configPeerUpdateModel = {
        peer: configPeerUpdatePeerModel,
        chaincode: configPeerChaincodeModel,
        metrics: metricsModel,
      };

      // CryptoEnrollmentComponent
      const cryptoEnrollmentComponentModel = {
        admincerts: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // UpdateEnrollmentCryptoFieldCa
      const updateEnrollmentCryptoFieldCaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'ca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
      };

      // UpdateEnrollmentCryptoFieldTlsca
      const updateEnrollmentCryptoFieldTlscaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'tlsca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
        csr_hosts: ['testString'],
      };

      // UpdateEnrollmentCryptoField
      const updateEnrollmentCryptoFieldModel = {
        component: cryptoEnrollmentComponentModel,
        ca: updateEnrollmentCryptoFieldCaModel,
        tlsca: updateEnrollmentCryptoFieldTlscaModel,
      };

      // UpdateMspCryptoFieldCa
      const updateMspCryptoFieldCaModel = {
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        ca_intermediate_certs: ['testString'],
      };

      // UpdateMspCryptoFieldTlsca
      const updateMspCryptoFieldTlscaModel = {
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        ca_intermediate_certs: ['testString'],
      };

      // ClientAuth
      const clientAuthModel = {
        type: 'noclientcert',
        tls_certs: ['testString'],
      };

      // UpdateMspCryptoFieldComponent
      const updateMspCryptoFieldComponentModel = {
        ekey: 'testString',
        ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        tls_key: 'testString',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        client_auth: clientAuthModel,
      };

      // UpdateMspCryptoField
      const updateMspCryptoFieldModel = {
        ca: updateMspCryptoFieldCaModel,
        tlsca: updateMspCryptoFieldTlscaModel,
        component: updateMspCryptoFieldComponentModel,
      };

      // UpdatePeerBodyCrypto
      const updatePeerBodyCryptoModel = {
        enrollment: updateEnrollmentCryptoFieldModel,
        msp: updateMspCryptoFieldModel,
      };

      // NodeOu
      const nodeOuModel = {
        enabled: true,
      };

      // ResourceRequests
      const resourceRequestsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceLimits
      const resourceLimitsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceObjectFabV2
      const resourceObjectFabV2Model = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // ResourceObjectCouchDb
      const resourceObjectCouchDbModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // ResourceObject
      const resourceObjectModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // ResourceObjectFabV1
      const resourceObjectFabV1Model = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // PeerResources
      const peerResourcesModel = {
        chaincodelauncher: resourceObjectFabV2Model,
        couchdb: resourceObjectCouchDbModel,
        statedb: resourceObjectModel,
        dind: resourceObjectFabV1Model,
        fluentd: resourceObjectFabV1Model,
        peer: resourceObjectModel,
        proxy: resourceObjectModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updatePeer
        const id = 'testString';
        const adminCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const configOverride = configPeerUpdateModel;
        const crypto = updatePeerBodyCryptoModel;
        const nodeOu = nodeOuModel;
        const replicas = 1;
        const resources = peerResourcesModel;
        const version = '1.4.6-1';
        const zone = '-';
        const params = {
          id: id,
          adminCerts: adminCerts,
          configOverride: configOverride,
          crypto: crypto,
          nodeOu: nodeOu,
          replicas: replicas,
          resources: resources,
          version: version,
          zone: zone,
        };

        const updatePeerResult = blockchainService.updatePeer(params);

        // all methods should return a Promise
        expectToBePromise(updatePeerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-peer/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['admin_certs']).toEqual(adminCerts);
        expect(options.body['config_override']).toEqual(configOverride);
        expect(options.body['crypto']).toEqual(crypto);
        expect(options.body['node_ou']).toEqual(nodeOu);
        expect(options.body['replicas']).toEqual(replicas);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['version']).toEqual(version);
        expect(options.body['zone']).toEqual(zone);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.updatePeer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.updatePeer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updatePeerPromise = blockchainService.updatePeer();
        expectToBePromise(updatePeerPromise);

        updatePeerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createOrderer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CryptoEnrollmentComponent
      const cryptoEnrollmentComponentModel = {
        admincerts: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // CryptoObjectEnrollmentCa
      const cryptoObjectEnrollmentCaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'ca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
      };

      // CryptoObjectEnrollmentTlsca
      const cryptoObjectEnrollmentTlscaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'tlsca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
        csr_hosts: ['testString'],
      };

      // CryptoObjectEnrollment
      const cryptoObjectEnrollmentModel = {
        component: cryptoEnrollmentComponentModel,
        ca: cryptoObjectEnrollmentCaModel,
        tlsca: cryptoObjectEnrollmentTlscaModel,
      };

      // ClientAuth
      const clientAuthModel = {
        type: 'noclientcert',
        tls_certs: ['testString'],
      };

      // MspCryptoComp
      const mspCryptoCompModel = {
        ekey: 'testString',
        ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        tls_key: 'testString',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        client_auth: clientAuthModel,
      };

      // MspCryptoCa
      const mspCryptoCaModel = {
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        ca_intermediate_certs: ['testString'],
      };

      // CryptoObjectMsp
      const cryptoObjectMspModel = {
        component: mspCryptoCompModel,
        ca: mspCryptoCaModel,
        tlsca: mspCryptoCaModel,
      };

      // CryptoObject
      const cryptoObjectModel = {
        enrollment: cryptoObjectEnrollmentModel,
        msp: cryptoObjectMspModel,
      };

      // ConfigOrdererKeepalive
      const configOrdererKeepaliveModel = {
        ServerMinInterval: '60s',
        ServerInterval: '2h',
        ServerTimeout: '20s',
      };

      // BccspSW
      const bccspSwModel = {
        Hash: 'SHA2',
        Security: 256,
      };

      // BccspPKCS11
      const bccspPkcS11Model = {
        Label: 'testString',
        Pin: 'testString',
        Hash: 'SHA2',
        Security: 256,
      };

      // Bccsp
      const bccspModel = {
        Default: 'SW',
        SW: bccspSwModel,
        PKCS11: bccspPkcS11Model,
      };

      // ConfigOrdererAuthentication
      const configOrdererAuthenticationModel = {
        TimeWindow: '15m',
        NoExpirationChecks: false,
      };

      // ConfigOrdererGeneral
      const configOrdererGeneralModel = {
        Keepalive: configOrdererKeepaliveModel,
        BCCSP: bccspModel,
        Authentication: configOrdererAuthenticationModel,
      };

      // ConfigOrdererDebug
      const configOrdererDebugModel = {
        BroadcastTraceDir: 'testString',
        DeliverTraceDir: 'testString',
      };

      // ConfigOrdererMetricsStatsd
      const configOrdererMetricsStatsdModel = {
        Network: 'udp',
        Address: '127.0.0.1:8125',
        WriteInterval: '10s',
        Prefix: 'server',
      };

      // ConfigOrdererMetrics
      const configOrdererMetricsModel = {
        Provider: 'disabled',
        Statsd: configOrdererMetricsStatsdModel,
      };

      // ConfigOrdererCreate
      const configOrdererCreateModel = {
        General: configOrdererGeneralModel,
        Debug: configOrdererDebugModel,
        Metrics: configOrdererMetricsModel,
      };

      // ResourceRequests
      const resourceRequestsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceLimits
      const resourceLimitsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceObject
      const resourceObjectModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // CreateOrdererRaftBodyResources
      const createOrdererRaftBodyResourcesModel = {
        orderer: resourceObjectModel,
        proxy: resourceObjectModel,
      };

      // StorageObject
      const storageObjectModel = {
        size: '4GiB',
        class: 'default',
      };

      // CreateOrdererRaftBodyStorage
      const createOrdererRaftBodyStorageModel = {
        orderer: storageObjectModel,
      };

      // Hsm
      const hsmModel = {
        pkcs11endpoint: 'tcp://example.com:666',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createOrderer
        const ordererType = 'raft';
        const mspId = 'Org1';
        const displayName = 'orderer';
        const crypto = [cryptoObjectModel];
        const clusterName = 'ordering service 1';
        const clusterId = 'abcde';
        const externalAppend = 'false';
        const configOverride = [configOrdererCreateModel];
        const resources = createOrdererRaftBodyResourcesModel;
        const storage = createOrdererRaftBodyStorageModel;
        const systemChannelId = 'testchainid';
        const zone = ['-'];
        const tags = ['fabric-ca'];
        const region = ['-'];
        const hsm = hsmModel;
        const version = '1.4.6-1';
        const params = {
          ordererType: ordererType,
          mspId: mspId,
          displayName: displayName,
          crypto: crypto,
          clusterName: clusterName,
          clusterId: clusterId,
          externalAppend: externalAppend,
          configOverride: configOverride,
          resources: resources,
          storage: storage,
          systemChannelId: systemChannelId,
          zone: zone,
          tags: tags,
          region: region,
          hsm: hsm,
          version: version,
        };

        const createOrdererResult = blockchainService.createOrderer(params);

        // all methods should return a Promise
        expectToBePromise(createOrdererResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-orderer', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['orderer_type']).toEqual(ordererType);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['crypto']).toEqual(crypto);
        expect(options.body['cluster_name']).toEqual(clusterName);
        expect(options.body['cluster_id']).toEqual(clusterId);
        expect(options.body['external_append']).toEqual(externalAppend);
        expect(options.body['config_override']).toEqual(configOverride);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['storage']).toEqual(storage);
        expect(options.body['system_channel_id']).toEqual(systemChannelId);
        expect(options.body['zone']).toEqual(zone);
        expect(options.body['tags']).toEqual(tags);
        expect(options.body['region']).toEqual(region);
        expect(options.body['hsm']).toEqual(hsm);
        expect(options.body['version']).toEqual(version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ordererType = 'raft';
        const mspId = 'Org1';
        const displayName = 'orderer';
        const crypto = [cryptoObjectModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ordererType,
          mspId,
          displayName,
          crypto,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.createOrderer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.createOrderer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createOrdererPromise = blockchainService.createOrderer();
        expectToBePromise(createOrdererPromise);

        createOrdererPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('importOrderer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MspCryptoFieldCa
      const mspCryptoFieldCaModel = {
        name: 'ca',
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // MspCryptoFieldTlsca
      const mspCryptoFieldTlscaModel = {
        name: 'tlsca',
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // MspCryptoFieldComponent
      const mspCryptoFieldComponentModel = {
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // MspCryptoField
      const mspCryptoFieldModel = {
        ca: mspCryptoFieldCaModel,
        tlsca: mspCryptoFieldTlscaModel,
        component: mspCryptoFieldComponentModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation importOrderer
        const clusterName = 'ordering service 1';
        const displayName = 'orderer';
        const grpcwpUrl = 'https://n3a3ec3-myorderer-proxy.ibp.us-south.containers.appdomain.cloud:443';
        const msp = mspCryptoFieldModel;
        const mspId = 'Org1';
        const apiUrl = 'grpcs://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:7050';
        const clusterId = 'testString';
        const location = 'ibmcloud';
        const operationsUrl = 'https://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:8443';
        const systemChannelId = 'testchainid';
        const tags = ['fabric-ca'];
        const params = {
          clusterName: clusterName,
          displayName: displayName,
          grpcwpUrl: grpcwpUrl,
          msp: msp,
          mspId: mspId,
          apiUrl: apiUrl,
          clusterId: clusterId,
          location: location,
          operationsUrl: operationsUrl,
          systemChannelId: systemChannelId,
          tags: tags,
        };

        const importOrdererResult = blockchainService.importOrderer(params);

        // all methods should return a Promise
        expectToBePromise(importOrdererResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/fabric-orderer', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['cluster_name']).toEqual(clusterName);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['grpcwp_url']).toEqual(grpcwpUrl);
        expect(options.body['msp']).toEqual(msp);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['api_url']).toEqual(apiUrl);
        expect(options.body['cluster_id']).toEqual(clusterId);
        expect(options.body['location']).toEqual(location);
        expect(options.body['operations_url']).toEqual(operationsUrl);
        expect(options.body['system_channel_id']).toEqual(systemChannelId);
        expect(options.body['tags']).toEqual(tags);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const clusterName = 'ordering service 1';
        const displayName = 'orderer';
        const grpcwpUrl = 'https://n3a3ec3-myorderer-proxy.ibp.us-south.containers.appdomain.cloud:443';
        const msp = mspCryptoFieldModel;
        const mspId = 'Org1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          clusterName,
          displayName,
          grpcwpUrl,
          msp,
          mspId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.importOrderer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.importOrderer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const importOrdererPromise = blockchainService.importOrderer();
        expectToBePromise(importOrdererPromise);

        importOrdererPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('editOrderer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editOrderer
        const id = 'testString';
        const clusterName = 'ordering service 1';
        const displayName = 'orderer';
        const apiUrl = 'grpcs://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:7050';
        const operationsUrl = 'https://n3a3ec3-myorderer.ibp.us-south.containers.appdomain.cloud:8443';
        const grpcwpUrl = 'https://n3a3ec3-myorderer-proxy.ibp.us-south.containers.appdomain.cloud:443';
        const mspId = 'Org1';
        const consenterProposalFin = true;
        const location = 'ibmcloud';
        const systemChannelId = 'testchainid';
        const tags = ['fabric-ca'];
        const params = {
          id: id,
          clusterName: clusterName,
          displayName: displayName,
          apiUrl: apiUrl,
          operationsUrl: operationsUrl,
          grpcwpUrl: grpcwpUrl,
          mspId: mspId,
          consenterProposalFin: consenterProposalFin,
          location: location,
          systemChannelId: systemChannelId,
          tags: tags,
        };

        const editOrdererResult = blockchainService.editOrderer(params);

        // all methods should return a Promise
        expectToBePromise(editOrdererResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/fabric-orderer/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['cluster_name']).toEqual(clusterName);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['api_url']).toEqual(apiUrl);
        expect(options.body['operations_url']).toEqual(operationsUrl);
        expect(options.body['grpcwp_url']).toEqual(grpcwpUrl);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['consenter_proposal_fin']).toEqual(consenterProposalFin);
        expect(options.body['location']).toEqual(location);
        expect(options.body['system_channel_id']).toEqual(systemChannelId);
        expect(options.body['tags']).toEqual(tags);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.editOrderer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.editOrderer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editOrdererPromise = blockchainService.editOrderer();
        expectToBePromise(editOrdererPromise);

        editOrdererPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('ordererAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ActionReenroll
      const actionReenrollModel = {
        tls_cert: true,
        ecert: true,
      };

      // ActionEnroll
      const actionEnrollModel = {
        tls_cert: true,
        ecert: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation ordererAction
        const id = 'testString';
        const restart = true;
        const reenroll = actionReenrollModel;
        const enroll = actionEnrollModel;
        const params = {
          id: id,
          restart: restart,
          reenroll: reenroll,
          enroll: enroll,
        };

        const ordererActionResult = blockchainService.ordererAction(params);

        // all methods should return a Promise
        expectToBePromise(ordererActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-orderer/{id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['restart']).toEqual(restart);
        expect(options.body['reenroll']).toEqual(reenroll);
        expect(options.body['enroll']).toEqual(enroll);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.ordererAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.ordererAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const ordererActionPromise = blockchainService.ordererAction();
        expectToBePromise(ordererActionPromise);

        ordererActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateOrderer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigOrdererKeepalive
      const configOrdererKeepaliveModel = {
        ServerMinInterval: '60s',
        ServerInterval: '2h',
        ServerTimeout: '20s',
      };

      // ConfigOrdererAuthentication
      const configOrdererAuthenticationModel = {
        TimeWindow: '15m',
        NoExpirationChecks: false,
      };

      // ConfigOrdererGeneralUpdate
      const configOrdererGeneralUpdateModel = {
        Keepalive: configOrdererKeepaliveModel,
        Authentication: configOrdererAuthenticationModel,
      };

      // ConfigOrdererDebug
      const configOrdererDebugModel = {
        BroadcastTraceDir: 'testString',
        DeliverTraceDir: 'testString',
      };

      // ConfigOrdererMetricsStatsd
      const configOrdererMetricsStatsdModel = {
        Network: 'udp',
        Address: '127.0.0.1:8125',
        WriteInterval: '10s',
        Prefix: 'server',
      };

      // ConfigOrdererMetrics
      const configOrdererMetricsModel = {
        Provider: 'disabled',
        Statsd: configOrdererMetricsStatsdModel,
      };

      // ConfigOrdererUpdate
      const configOrdererUpdateModel = {
        General: configOrdererGeneralUpdateModel,
        Debug: configOrdererDebugModel,
        Metrics: configOrdererMetricsModel,
      };

      // CryptoEnrollmentComponent
      const cryptoEnrollmentComponentModel = {
        admincerts: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
      };

      // UpdateEnrollmentCryptoFieldCa
      const updateEnrollmentCryptoFieldCaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'ca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
      };

      // UpdateEnrollmentCryptoFieldTlsca
      const updateEnrollmentCryptoFieldTlscaModel = {
        host: 'n3a3ec3-myca.ibp.us-south.containers.appdomain.cloud',
        port: 7054,
        name: 'tlsca',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        enroll_id: 'admin',
        enroll_secret: 'password',
        csr_hosts: ['testString'],
      };

      // UpdateEnrollmentCryptoField
      const updateEnrollmentCryptoFieldModel = {
        component: cryptoEnrollmentComponentModel,
        ca: updateEnrollmentCryptoFieldCaModel,
        tlsca: updateEnrollmentCryptoFieldTlscaModel,
      };

      // UpdateMspCryptoFieldCa
      const updateMspCryptoFieldCaModel = {
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        ca_intermediate_certs: ['testString'],
      };

      // UpdateMspCryptoFieldTlsca
      const updateMspCryptoFieldTlscaModel = {
        root_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        ca_intermediate_certs: ['testString'],
      };

      // ClientAuth
      const clientAuthModel = {
        type: 'noclientcert',
        tls_certs: ['testString'],
      };

      // UpdateMspCryptoFieldComponent
      const updateMspCryptoFieldComponentModel = {
        ekey: 'testString',
        ecert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        admin_certs: ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='],
        tls_key: 'testString',
        tls_cert: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        client_auth: clientAuthModel,
      };

      // UpdateMspCryptoField
      const updateMspCryptoFieldModel = {
        ca: updateMspCryptoFieldCaModel,
        tlsca: updateMspCryptoFieldTlscaModel,
        component: updateMspCryptoFieldComponentModel,
      };

      // UpdateOrdererBodyCrypto
      const updateOrdererBodyCryptoModel = {
        enrollment: updateEnrollmentCryptoFieldModel,
        msp: updateMspCryptoFieldModel,
      };

      // NodeOu
      const nodeOuModel = {
        enabled: true,
      };

      // ResourceRequests
      const resourceRequestsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceLimits
      const resourceLimitsModel = {
        cpu: '100m',
        memory: '256MiB',
      };

      // ResourceObject
      const resourceObjectModel = {
        requests: resourceRequestsModel,
        limits: resourceLimitsModel,
      };

      // UpdateOrdererBodyResources
      const updateOrdererBodyResourcesModel = {
        orderer: resourceObjectModel,
        proxy: resourceObjectModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateOrderer
        const id = 'testString';
        const adminCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const configOverride = configOrdererUpdateModel;
        const crypto = updateOrdererBodyCryptoModel;
        const nodeOu = nodeOuModel;
        const replicas = 1;
        const resources = updateOrdererBodyResourcesModel;
        const version = '1.4.6-1';
        const zone = '-';
        const params = {
          id: id,
          adminCerts: adminCerts,
          configOverride: configOverride,
          crypto: crypto,
          nodeOu: nodeOu,
          replicas: replicas,
          resources: resources,
          version: version,
          zone: zone,
        };

        const updateOrdererResult = blockchainService.updateOrderer(params);

        // all methods should return a Promise
        expectToBePromise(updateOrdererResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/fabric-orderer/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['admin_certs']).toEqual(adminCerts);
        expect(options.body['config_override']).toEqual(configOverride);
        expect(options.body['crypto']).toEqual(crypto);
        expect(options.body['node_ou']).toEqual(nodeOu);
        expect(options.body['replicas']).toEqual(replicas);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['version']).toEqual(version);
        expect(options.body['zone']).toEqual(zone);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.updateOrderer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.updateOrderer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateOrdererPromise = blockchainService.updateOrderer();
        expectToBePromise(updateOrdererPromise);

        updateOrdererPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('submitBlock', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation submitBlock
        const id = 'testString';
        const b64Block = 'bWFzc2l2ZSBiaW5hcnkgb2YgYSBjb25maWcgYmxvY2sgd291bGQgYmUgaGVyZSBpZiB0aGlzIHdhcyByZWFsLCBwbGVhc2UgZG9udCBzZW5kIHRoaXM=';
        const params = {
          id: id,
          b64Block: b64Block,
        };

        const submitBlockResult = blockchainService.submitBlock(params);

        // all methods should return a Promise
        expectToBePromise(submitBlockResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/{id}/config', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['b64_block']).toEqual(b64Block);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.submitBlock(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.submitBlock({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const submitBlockPromise = blockchainService.submitBlock();
        expectToBePromise(submitBlockPromise);

        submitBlockPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('importMsp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation importMsp
        const mspId = 'Org1';
        const displayName = 'My Peer';
        const rootCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const intermediateCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkRhdGEgaGVyZSBpZiB0aGlzIHdhcyByZWFsCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'];
        const admins = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const tlsRootCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const params = {
          mspId: mspId,
          displayName: displayName,
          rootCerts: rootCerts,
          intermediateCerts: intermediateCerts,
          admins: admins,
          tlsRootCerts: tlsRootCerts,
        };

        const importMspResult = blockchainService.importMsp(params);

        // all methods should return a Promise
        expectToBePromise(importMspResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/msp', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['root_certs']).toEqual(rootCerts);
        expect(options.body['intermediate_certs']).toEqual(intermediateCerts);
        expect(options.body['admins']).toEqual(admins);
        expect(options.body['tls_root_certs']).toEqual(tlsRootCerts);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const mspId = 'Org1';
        const displayName = 'My Peer';
        const rootCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          mspId,
          displayName,
          rootCerts,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.importMsp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.importMsp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const importMspPromise = blockchainService.importMsp();
        expectToBePromise(importMspPromise);

        importMspPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('editMsp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editMsp
        const id = 'testString';
        const mspId = 'Org1';
        const displayName = 'My Peer';
        const rootCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const intermediateCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkRhdGEgaGVyZSBpZiB0aGlzIHdhcyByZWFsCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K'];
        const admins = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const tlsRootCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const params = {
          id: id,
          mspId: mspId,
          displayName: displayName,
          rootCerts: rootCerts,
          intermediateCerts: intermediateCerts,
          admins: admins,
          tlsRootCerts: tlsRootCerts,
        };

        const editMspResult = blockchainService.editMsp(params);

        // all methods should return a Promise
        expectToBePromise(editMspResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/msp/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['msp_id']).toEqual(mspId);
        expect(options.body['display_name']).toEqual(displayName);
        expect(options.body['root_certs']).toEqual(rootCerts);
        expect(options.body['intermediate_certs']).toEqual(intermediateCerts);
        expect(options.body['admins']).toEqual(admins);
        expect(options.body['tls_root_certs']).toEqual(tlsRootCerts);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.editMsp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.editMsp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editMspPromise = blockchainService.editMsp();
        expectToBePromise(editMspPromise);

        editMspPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getMspCertificate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMspCertificate
        const mspId = 'testString';
        const cache = 'skip';
        const params = {
          mspId: mspId,
          cache: cache,
        };

        const getMspCertificateResult = blockchainService.getMspCertificate(params);

        // all methods should return a Promise
        expectToBePromise(getMspCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/msps/{msp_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['cache']).toEqual(cache);
        expect(options.path['msp_id']).toEqual(mspId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const mspId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          mspId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getMspCertificate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.getMspCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getMspCertificatePromise = blockchainService.getMspCertificate();
        expectToBePromise(getMspCertificatePromise);

        getMspCertificatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('editAdminCerts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editAdminCerts
        const id = 'testString';
        const appendAdminCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const removeAdminCerts = ['LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNlcnQgZGF0YSB3b3VsZCBiZSBoZXJlIGlmIHRoaXMgd2FzIHJlYWwKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo='];
        const params = {
          id: id,
          appendAdminCerts: appendAdminCerts,
          removeAdminCerts: removeAdminCerts,
        };

        const editAdminCertsResult = blockchainService.editAdminCerts(params);

        // all methods should return a Promise
        expectToBePromise(editAdminCertsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/{id}/certs', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['append_admin_certs']).toEqual(appendAdminCerts);
        expect(options.body['remove_admin_certs']).toEqual(removeAdminCerts);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.editAdminCerts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.editAdminCerts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editAdminCertsPromise = blockchainService.editAdminCerts();
        expectToBePromise(editAdminCertsPromise);

        editAdminCertsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listComponents', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listComponents
        const deploymentAttrs = 'included';
        const parsedCerts = 'included';
        const cache = 'skip';
        const caAttrs = 'included';
        const params = {
          deploymentAttrs: deploymentAttrs,
          parsedCerts: parsedCerts,
          cache: cache,
          caAttrs: caAttrs,
        };

        const listComponentsResult = blockchainService.listComponents(params);

        // all methods should return a Promise
        expectToBePromise(listComponentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['deployment_attrs']).toEqual(deploymentAttrs);
        expect(options.qs['parsed_certs']).toEqual(parsedCerts);
        expect(options.qs['cache']).toEqual(cache);
        expect(options.qs['ca_attrs']).toEqual(caAttrs);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.listComponents(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.listComponents({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getComponentsByType', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getComponentsByType
        const type = 'fabric-peer';
        const deploymentAttrs = 'included';
        const parsedCerts = 'included';
        const cache = 'skip';
        const params = {
          type: type,
          deploymentAttrs: deploymentAttrs,
          parsedCerts: parsedCerts,
          cache: cache,
        };

        const getComponentsByTypeResult = blockchainService.getComponentsByType(params);

        // all methods should return a Promise
        expectToBePromise(getComponentsByTypeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/types/{type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['deployment_attrs']).toEqual(deploymentAttrs);
        expect(options.qs['parsed_certs']).toEqual(parsedCerts);
        expect(options.qs['cache']).toEqual(cache);
        expect(options.path['type']).toEqual(type);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const type = 'fabric-peer';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getComponentsByType(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.getComponentsByType({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getComponentsByTypePromise = blockchainService.getComponentsByType();
        expectToBePromise(getComponentsByTypePromise);

        getComponentsByTypePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getComponentsByTag', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getComponentsByTag
        const tag = 'testString';
        const deploymentAttrs = 'included';
        const parsedCerts = 'included';
        const cache = 'skip';
        const params = {
          tag: tag,
          deploymentAttrs: deploymentAttrs,
          parsedCerts: parsedCerts,
          cache: cache,
        };

        const getComponentsByTagResult = blockchainService.getComponentsByTag(params);

        // all methods should return a Promise
        expectToBePromise(getComponentsByTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/tags/{tag}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['deployment_attrs']).toEqual(deploymentAttrs);
        expect(options.qs['parsed_certs']).toEqual(parsedCerts);
        expect(options.qs['cache']).toEqual(cache);
        expect(options.path['tag']).toEqual(tag);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tag = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tag,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getComponentsByTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.getComponentsByTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getComponentsByTagPromise = blockchainService.getComponentsByTag();
        expectToBePromise(getComponentsByTagPromise);

        getComponentsByTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('removeComponentsByTag', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation removeComponentsByTag
        const tag = 'testString';
        const params = {
          tag: tag,
        };

        const removeComponentsByTagResult = blockchainService.removeComponentsByTag(params);

        // all methods should return a Promise
        expectToBePromise(removeComponentsByTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/components/tags/{tag}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['tag']).toEqual(tag);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tag = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tag,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.removeComponentsByTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.removeComponentsByTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const removeComponentsByTagPromise = blockchainService.removeComponentsByTag();
        expectToBePromise(removeComponentsByTagPromise);

        removeComponentsByTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteComponentsByTag', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteComponentsByTag
        const tag = 'testString';
        const params = {
          tag: tag,
        };

        const deleteComponentsByTagResult = blockchainService.deleteComponentsByTag(params);

        // all methods should return a Promise
        expectToBePromise(deleteComponentsByTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/tags/{tag}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['tag']).toEqual(tag);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tag = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tag,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.deleteComponentsByTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.deleteComponentsByTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteComponentsByTagPromise = blockchainService.deleteComponentsByTag();
        expectToBePromise(deleteComponentsByTagPromise);

        deleteComponentsByTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAllComponents', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAllComponents
        const params = {};

        const deleteAllComponentsResult = blockchainService.deleteAllComponents(params);

        // all methods should return a Promise
        expectToBePromise(deleteAllComponentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/components/purge', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.deleteAllComponents(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.deleteAllComponents({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSettings
        const params = {};

        const getSettingsResult = blockchainService.getSettings(params);

        // all methods should return a Promise
        expectToBePromise(getSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.getSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('editSettings', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EditSettingsBodyInactivityTimeouts
      const editSettingsBodyInactivityTimeoutsModel = {
        enabled: false,
        max_idle_time: 90000,
      };

      // LoggingSettingsClient
      const loggingSettingsClientModel = {
        enabled: true,
        level: 'silly',
        unique_name: false,
      };

      // LoggingSettingsServer
      const loggingSettingsServerModel = {
        enabled: true,
        level: 'silly',
        unique_name: false,
      };

      // EditLogSettingsBody
      const editLogSettingsBodyModel = {
        client: loggingSettingsClientModel,
        server: loggingSettingsServerModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editSettings
        const inactivityTimeouts = editSettingsBodyInactivityTimeoutsModel;
        const fileLogging = editLogSettingsBodyModel;
        const maxReqPerMin = 25;
        const maxReqPerMinAk = 25;
        const fabricGetBlockTimeoutMs = 10000;
        const fabricInstantiateTimeoutMs = 300000;
        const fabricJoinChannelTimeoutMs = 25000;
        const fabricInstallCcTimeoutMs = 300000;
        const fabricLcInstallCcTimeoutMs = 300000;
        const fabricLcGetCcTimeoutMs = 180000;
        const fabricGeneralTimeoutMs = 10000;
        const params = {
          inactivityTimeouts: inactivityTimeouts,
          fileLogging: fileLogging,
          maxReqPerMin: maxReqPerMin,
          maxReqPerMinAk: maxReqPerMinAk,
          fabricGetBlockTimeoutMs: fabricGetBlockTimeoutMs,
          fabricInstantiateTimeoutMs: fabricInstantiateTimeoutMs,
          fabricJoinChannelTimeoutMs: fabricJoinChannelTimeoutMs,
          fabricInstallCcTimeoutMs: fabricInstallCcTimeoutMs,
          fabricLcInstallCcTimeoutMs: fabricLcInstallCcTimeoutMs,
          fabricLcGetCcTimeoutMs: fabricLcGetCcTimeoutMs,
          fabricGeneralTimeoutMs: fabricGeneralTimeoutMs,
        };

        const editSettingsResult = blockchainService.editSettings(params);

        // all methods should return a Promise
        expectToBePromise(editSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/settings', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['inactivity_timeouts']).toEqual(inactivityTimeouts);
        expect(options.body['file_logging']).toEqual(fileLogging);
        expect(options.body['max_req_per_min']).toEqual(maxReqPerMin);
        expect(options.body['max_req_per_min_ak']).toEqual(maxReqPerMinAk);
        expect(options.body['fabric_get_block_timeout_ms']).toEqual(fabricGetBlockTimeoutMs);
        expect(options.body['fabric_instantiate_timeout_ms']).toEqual(fabricInstantiateTimeoutMs);
        expect(options.body['fabric_join_channel_timeout_ms']).toEqual(fabricJoinChannelTimeoutMs);
        expect(options.body['fabric_install_cc_timeout_ms']).toEqual(fabricInstallCcTimeoutMs);
        expect(options.body['fabric_lc_install_cc_timeout_ms']).toEqual(fabricLcInstallCcTimeoutMs);
        expect(options.body['fabric_lc_get_cc_timeout_ms']).toEqual(fabricLcGetCcTimeoutMs);
        expect(options.body['fabric_general_timeout_ms']).toEqual(fabricGeneralTimeoutMs);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.editSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.editSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getFabVersions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFabVersions
        const cache = 'skip';
        const params = {
          cache: cache,
        };

        const getFabVersionsResult = blockchainService.getFabVersions(params);

        // all methods should return a Promise
        expectToBePromise(getFabVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/kubernetes/fabric/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['cache']).toEqual(cache);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getFabVersions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.getFabVersions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getHealth', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getHealth
        const params = {};

        const getHealthResult = blockchainService.getHealth(params);

        // all methods should return a Promise
        expectToBePromise(getHealthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/health', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getHealth(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.getHealth({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listNotifications', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNotifications
        const limit = 1;
        const skip = 1;
        const componentId = 'MyPeer';
        const params = {
          limit: limit,
          skip: skip,
          componentId: componentId,
        };

        const listNotificationsResult = blockchainService.listNotifications(params);

        // all methods should return a Promise
        expectToBePromise(listNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/notifications', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['skip']).toEqual(skip);
        expect(options.qs['component_id']).toEqual(componentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.listNotifications(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.listNotifications({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteSigTx', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSigTx
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteSigTxResult = blockchainService.deleteSigTx(params);

        // all methods should return a Promise
        expectToBePromise(deleteSigTxResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/signature_collections/{id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.deleteSigTx(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.deleteSigTx({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSigTxPromise = blockchainService.deleteSigTx();
        expectToBePromise(deleteSigTxPromise);

        deleteSigTxPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('archiveNotifications', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation archiveNotifications
        const notificationIds = ['c9d00ebf849051e4f102008dc0be2488'];
        const params = {
          notificationIds: notificationIds,
        };

        const archiveNotificationsResult = blockchainService.archiveNotifications(params);

        // all methods should return a Promise
        expectToBePromise(archiveNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/notifications/bulk', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['notification_ids']).toEqual(notificationIds);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const notificationIds = ['c9d00ebf849051e4f102008dc0be2488'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          notificationIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.archiveNotifications(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.archiveNotifications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const archiveNotificationsPromise = blockchainService.archiveNotifications();
        expectToBePromise(archiveNotificationsPromise);

        archiveNotificationsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('restart', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation restart
        const params = {};

        const restartResult = blockchainService.restart(params);

        // all methods should return a Promise
        expectToBePromise(restartResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/restart', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.restart(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.restart({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteAllSessions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAllSessions
        const params = {};

        const deleteAllSessionsResult = blockchainService.deleteAllSessions(params);

        // all methods should return a Promise
        expectToBePromise(deleteAllSessionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/sessions', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.deleteAllSessions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.deleteAllSessions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteAllNotifications', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAllNotifications
        const params = {};

        const deleteAllNotificationsResult = blockchainService.deleteAllNotifications(params);

        // all methods should return a Promise
        expectToBePromise(deleteAllNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/notifications/purge', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.deleteAllNotifications(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.deleteAllNotifications({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('clearCaches', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation clearCaches
        const params = {};

        const clearCachesResult = blockchainService.clearCaches(params);

        // all methods should return a Promise
        expectToBePromise(clearCachesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/cache', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.clearCaches(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.clearCaches({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getPostman', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPostman
        const authType = 'bearer';
        const token = 'testString';
        const apiKey = 'testString';
        const username = 'admin';
        const password = 'password';
        const params = {
          authType: authType,
          token: token,
          apiKey: apiKey,
          username: username,
          password: password,
        };

        const getPostmanResult = blockchainService.getPostman(params);

        // all methods should return a Promise
        expectToBePromise(getPostmanResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/postman', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['auth_type']).toEqual(authType);
        expect(options.qs['token']).toEqual(token);
        expect(options.qs['api_key']).toEqual(apiKey);
        expect(options.qs['username']).toEqual(username);
        expect(options.qs['password']).toEqual(password);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authType = 'bearer';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          authType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getPostman(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await blockchainService.getPostman({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPostmanPromise = blockchainService.getPostman();
        expectToBePromise(getPostmanPromise);

        getPostmanPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSwagger', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSwagger
        const params = {};

        const getSwaggerResult = blockchainService.getSwagger(params);

        // all methods should return a Promise
        expectToBePromise(getSwaggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ak/api/v3/openapi', 'GET');
        const expectedAccept = 'text/plain';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        blockchainService.getSwagger(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        blockchainService.getSwagger({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
