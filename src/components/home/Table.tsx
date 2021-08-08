import React from 'react';
import _ from 'lodash';

import CommonTable from '../commonTable';

import './Home.css';

import AppImage from '../../images/appImage.svg';

const Table = (props: AnalyticsNS.ITableProps) => {

    const columns:CommonComponentsNS.IColumnsStructure[] = [
        {
            colName: 'Date',
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
            colName: 'App',
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
            colName: 'Clicks',
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
            colName: 'Impressions',
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
            colName: 'Requests',
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
            colName: 'Responses',
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
            colName: 'Revenue',
            keyToSearch: 'revenue',
            className: 'clicks',
            render: (rowItem: AnalyticsNS.IStructuredAnalyticsData) => {
                return (
                    <>
                        {`$${rowItem.revenue.toFixed(2)}`}
                    </>
                );
            }
        },
        {
            colName: 'Fill Rate',
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
            colName: 'CTR',
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
    }

    return (
        <CommonTable 
            data = {props.analyticalData}
            columns = {getArrangedColumns()}
        />   
    )
};

export default Table;