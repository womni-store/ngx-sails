import { SailsError, SailsResponse } from './sails-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
var SailsRequest = /** @class */ (function () {
    function SailsRequest() {
    }
    SailsRequest.send = function (request, io, errorsSubject) {
        var method = request.method;
        request.headers = lowerCaseHeaders(request.headers);
        return Observable.create(function (obs) {
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
        }).pipe(map(function (response) { return new SailsResponse(response, request); }));
    };
    return SailsRequest;
}());
export { SailsRequest };
function lowerCaseHeaders(headers) {
    Object.keys(headers).forEach(function (header) {
        if (header.toLowerCase() !== header) {
            headers[header.toLowerCase()] = headers[header];
            delete headers[header];
        }
    });
    return headers;
}
//# sourceMappingURL=sails-request.js.map