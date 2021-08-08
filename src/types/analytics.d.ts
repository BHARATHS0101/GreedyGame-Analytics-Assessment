declare namespace AnalyticsNS {
    
    interface IStructuredAnalyticsData {
        date: string;
        app: string;
        requests: number; 
        responses: number;
        impressions: number;
        clicks: number;
        revenue: number;
        fillRate: number;
        CTR: number;
    }

    interface IArrangeColumns {
        name: string;
        isDisplay: boolean;
    }

    interface ICachedData {
        appsAPIData: APIResponseNS.IEachAppData[],
        analyticsAPIData: IStructuredAnalyticsData[],
        arrangeColumnsData: IArrangeColumns[],
        timeStamp: Date,
    }

    interface IState {
        analyticsData: IStructuredAnalyticsData[];
        arrangeColumnsData: IArrangeColumns[];
        startDate: string;
        endDate: string;
        isLoading: boolean;
    }

    interface IActionTypes {
        ANALYTICS_SET_INITIAL_DATA: 'ANALYTICS_SET_INITIAL_DATA';
        ANALYTICS_SET_ARRANGE_COLUMNS: 'ANALYTICS_SET_ARRANGE_COLUMNS';
        ANALYTICS_SET_DATES: 'ANALYTICS_SET_DATES';
        ANALYTICS_SET_LOADER: 'ANALYTICS_SET_LOADER';
    }

    interface IATSetInitialData {
        type: IActionTypes['ANALYTICS_SET_INITIAL_DATA'];
        payload: {
            analyticsData: IStructuredAnalyticsData[];
            arrangeColumnsData: IArrangeColumns[];
            startDate: string;
            endDate: string;
        }
    }

    interface IATSetArrangeColumns {
        type: IActionTypes['ANALYTICS_SET_ARRANGE_COLUMNS'];
        payload: {
            arrangeColumnsData: IArrangeColumns[];
        }
    }

    interface IATSetDates {
        type: IActionTypes['ANALYTICS_SET_DATES'];
        payload: {
            startDate: string;
            endDate: string;
        } 
    }

    interface IATSetLoader {
        type: IActionTypes['ANALYTICS_SET_LOADER'];
        payload: {
            isLoading: boolean;
        }
    }

    type AllActions =
        | IATSetInitialData
        | IATSetArrangeColumns
        | IATSetDates
        | IATSetLoader;

    interface IActionCreators {
        setInitialData: (
        ) => ReduxNS.IThunkFunction<AllActions>;
        setDates: (
            startDate: string,
            endDate: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
        setArrangeColumnsData: (
            arrangeColumnsData: IArrangeColumns[],
        ) => ReduxNS.IThunkFunction<AllActions>; 
    }

    interface IDateSettingsProps {
        startDate: string;
        endDate: string;
        arrangeColumnsData: IArrangeColumns[];
    }

    interface IArrangeColumnsProps {
        setDisplayArrangeColumns: (...args:any) => void;
        setArrangeColumnsData: (...args:any) => void;
        arrangeColumnsData: IArrangeColumns[];
    }

    interface ITableProps {
        arrangeColumnsData: IArrangeColumns[];
        analyticalData: IStructuredAnalyticsData[];
    }

}