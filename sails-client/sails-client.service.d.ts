import { SocketIOSocket } from '../io';
import { ISailsRequestOpts, ISailsResponse } from './interfaces';
import { ISailsClientConfig } from './sails-client.config';
import { Observable } from 'rxjs';
import { SailsError } from './sails-response';
import * as ɵngcc0 from '@angular/core';
export declare class SailsClient {
    private defaultHeaders;
    private uri;
    private configOptions;
    private errorsSubject;
    io: SocketIOSocket;
    requestErrors: Observable<SailsError>;
    constructor(config?: ISailsClientConfig, ioInstance?: SocketIOSocket);
    get(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    post(url: string, body?: any, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    put(url: string, body?: any, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    delete(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    options(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    head(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    patch(url: string, body: any, options?: ISailsRequestOpts): Observable<ISailsResponse>;
    on(event: string): Observable<any>;
    readonly configuration: ISailsClientConfig;
    private sendRequest(url, method, data?, options?);
    private getConfig(config);
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<SailsClient, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<SailsClient>;
}

//# sourceMappingURL=sails-client.service.d.ts.map