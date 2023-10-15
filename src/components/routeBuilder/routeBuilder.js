import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { coordsToAddress } from '../../services/services';

import AIcon from '../../assets/icons/a.svg';
import BIcon from '../../assets/icons/b.svg';
import BackIcon from '../../assets/icons/arrow.svg';

import { openSwitch } from '../../redux/slices/routeTypeSlice';

import './routeBuilder.css';

const RouteBuilder = ({directions, map}) => {
    const curPos = useSelector(state => state.curPosition.coords),
        address = useSelector(state=> state.selectedBank.address),
        bankCoords = useSelector(state => state.selectedBank.coords);

    const dispatch = useDispatch();

    const [routeType, setRouteType] = useState(false),
        [curAddress, setCurAddress] = useState('');

    const isSwitchOpened = useSelector(state => state.routes.isSwitchOpened);

    const handleClick = (e) => {
        directions.clear();
        e.preventDefault();
        dispatch(openSwitch());
    };

    useEffect(() => {
        if(isSwitchOpened) {
            directions.pedestrianRoute({
                points: [
                    curPos,
                    bankCoords,
                ],
            });
        }
    }, [isSwitchOpened]);

    useEffect(()=> {
        if(!curPos.length) return;

        coordsToAddress(curPos)
        .then(res => setCurAddress(res.result.items[0].name));
    }, [curPos]);

    return !isSwitchOpened ? null : (
        <div className='route-builder'>
            <a className='back-link' href='#' onClick={(e) => handleClick(e)}>
                <img src={BackIcon} className='back-icon'/>
                Назад
            </a>
            <div className='points-container'>
                <div className='points'>
                    <span className='points-icon-wrapper'><img src={AIcon} className='points-icon'/></span>
                    <span className='points-icon-wrapper'><img src={BIcon} className='points-icon'/></span>
                </div>
                <div className='route-points'>
                    <div className='route-point'>{curAddress}</div>
                    <div className='route-point'>{address}</div>
                </div>
            </div>
            <div className='route-switch'>
                <div className={'route-type' + (routeType ? ' route-type_active' : '')} onClick={() => {
                    setRouteType(true);
                    directions.clear();
                    directions.carRoute({
                        points: [
                            curPos,
                            bankCoords,
                        ],
                    });
                }}>
                    <svg width="20" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.6889 1.13625C17.4667 0.4725 16.8444 0 16.1111 0H3.88889C3.15556 0 2.54444 0.4725 2.31111 1.13625L0 7.875V16.875C0 17.4937 0.5 18 1.11111 18H2.22222C2.83333 18 3.33333 17.4937 3.33333 16.875V15.75H16.6667V16.875C16.6667 17.4937 17.1667 18 17.7778 18H18.8889C19.5 18 20 17.4937 20 16.875V7.875L17.6889 1.13625ZM3.88889 12.375C2.96667 12.375 2.22222 11.6213 2.22222 10.6875C2.22222 9.75375 2.96667 9 3.88889 9C4.81111 9 5.55556 9.75375 5.55556 10.6875C5.55556 11.6213 4.81111 12.375 3.88889 12.375ZM16.1111 12.375C15.1889 12.375 14.4444 11.6213 14.4444 10.6875C14.4444 9.75375 15.1889 9 16.1111 9C17.0333 9 17.7778 9.75375 17.7778 10.6875C17.7778 11.6213 17.0333 12.375 16.1111 12.375ZM2.22222 6.75L3.88889 1.6875H16.1111L17.7778 6.75H2.22222Z" fill={routeType ? "#0D69F2": "#ACB6C3"}/>
                    </svg>
                    Авто
                </div>
                <div className={'route-type' + (!routeType ? ' route-type_active' : '')} onClick={() => {
                    setRouteType(false);
                    directions.clear();
                    directions.pedestrianRoute({
                        points: [
                            curPos,
                            bankCoords,
                        ],
                    });
                }}>
                    <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.07692 4.27907C9.26154 4.27907 10.2308 3.31628 10.2308 2.13953C10.2308 0.962791 9.26154 0 8.07692 0C6.89231 0 5.92308 0.962791 5.92308 2.13953C5.92308 3.31628 6.89231 4.27907 8.07692 4.27907ZM4.09231 7.91628L1.07692 23H3.33846L5.27692 14.4419L7.53846 16.5814V23H9.69231V14.9767L7.43077 12.8372L8.07692 9.62791C9.47692 11.2326 11.6308 12.3023 14 12.3023V10.1628C11.9538 10.1628 10.2308 9.09302 9.36923 7.59535L8.29231 5.88372C7.86154 5.24186 7.21538 4.81395 6.46154 4.81395C6.13846 4.81395 5.92308 4.92093 5.6 4.92093L0 7.27442V12.3023H2.15385V8.66512L4.09231 7.91628Z" fill={!routeType ? "#0D69F2": "#ACB6C3"}/>
                    </svg>
                    Пешком
                </div>
            </div>
        </div>
    );
}

export default RouteBuilder;
