import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import CommonButton from '../commonButton';
import ArrangeColumns from './ArrangeColumns';
import actionCreators from '../../redux/actionCreators/analytics';

import Settings from '../../images/settings.svg';
import RightArrow from '../../images/rightArrow.svg';

import './DateSettings.css';

const DateSettings = (props: AnalyticsNS.IDateSettingsProps) => {

    const [isDisplayColumns, setIsDisplayColumns] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const dispatch = useDispatch();

    const dispatchActionToSetInitialData = (
        startDate: string,
        endDate: string,
    ) => {
        dispatch(actionCreators.setInitialData(startDate, endDate));
    }

    useEffect(() => {
        const newStartDate = new Date();
        const newEndDate = new Date().toISOString().substr(0,10);
        newStartDate.setDate(newStartDate.getDate() - 5);
        const updatedStartDate =newStartDate.toISOString().substr(0,10)
        setEndDate(newEndDate);
        setStartDate(updatedStartDate);
        dispatchActionToSetInitialData(updatedStartDate,newEndDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnSettingsButtonClick = () => {
        if(isDisplayColumns){
            setIsDisplayColumns(false);
        }else {
            setIsDisplayColumns(true);
        }
    };

    const handleOnChangeStartDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleOnChangeEndDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    return (
        <>
        <div className={'datePickerContainer'}>
            <div className={'datePickerWithArrow'}>
                <input
                    type={'date'}
                    className={'datePicker'}
                    onChange={handleOnChangeStartDate}
                    value = {startDate}
                />
                <img src={RightArrow} className={'arrowImage'} alt={'date'}/>
                <input
                    type={'date'}
                    className={'datePicker'}
                    onChange={handleOnChangeEndDate}
                    value={endDate} 
                />
            </div>
            <CommonButton
                disabled={false}
                onClick={handleOnSettingsButtonClick}
                buttonStyle={'settingsButton'}
            >
                <img src={Settings} className={'settingsImage'} alt={'settings'}/>
                {'Settings'}
            </CommonButton>
        </div>
        {isDisplayColumns?(
            <ArrangeColumns
                setDisplayArrangeColumns={handleOnSettingsButtonClick}
            />
        ):(null)}
        </>
    );
};

export default DateSettings;