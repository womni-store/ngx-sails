import { InjectionToken } from '@angular/core';
import { SocketIOConnectOpts } from '../io';
export declare class ISailsClientConfig {
    uri?: string;
    headers?: any;
    options?: SocketIOConnectOpts;
}
export declare let SAILS_CLIENT_CONFIG: InjectionToken<ISailsClientConfig>;
