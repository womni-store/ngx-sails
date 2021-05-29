import 'socket.io-client';
import { InjectionToken } from '@angular/core';
import * as io_ from 'socket.io-client';
export var IO_INSTANCE = new InjectionToken('io.instance');
var io = io_.default || io_;
export { io };
//# sourceMappingURL=index.js.map