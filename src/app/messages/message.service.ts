import { Injectable } from '@angular/core';
import { Message } from './message';
import { LogUtil } from '../utils/log-util';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable()
export class MessagingService {

    private message$: Subject<Message>;

    constructor() {
        LogUtil.logMessages(this, 'Init MessagingService');
        this.message$ = new Subject<Message>();
    }

    public publish(message: Message): void {
        this.message$.next(message);
    }

    public of(message: Message): Observable<Message> {
        return this.message$.pipe(
            filter(m => m.getChannelName() === message.getChannelName()),
            map(m => m)
        );
    }
}
