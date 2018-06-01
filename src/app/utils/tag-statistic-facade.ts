import { User } from "../models/user";
import { TagStatistic } from "../models/tagstatistic";
import { Tag } from "../models/tag";
import { LogUtil } from "./log-util";

export class TagStatisticFacade {

    private user: User;

    private tagStatistics: TagStatistic[];

    public constructor(user: User){
        this.user = user;

        //this.tagStatistics = this.initTagStatisticBrowserStorageFacade(user);
    }

    public pushTag(aTag: Tag): void {
        LogUtil.info(this, 'Push new Tag: ' + aTag.name);
        let savedTags: TagStatistic[] = this.getTagStatisticValues();


        if(this.isAlreadyPersisted(savedTags,aTag)){
            let tagStatisctic: TagStatistic = this.getTagStatistic(savedTags,aTag);
            tagStatisctic.weight = tagStatisctic.weight + 1;
            localStorage.setItem(this.getTagStatisticKey(), JSON.stringify(savedTags));
        }
        else{
            let tagStatisctic: TagStatistic = new TagStatistic();
            tagStatisctic.name = aTag.name;
            tagStatisctic.weight = 1;
            savedTags.push(tagStatisctic);
            localStorage.setItem(this.getTagStatisticKey(), JSON.stringify(savedTags));
        }
    }

    public deleteTag(aTag: Tag): void {
        LogUtil.info(this, 'Delete  Tag: ' + aTag.name);
        let savedTags: TagStatistic[] = this.getTagStatisticValues();

        if(this.isAlreadyPersisted(savedTags,aTag)){
            let tagStatisctic: TagStatistic = this.getTagStatistic(savedTags,aTag);
            tagStatisctic.weight = tagStatisctic.weight - 1;

            if(tagStatisctic.weight <= 0){
                const index = savedTags.indexOf(tagStatisctic);

                if (index !== -1) {
                    savedTags.splice(index, 1);
                }
            }
            localStorage.setItem(this.getTagStatisticKey(), JSON.stringify(savedTags));
            return;
        }
        LogUtil.error(this,'Tag ' + aTag.name + ' was not persisted');

    }

    public cleanUpTagStatistic(): void {
        localStorage.removeItem(this.getTagStatisticKey());
    }

    public getTagStatisticValues(): TagStatistic[] {
        let output: string =  localStorage.getItem(this.getTagStatisticKey());
        LogUtil.info(this, "Current Saved output " + output);

        if(!output){
            LogUtil.info(this,'Output was null or undefined -> create a new empty List');
            let tagStatisticList: TagStatistic[] = new Array<TagStatistic>();
            this.persistTagStatisctics(tagStatisticList);
            return tagStatisticList;
        }

        return JSON.parse(output);
    }

    private getTagStatisticKey(): string {
        let key: string = 'tagstatistic-' + this.user.name;
        return key;
    }

    private isAlreadyPersisted(aTagStatiscitcList: TagStatistic[], aTag: Tag): boolean {
        let foundTagStatistic: TagStatistic = aTagStatiscitcList.find( (tagStatisctic: TagStatistic) => aTag.name == tagStatisctic.name);
        if(foundTagStatistic){
            return true;
        }
        return false;
    }

    private getTagStatistic(aTagStatiscitcList: TagStatistic[], aTag: Tag): TagStatistic {
        return aTagStatiscitcList.find( (tagStatisctic: TagStatistic) => aTag.name == tagStatisctic.name);
    }

    public persistTagStatisctics(aTagStatiscitcList: TagStatistic[]): void {
        LogUtil.info(this,'Perstist + ' + JSON.stringify(aTagStatiscitcList) + ' for key ' + this.getTagStatisticKey());
        let tagStatiscticsAsString = JSON.stringify(aTagStatiscitcList);
        localStorage.setItem(this.getTagStatisticKey(), tagStatiscticsAsString);
    }

    

}