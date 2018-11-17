import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {

    private name: String;

    private email: String;

    constructor(private userService: UserService) {
        this.setupAccountInfos();
    }


    private setupAccountInfos(): void {
        this.userService.getUserInfo().subscribe( 
            (user: any) => {
                this.name = user.name;
                this.email = user.email;
                LogUtil.info(this,JSON.stringify(user));
            },
            (error: any) => {
                LogUtil.error(this,JSON.stringify(error));
            }
        );
    }



}
