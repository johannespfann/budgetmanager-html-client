import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { User } from '../models/user';
import { DateSeriesStrategy } from '../standingordermanagement/date-series-strategy';
import { MonthlySeriesProducer } from '../standingordermanagement/monthly-series-producer';
import { QuarterSeriesProducer } from '../standingordermanagement/quarter-series-producer';
import { YearlySeriesProducer } from '../standingordermanagement/yearly-series-producer';
import { StandingOrderExecutor } from '../standingordermanagement/standing-order-executor';
import { StandingOrderJob } from '../standingordermanagement/standing-order-job';
import { EntryService } from '../services/entry.service';
import { StandingOrderService } from '../services/standing-order.service';
import { LogUtil } from '../utils/log-util';
import { tap } from 'rxjs/operators';
import { StandingOrder } from '../models/standingorder';
import { StandingOrderConst } from '../standingordermanagement/standing-order-const';

@Component({
    selector: 'app-account-weclome',
    templateUrl: './account-welcome.component.html',
    styleUrls: ['./account-welcome.component.css']
})
export class AccountWelcomeComponent implements OnInit {

    public user: User;
    public accountItem; AccountItem;
    public standingOrderJob: StandingOrderJob;

    public username: string;
    public accountname: string;

    isEntryLoaded = false;
    isEntryLoading = true;

    isTagsAnalysed = false;
    isTagsAnalyseProcessing = true;

    isStandingOrdersLoaded = false;
    isStandingOrdersLoading = true;

    isStandingOrderProcessed = false;
    isStandingOrderProcessing = true;

    sizeOfEntries = 0;
    sizeOfStandingOrders = 0;

    sizeOfMonthly = 0;
    sizeOfQuartal = 0;
    sizeOfYearly = 0;


    constructor(
            private standingOrderService: StandingOrderService,
            private entryService: EntryService,
            private applicationService: ApplicationService) {
        const strategies: DateSeriesStrategy[] = [];
        strategies.push(new MonthlySeriesProducer());
        strategies.push(new QuarterSeriesProducer());
        strategies.push(new YearlySeriesProducer());
        const standingOrderExecutor = new StandingOrderExecutor(strategies);
        this.standingOrderJob = new StandingOrderJob(standingOrderExecutor, entryService, standingOrderService);
    }

    loadEntries() : void {
        this.entryService.getEntries(this.accountItem).pipe(
            
        ).subscribe(
            data => {
                this.sizeOfEntries = data.length
                this.isEntryLoaded = true;
                this.isEntryLoading = false;

                this.isTagsAnalyseProcessing = false;
                this.isTagsAnalysed = true;
            }
        )
    }

    loadStandingOrders(): void {
        this.sizeOfMonthly = 0;
        this.sizeOfQuartal = 0;
        this.sizeOfYearly = 0;
        this.standingOrderService.getRotationEntries(this.accountItem).pipe(
            tap( entry => this.analizeRotationsOfStandingOrders(entry))
        ).subscribe( 
            data => {
                this.sizeOfStandingOrders = data.length;
                this.isStandingOrdersLoaded = true;
                this.isStandingOrdersLoading = false;
            }
        )
    }

    analizeRotationsOfStandingOrders(standingOrders: StandingOrder[]): void {
        standingOrders.forEach( standingOrder => {

            if(standingOrder.rotation_strategy == StandingOrderConst.MONTHLY_PATTERN) {

                this.sizeOfMonthly = this.sizeOfMonthly + 1;
            } 

            if(standingOrder.rotation_strategy == StandingOrderConst.QUARTER_PATTERN) {

                this.sizeOfQuartal = this.sizeOfQuartal + 1;
            }

            if(standingOrder.rotation_strategy == StandingOrderConst.YEARLY_PATTERN) {

                this.sizeOfYearly = this.sizeOfYearly + 1;
            }

        })
    }


    public ngOnInit(): void {
        this.user = this.applicationService.getCurrentUser();
        this.accountItem = this.applicationService.getCurrentAccount();

        this.username = this.user.name;
        this.accountname = this.accountItem.account.name;


        if (this.accountItem) {
            this.standingOrderJob.executeStandingOrders(this.accountItem).subscribe(
                _ => {
                    LogUtil.debug(this, "Analyse standingOrder done!");
                    this.isStandingOrderProcessed = true;
                    this.isStandingOrderProcessing = false;
                }
            );
            this.loadEntries();
            this.loadStandingOrders();
        }
    }
}
