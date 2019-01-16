import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactMessage } from '../models/contact-message';
import { Observable } from 'rxjs';

@Injectable()
export class ContactApiService {

    constructor(private http: HttpClient) {}

    public send(aBaseUrl: string, aContactMessage: ContactMessage): Observable<any> {
        return this.http.post(aBaseUrl + 'contact/send', aContactMessage);
    }
}
