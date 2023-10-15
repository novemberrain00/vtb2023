import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Address from '../address/address';

import BanksList from '../banksList/banksList';
import FiltersBlock from '../filtersBlock/filtersBlock';
import BankCardFull from '../bankCardFull/bankCardFull';

import { Directions } from '@2gis/mapgl-directions';

import './sidebar.css';
import RouteBuilder from '../routeBuilder/routeBuilder';

const Sidebar = ({map, banks, setBanks}) => {
    const isSwitchOpened = useSelector(state => state.routes.isSwitchOpened);

    const directions = new Directions(map, {
        directionsApiKey: 'fea7953b-72fa-4b6f-8d3e-bd5b5514a074',
    });

    return (
        <div className='sidebar-wrapper'>
            {
                isSwitchOpened  ? null : <>
                    <aside className='sidebar'>
                        <div className='sidebar-main'>
                            <Address banks={banks} setBanks={setBanks}/>
                            {
                                banks.length ? <BanksList banks={banks}/> : <FiltersBlock map={map}/>
                            }
                        </div>
                        <footer className='sidebar-footer'>
                            <h2 className='footer-title'>Нужна помощь?</h2>
                            <h3 className='footer-subtitle'>Спроси онлайн-помощника</h3>
                            <button className='btn btn_small sidebar-footer-btn'>Спросить</button>
                        </footer>
                    </aside>
                    <BankCardFull map={map}/>
                </>
            }
            <RouteBuilder map={map} directions={directions}/>
        </div>
    );
}

export default Sidebar;
