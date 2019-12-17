import { Component, OnInit } from '@angular/core';
import { EntryInfo } from './entry-info';
import { Tag } from '../../models/tag';
import { LogUtil } from '../../utils/log-util';
import { ApplicationService } from '../../application/application.service';
import { MathUtil } from '../../utils/math-util';
import { TagRuleService } from '../../services/tag-rule.service';
import { TagRule } from '../../models/tag-rule';


@Component({
    selector: 'app-entry-info',
    templateUrl: './entry-info.component.html',
    styleUrls: ['./entry-info.component.css']
})
export class EntryInfoComponent implements OnInit{


    algebraicSignIsMinus = true;
    amount: number;
    memo: string;

    tags: Tag[];
    suggestedTags: Tag[] = [];

    tagRules: TagRule[] = [];

    constructor(
        private tagRuleService: TagRuleService,
        private applicationService: ApplicationService) {
        LogUtil.logInits(this, 'init entrycomponent');
    }

    ngOnInit(): void {
        this.updateTagRules()
    }

    updateTagRules() {
        this.tagRuleService.getTagRules(this.applicationService.getCurrentAccount()).subscribe(
            loadedTagRules => {
                this.tagRules = loadedTagRules;
            }
        );
    }

    public cleanEntryView(): void {
        this.algebraicSignIsMinus = true;
        this.amount = null;
        this.memo = '';
        this.tags = [];
        this.suggestedTags = [];
    }

    public initEntryView(aEntryInfo: EntryInfo): void {
        this.cleanEntryView();
        if (aEntryInfo.amount < 0) {
            this.algebraicSignIsMinus = true;
        } else {
            this.algebraicSignIsMinus = false;
        }
        this.amount = MathUtil.convertToPositiv(aEntryInfo.amount);
        this.memo = aEntryInfo.memo;
        this.tags = aEntryInfo.tags;
    }

    public getEntryInfo(): EntryInfo {
        let amountValue: number;
        if (this.algebraicSignIsMinus) {
            amountValue = MathUtil.convertToNegativ(this.amount);
        } else {
            amountValue = MathUtil.convertToPositiv(this.amount);
        }
        const entryInfo = new EntryInfo();
        entryInfo.currency = 'EUR';
        entryInfo.amount = amountValue;
        entryInfo.memo = this.memo;
        entryInfo.tags = this.tags;
        return entryInfo;
    }

    public changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        } else {
            this.algebraicSignIsMinus = true;
        }
    }

    public onAddedTag(tag: Tag): void {
        LogUtil.debug(this, 'onAddedTag ' + JSON.stringify(tag));

        const tagRule = this.tagRules.find( tagRule => tagRule.whenTag.trim() == tag.name.trim());

        if(tagRule) {
            this.suggestedTags = [];
            tagRule.thenTags.forEach( tagName => {
                const tag = new Tag();
                tag.name = tagName;
                LogUtil.debug(this, 'fill suggestedTags - ' + this.suggestedTags);
                this.suggestedTags.push(tag);
            })
        }

    }

    public onTagDeleted(tag: Tag): void {
        LogUtil.debug(this, 'onTagDeleted ' + tag);
    }

    public onSuggestedTagSelected(selectedTag: Tag): void {
        LogUtil.debug(this, 'onSuggestedTagSelected ' + JSON.stringify(selectedTag));

        const suggestedTag = this.suggestedTags.find( tag => tag.name.trim() == selectedTag.name.trim());

        this.suggestedTags = this.suggestedTags.filter( tag => {
            if(tag.name == selectedTag.name){
                return false;
            }
            return true;
        })

        LogUtil.debug(this, 'Push suggestedTag to tags ->  ' + suggestedTag);

        this.tags.push(suggestedTag);

    }

}
