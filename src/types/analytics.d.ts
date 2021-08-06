declare namespace AnalyticsNS {

    interface IState {
    }

    interface IActionTypes {
        ANALYTICS_SET_INITIAL_DATA: 'ANALYTICS_SET_INITIAL_DATA';
    }

    interface IATSetInitialData {
        type: IActionTypes['ANALYTICS_SET_INITIAL_DATA'];
    }

    type AllActions =
        | IATSetInitialData;

    interface IActionCreators {
        setInitialData: (
            startDate: string,
            endDate: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
    }

    interface IDateSettingsProps {
    }

    interface IArrangeColumnsProps {
        setDisplayArrangeColumns: (...args:any) => void;
    }

}