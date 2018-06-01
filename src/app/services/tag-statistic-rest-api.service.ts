import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TagStatistic } from "../models/tagstatistic";
import { TagStatisticServer } from "../models/tagstatistic-server";
import { ApplicationService } from "../application/application.service";
import { LogUtil } from "../utils/log-util";
import { TagStatisticTransformer } from "../utils/tagstatistic-transformer";
import { User } from "../models/user";
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TagStatisticRestApiService{

    private tagStatisticTransformer: TagStatisticTransformer; 

    constructor(
        private http: HttpClient,
        private appService: ApplicationService) {
            LogUtil.info(this, 'Init TagStatisticRestApiService');
            this.tagStatisticTransformer = new TagStatisticTransformer();


    }

    public getTagStatistics(aUser: User): Observable<Array<TagStatistic>> {
        
        if(!this.appService.isReadyForRestServices()){
            return Observable.create( result  => { result.error('No restservice available!');});
        }

        var encryptKey = this.appService.getEncryptionKey();
        const basePath = this.appService.getApplicationConfig().getBaseUrl();
        return this.http.get<Array<TagStatisticServer>>(basePath + 'tagstatistic/owner/' + aUser.name + '/all')
        .pipe(
            map((tagStatisticServers: TagStatisticServer[]) => {
                const newTagStatistic = new Array<TagStatistic>();

                tagStatisticServers.forEach( (tagServer: TagStatisticServer) => {
                    newTagStatistic.push(this.tagStatisticTransformer.transformTagStatisticServer(encryptKey, tagServer));
                });

                return newTagStatistic;
            })
        );
    }

    public persistTagStatistics(aUser: User, aTagStatistics: TagStatistic[]): Observable<any> {
        
        if(!this.appService.isReadyForRestServices()){
            return Observable.create( result  => { result.error("No restservice available!");});
        }

        var encryptKey = this.appService.getEncryptionKey();

        var tagStatisticServers: TagStatisticServer[] = new Array<TagStatisticServer>();

        aTagStatistics.forEach( (tagStatistic: TagStatistic) => {
            tagStatisticServers.push(this.tagStatisticTransformer.transformTagStatistic(encryptKey,tagStatistic));
        });

        return this.http.post(
            this.appService.getApplicationConfig().getBaseUrl() +
            'tagstatistic/owner/' + aUser.name + '/persist', tagStatisticServers);
    }
}