import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import BackIcon from '../../assets/icons/arrow.svg';
import PhysPersonIcon from '../../assets/icons/phys.svg';
import PremiumIcon from '../../assets/icons/premium-service.svg';
import DisabledPersonIcon from '../../assets/icons/disabled-persons.svg';

import { weekDays } from '../../entities';
import { getDistanceBetweenPoints } from '../../services/services';
import { openSwitch } from '../../redux/slices/routeTypeSlice';

import './bankCardFull.css';
import { setSelectedBank } from '../../redux/slices/selectedBankSlice';

const BankCardFull = ({map}) => {
    const selectedBank = useSelector(state => state.selectedBank),
        curPos = useSelector(state => state.curPosition.coords);
    
    const dispatch = useDispatch();

    const { name, address, metro, hasRamp, clientTypes, operatingModeResponse, coords } = selectedBank;
    

    const renderSchedule = () => {
        return operatingModeResponse[0]?.workingDateTime.map((day, i) => {
            return (
                <div key={'' + i} className='bank-schedule-item'>
                    <span>{weekDays[day.day]}</span>
                    <span>{day.from} — {day.to}</span>
                </div>
            )
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setSelectedBank({}));
    };

    return !address ? null : (
        <div className='bank-full'>
            <a className='back-link' href='#' onClick={(e) => handleClick(e)}>
                <img src={BackIcon} className='back-icon'/>
                Назад
            </a>
            <header className='bank-header'>
                <div className='bank-house-info'>
                    <span className='bank-name'>{name}</span>
                    <address className='bank-address'>{address}</address>
                </div>
                <div className='bank-card-distance'>{!curPos.length ? null : <div className='bank-card-distance'>{Math.floor(getDistanceBetweenPoints(curPos, coords)*10) / 10} км</div>}</div>
            </header>
            <div className='bank-schedule'>
                {renderSchedule()}
            </div>
            {!curPos.length ? null : <button onClick={() => dispatch(openSwitch())} className='btn'>Проложить маршрут</button>}
            <div className='bank-block'>
                <h3 className='bank-block-title'>Обслуживание</h3>
                <div>
                    {
                        clientTypes.map((type, i) => {
                            if(type.clientType === 'PHYSICAL') {
                                return <div key={i+''} className='bank-block-item'>
                                    <img src={PhysPersonIcon} className='bank-block-icon'/>
                                    Услуги для физических лиц
                                </div>

                            } else if(type.clientType === 'LEGAL') {
                                return <div key={i+''} className='bank-block-item'>
                                    <img src={PhysPersonIcon} className='bank-block-icon'/>
                                    Услуги для юридических лиц
                                </div>

                            } else if(type.clientType === 'PRIME') {
                                return <div key={i+''} className='bank-block-item'>
                                    <img src={PremiumIcon} className='bank-block-icon'/>
                                    Премиальное обслуживание
                                </div>
                            } 
                        })
                    }
                </div>
            </div>
            {!hasRamp ? null : <div className='bank-block'>
                <h3 className='bank-block-title'>Дополнительно</h3>
                <div>
                    <div className='bank-block-item'>
                        <img src={DisabledPersonIcon} className='bank-block-icon'/>
                        Доступно для малоподвижных граждан
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default BankCardFull;
