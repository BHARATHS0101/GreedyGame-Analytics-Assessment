import _ from 'lodash';

import {getAnalyticsData, getAppsData} from '../api/apiCalls';
import History from '../../utils/History';
import actionTypes from '../actionTypes/analytics';
import { Dispatch } from 'react';

class ActionCreators implements AnalyticsNS.IActionCreators {

    dispatchSetLoader = (
        isLoading: boolean,
        dispatch: Dispatch<AnalyticsNS.IATSetLoader>,
    ) => {
        dispatch({
            type: actionTypes.ANALYTICS_SET_LOADER,
            payload: {
                isLoading,
            }
        })
    }

    setInitialData: AnalyticsNS.IActionCreators['setInitialData'] = (
    ) => {
        return async(dispatch, getState) => {
            try {
                const queryParams = new URLSearchParams(History.location.search);
                const startDate = queryParams.get('startDate');
                const endDate = queryParams.get('endDate');
                const x = queryParams.get('columns') as string;
                const decodeColumns = JSON.parse(decodeURIComponent(x));
                if(startDate!==null && endDate!==null){
                    History.push({
                        pathname: '/analytics',
                        search: '?' + new URLSearchParams(History.location.search)
                    });
                    const data = await this.fetchDataInCache(startDate, endDate);
                    dispatch({
                        type: actionTypes.ANALYTICS_SET_INITIAL_DATA,
                        payload: {
                            startDate,
                            endDate,
                            analyticsData: data.analyticsAPIData,
                            arrangeColumnsData: decodeColumns
                        }
                    })
                }else {
                    this.dispatchSetLoader(false, dispatch);
                }
            }catch {
                this.dispatchSetLoader(false, dispatch);
            }
        }
    }

    arrangeColumnsData= (
        structuredAnalyticsData:AnalyticsNS.IState['analyticsData'],
    ) => {
        let arrangeColumnsData:AnalyticsNS.IState['arrangeColumnsData'] = [];
        const objectKeys = Object.keys(structuredAnalyticsData[0]);
        _.map(objectKeys, (eachKey) => {
            let eachArrangeColumnData:AnalyticsNS.IArrangeColumns = {
                name: eachKey,
                isDisplay: true,
            }
            arrangeColumnsData.push(eachArrangeColumnData);
        });
        return arrangeColumnsData;
    }

    structureData = (
        analyticsData: APIResponseNS.IEachAnalyticsData[], 
        appsData: APIResponseNS.IEachAppData[], 
    ) => {
        let structuredAnalyticsData:AnalyticsNS.IState['analyticsData'] = [];
        _.map(analyticsData, (eachAnalyticData, index) => {
            const appData = _.find(appsData, {'app_id':eachAnalyticData.app_id});
            let eachStructuredAnalyticData: AnalyticsNS.IStructuredAnalyticsData = {
                date: eachAnalyticData.date,
                app: appData?appData.app_name:'',
                requests: eachAnalyticData.requests, 
                responses: eachAnalyticData.responses,
                impressions: eachAnalyticData.impressions,
                clicks: eachAnalyticData.clicks,
                revenue: eachAnalyticData.revenue,
                fillRate: (eachAnalyticData.requests/eachAnalyticData.responses)*100,
                CTR: (eachAnalyticData.clicks/eachAnalyticData.impressions)*100,
            };
            structuredAnalyticsData.push(eachStructuredAnalyticData);
        });
        return structuredAnalyticsData;
    };

    getDataToCache= async(
        startDate: string,
        endDate: string,
    ):Promise<AnalyticsNS.ICachedData> => {
        const analyticsDataAPIResponse = await getAnalyticsData(startDate, endDate);
        const appsAPIData = await getAppsData();
        const structuredAnalyticsData = this.structureData(analyticsDataAPIResponse.data.data, appsAPIData.data.data);
        const arrangeColumnsData = this.arrangeColumnsData(structuredAnalyticsData);
        let dataToStoreInCache:AnalyticsNS.ICachedData = {
            appsAPIData: appsAPIData.data.data,
            analyticsAPIData: structuredAnalyticsData,
            arrangeColumnsData: arrangeColumnsData,
            timeStamp: new Date(),
        };
        return dataToStoreInCache;
    }

    fetchDataInCache = async(startDate: string, endDate: string) => {
        const keyToSearch = `${startDate}&${endDate}`;
        if(localStorage.getItem(keyToSearch)) {
            const cachedData:AnalyticsNS.ICachedData = JSON.parse(localStorage.getItem(keyToSearch) as string);
            const pastTime = new Date(cachedData.timeStamp);
            const presentTime = new Date();
            if((presentTime.getTime() - pastTime.getTime())/(60*60*1000) < 2){
                return cachedData;
            }else {
                localStorage.removeItem(keyToSearch);
                const dataToStoreInCache = await this.getDataToCache(startDate, endDate);
                localStorage.setItem(keyToSearch, JSON.stringify(dataToStoreInCache)); 
                return dataToStoreInCache;
            }
        }else {
            const dataToStoreInCache = await this.getDataToCache(startDate, endDate);
            localStorage.setItem(keyToSearch, JSON.stringify(dataToStoreInCache));
            return dataToStoreInCache;
        }
    }

    setQueryParams = (
        startDate: string,
        endDate: string,
        columns: AnalyticsNS.IState['arrangeColumnsData'],
    ) => {
        const encodedColumns = encodeURIComponent(JSON.stringify(columns));
        History.push({
            pathname: '/analytics',
            search: '?' + new URLSearchParams({
                startDate: startDate,
                endDate: endDate,
                columns: encodedColumns,
            })
        });
    }

    setDates: AnalyticsNS.IActionCreators['setDates'] = (
        startDate,
        endDate,
    ) => async(dispatch, getState) => {
        try{
            if(startDate!=='' && endDate!==''){
                if(!getState().Analytics.isLoading){
                    this.dispatchSetLoader(true, dispatch);
                }
                const data = await this.fetchDataInCache(startDate, endDate);
                this.setQueryParams(
                    startDate,
                    endDate,
                    data.arrangeColumnsData,
                );
                dispatch({
                    type: actionTypes.ANALYTICS_SET_INITIAL_DATA,
                    payload: {
                        arrangeColumnsData: data.arrangeColumnsData,
                        analyticsData: data.analyticsAPIData,
                        startDate,
                        endDate,
                    }
                })
            }else {
                dispatch({
                    type: actionTypes.ANALYTICS_SET_DATES,
                    payload: {
                        startDate,
                        endDate,
                    }
                })
            }
        }catch {
            dispatch({
                type: actionTypes.ANALYTICS_SET_INITIAL_DATA,
                payload: {
                    startDate,
                    endDate,
                    analyticsData: [],
                    arrangeColumnsData: [],
                }
            })
        }
    }

    setArrangeColumnsData: AnalyticsNS.IActionCreators['setArrangeColumnsData'] = (
        arrangeColumnsData
    ) => async(dispatch, getState) => {
        this.setQueryParams(
            getState().Analytics.startDate,
            getState().Analytics.endDate,
            arrangeColumnsData,
        );
        dispatch({
            type: actionTypes.ANALYTICS_SET_ARRANGE_COLUMNS,
            payload: {
                arrangeColumnsData,
            }
        })
    }

};

export default new ActionCreators();