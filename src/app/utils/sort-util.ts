import { Entry } from '../models/entry';
import { EntryPackage } from '../models/entry-package';
import { LogUtil } from './log-util';

export class SortUtil {

    /**
     * last created entry will be the first in the array
     * and first created entry the last in the array
     * @param entries
     */
    public static sortEntriesByTimeDESC(entries: Entry[]): Entry[] {
        return entries.sort(function(a: Entry, b: Entry) {
            return b.created_at.getTime() - a.created_at.getTime();
        });
    }

    /**
     * last created entry will be the last element of the array
     * and first created entry will be the first element
     * @param entries
     */
    public static sortEntriesByTimeASC(entries: Entry[]): Entry[] {
        return entries.sort(function(a: Entry, b: Entry) {
            return a.created_at.getTime() - b.created_at.getTime();
        });
    }

    /**
     * last created package will be the first in the array
     * and first created package the last in the array
     * @param entries
     */
    public static sortPackagesByTimeDESC(aPackages: EntryPackage[]): EntryPackage[] {
        return aPackages.sort(function(a: EntryPackage, b: EntryPackage) {
            return a.date.getTime() - b.date.getTime();
        });
    }

    /**
     * last created package will be the last element of the array
     * and first created package will be the first element
     * @param entries
     */
    public static sortPackagesByTimeASC(aPackages: EntryPackage[]): EntryPackage[] {
        return aPackages.sort(function(a: EntryPackage, b: EntryPackage) {
            return b.date.getTime() - a.date.getTime();
        });
    }


    /**
     * returning from a list of enties the latest created entry
     * @param aEntries
     */
    public static getLatestCreatedEntry(aEntries: Entry[]): Entry {
        const sortedEntries = aEntries.sort(function(a: Entry, b: Entry) {
            return b.created_at.getTime() - a.created_at.getTime();
        });
        return sortedEntries[0];
    }

}
