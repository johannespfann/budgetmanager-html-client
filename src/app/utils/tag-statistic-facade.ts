import { User } from '../models/user';
import { TagStatistic } from '../models/tagstatistic';
import { Tag } from '../models/tag';
import { LogUtil } from './log-util';

export class TagStatisticFacade {

    private user: User;

    private tagStatistics: TagStatistic[];

    public constructor(user: User) {
        this.user = user;
    }

    public pushTag(aTag: Tag): void {
        const savedTags: TagStatistic[] = this.getTagStatisticValues();

        if (this.isAlreadyPersisted(savedTags, aTag)) {
            const tagStatisctic: TagStatistic = this.getTagStatistic(savedTags, aTag);
            tagStatisctic.weight = tagStatisctic.weight + 1;
            localStorage.setItem(this.getTagStatisticKey(), JSON.stringify(savedTags));
        } else {
            const tagStatisctic: TagStatistic = new TagStatistic();
            tagStatisctic.name = aTag.name;
            tagStatisctic.weight = 1;
            savedTags.push(tagStatisctic);
            localStorage.setItem(this.getTagStatisticKey(), JSON.stringify(savedTags));
        }
    }

    public deleteTag(aTag: Tag): void {
        const savedTags: TagStatistic[] = this.getTagStatisticValues();

        if (this.isAlreadyPersisted(savedTags, aTag)) {
            const tagStatisctic: TagStatistic = this.getTagStatistic(savedTags, aTag);
            tagStatisctic.weight = tagStatisctic.weight - 1;

            if (tagStatisctic.weight <= 0) {
                const index = savedTags.indexOf(tagStatisctic);

                if (index !== -1) {
                    savedTags.splice(index, 1);
                }
            }
            localStorage.setItem(this.getTagStatisticKey(), JSON.stringify(savedTags));
            return;
        }
    }

    public cleanUpTagStatistic(): void {
        localStorage.removeItem(this.getTagStatisticKey());
    }

    public persistTagStatisctics(aTagStatiscitcList: TagStatistic[]): void {
        const tagStatiscticsAsString = JSON.stringify(aTagStatiscitcList);
        localStorage.setItem(this.getTagStatisticKey(), tagStatiscticsAsString);
    }

    public getTagStatisticValues(): TagStatistic[] {
        const output: string =  localStorage.getItem(this.getTagStatisticKey());

        if (!output) {
            const tagStatisticList: TagStatistic[] = new Array<TagStatistic>();
            this.persistTagStatisctics(tagStatisticList);
            return tagStatisticList;
        }

        return JSON.parse(output);
    }

    private getTagStatisticKey(): string {
        const key: string = 'tagstatistic-' + this.user.name;
        return key;
    }

    private isAlreadyPersisted(aTagStatiscitcList: TagStatistic[], aTag: Tag): boolean {
        const foundTagStatistic: TagStatistic = aTagStatiscitcList.find( (tagStatisctic: TagStatistic) => aTag.name === tagStatisctic.name);
        if (foundTagStatistic) {
            return true;
        }
        return false;
    }

    private getTagStatistic(aTagStatiscitcList: TagStatistic[], aTag: Tag): TagStatistic {
        return aTagStatiscitcList.find( (tagStatisctic: TagStatistic) => aTag.name === tagStatisctic.name);
    }
}
