import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Packager } from './packager';
import { Entry } from '../models/entry';
import { EntryPackage } from '../historycomponent/entry-package';

describe('packager', function () {




    beforeEach(() => {
        console.log("before");

    });

    it('schould split entries in 3 month', () => {
        // prepare

        let entrieFirst = Entry.create(1);
        let entrieSecond = Entry.create(2);
        let entrieThird = Entry.create(3);
        let entrieFourth = Entry.create(4);

        let dateOne: Date = new Date(2017, 3, 12, 0, 0, 0, 0);
        entrieFirst.created_at = dateOne;
        let dateTwo: Date = new Date(2018, 3, 15, 0, 0, 0, 0);
        entrieSecond.created_at = dateTwo;
        let dateThree: Date = new Date(2018, 3, 2, 0, 0, 0, 0);
        entrieThird.created_at = dateThree;
        let dateFour: Date = new Date(2018, 1, 15, 0, 0, 0, 0);
        entrieFourth.created_at = dateFour;

        let entries: Entry[] = [];
        entries.push(entrieFirst);
        entries.push(entrieSecond);
        entries.push(entrieThird);
        entries.push(entrieFourth);


        let packager: Packager = new Packager();
        let entryPackages: EntryPackage[] = packager.splitInMonth(entries);

        expect(entryPackages.length === 3);
    });

});
