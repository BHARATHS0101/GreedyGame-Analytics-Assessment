import React, {useState, useRef, useEffect} from 'react';
import _ from 'lodash';

import CommonButton from '../commonButton';

import './DateSettings.css';


const ArrangeColumns = (props: AnalyticsNS.IArrangeColumnsProps) => {

    useEffect(() => {
        document.cookie = "test=testingCookie";
    }, []);

    const [list, changeList] = useState([
        {
            name: 'date',
            isEditable: false,
            isDisplay: true,
        },
        {
            name: 'app',
            isEditable: false,
            isDisplay: true,
        },
        {
            name: 'responses',
            isEditable: true,
            isDisplay: true,
        },
        {
            name: 'clicks',
            isEditable: true,
            isDisplay: true,
        },
        {
            name: 'requests',
            isEditable: true,
            isDisplay: true,
        },
    ]);

    const [dragging, setDragging] = useState(false);
    const dragItem = useRef<number | null>(null);

    const handleOnDragStart = (e:React.DragEvent<HTMLDivElement>, index: number) => { 
        dragItem.current = index;
        setTimeout(() => {
            setDragging(true);
        });
    };

    const handleDragEnd = () => {
        setDragging(false);
        dragItem.current = null;
    };

    const handleDragEnter = (e:React.DragEvent<HTMLDivElement>, index: number) => {
        if(dragging && dragItem.current!==null && index !== dragItem.current){
            let newList = [...list];    
            newList.splice(index, 0, ...newList.splice(dragItem.current, 1));
            changeList(newList);
            dragItem.current = index;
        }
    }

    const getDragItemClass = (index: number) => {
        if(list[index].isDisplay){
            return index === dragItem.current ? 'listItemSelected listItem' : 'listItem'; 
        }else {
            return index === dragItem.current ? 
                    'listItemSelected listItem listItemUnSelected' : 
                    'listItem listItemUnSelected';
        }
    }

    const handleOnClick = (index:number) => {
        let newList = [...list];
        if(newList[index].isEditable){
            newList[index].isDisplay = newList[index].isDisplay?false:true;
            changeList(newList);
        }
    }

    return (
        <div className={'listContainer'}>
            <div className={'list'}>    
            {_.map(list, (eachListItem, index) => {
                return (
                    <div 
                        className={getDragItemClass(index)}
                        draggable
                        onDragStart={(e) => handleOnDragStart(e, index)}
                        onDragEnter={(e) => {handleDragEnter(e, index)}}
                        onDragEnd={handleDragEnd}
                        key={index}
                        onClick={() => handleOnClick(index)}
                    >
                        {_.startCase(eachListItem.name)}
                    </div>
                )
            })}  
            </div>
            <div className={'applySettingsButtonsContainer'}>
                <CommonButton
                    name={'Close'}
                    onClick={props.setDisplayArrangeColumns}
                    disabled={false}
                    buttonStyle={'cancelButton'}
                />
                <CommonButton
                    name={'Apply Settings'}
                    onClick={() => console.log("clicked on apply settings")}
                    disabled={false}
                />
            </div>
        </div>
    )
};

export default ArrangeColumns;
