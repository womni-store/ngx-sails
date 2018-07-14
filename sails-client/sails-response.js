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
export { Response };
var SailsResponse = /** @class */ (function (_super) {
    __extends(SailsResponse, _super);
    function SailsResponse(response, request) {
        var _this = _super.call(this, response, request) || this;
        _this.data = response.body || {};
        return _this;
    }
    return SailsResponse;
}(Response));
export { SailsResponse };
var SailsError = /** @class */ (function (_super) {
    __extends(SailsError, _super);
    function SailsError(response, request) {
        var _this = _super.call(this, response, request) || this;
        _this.error = response.body || {};
        return _this;
    }
    return SailsError;
}(Response));
export { SailsError };
//# sourceMappingURL=sails-response.js.map