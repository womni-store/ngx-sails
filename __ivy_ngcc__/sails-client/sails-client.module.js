import { SAILS_CLIENT_CONFIG } from './sails-client.config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IO_INSTANCE } from './../io';
import { SailsClient } from './sails-client.service';
import * as ɵngcc0 from '@angular/core';
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
    /** @nocollapse */
    SailsClientModule.ctorParameters = function () { return []; };
SailsClientModule.ɵfac = function SailsClientModule_Factory(t) { return new (t || SailsClientModule)(); };
SailsClientModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: SailsClientModule });
SailsClientModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [CommonModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(SailsClientModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule]
            }]
    }], function () { return []; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SailsClientModule, { imports: function () { return [CommonModule]; } }); })();
    return SailsClientModule;
}());
export { SailsClientModule };

//# sourceMappingURL=sails-client.module.js.map