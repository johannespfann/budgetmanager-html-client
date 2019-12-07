import { TagRuleServiceStep } from "./tag-rule-service-step";
import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { Observable } from "rxjs";
import { TagRule } from "../models/tag-rule";

export class TagRuleCache implements TagRuleServiceStep {

    private cacheTagRule: TagRule[];
    private lastUser: User;
    private lastAccount: Account;

    private isCacheValid: boolean;

    constructor(
            private tagRuleServiceStep: TagRuleServiceStep) {
        this.cacheTagRule = [];
    }


    getTagRules(user: User, accountItem: AccountItem): Observable<TagRule[]> {
        return this.tagRuleServiceStep.getTagRules(user, accountItem);
    }

    saveTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        return this.tagRuleServiceStep.saveTagRule(user, accountItem, tagRule);
    }

    deleteTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> {
    return this.tagRuleServiceStep.deleteTagRule(user, accountItem, tagRule);
    }

    updateTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        return this.tagRuleServiceStep.updateTagRule(user, accountItem, tagRule);
    }


}