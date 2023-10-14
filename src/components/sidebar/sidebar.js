import React from 'react';
import RouteSwitch from '../routeSwitch/routeSwitch';

import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/bankFiltersSlice';

import './sidebar.css';
import Address from '../address/address';
import BankCard from '../bankCard/bankCard';

const Sidebar = ({map, banks}) => {
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    return (
        <aside className='sidebar'>
            <header className='sidebar-header'>
                <span className='active'>Отделения</span>
                <span>Банкоматы</span>
            </header>
            {
                banks.map((bank, i) => {
                    return <BankCard key={''+i} bank={bank}/>
                })
            }
            <div className='filter'>
                <input type='radio' name='client-type' value='phys' onClick={() => dispatch(setFilters({
                    ...filters,
                    clientsType: ['PSYSICAL']
                }))}/> для физ лиц
                <input type='radio' name='client-type' value='legal' onClick={() => dispatch(setFilters({
                    ...filters,
                    clientsType: ['LEGAL']
                }))}/> для юр лиц
            </div>
            <RouteSwitch/>
        </aside>
    );
}

export default Sidebar;
