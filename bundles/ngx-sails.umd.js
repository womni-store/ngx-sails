(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('socket.io-client'), require('rxjs/operators'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'socket.io-client', 'rxjs/operators', 'rxjs'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.SailsClient = {}),global.ng.core,global.ng.common,global['node_modules/socket']['io-client/dist/socket'].io.js,global.Rx,global.Rx.operators,global.Rx));
}(this, (function (exports,core,common,io_,Observable,map,Subject) { 'use strict';

var io___default = io_['default'];

var ISailsClientConfig = /** @class */ (function () {
    function ISailsClientConfig() {
    }
    return ISailsClientConfig;
}());
var SAILS_CLIENT_CONFIG = new core.InjectionToken('sails.client.config');

var IO_INSTANCE = new core.InjectionToken('io.instance');
var io = io___default || io_;

var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "get";
    RequestMethod["POST"] = "post";
    RequestMethod["PUT"] = "put";
    RequestMethod["DELETE"] = "delete";
    RequestMethod["OPTIONS"] = "options";
    RequestMethod["HEAD"] = "head";
    RequestMethod["PATCH"] = "patch";
})(RequestMethod || (RequestMethod = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Response = /** @class */ (function () {
    function Response(response, request) {
        if (typeof response === 'string') {
            try {
                response = JSON.parse(response);
            }
            catch (e) {
                throw new Error("Malformed response " + response + ". Could not be parsed to JSON");
            }
        }
        this.config = request;
        this.headers = response.headers || {};
        this.status = response.statusCode || 200;
    }
    return Response;
}());
var SailsResponse = /** @class */ (function (_super) {
    __extends(SailsResponse, _super);
    function SailsResponse(response, request) {
        var _this = _super.call(this, response, request) || this;
        _this.data = response.body || {};
        return _this;
    }
    return SailsResponse;
}(Response));
var SailsError = /** @class */ (function (_super) {
    __extends(SailsError, _super);
    function SailsError(response, request) {
        var _this = _super.call(this, response, request) || this;
        _this.error = response.body || {};
        return _this;
    }
    return SailsError;
}(Response));

var SailsRequest = /** @class */ (function () {
    function SailsRequest() {
    }
    SailsRequest.send = function (request, io, errorsSubject) {
        var method = request.method;
        request.headers = lowerCaseHeaders(request.headers);
        return Observable.Observable.create(function (obs) {
            io.emit(method, request, function (rawResponse) {
                if (rawResponse.statusCode >= 400) {
                    var error = new SailsError(rawResponse, request);
                    errorsSubject.next(error);
                    obs.error(error);
                }
                else {
                    obs.next(rawResponse);
                }
                obs.complete();
            });
        }).pipe(map.map(function (response) { return new SailsResponse(response, request); }));
    };
    return SailsRequest;
}());
function lowerCaseHeaders(headers) {
    Object.keys(headers).forEach(function (header) {
        if (header.toLowerCase() !== header) {
            headers[header.toLowerCase()] = headers[header];
            delete headers[header];
        }
    });
    return headers;
}

function clean(obj) {
    Object.keys(obj).forEach(function (key) { return !obj[key] && delete obj[key]; });
    return obj;
}

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
        this.errorsSubject = new Subject.Subject();
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
        return Observable.Observable.create(function (obs) {
            nextFunc = function (msg) { return obs.next(msg); };
            _this.io.on(event, nextFunc);
            return function () { return _this.io.off(event, nextFunc); };
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
        { type: core.Injectable },
    ];
    /** @nocollapse */
    SailsClient.ctorParameters = function () { return [
        { type: ISailsClientConfig, },
        { type: undefined, decorators: [{ type: core.Inject, args: [IO_INSTANCE,] },] },
    ]; };
    return SailsClient;
}());

function provideSailsClient(config, io$$1) {
    return new SailsClient(config, io$$1);
}
var SailsClientModule = /** @class */ (function () {
    function SailsClientModule() {
    }
    SailsClientModule.configureClient = function (config, ioInstance) {
        return {
            ngModule: SailsClientModule,
            providers: [
                { provide: SAILS_CLIENT_CONFIG, useValue: config },
                { provide: IO_INSTANCE, useValue: ioInstance },
                {
                    provide: SailsClient,
                    useFactory: provideSailsClient,
                    deps: [SAILS_CLIENT_CONFIG, IO_INSTANCE],
                },
            ],
        };
    };
    SailsClientModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                },] },
    ];
    /** @nocollapse */
    SailsClientModule.ctorParameters = function () { return []; };
    return SailsClientModule;
}());

exports.SailsClientModule = SailsClientModule;
exports.SailsClient = SailsClient;
exports.ISailsClientConfig = ISailsClientConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
