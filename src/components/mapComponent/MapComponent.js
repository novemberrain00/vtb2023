import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MapWrapper from '../mapWrapper/mapWrapper';

import { setCurPosition } from '../../redux/slices/currentPositionSlice';
import { setBounds } from '../../redux/slices/boundsSlice';

import BankIcon from '../../assets/icons/bank.svg';
import UserIcon from '../../assets/icons/location.svg';
import GeoIcon from '../../assets/icons/geo.svg';
import './mapComponent.css';

const MapComponent = ({map, mapglAPI, banks}) => {
    const dispatch = useDispatch();
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        markers.forEach(marker => {
            marker.hide(map);
        });

        banks.forEach(bank => {
            const marker = new mapglAPI.Marker(map, {
                coordinates: [bank.long, bank.lat],
                icon: BankIcon
            });

            setMarkers(prev => [...prev, marker])
        });
    }, [banks]);
    

    const success = (pos) => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        const marker = new mapglAPI.Marker(map, {
            coordinates: [pos.coords.longitude, pos.coords.latitude],
            icon: UserIcon
        });

        setTimeout(() => {
            dispatch(setBounds([map.getBounds().northEast, map.getBounds().southWest]));
            dispatch(setCurPosition((center)));
        }, 500);

        
        map.setCenter(center);
    }

    const error = () => {
        alert('Не удалось определить местоположение');
    }

    const geoFindMe = () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <button className="geo-button" onClick={()=> geoFindMe()}>
                <img src={GeoIcon} className='geo-button-icon'/>
            </button>
            <MapWrapper/>
        </div>
    );
};

export default MapComponent;