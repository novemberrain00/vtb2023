import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { load } from '@2gis/mapgl';

import MapComponent from '../mapComponent/mapComponent';
import Sidebar from '../sidebar/sidebar';
import { getData, postData } from '../../services/services';
import { getDistanceBetweenPoints } from '../../services/services';


import './app.css';

const App = () => {
  const [map, setMap] = useState({}),
    [banks, setBanks] = useState([]),
    [atm, setAtm] = useState([]),
    [mapglAPI, setMapGLApi] = useState({});
  
  const curPos = useSelector(state => state.curPosition.coords),
    filtersToSend = useSelector(state => state.bankFilters.filtersToSend),
    bounds = useSelector(state => state.bounds.boundCoords);

  useEffect(() => {
    if(Object.keys(filtersToSend).length === 0) return;
    
    (async () => {
      await postData('/branch/listRequest', {
          firstCorner: {
            long: bounds[1][0],
            lat: bounds[1][1]
          },
          lastCorner: {
            long: bounds[0][0],
            lat: bounds[0][1]
          },
          branchServices: filtersToSend.branchServices,
          hasRamp: filtersToSend.hasRamp,
          holidayWorking: filtersToSend.holidayWorking
      })
      .then(res => setBanks(res.branchs));

    })();
  }, [filtersToSend]);

  useEffect(() => {
    setBanks([]);

    if(curPos.length) {
      (async () => {
        const banksToSort = await postData('/branch/listRequest', {
            firstCorner: {
              long: bounds[1][0],
              lat: bounds[1][1]
            },
            lastCorner: {
              long: bounds[0][0],
              lat: bounds[0][1]
            },
            hasRamp: true,
            holidayWorking: true
        })
        .then(res => res.branchs);

        if(!curPos.length) {
          setBanks(banksToSort);
          return;
        }
        console.log(banksToSort)
        
        setBanks(banksToSort);
      })();

    }
  }, [curPos]);

  useEffect(() => {
      let map;

      load().then((mapglAPI) => {
          map = new mapglAPI.Map('map-container', {
              center: [37.622318, 55.754989],
              zoom: 13,
              key: '9d37cb77-658c-44e1-8370-a652dbba6792',
          });

          setMap(map);
          setMapGLApi(mapglAPI);
      });
      return () => map && map.destroy();
  }, []);

  return (
    <>
      <Sidebar map={map} banks={banks} setBanks={setBanks}/>
      <MapComponent map={map} mapglAPI={mapglAPI} banks={banks}/>
    </>
  );
}

export default App;
