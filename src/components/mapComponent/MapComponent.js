import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { load } from '@2gis/mapgl';
import { Directions } from '@2gis/mapgl-directions';

import MapWrapper from '../mapWrapper/mapWrapper';

import './mapComponent.css';
import { getDistanceBetweenPoints } from '../../services/services';

const MapComponent = ({banks}) => {
    const [map, setMap] = useState({}),
        [curPos, setCurPos] = useState([]),
        [mapglAPI, setMapGLApi] = useState({}),
        [closestBank, setClosestBank] = useState({});

    const routeType = useSelector((state) => state.routes.type);

    const directions = new Directions(map, {
        directionsApiKey: 'fea7953b-72fa-4b6f-8d3e-bd5b5514a074',
    });

    const success = (pos) => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        const marker = new mapglAPI.Marker(map, {
            coordinates: [pos.coords.longitude, pos.coords.latitude],
        });

        setCurPos(center);
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

    useEffect(() => {

        if(curPos.length === 0) return;

        if(!closestBank.long || !closestBank.lat) return;

        directions.clear();
        if(routeType) {
            directions.carRoute({
                points: [
                    curPos,
                    [closestBank.long, closestBank.lat]
                ],
            });
        } else {
            directions.pedestrianRoute({
                points: [
                    curPos,
                    [closestBank.long, closestBank.lat]
                ],
            });
        }
    }, [routeType]);

    useEffect(() => {
        let map;

        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [37.622318, 55.754989],
                zoom: 13,
                key: 'fea7953b-72fa-4b6f-8d3e-bd5b5514a074',
            });

            setMap(map);
            setMapGLApi(mapglAPI);
        });

        return () => map && map.destroy();
    }, []);

    useEffect(() => {
        const distance = 100000;

        banks.forEach(bank => {
            if(getDistanceBetweenPoints([bank.long, bank.lat], curPos) < distance) {
                setClosestBank(bank);
            }

            if(curPos.length) return 

            const marker = new mapglAPI.Marker(map, {
                coordinates: [bank.long, bank.lat],
            });

        });
        console.log(closestBank)
    }, [banks, curPos]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <button className="geo-button" onClick={()=> geoFindMe()}>Найти местоположение</button>
            <MapWrapper/>
        </div>
    );
};

export default MapComponent;