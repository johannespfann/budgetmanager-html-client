import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LogUtil } from '../utils/log-util';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {

    public name: String;

    public email: String;

    constructor(private userService: UserService) {
        this.setupAccountInfos();
    }

    private setupAccountInfos(): void {
        this.userService.getUserInfo().subscribe(
            (user: any) => {
                this.name = user.name;
                this.email = user.emails[0];
                LogUtil.info(this, JSON.stringify(user));
            },
            (error: any) => {
                LogUtil.error(this, JSON.stringify(error));
            }
        );
    }

}
