// import actionTypes from '../actionTypes/analytics';
import {getAnalyticsData, getAppsData} from '../api/apiCalls';

class ActionCreators implements AnalyticsNS.IActionCreators {

    setInitialData: AnalyticsNS.IActionCreators['setInitialData'] = (
        startDate,
        endDate,
    ) => {
        return async(dispatch, getState) => {
            const analyticsData = await getAnalyticsData(startDate, endDate);
            console.log(analyticsData);
            const appsData = await getAppsData();
            console.log(appsData);
        }
    }

};

export default new ActionCreators();