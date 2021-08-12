import React, {useEffect,useState} from 'react';

import CommonButton from '../commonButton';

import './Home.css';

const InputRange = (props: CommonComponentsNS.InputRangeProps) => {

    useEffect(() => {
        setInputRange(props.value);
    }, [props.value]);

    const [inputRange, setInputRange] = useState(0);

    const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRange(parseInt(e.target.value));
    };

    const handleOnClickApply = () => {
        props.onApplyFilter(inputRange);
    };

    const handleOnClickReset = () => {
        setInputRange(0);
        props.onApplyFilter(0);
    };

    return (
        <div className={'inputRangeContainer'}>        
            <div className={'inputContainer'}> 
                {inputRange} 
                <input
                    type={'range'}
                    max={props.maxValue}
                    min={0}
                    value={inputRange}
                    onChange={handleOnInput}
                    className={'inputRange'}
                />
            </div>
            <div className={'inputRangeButtonsContainer'}>
                <CommonButton
                    disabled={false}
                    onClick={handleOnClickReset}
                    name={'Reset'}
                    buttonStyle={'resetButton'}
                />
                <CommonButton
                    disabled={false}
                    onClick={handleOnClickApply}
                    name={'Apply'}
                />
            </div>
        </div>
    );
};

export default InputRange;