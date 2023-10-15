import React from 'react';
import { useDispatch } from 'react-redux';

import CrossBlueIcon from '../../assets/icons/cross-blue.svg';
import './address.css';
import { setBanks } from '../../redux/slices/banksSlice';

const Address = ({banks, setBanks}) => {

    return !banks.length ? <input className='address' type='text' placeholder='Город, район, улица, м…'/> :
    <div className='input-wrapper'>
        <input className='address' type='text' placeholder='Город, район, улица, м…'/>
        <div onClick={() => setBanks([])} className='input-cleaner'>
            <img src={CrossBlueIcon} className='input-cleaner-icon'/>
        </div>
    </div>
}

export default Address;
