import { ISailsClientConfig } from './sails-client.config';
import { ModuleWithProviders } from '@angular/core';
import { SailsClient } from './sails-client.service';
import { SocketIOSocket } from '../io/index';
export declare function provideSailsClient(config: ISailsClientConfig, io?: SocketIOSocket): SailsClient;
export declare class SailsClientModule {
    static configureClient(config?: ISailsClientConfig, ioInstance?: SocketIOSocket): ModuleWithProviders<SailsClientModule>;
}
