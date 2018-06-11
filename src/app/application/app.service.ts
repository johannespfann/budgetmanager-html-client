import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LogUtil } from '../utils/log-util';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfiguration } from './application-configuration';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

    private isLogedIn: boolean;

    private user: User = null;

    constructor(
        private loginService: LoginService) {
    }

    public getCurrentUser(): User {
        return this.user;
    }

}
