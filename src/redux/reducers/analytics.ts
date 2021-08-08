import {Reducer} from 'redux';

const initialState: AnalyticsNS.IState = {
    analyticsData: [],
    arrangeColumnsData: [],
    isLoading: true,
    startDate: '',
    endDate: '',
};

const reducer:Reducer<
    AnalyticsNS.IState,
    AnalyticsNS.AllActions
> = (state = initialState, action) => {
    switch (action.type) {

        case 'ANALYTICS_SET_INITIAL_DATA':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                analyticsData: action.payload.analyticsData,
                arrangeColumnsData: action.payload.arrangeColumnsData,
                isLoading: false,
            }

        case 'ANALYTICS_SET_ARRANGE_COLUMNS':
            return {
                ...state,
                arrangeColumnsData: action.payload.arrangeColumnsData,
            }    

        case 'ANALYTICS_SET_LOADER':
            return {
                ...state,
                isLoading: action.payload.isLoading,
            }    

        case 'ANALYTICS_SET_DATES':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }

        default:
            return {
                ...state,
            }
    }
};

export default reducer;