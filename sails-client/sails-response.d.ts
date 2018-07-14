import { IRawSailsResponse, ISailsRequest } from './interfaces';
export declare class Response {
    headers: any;
    status: number;
    config: ISailsRequest;
    constructor(response: IRawSailsResponse, request: ISailsRequest);
}
export declare class SailsResponse extends Response {
    data: any;
    constructor(response: IRawSailsResponse, request: ISailsRequest);
}
export declare class SailsError extends Response {
    error: any;
    constructor(response: IRawSailsResponse, request: ISailsRequest);
}
