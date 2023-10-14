import React from 'react';
import RouteSwitch from '../routeSwitch/routeSwitch';

import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/bankFiltersSlice';

import Address from '../address/address';
import BankCard from '../bankCard/bankCard';
import Filter from '../filter/filter';

import './sidebar.css';

const Sidebar = ({map, banks}) => {
    const filters = useSelector((state) => state.filters);

    return (
        <aside className='sidebar'>
            <div className='sidebar-main'>
                <header className='sidebar-header'>
                    <span className='active'>Отделения</span>
                    <span>Банкоматы</span>
                </header>
                
                <Address/>
                <div className='filter'>
                    <label htmlFor='zone' className='filter-item'>
                        <input type='checkbox' id='zone' className='checkbox'/>
                        Зона самообслуживания 24 ч
                    </label>
                    <label htmlFor='work' className='filter-item'>
                        <input type='checkbox' id='work' className='checkbox'/>
                        Работает в выходные
                    </label>
                </div>

                <h2 className='filter-title filter-title-main'>
                    Фильтр
                    <span className='filters-drop'>
                        сбросить
                    </span>
                </h2>
                <div className='client-types'>
                    <button className='btn'>Физические лица</button>
                    <button className='btn btn_grey'>Юридические лица</button>
                </div>

                <Filter 
                    inputsArr={[
                        {
                            text: 'Кредиты'
                        },
                        {
                            text: 'Карты'
                        },
                        {
                            text: 'Ипотека'
                        },
                        {
                            text: 'Автокредиты'
                        },
                        {
                            text: 'Вклады и счета'
                        },
                        {
                            text: 'Инвестиции'
                        },
                        {
                            text: 'Онлайн-сервисы'
                        },
                        {
                            text: 'Платежи и переводы'
                        },
                        {
                            text: 'Private Banking'
                        },
                        {
                            text: 'Прайм'
                        }

                    ]} 
                    title='Услуги'
                />
                <Filter 
                    inputsArr={[
                        {
                            text: 'Обслуживание маломобильных групп населения'
                        },
                        {
                            text: 'Перевод на русский жестовый язык'
                        },
                    ]}
                    title='Специальные возможности'
                />
            </div>
            <footer className='sidebar-footer'>
                <h2 className='footer-title'>Нужна помощь?</h2>
                <h3 className='footer-subtitle'>Спроси онлайн-помощника</h3>
                <button className='btn btn_small sidebar-footer-btn'>Спросить</button>
            </footer>
        </aside>
    );
}

export default Sidebar;
