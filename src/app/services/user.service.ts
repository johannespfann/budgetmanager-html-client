import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { UserApiService } from '../rest/user-api.service';
import { ApplicationService } from '../application/application.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

    constructor(
        private userApiService: UserApiService,
        private applicationService: ApplicationService) {
        LogUtil.logInits(this, 'init user-service');
    }

    public getUserInfo(): Observable<any> {
        return this.userApiService.getUserInfo(
            this.applicationService.getBaseUrl(),
            this.applicationService.getCurrentUser(),
            this.applicationService.getCurrentUser().accesstoken);
    }

}
