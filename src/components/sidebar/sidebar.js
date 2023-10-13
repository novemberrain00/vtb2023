import React from 'react';
import RouteSwitch from '../routeSwitch/routeSwitch';

import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/bankFiltersSlice';

import './sidebar.css';

const Sidebar = () => {
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    return (
        <aside className='sidebar'>
            <h1 className='sidebar__title'>Фильтры отделений</h1> 
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
