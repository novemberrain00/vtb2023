import React from 'react';
import { clientTypes, weekDays } from '../../entities';

import './bankCard.css';

const BankCard = ({bank}) => {
    const renderSchedule = () => {
        return bank.operatingModeResponse.map((type, i) => {
            return (
                <div key={''+i}>
                    <span>{clientTypes[type.type]}</span>
                    {type.workingDateTime.map((day, j) => {
                        return (
                            <div key={''+j} className='schedule-row'>
                                <span>{weekDays[day.day]}</span>
                                <span>{Math.floor(day.from[0])}:00 - {Math.floor(day.to[0])}:00</span>
                            </div>
                        )
                    })}
                </div>
            )
        });
    }

    return (
        <div className='card'>
            <h3 className='card-title'>Отделение</h3>
            <address className='card-address'>{bank.address}</address>
            <div className='schedule'>
                {renderSchedule()}
            </div>
        </div>
    );
}

export default BankCard;
