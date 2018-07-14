import { SAILS_CLIENT_CONFIG } from './sails-client.config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IO_INSTANCE } from './../io';
import { SailsClient } from './sails-client.service';
export function provideSailsClient(config, io) {
    return new SailsClient(config, io);
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
        { type: NgModule, args: [{
                    imports: [CommonModule],
                },] },
    ];
    /** @nocollapse */
    SailsClientModule.ctorParameters = function () { return []; };
    return SailsClientModule;
}());
export { SailsClientModule };
//# sourceMappingURL=sails-client.module.js.map