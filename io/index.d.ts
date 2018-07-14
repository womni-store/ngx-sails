import 'socket.io-client';
import { InjectionToken } from '@angular/core';
export declare type SocketIOSocket = SocketIOClient.Socket;
export declare type SocketIOConnectOpts = SocketIOClient.ConnectOpts;
export declare let IO_INSTANCE: InjectionToken<any>;
declare const io: any;
export { io };
