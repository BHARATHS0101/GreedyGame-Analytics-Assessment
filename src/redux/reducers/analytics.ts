import {Reducer} from 'redux';

const initialState: AnalyticsNS.IState = {

};

const reducer:Reducer<
    AnalyticsNS.IState,
    AnalyticsNS.AllActions
> = (state = initialState, action) => {
    switch (action.type) {

        default:
            return {
                ...state,
            }
    }
};

export default reducer;