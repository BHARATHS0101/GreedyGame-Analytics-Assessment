import React, {useEffect} from 'react';
import _ from 'lodash';
import {useDispatch} from 'react-redux';

import CommonTable from '../commonTable';
import TableHeader from './TableHeader';
import NumberToUnits from '../../utils/NumberToUnits';
import actionCreators from '../../redux/actionCreators/analytics';

import './Home.css';

import AppImage from '../../images/appImage.svg';

const Table = (props: AnalyticsNS.ITableProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionCreators.setColumnFilters());
    }, []);

    const dispatchActionToSetColumnFilter = (columnName: string, filterValue: APIResponseNS.IEachAppData[] | number) => {
        dispatch(actionCreators.setColumnFilters(columnName, filterValue));
    }

    const getTotalValue = (colName: string, type: 'number' | 'rate') => {
        let sum = 0;
        _.map(props.analyticalData, (eachAnalyticData, index) => {
            sum= sum + eachAnalyticData[colName];
        });
        if(type==='rate'){
            return `${(sum/props.analyticalData.length).toFixed(2)}%`;
        }else{
            return NumberToUnits(sum);
        }
    };

    const getFilterValue = (columnName: string) => {
        const filterValue = _.find(props.columnFilters, (eachColumnFilter) => {
            return _.includes(_.keys(eachColumnFilter), columnName)
        });
        if(filterValue && typeof filterValue === 'number') return filterValue[columnName];
    };

    const getMaxValue = (colName: string) => {
        const maxValuedData = _.maxBy(props.analyticalData, colName);
        if(maxValuedData) return maxValuedData[colName];
    };

    const columns:CommonComponentsNS.IColumnsStructure[] = [
        {
            colName: <TableHeader  
                        headerName={'Date'}
                        className={'alignHeaderStart'}
                        totalText={`${props.analyticalData.length}`}
                        columnName={'date'}
                    />,
            keyToSearch: 'date',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                const rowItemDate = new Date(rowItem.date);
                return (
                    <>
                        {rowItemDate.toDateString().substr(4)}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'App'}
                        className={'alignHeaderStart'} 
                        filterType={'search'}  
                        totalText={`${props.appsAPIData.length}`} 
                        columnName={'app'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        appsAPIData={props.appsAPIData}
                    />,
            keyToSearch: 'app',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                const appName = _.truncate(rowItem.app, {length:15});
                return (
                    <div className={'appName'}>
                        <img src={AppImage} className={'appNameImage'} alt={'AppImage'}/>
                        {appName}
                    </div>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'Clicks'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('clicks', 'number')}
                        columnName={'clicks'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('clicks')}
                        maxValue={getMaxValue('clicks')}
                    />,
            keyToSearch: 'clicks',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {rowItem.clicks}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'Impressions'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('impressions', 'number')}
                        columnName={'impressions'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('impressions')}
                        maxValue={getMaxValue('impressions')}
                    />,
            keyToSearch: 'impressions',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {rowItem.impressions}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'Requests'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('requests', 'number')}
                        columnName={'requests'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('requests')}
                        maxValue={getMaxValue('requests')}
                    />,
            keyToSearch: 'requests',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {rowItem.requests.toLocaleString()}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'Responses'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('responses', 'number')}
                        columnName={'responses'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('responses')}
                        maxValue={getMaxValue('responses')}
                    />,
            keyToSearch: 'responses',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {rowItem.responses.toLocaleString()}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'Revenue'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('revenue', 'number')}
                        columnName={'revenue'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('revenue')}
                        maxValue={getMaxValue('revenue')}
                    />,
            keyToSearch: 'revenue',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {`$${rowItem['revenue'].toFixed(2)}`}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'Fill Rate'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('fillRate', 'rate')}
                        columnName={'fillRate'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('fillRate')}
                        maxValue={getMaxValue('fillRate')}
                    />,
            keyToSearch: 'fillRate',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {`${rowItem.fillRate.toFixed(2)}%`}
                    </>
                );
            }
        },
        {
            colName: <TableHeader 
                        headerName={'CTR'}
                        className={'alignHeaderEnd'}
                        filterType={'range'}
                        totalText={getTotalValue('CTR', 'rate')}
                        columnName={'CTR'}
                        onChangeFilterValue={dispatchActionToSetColumnFilter}
                        filterValue={getFilterValue('CTR')}
                        maxValue={getMaxValue('CTR')}
                    />,
            keyToSearch: 'CTR',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {`${rowItem.CTR.toFixed(2)}%`}
                    </>
                );
            }
        }
    ];

    const getArrangedColumns = () => {
        let arrangedColumns:CommonComponentsNS.IColumnsStructure[] = [];
        _.map(props.arrangeColumnsData, (eachArrangeColumnData) => {
            const getColumn = _.find(columns, {'keyToSearch':eachArrangeColumnData.name});
            if(getColumn && eachArrangeColumnData.isDisplay){
                arrangedColumns.push(getColumn);
            }
        }); 
        return arrangedColumns;
    };

    return (
        <CommonTable 
            data = {props.analyticalData}
            columns = {getArrangedColumns()}
        />   
    )
};

export default Table;