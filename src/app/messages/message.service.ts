import { Injectable } from '@angular/core';
import { Message } from './message';
import { LogUtil } from '../utils/log-util';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class MessagingService {

    private message$: Subject<Message>;

    constructor() {
        LogUtil.info(this, 'Init MessagingService');
        this.message$ = new Subject<Message>();
    }

    public publish<T>(message: T): void {
        const channel = (<any>message.constructor).name;
        this.message$.next({ channel: channel, data: message });
    }

    public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
        const channel = (<any>messageType).name;
        return this.message$.pipe(
            filter(m => m.channel === channel),
            map(m => m.data)
        );
    }
}