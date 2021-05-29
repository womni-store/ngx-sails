import { ISailsClientConfig } from './sails-client.config';
import { ModuleWithProviders } from '@angular/core';
import { SailsClient } from './sails-client.service';
import { SocketIOSocket } from '../io/index';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare function provideSailsClient(config: ISailsClientConfig, io?: SocketIOSocket): SailsClient;
export declare class SailsClientModule {
    static configureClient(config?: ISailsClientConfig, ioInstance?: SocketIOSocket): ModuleWithProviders<SailsClientModule>;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<SailsClientModule, never>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDeclaration<SailsClientModule, never, [typeof ɵngcc1.CommonModule], never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDeclaration<SailsClientModule>;
}

//# sourceMappingURL=sails-client.module.d.ts.map