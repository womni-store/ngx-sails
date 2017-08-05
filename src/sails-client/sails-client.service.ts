import { ISailsRequest, ISailsRequestOpts, ISailsResponse } from './interfaces';
import { SocketIOConnectOpts, SocketIOSocket, io } from '../io';

import { ISailsClientConfig } from './sails-client.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { RequestMethod } from './enums';
import { SailsRequest } from './sails-request';
import { clean } from './utils';

const SAILS_IO_SDK_STRING = '__sails_io_sdk';

const SAILS_IO_SDK = {
  language: 'javascript',
  platform: 'browser',
  version: '1.1.12'
}

@Injectable()
export class SailsClient {

  private io: SocketIOSocket;
  private defaultHeaders: any;
  private uri: string;
  private configOptions: SocketIOConnectOpts;

  constructor(config: ISailsClientConfig = {}, ioInstance?: any) {
    const { uri, options } = this.getConfig(config);
    if (config.headers) {
      this.defaultHeaders = config.headers;
    }
    ioInstance ? this.io = ioInstance : this.io = io(uri, options);
    this.uri = uri;
    this.configOptions = options;
  }

  get(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.GET, undefined, options);
  }

  post(url: string, body?: any, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.POST, body, options);
  }

  put(url: string, body?: any, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.PUT, body, options);
  }

  delete(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.DELETE, undefined, options);
  }

  options(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.OPTIONS, undefined, options);
  }

  head(url: string, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.HEAD, undefined, options);
  }

  patch(url: string, body: any, options?: ISailsRequestOpts): Observable<ISailsResponse> {
    return this.sendRequest(url, RequestMethod.PATCH, body, options);
  }

  on(event: string): Observable<any> {
    let nextFunc: (msg: any) => void;

    return Observable.create((obs: Observer<any>) => {
      nextFunc = (msg: any) => obs.next(msg);
      this.io.on(event, nextFunc);
      return () => this.io.off(event, nextFunc);
    });
  }

  get configuration() {
    return <ISailsClientConfig>{ uri: this.uri, headers: this.defaultHeaders, options: this.configOptions };
  }

  private sendRequest(url: string, method: RequestMethod, data?: any, options: ISailsRequestOpts = {}) {
    let request: ISailsRequest = { url, method, data };
    Object.assign(request,
      {
        params: options.params || options.search,
        headers: Object.assign({}, this.defaultHeaders, options.headers)
      }
    );
    return SailsRequest.send(clean(request), this.io);
  }

  private getConfig(config: ISailsClientConfig) {
    const options: SocketIOConnectOpts = { transports: ['websocket'] };

    let uri = config.uri, query: any = {};

    Object.assign(query, Object.keys(SAILS_IO_SDK).forEach(k => query[`${SAILS_IO_SDK_STRING}_${k}`] = SAILS_IO_SDK[k]));

    if (config.options && config.options.query) {
      Object.assign(query, config.options.query);
    }

    Object.assign(options, config.options, { query });

    return { uri, options };
  }
}
