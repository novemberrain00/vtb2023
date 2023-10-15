import React, { useState } from 'react';

import { setFilters, sendFilters } from '../../redux/slices/bankFiltersSlice';
import { changeType } from '../../redux/slices/routeTypeSlice';
import { setBanks } from '../../redux/slices/banksSlice';

import Filter from '../filter/filter';
import { useDispatch, useSelector } from 'react-redux';
import { setBounds } from '../../redux/slices/boundsSlice';

import { postData } from '../../services/services';

import CrossIcon from '../../assets/icons/cross.svg';
import './filtersBlock.css';

const FiltersBlock = ({map}) => {
    const [serviceTab, setServiceTab] = useState(true); //true - физ лица, false - юр лица

    const filters = useSelector(state => state.bankFilters.filters),
        bounds = useSelector(state => state.bounds.coords);

    const dispatch = useDispatch();

    const changeTab = (tabNum, changingFunc) => {
        changingFunc(!tabNum);
    };

    return (
        <>
            <div className='filter'>
                    <Filter 
                        inputsArr={[
                            {
                                text: 'Зона самообслуживания 24 ч',
                                filterName: 'zone'
                            },
                            {
                                text: 'Работает в выходные',
                                filterName: 'holidayWorking'
                            },
                        ]}
                    />
                </div>

                <h2 className='filter-title filter-title-main'>
                    Фильтр
                    <span onClick={()=> {
                        dispatch(setFilters({}))
                        dispatch(sendFilters({}))
                        document.querySelectorAll('.checkbox').forEach(check => {
                            check.checked = false;
                        });
                    }} className='filters-drop'>
                        <img src={CrossIcon} className='cross-icon'/>
                        Сбросить
                    </span>
                </h2>
                <div className='client-types'>
                    <button 
                        className={'btn' + (serviceTab ? '' : ' btn_grey')} 
                        onClick={(e) => changeTab(0, setServiceTab)}
                    >Физические лица</button>
                    <button 
                        className={'btn' + (!serviceTab ? '' : ' btn_grey')} 
                        onClick={(e) => changeTab(1, setServiceTab)}
                    >Юридические лица</button>
                </div>

                 {
                    serviceTab ?
                    <Filter 
                        inputsArr={[
                                        {
                                            text: 'Кредиты',
                                            filterName: 'CREDITS'
                                        },
                                        {
                                            text: 'Карты',
                                            filterName: 'CARDS'
                                        },
                                        {
                                            text: 'Ипотека',
                                            filterName: 'MORTAGE'
                                        },
                                        {
                                            text: 'Автокредиты',
                                            filterName: 'AUTO_LOANS'
                                        },
                                        {
                                            text: 'Вклады и счета',
                                            filterName: 'DEPOSITS_AND_ACCOUNTS'
                                        },
                                        {
                                            text: 'Инвестиции',
                                            filterName: 'INVESTMENT'
                                        },
                                        {
                                            text: 'Платежи и переводы',
                                            filterName: 'PAYMENTS_AND_TRANSFERS'
                                        }

                                    ]} 
                                    title='Услуги'
                    /> : 
                    <Filter 
                        inputsArr={[
                            {
                                text: 'Расчетный счет',
                                filterName: 'PAYMENT_ACCOUNT'
                            },
                            {
                                text: 'Регистрация бизнеса',
                                filterName: 'REGISTER_BUSINESS'
                            },
                            {
                                text: 'Кредиты',
                                filterName: 'CREDITS'
                            },
                            {
                                text: 'Бизнес-карты',
                                filterName: 'BISINESS_CARDS'
                            },
                            {
                                text: 'Эквайринг',
                                filterName: 'AQUIRING'
                            },
                            {
                                text: 'Депозиты',
                                filterName: 'DEPOSITS'
                            },
                            {
                                text: 'ВЭД',
                                filterName: 'VED'
                            },
                            {
                                text: 'Гарантии и аккредитивы',
                                filterName: 'GUARANTEES_AND_LETTERS_OF_CREDIT'
                            },
                            {
                                text: 'Сервисы для бизнеса',
                                filterName: 'SERVICE_FOR_BUSINESS'
                            },
                            {
                                text: 'Самозанятым',
                                filterName: 'SELF_EMPLOYEED'
                            }

                        ]} 
                        title='Услуги'
                    />
                 }       
                
                <Filter 
                    inputsArr={[
                        {
                            text: 'Обслуживание маломобильных групп населения',
                            filterName: 'hasRamp'
                        },
                        {
                            text: 'Перевод на русский жестовый язык',
                            filterName: 'gestures'
                        },
                    ]}
                    title='Специальные возможности'
                />
            <button onClick={() => {
                dispatch(sendFilters({filters}));
                dispatch(setBounds([map.getBounds().northEast, map.getBounds().southWest]));
            }} className='btn filters-btn'>Применить</button>
        </>
    );
}

export default FiltersBlock;
