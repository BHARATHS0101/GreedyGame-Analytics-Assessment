import React from 'react';
// import {useSelector} from 'react-redux';

import DateSettings from '../dateSettings';

import './Home.css';

const Home = () => {

    // const state:AnalyticsNS.IState = useSelector((
    //     appState:ReduxNS.IState
    // ) => appState.Analytics);

    return (
        <div className={'mainContainer'}>
            <div className={'heading'}>
                {'Analytics'}
            </div>
            <DateSettings/>
        </div>
    );
};

export default Home;
