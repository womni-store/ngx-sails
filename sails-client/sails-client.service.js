import { IO_INSTANCE, io } from '../io';
import { Inject, Injectable } from '@angular/core';
import { ISailsClientConfig } from './sails-client.config';
import { Observable } from 'rxjs';
import { RequestMethod } from './enums';
import { SailsRequest } from './sails-request';
import { Subject } from 'rxjs';
import { clean } from './utils';
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
        console.log('A4',event);
        return new Observable(function (obs) {
            console.log({obs})
            nextFunc = function (msg) { console.log({msg});return obs.next(msg); };
            _this.io.on(event, nextFunc);

            return function () { console.log({event, nextFunc}); return _this.io.off(event, nextFunc); };
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
    SailsClient.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SailsClient.ctorParameters = function () { return [
        { type: ISailsClientConfig, },
        { type: undefined, decorators: [{ type: Inject, args: [IO_INSTANCE,] },] },
    ]; };
    return SailsClient;
}());
export { SailsClient };
//# sourceMappingURL=sails-client.service.js.map