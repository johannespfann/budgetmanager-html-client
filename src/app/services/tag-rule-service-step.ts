import { AccountItem } from "../models/account-item";
import { Observable } from "rxjs";
import { TagRule } from "../models/tag-rule";
import { User } from "../models/user";

export interface TagRuleServiceStep {

    getTagRules(user: User, accountItem: AccountItem): Observable<TagRule[]> 

    saveTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> 

    deleteTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> 

    updateTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> 
    
}