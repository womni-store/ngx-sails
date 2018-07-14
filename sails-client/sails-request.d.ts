import { SailsError } from './sails-response';
import { ISailsRequest } from './index';
import { SocketIOSocket } from '../io';
import { Subject } from 'rxjs';
export declare class SailsRequest {
    static send(request: ISailsRequest, io: SocketIOSocket, errorsSubject: Subject<SailsError>): any;
}
