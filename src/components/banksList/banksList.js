import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDistanceBetweenPoints } from '../../services/services';
import { setSelectedBank } from '../../redux/slices/selectedBankSlice';

import BankIcon from '../../assets/icons/bank.svg';
import './banksList.css';

const BanksList = ({banks}) => {
    const dispatch = useDispatch();
    const curPos = useSelector(state => state.curPosition.coords);

    const selectBank = (name, address, operatingModeResponse, branchClientServices, hasRamp, metroStation, long, lat) =>{
        dispatch(setSelectedBank({
            name,
            address,
            metro: metroStation,
            hasRamp,
            clientTypes: branchClientServices,
            operatingModeResponse,
            coords: [long, lat]
        })) 
    }
    console.log(banks)

    return (
        banks.map((bank,i) => {
            const {name, address, operatingModeResponse, branchClientServices, hasRamp, metroStation, long, lat} = bank;

            return (
                <div key={i+''} className='banks-list'>
                    <div className='bank-card'>
                        <div className='bank-card-top'>
                            <img src={BankIcon} className='bank-card-icon'/>
                            <address 
                                className='bank-card-address'
                                onClick={() => selectBank(name, address, operatingModeResponse, branchClientServices, hasRamp, metroStation, long, lat)}
                            >{Number.isNaN(+address?.slice(0, 8)) ? address : address.slice(8, address.length)}</address>
                            {!curPos.length ? null : <div className='bank-card-distance'>{Math.floor(getDistanceBetweenPoints(curPos, [long, lat])*10) / 10} км</div>}
                        </div>
                        <div className='bank-card-data'>
                            <div className='bank-card-item'>Работает до 19:00</div>
                            <div className='bank-card-item'>Загруженность низкая</div>
                        </div>
                    </div>
                </div>
            )
        })
    );
}

export default BanksList;
