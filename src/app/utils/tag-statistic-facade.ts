import { User } from "../models/user";
import { TagStatistic } from "../models/tagstatistic";
import { Tag } from "../models/tag";
import { LogUtil } from "./log-util";

export class TagStatisticFacade {

    public constructor(){
        // default
    }


    public pushTag(aUser: User, aTag: Tag): void {
        LogUtil.info(this, 'Push new Tag: ' + aTag.name);
        let savedTags: TagStatistic[] = this.getTagStatisticValues(aUser);


        if(this.isAlreadyPersisted(savedTags,aTag)){
            let tagStatisctic: TagStatistic = this.getTagStatistic(savedTags,aTag);
            tagStatisctic.weight = tagStatisctic.weight + 1;
            localStorage.setItem(this.getTagStatisticKey(aUser), JSON.stringify(savedTags));
        }
        else{
            let tagStatisctic: TagStatistic = new TagStatistic();
            tagStatisctic.name = aTag.name;
            tagStatisctic.weight = 1;
            savedTags.push(tagStatisctic);
            localStorage.setItem(this.getTagStatisticKey(aUser), JSON.stringify(savedTags));
        }
    }

    public cleanUpTagStatistic(aUser: User): void {
        localStorage.removeItem(this.getTagStatisticKey(aUser));
    }

    public getTagStatisticValues(aUser: User): TagStatistic[] {
        let output: string =  localStorage.getItem(this.getTagStatisticKey(aUser));
        LogUtil.info(this, "Current Saved output " + output);

        if(!output){
            LogUtil.info(this,'Output was null or undefined -> create a new empty List');
            let tagStatisticList: TagStatistic[] = new Array<TagStatistic>();
            this.persistTagStatisctics(aUser,tagStatisticList);
            return tagStatisticList;
        }

        return JSON.parse(output);
    }

    private getTagStatisticKey(aUser:User): string {
        let key: string = 'tagstatistic-' + aUser.name;
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

    public persistTagStatisctics(aUser: User, aTagStatiscitcList: TagStatistic[]): void {
        let tagStatiscticsAsString = JSON.stringify(aTagStatiscitcList);
        localStorage.setItem(this.getTagStatisticKey(aUser), tagStatiscticsAsString);
    }

    

}