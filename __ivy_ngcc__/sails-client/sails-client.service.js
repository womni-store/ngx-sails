import { IO_INSTANCE, io } from '../io';
import { Inject, Injectable } from '@angular/core';
import { ISailsClientConfig } from './sails-client.config';
import { Observable } from 'rxjs';
import { RequestMethod } from './enums';
import { SailsRequest } from './sails-request';
import { Subject } from 'rxjs';
import { clean } from './utils';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './sails-client.config';
var SAILS_IO_SDK_STRING = '__sails_io_sdk';
var SAILS_IO_SDK = {
    language: 'javascript',
    platform: 'browser',
    version: '1.1.12',
};
var SailsClient = /** @class */ (function () {
    function SailsClient(config, ioInstance) {
        if (config === void 0) { config = {}; }
        var _a = this.getConfig(config), uri = _a.uri, options = _a.options;
        if (config.headers) {
            this.defaultHeaders = config.headers;
        }
        ioInstance ? (this.io = ioInstance) : (this.io = io(uri, options));
        this.uri = uri;
        this.configOptions = options;
        this.errorsSubject = new Subject();
        this.requestErrors = this.errorsSubject.asObservable();
    }
    SailsClient.prototype.get = function (url, options) {
        return this.sendRequest(url, RequestMethod.GET, undefined, options);
    };
    SailsClient.prototype.post = function (url, body, options) {
        return this.sendRequest(url, RequestMethod.POST, body, options);
    };
    SailsClient.prototype.put = function (url, body, options) {
        return this.sendRequest(url, RequestMethod.PUT, body, options);
    };
    SailsClient.prototype.delete = function (url, options) {
        return this.sendRequest(url, RequestMethod.DELETE, undefined, options);
    };
    SailsClient.prototype.options = function (url, options) {
        return this.sendRequest(url, RequestMethod.OPTIONS, undefined, options);
    };
    SailsClient.prototype.head = function (url, options) {
        return this.sendRequest(url, RequestMethod.HEAD, undefined, options);
    };
    SailsClient.prototype.patch = function (url, body, options) {
        return this.sendRequest(url, RequestMethod.PATCH, body, options);
    };
    SailsClient.prototype.on = function (event) {
        var _this = this;
        var nextFunc;
        return new Observable(function (obs) {
            
            nextFunc = function (msg) { return obs.next(msg); };
            _this.io.on(event, nextFunc);
           // return function () { return _this.io.off(event, nextFunc); };
        });
    };
    Object.defineProperty(SailsClient.prototype, "configuration", {
        get: function () {
            return {
                uri: this.uri,
                headers: this.defaultHeaders,
                options: this.configOptions,
            };
        },
        enumerable: true,
        configurable: true
    });
    SailsClient.prototype.sendRequest = function (url, method, data, options) {
        if (options === void 0) { options = {}; }
        var request = { url: url, method: method, data: data };
        Object.assign(request, {
            params: options.params || options.search,
            headers: Object.assign({}, this.defaultHeaders, options.headers),
        });
        return SailsRequest.send(clean(request), this.io, this.errorsSubject);
    };
    SailsClient.prototype.getConfig = function (config) {
        var options = { transports: ['websocket'] };
        var uri = config.uri, query = {};
        Object.assign(query, Object.keys(SAILS_IO_SDK).forEach(function (k) { return (query[SAILS_IO_SDK_STRING + "_" + k] = SAILS_IO_SDK[k]); }));
        if (config.options && config.options.query) {
            Object.assign(query, config.options.query);
        }
        Object.assign(options, config.options, { query: query });
        return { uri: uri, options: options };
    };
    /** @nocollapse */
    SailsClient.ctorParameters = function () { return [
        { type: ISailsClientConfig, },
        { type: undefined, decorators: [{ type: Inject, args: [IO_INSTANCE,] },] },
    ]; };
SailsClient.ɵfac = function SailsClient_Factory(t) { return new (t || SailsClient)(ɵngcc0.ɵɵinject(ɵngcc1.ISailsClientConfig), ɵngcc0.ɵɵinject(IO_INSTANCE)); };
SailsClient.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: SailsClient, factory: function (t) { return SailsClient.ɵfac(t); } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(SailsClient, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.ISailsClientConfig }, { type: undefined, decorators: [{
                type: Inject,
                args: [IO_INSTANCE]
            }] }]; }, null); })();
    return SailsClient;
}());
export { SailsClient };

//# sourceMappingURL=sails-client.service.js.map