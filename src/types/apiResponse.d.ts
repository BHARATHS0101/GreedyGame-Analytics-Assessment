declare namespace APIResponseNS {

    interface IEachAnalyticsData {
        date: string;
        app_id: string;
        requests: number; 
        responses: number;
        impressions: number;
        clicks: number;
        revenue: number;
    }

    interface IAnalyticsAPIResponseData {
        cache_time : number;  
        data: IEachAnalyticsData[];  
    }
}
