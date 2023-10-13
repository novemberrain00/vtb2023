import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MapWrapper from '../mapWrapper/mapWrapper';

import { setCurPosition } from '../../redux/slices/currentPositionSlice';
import { setBounds } from '../../redux/slices/boundsSlice';

import './mapComponent.css';

const MapComponent = ({map, mapglAPI, banks}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        banks.forEach(bank => {
            const marker = new mapglAPI.Marker(map, {
                coordinates: [bank.long, bank.lat],
            });
        });
    }, [banks]);
    

    const success = (pos) => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        const marker = new mapglAPI.Marker(map, {
            coordinates: [pos.coords.longitude, pos.coords.latitude],
        });

        dispatch(setCurPosition((center)));
        map.setCenter(center);

        console.log(map.getBounds())
        dispatch(setBounds([map.getBounds().northEast, map.getBounds().southWest]));

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
            <button className="geo-button" onClick={()=> geoFindMe()}>Найти местоположение</button>
            <MapWrapper/>
        </div>
    );
};

export default MapComponent;