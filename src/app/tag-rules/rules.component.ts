import { Component, OnInit } from '@angular/core';
import { TagRule } from '../models/tag-rule';
import { TagRuleService } from '../services/tag-rule.service';
import { LogUtil } from '../utils/log-util';
import { AccountService } from '../services/account-service';
import { ApplicationService } from '../application/application.service';
import { AccountItem } from '../models/account-item';


@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

    /**
     * show ruletags
     */

    tagRuleList: TagRule[]; 

    /**
     * add new tagrules
     */

    inputFieldWhenTagIsVisible = true;
    nextwhenTagName: string = '';
    whenTagName: string[];


    nextThenTagRule: string;
    newThenTagRules: string[];
    

    private selectedAccount: AccountItem;

    constructor(
            private applicationService: ApplicationService,
            private tagRuleService: TagRuleService) {
            LogUtil.logInits(this, 'init tagrulecomponent');
        
        this.newThenTagRules = [];
        this.whenTagName = [];
    }

    ngOnInit(): void {
        this.updateAccountItems();
        this.updateTagRules();
    }


    deleteTagRule(tagRule: TagRule): void {
        LogUtil.debug(this, 'pressed delete ' + JSON.stringify(tagRule))


        this.tagRuleService.deleteTagRule(this.selectedAccount, tagRule).subscribe(
            data => {
                LogUtil.info(this, 'deleted ' + JSON.stringify(tagRule));
                this.updateTagRules();
            }
        )
        
    }


    addTagRule(): void {
        LogUtil.debug(this, 'pressed add ');
        
        const tagRule = new TagRule();
        const whenTagName =  this.whenTagName[0]
        
        tagRule.whenTag = whenTagName;

        tagRule.thenTags = this.newThenTagRules.map( stringItem => {
            return stringItem;
        });

        LogUtil.debug(this, JSON.stringify(tagRule));

        this.tagRuleService.saveTagRule(this.selectedAccount, tagRule).subscribe(
            data => {
                LogUtil.info(this, 'added rule');
                this.updateTagRules();
            }
        );

         this.nextwhenTagName = '';
         this.whenTagName = [];
         this.inputFieldWhenTagIsVisible = true;

         this.nextThenTagRule = '';
         this.newThenTagRules = [];

  
    }
    private updateTagRules() {
        this.tagRuleService.getTagRules(this.selectedAccount)
        .subscribe(data => this.tagRuleList = data);
    }


    addWhenTag(event: KeyboardEvent): void {
        LogUtil.debug(this, 'pressed addWhenTag with ' + event.key);

        if (this.nextwhenTagName.includes(' ')) {
            this.whenTagName.push(this.nextwhenTagName);
            this.nextwhenTagName =  '';
            this.inputFieldWhenTagIsVisible = false;
        }        
    }

    addThenTags(event: any): void {
        LogUtil.debug(this, 'pressed addThenTags');

        if (this.nextThenTagRule.includes(' ')) {

            const temp: Array<string> = this.nextThenTagRule.split(' ');
            let preparedTagName: string = temp[0];

            preparedTagName = preparedTagName.replace(' ', '');
            if (preparedTagName === '') {
                this.nextThenTagRule = '';
                return;
            }

            let newvalue = '';
            newvalue = preparedTagName.toLocaleLowerCase();
            this.newThenTagRules.push(newvalue);
            this.nextThenTagRule = '';
        }
    }

    deleteWhenTag(event: any): void {
        LogUtil.debug(this, 'pressed deleteWhenTag ');
        
        this.nextwhenTagName = '';
        this.whenTagName = [];
        this.inputFieldWhenTagIsVisible = true;

    }
    

    deleteThenTag(event: any): void {
        LogUtil.debug(this, 'pressed deleteThenTag ' + event)
        this.newThenTagRules = this.newThenTagRules.filter( element => element != event)
    }


    private updateAccountItems(): void {
        this.selectedAccount = this.applicationService.getCurrentAccount();
    }
}
